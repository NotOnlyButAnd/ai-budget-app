# План: веб-интерфейс MVP (адаптивное интервью)

## Статус

✅ Реализовано. Frontend MVP находится в `frontend/`.

## Цель

Создать frontend-часть MVP — страницу адаптивного интервью, которая общается с backend по REST API. Backend будет реализован позже, поэтому сначала используется mock API модуль.

## Архитектурные решения

| Решение | Выбор |
|---------|-------|
| Стек frontend | React + Vite + TypeScript |
| Стилизация и UI | Tailwind CSS + shadcn/ui |
| Backend (позже) | FastAPI (Python) |
| Управление состоянием интервью | Server-driven: backend решает, какой вопрос задать дальше |
| Управление состоянием в приложении | TanStack Query (серверное состояние) + локальный `useState`/`useReducer` в `InterviewContainer` |
| Роутинг | Не используется на старте (одна страница) |
| Схема вопроса | Строгая типизированная схема с discriminated union по полю `component` |
| Рендеринг компонентов | Прямой маппинг `component` → React-компонент |
| Валидация ответов | Только на backend; frontend отображает ошибки из API |
| Персистентность сессии | `session_id` сохраняется в `localStorage` |
| Мокирование backend | Простой mock API модуль (`frontend/src/api/mockClient.ts`), переключаемый через env |

## API-контракт (frontend → backend)

### Эндпоинты

1. `POST /api/interviews` — создать сессию интервью.
   - Ответ: `{ session_id: string, question: Question }`
2. `GET /api/interviews/{session_id}/question` — получить текущий вопрос.
   - Ответ: `{ question: Question }`
3. `POST /api/interviews/{session_id}/answers` — отправить ответ на текущий вопрос.
   - Тело: `{ question_id: string, value: unknown }`
   - Ответ (унифицированный):
     ```json
     {
       "question": { ... } | null,
       "completed": false
     }
     ```
   - Когда `completed: true`, поле `question` равно `null`.

### Схема вопроса `Question`

```typescript
type Question =
  | CurrencyQuestion
  | SingleChoiceQuestion
  | NumberQuestion
  | YesNoQuestion;

interface BaseQuestion {
  id: string;
  component: string;
  label: string;
  description?: string;
  required: boolean;
}

interface CurrencyQuestion extends BaseQuestion {
  component: "currency";
  data: {
    currency: string; // например, "RUB"
    min?: number;
    max?: number;
    placeholder?: string;
  };
}

interface SingleChoiceQuestion extends BaseQuestion {
  component: "single_choice";
  data: {
    options: Array<{ value: string; label: string }>;
  };
}

interface NumberQuestion extends BaseQuestion {
  component: "number";
  data: {
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
  };
}

interface YesNoQuestion extends BaseQuestion {
  component: "yes_no";
  data: {
    true_label?: string;
    false_label?: string;
  };
}
```

## Структура проекта

```
frontend/src/
  api/
    client.ts              # Функции для реальных вызовов backend (заглушки)
    mockClient.ts          # Mock-реализация API
    index.ts               # Точка входа: выбор client/mockClient через env
  components/
    questions/
      CurrencyQuestion.tsx
      SingleChoiceQuestion.tsx
      NumberQuestion.tsx
      YesNoQuestion.tsx
    QuestionRenderer.tsx   # Маппинг component → компонент + общая обёртка
    InterviewContainer.tsx # Основной контейнер интервью
    InterviewHeader.tsx    # Хедер (логотип, прогресс)
  schemas/
    question.ts            # Zod-схемы для валидации ответов backend
  types/
    interview.ts           # TypeScript-типы: Question, Answer, InterviewSession
  hooks/
    useInterview.ts        # TanStack Query хуки для создания сессии и отправки ответов
  lib/
    utils.ts               # Утилиты
  App.tsx
  main.tsx
```

## Архитектура компонентов

- `InterviewContainer` управляет общим flow:
  - при монтировании создаёт сессию (`POST /api/interviews`) или восстанавливает `session_id` из `localStorage`;
  - хранит `session_id` в `useState`;
  - через TanStack Query получает/отправляет вопросы;
  - рендерит `QuestionRenderer` с текущим вопросом.
- `QuestionRenderer`:
  - рендерит общую обёртку (кнопку «Далее»);
  - по полю `question.component` выбирает конкретный компонент вопроса;
  - передаёт `label`, `description`, `required`, `data` и callback `onChange(value)` в компонент вопроса;
  - при нажатии «Далее» отправляет ответ через TanStack Query.
- Компоненты вопросов (`CurrencyQuestion`, `SingleChoiceQuestion`, `NumberQuestion`, `YesNoQuestion`):
  - получают `data`, `label`, `description` и `onChange`;
  - рендерят собственный `label` и `description`;
  - управляют только своим input-состоянием;
  - не отправляют ответ сами.

## Mock API (`frontend/src/api/mockClient.ts`)

Реализована простая конечная последовательность вопросов, имитирующая backend:

1. `currency` — «Какой ваш ежемесячный доход?»
2. `single_choice` — «Тип жилья» (аренда / ипотека / собственное / с родителями)
3. `yes_no` — «Есть ли у вас машина?»
4. `number` — «Сколько человек в семье?»
5. `currency` — «Сколько вы тратите на еду в месяц?»
6. Завершение (`completed: true`).

Mock сохраняет ответы в памяти и возвращает следующий вопрос по порядку.

## Запуск

```powershell
cd frontend
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
npm.cmd run dev
```

Открывается http://localhost:5173/.

## Границы MVP (что НЕ входит)

- Роутинг и дополнительные страницы (`/profile`, `/budget`).
- Компоненты `multiple_choice`, `slider`, `frequency`, `date`.
- Frontend-валидация ответов (только backend-валидация).
- Реальный backend и AI (mock).
- Аутентификация.
- Адаптация бюджета и сравнение план/факт.

## Риски и открытые вопросы

1. **Backend-валидация без frontend-проверки.** Пользователь получит ошибку только после нажатия «Далее». Для MVP это приемлемо, но на следующем этапе стоит добавить Zod-валидацию в компонентах.
2. **Формат ошибок API.** Нужно согласовать с backend, как выглядит ответ при ошибке валидации (`{ error: { code, message, field? } }`).
3. **Восстановление сессии.** Если `session_id` из `localStorage` не найден на backend (например, после очистки mock), нужно начать новое интервью.
4. **Типизация ответов.** Поле `value` в `POST /answers` имеет тип `unknown`. Для каждого компонента нужно будет согласовать формат (`number`, `string`, `boolean` и т.д.).
