# ✅ Monobank Transaction Tracker – Development Checklist

A thorough step-by-step guide to building the project using Nuxt 3.

---

## 🧱 Phase 1: Project Setup

- [ ] Initialize new Nuxt 3 project with TypeScript
- [ ] Install dependencies:
  - [ ] `@pinia/nuxt`
  - [ ] `@vueuse/core`
  - [ ] `chart.js`
  - [ ] `vue-chartjs`
  - [ ] `tailwindcss` for styling
- [ ] Configure Tailwind
- [ ] Set up base folder structure:
  - [ ] `/pages`: `index.vue`, `transactions.vue`, `statistics.vue`, `error.vue`
  - [ ] `/components`: `TransactionItem.vue`, `DateRangePicker.vue`, `TagEditor.vue`, `BarChart.vue`
  - [ ] `/stores`: `auth.ts`, `transactions.ts`, `tags.ts`, `cards.ts`
  - [ ] `/utils`: `monobankClient.ts`, `storage.ts`, `date.ts`, `errorHandler.ts`

---

## 🧪 Phase 10: Manual Testing Plan

- [ ] Authentication:
  - [ ] Valid token → success
  - [ ] Invalid token → error message
- [ ] Transactions:
  - [ ] First login → fetches current month
  - [ ] Date range change → fetch only if needed
  - [ ] Force Refresh → replaces, preserves tags
- [ ] Tags:
  - [ ] Add/edit/delete
  - [ ] Warn on editing used tag
  - [ ] No duplicates in global list
- [ ] Statistics:
  - [ ] Chart displays correct totals per tag
  - [ ] Sorted descending
- [ ] Navigation:
  - [ ] Links work
  - [ ] Logout clears token only
- [ ] Error Handling:
  - [ ] Simulate API failure → redirect to `/error`

---

## 🧠 Optional: Enhancements for Later

_Not part of v1 but nice-to-haves:_

- [ ] Transaction description editing
- [ ] Multi-user support
- [ ] Remote DB storage
- [ ] Filters/search on transactions
- [ ] Advanced filters/statistics

---

🟢 You can check off items as you build. This doc helps ensure solid incremental progress without skipping any important parts. 