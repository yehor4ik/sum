<template>
  <div class="date-range-picker">
    <div class="date-selectors">
      <div class="date-selector">
        <label>{{ fromLabel }}</label>
        <div class="date-input-wrapper">
          <input
            type="date"
            :value="formatDateForInput(fromDate)"
            @change="handleFromDateChange"
          />
        </div>
      </div>
      <div class="date-selector">
        <label>{{ toLabel }}</label>
        <div class="date-input-wrapper">
          <input
            type="date"
            :value="formatDateForInput(toDate)"
            @change="handleToDateChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  fromDate: Date;
  toDate: Date;
  fromLabel?: string;
  toLabel?: string;
}>();

const emit = defineEmits<{
  'update:fromDate': [date: Date];
  'update:toDate': [date: Date];
  'date-change': [fromDate: Date, toDate: Date];
}>();

const fromLabel = props.fromLabel || 'Від:';
const toLabel = props.toLabel || 'До:';

const formatDateForInput = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const handleFromDateChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const newDate = new Date(input.value);
  emit('update:fromDate', newDate);
  emit('date-change', newDate, props.toDate);
};

const handleToDateChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const newDate = new Date(input.value);
  emit('update:toDate', newDate);
  emit('date-change', props.fromDate, newDate);
};

// Валідація дат
watch(() => props.fromDate, (newDate) => {
  if (newDate > props.toDate) {
    emit('update:fromDate', props.toDate);
  }
});

watch(() => props.toDate, (newDate) => {
  if (newDate < props.fromDate) {
    emit('update:toDate', props.fromDate);
  }
});
</script>

<style scoped>
.date-range-picker {
  width: 100%;
}

.date-selectors {
  display: flex;
  gap: 20px;
}

.date-selector {
  flex: 1;
}

.date-selector label {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
}

.date-input-wrapper {
  position: relative;
}

.date-input-wrapper input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
}

.date-input-wrapper input:hover {
  border-color: #999;
}

.date-input-wrapper input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

/* Стилізація календаря */
.date-input-wrapper input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.date-input-wrapper input::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
</style> 