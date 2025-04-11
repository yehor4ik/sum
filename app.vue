<template>
  <div class="container">
    <div class="controls">
      <div class="account-selector">
        <select v-model="selectedAccountId">
          <option value="">Оберіть рахунок</option>
          <option v-for="account in accounts" :key="account.id" :value="account.id">
            {{ account.type }} - {{ account.maskedPan[0] ?? '' }}
          </option>
        </select>
      </div>

      <DateRangePicker
        v-model:fromDate="fromDate"
        v-model:toDate="toDate"
      />

      <button 
        class="submit-button"
        @click="fetchTransactions"
        :disabled="!isFormValid"
      >
        Отримати транзакції
      </button>
    </div>

    <div v-if="transactions.length" class="transactions-list">
      <h2>Транзакції:</h2>
      <div v-for="transaction in transactions" :key="transaction.id" class="transaction-item">
        <div class="transaction-header">
          <span class="amount" :class="{ 'positive': transaction.amount > 0, 'negative': transaction.amount < 0 }">
            {{ formatAmount(transaction.amount) }}
          </span>
          <span class="date">{{ formatDate(transaction.time) }}</span>
        </div>
        <div class="transaction-description">{{ transaction.description }}</div>
        <div class="transaction-details">
          <span>Баланс: {{ formatAmount(transaction.balance) }}</span>
          <span v-if="transaction.cashbackAmount">Кешбек: {{ formatAmount(transaction.cashbackAmount) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { monobankApiService } from "./services/api/MonobankApiService/MonobankApiService";
import type { ClientInfo } from "~/services/api/MonobankApiService/types/ClientInfo";
import type { Statement } from "~/services/api/MonobankApiService/types/Statement";

const accounts = ref<ClientInfo['accounts']>([]);
const selectedAccountId = ref<string>('');
const transactions = ref<Statement[]>([]);
const config = useRuntimeConfig();

const fromDate = ref(new Date(2024, 0, 1));
const toDate = ref(new Date());

const isFormValid = computed(() => {
  return selectedAccountId.value !== '';
});

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH'
  }).format(amount / 100);
};

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString('uk-UA');
};

const fetchTransactions = async () => {
  if (!selectedAccountId.value) {
    transactions.value = [];
    return;
  }

  try {
    transactions.value = await monobankApiService.getStatement({
      accountId: selectedAccountId.value,
      fromDate: fromDate.value,
      toDate: toDate.value
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    transactions.value = [];
  }
};

onMounted(async () => {
  try {
    const clientInfo = await monobankApiService.getClientInfo();
    accounts.value = clientInfo.accounts;
  } catch (error) {
    console.error('Error fetching client info:', error);
  }
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.account-selector {
  width: 100%;
}

.account-selector select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.submit-button {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: #4a90e2;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover:not(:disabled) {
  background-color: #357abd;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.transactions-list {
  margin-top: 20px;
}

.transaction-item {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 10px;
}

.transaction-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.amount {
  font-weight: bold;
  font-size: 18px;
}

.positive {
  color: #2ecc71;
}

.negative {
  color: #e74c3c;
}

.transaction-description {
  color: #666;
  margin-bottom: 8px;
}

.transaction-details {
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 14px;
}

.date {
  color: #666;
  font-size: 14px;
}
</style>
