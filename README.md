## IT Guru – панель управления продуктами

Приложение для авторизации пользователей и управления списком продуктов (просмотр, сортировка, базовый поиск и работа с таблицей) на базе React и Ant Design.

### Технологии

-   **React** (SPA на функциональных компонентах)
-   **TypeScript**
-   **Redux Toolkit** + кастомные хуки `useAppDispatch` / `useAppSelector`
-   **React Router**
-   **Ant Design** (таблица, формы, элементы интерфейса)
-   **Axios** (через обёртку `$api` для работы с бэкендом)

### Структура проекта (основное)

-   **`src/main.tsx`** – точка входа, инициализация приложения:
    -   проверка и обновление токенов авторизации через `$api`;
    -   создание `StoreProvider` с предварительным состоянием авторизации;
    -   оборачивание приложения в `BrowserRouter`.
-   **`src/modules/auth`** – модуль аутентификации:
    -   `model/slice/auth-slice.ts` – Redux‑слайс авторизации;
    -   `model/services/login/login.ts` – сервис логина;
    -   `ui/auth-form.tsx` – форма авторизации.
-   **`src/modules/products`** – модуль продуктов:
    -   `model/slice/products-slice.ts` – Redux‑слайс продуктов
    -   `model/services/get-products.ts` – загрузка списка продуктов;
    -   `model/services/add-product.ts` – добавление продукта (подключение/расширение логики);
    -   `model/services/search-products.ts` – поиск/фильтрация продуктов;
    -   `types/product.ts` / `types/products-schema.ts` – типы данных;
    -   `ui/products.tsx` – таблица продуктов (основной экран).
-   **`src/shared`** – общие утилиты и инфраструктура:
    -   `shared/api/api.ts` – настроенный экземпляр Axios (`$api`);
    -   `shared/lib/hook/useAppDispatch`, `useAppSelector` – типизированные хуки для Redux.

### Настройка и запуск

1. **Установка зависимостей**

```bash
npm install
```

2. **Запуск проекта в режиме разработки**

```bash
npm run dev
```
