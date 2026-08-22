# Architecture

## Principles

1. Backend is the source of truth for financial data and calculations.
2. Business rules must be deterministic.
3. AI operates within controlled boundaries.
4. AI output must be structured and validated.
5. Frontend renders only approved UI components.
6. AI must not generate arbitrary application code.
7. Prefer simple MVP architecture over premature complexity.

## High-Level Flow

User
→ Interview
→ Financial Profile
→ Calculation Engine
→ AI Analysis
→ Wallets
→ Actual Expenses
→ Adaptation

## AI / Backend Separation

Backend:

- data persistence
- calculations
- validation
- business rules
- dependencies
- consistency checks

AI:

- question selection
- interpretation
- categorization
- recommendations
- explanations

## Frontend Architecture

Frontend MVP реализован в `frontend/` на React + Vite + TypeScript.

### Stack

- **React 19** — UI-библиотека.
- **Vite 6** — сборщик и dev-сервер.
- **TypeScript 6** — типизация.
- **Tailwind CSS 4** — утилитарная стилизация.
- **shadcn/ui** — готовые доступные компоненты (Button, Input, Label, RadioGroup, Card).
- **TanStack Query** — управление серверным состоянием.
- **Zod** — валидация схем (подготовка к интеграции с backend).

### Ключевые решения

- **Server-driven interview:** backend управляет последовательностью вопросов. Frontend только рендерит текущий вопрос и отправляет ответ.
- **Строгая схема вопроса:** `Question` — discriminated union по полю `component`. AI/backend может выбирать только из разрешённого набора компонентов.
- **Mock API:** пока backend не готов, используется `api/mockClient.ts` с фиксированной последовательностью вопросов. Переключение на реальный backend — через env `VITE_USE_MOCK_API=false`.
- **Персистентность сессии:** `session_id` сохраняется в `localStorage`, чтобы интервью восстанавливалось при обновлении страницы.
- **Валидация:** на стороне frontend только отображение ошибок backend. Реальная валидация выполняется backend.

### Структура frontend

```
frontend/src/
  api/
    client.ts              # Заглушка под FastAPI backend
    mockClient.ts          # Mock-реализация API
    index.ts               # Выбор client/mockClient через env
  components/
    questions/             # Компоненты вопросов
      CurrencyQuestion.tsx
      SingleChoiceQuestion.tsx
      NumberQuestion.tsx
      YesNoQuestion.tsx
    QuestionRenderer.tsx   # Рендерер вопросов + кнопка «Далее»
    InterviewContainer.tsx # Контейнер интервью
    InterviewHeader.tsx    # Хедер с прогрессом
  hooks/
    useInterview.ts        # Хуки TanStack Query
  schemas/
    question.ts            # Zod-схемы Question
  types/
    interview.ts           # TypeScript-типы
  lib/
    utils.ts               # Утилиты (cn)
  App.tsx
  main.tsx
```

## Current Architecture Status

Реализовано / спроектировано:

- ✅ Question Schema (frontend types + Zod)
- ✅ Question Registry (4 компонента: currency, single_choice, number, yes_no)
- ✅ Adaptive Interview flow (server-driven, frontend + mock)
- ✅ Interview State (session_id в localStorage, TanStack Query)
- ✅ API-контракт между frontend и backend
- ✅ Frontend architecture и component mapping

Ещё НЕ реализовано / НЕ спроектировано:

- ❌ Backend API (FastAPI)
- ❌ AI context и AI output validation
- ❌ Rules Engine
- ❌ Financial Profile model
- ❌ Wallet model
- ❌ Budget adaptation
- ❌ Data persistence (database)

Do not assume implementation details that have not been explicitly decided.
