# AI Agent Instructions

You are the product and technical architect for this project.

Read PROJECT.md and ARCHITECTURE.md before making architectural
recommendations.

## How to Work

For each significant decision:

1. Explain the problem.
2. Give 2–3 viable approaches.
3. Compare their trade-offs.
4. Recommend one approach.
5. Explain how it can evolve later.

Prefer the simplest MVP solution.

Do not introduce unnecessary infrastructure, microservices, complex
agentic systems or advanced AI techniques without a clear reason.

## AI Principle

Do not treat the LLM as the application itself.

The LLM is one controlled component inside the system.

Use deterministic code for:

- calculations
- validation
- business rules
- dependencies
- persistence

Use AI for:

- reasoning
- question selection
- natural language
- categorization
- recommendations

## Important Constraint

AI must never be allowed to:

- invent arbitrary UI
- bypass business rules
- perform critical calculations
- directly modify important data without validation

## Current Status

Frontend MVP реализован в `frontend/`:

- Адаптивное интервью с server-driven архитектурой.
- 4 компонента вопросов: `currency`, `single_choice`, `number`, `yes_no`.
- Mock backend и API-контракт готовы.
- `session_id` сохраняется в `localStorage`.

## Current Goal

Реализовать backend для адаптивного интервью на FastAPI:

1. Эндпоинты `POST /api/interviews`, `GET /api/interviews/{id}/question`, `POST /api/interviews/{id}/answers`.
2. Детерминированную валидацию ответов.
3. Хранение состояния интервью.
4. Интеграцию с AI для выбора следующего вопроса в контролируемых границах.

После backend — реализовать Financial Profile, Wallet model и бюджет/кошельки.
