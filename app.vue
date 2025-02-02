<template>
  <div>
    <div v-for="account in accounts">
      {{account.type}} - {{account.maskedPan[0] ?? ''}}
    </div>
  </div>
</template>

<script setup lang="ts">
import {monobankApiService} from "./services/api/MonobankApiService/MonobankApiService";
import type {ClientInfo} from "~/services/api/MonobankApiService/types/ClientInfo";

const accounts = ref<ClientInfo['accounts']>([])

const config = useRuntimeConfig()

onMounted(async () => {
  const fromDate = new Date(2025, 0, 1).getTime()
  const toDate = new Date(2025, 0, 12).getTime()
  const clientInfo = await monobankApiService.getClientInfo()

  accounts.value = clientInfo.accounts

  //TODO need get account id from response1

  const accountId = 0

  const response = await fetch(`https://api.monobank.ua/personal/statement/${accountId}/${fromDate}/${toDate}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Token":  config.public.bankAuthToken
    },
  });
  console.log('response', await response.json())
})

</script>
