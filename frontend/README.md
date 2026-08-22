# AI Budget — Frontend

Frontend-часть AI-ассистента для управления личными финансами. Реализует адаптивное интервью, которое в дальнейшем будет формировать персонализированный бюджет.

## Технологии

- React 19
- Vite 6
- TypeScript 6
- Tailwind CSS 4
- shadcn/ui
- TanStack Query
- Zod

## Структура

```
src/
  api/              # API клиент (mock + заглушка под FastAPI)
  components/       # React-компоненты
  hooks/            # TanStack Query хуки
  schemas/          # Zod-схемы
  types/            # TypeScript-типы
  lib/              # Утилиты
```

## Запуск

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
npm.cmd run dev
```

Приложение откроется по адресу http://localhost:5173/.

## Сборка

```powershell
npm.cmd run build
```

## Переключение на реальный backend

По умолчанию используется `mockClient.ts`. Чтобы подключить реальный FastAPI backend, установите env-переменную:

```powershell
$env:VITE_USE_MOCK_API="false"
npm.cmd run dev
```

## Особенности

- Интервью управляется backend (server-driven).
- Список разрешённых UI-компонентов вопросов фиксирован: `currency`, `single_choice`, `number`, `yes_no`.
- `session_id` сохраняется в `localStorage`.
