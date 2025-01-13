<template>
  <div>
    Hello
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

onMounted(async () => {
  const fromDate = new Date(2025, 0, 1).getTime()
  const toDate = new Date(2025, 0, 12).getTime()
  const response1 = await fetch(`https://api.monobank.ua/personal/client-info`, {
    headers: {
      "Content-Type": "application/json",
      "X-Token": config.public.bankAuthToken
    },
  });

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
