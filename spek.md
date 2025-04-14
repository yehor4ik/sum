# 🟢 Monobank Transaction Tracker – Specification

## 📄 Project Summary

This is a Nuxt-based application that allows a user to calculate, view, and categorize expenses and income from their Monobank card(s) transactions.\
The application stores data **locally in the browser** (Local Storage) and allows users to analyze their spending via **tag-based statistics**.

---

## 🚀 Features Overview

### Authentication

- **Login via Personal Token:**\
  User inputs their Monobank personal token on a dedicated Login Page.
- **Token storage:**\
  Token is stored in **Local Storage** under the key `token`.
- **Invalid Token Handling:**\
  If token is invalid → show warning in the input field and block access.

---

### Data Storage

Stored in **Local Storage** in separate keys:

```json
{
  "token": "<Monobank Token>",
  "transactions": {
    "cardId1": [ /* transactions */ ],
    "cardId2": [ /* transactions */ ]
  },
  "savedTags": [ "Groceries", "Salary", "Transport" ],
  "lastSelectedCard": "<cardId>"
}
```

---

### Pages Structure

1. **Login Page (**``**):**

   - Visible **only when the token is not present** in local storage.
   - Input field for **Monobank token**.
   - Error display if token is invalid.
   - Redirects to Transaction List page upon success.

2. **Transaction List Page (**``** or **``**):**

   - Displays a list of transactions for the selected card and date range.
   - Fields shown per transaction:
     - **Amount** (green for income, red for expenses, with +/− sign).
     - **Description**
     - **Date/Time**
     - **Balance after transaction** (from last transaction)
     - **Tags**
   - Tag management:
     - Add tag (via button)
     - Edit tag (shows warning if used elsewhere)
     - Remove tag
     - Tags stored inside each transaction object.
     - Global saved tag list without duplicates.
   - Date Range Picker:
     - Custom date range selection ("from" and "to").
     - When dates change, transactions are automatically loaded (if missing) from Monobank API.
   - **Force Refresh Button**:
     - Forces re-download of transactions in the selected date range.
     - Local transactions are fully replaced.
     - Tags are preserved (matched by transaction `id`).
     - Includes confirmation dialog and loading indicator.

3. **Statistics Page (**``**):**

   - **Cost Graph (Bar Chart):**
     - X-axis: Tags used in transactions.
     - Y-axis: Total sum per tag (expenses + income).
     - Sorted descending by amount.
   - Date range selection (custom).

4. **Error Page (**``**):**

   - Displays a universal error message:\
     *"Something went wrong, please come back later."*
   - Redirect to this page in case of any API error, network error, or unexpected failure.

---

### Header Navigation (Visible on all pages except Login)

- **Logout button (left side):**
  - Clears only the token.
  - Keeps transactions and saved tags.
- **Navigation links:**
  - Transaction List
  - Statistics Page

---

## 🏗️ Architecture & Data Handling

- **Monobank API Calls:**

  - On login: request user account data to retrieve list of cards.
  - On app start or date range change:
    - If transactions for selected date range and card do not exist → fetch from API and store.
  - No automatic partial updates — only via Force Refresh.

- **Local Data Consistency:**

  - When fetching data, compare transaction `id`s and transaction array length to avoid duplicates.
  - Card balance is **not stored** — shown dynamically from last transaction.

---

## ❌ Error Handling Strategy

- Any critical error during API request, token validation, or transaction fetching will redirect to the **Error Page**.
- Force Refresh operation shows a **confirmation dialog** and a **loading indicator**.

---

## ✅ Testing Plan

**Authentication**

- Enter valid and invalid tokens.
- Verify token is saved correctly.
- Check error message on invalid token.

**Transaction Loading**

- Check automatic fetch for current month on first login.
- Verify local storage updates without duplicates.
- Check correct transactions are loaded when changing date range.

**Force Refresh**

- Verify confirmation dialog.
- Check that old transactions are replaced with new ones.
- Verify tags are preserved and matched by `id`.

**Tags Management**

- Add, edit, remove tags.
- Confirm warnings when editing/deleting used tags.
- Verify no duplication of tags.
- Tags persist across reloads.

**Statistics Page**

- Verify correct total amounts per tag.
- Check date range selection.
- Confirm bar chart is sorted correctly.

**Navigation & Logout**

- Verify navigation links.
- Ensure logout clears only the token.
- Check that selected card persists between sessions.

**Error Handling**

- Simulate API/network errors and verify redirection to Error Page.

---

## 📌 Future Enhancements (Out of Scope for v1)

- Transaction description editing.
- Multi-user support.
- Remote database storage.
- Filters & search on Transaction List.
- Advanced statistics and filters.

