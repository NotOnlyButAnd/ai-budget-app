# ai-budget-app

AI-ассистент для управления личными финансами. Пользователь проходит адаптивное интервью, а система строит персонализированный месячный бюджет, разбитый на «кошельки».

## Текущий статус

Реализован frontend MVP — адаптивное интервью с mock backend. Backend на FastAPI и AI-логика выбора вопросов будут добавлены позже.

## Структура проекта

```
ai-budget-app/
├── frontend/              # React + Vite + TypeScript приложение
│   ├── src/
│   │   ├── api/           # API клиент и mock backend
│   │   ├── components/    # React-компоненты интервью
│   │   ├── hooks/         # TanStack Query хуки
│   │   ├── schemas/       # Zod-схемы
│   │   ├── types/         # TypeScript типы
│   │   └── lib/           # Утилиты
│   └── package.json
├── PROJECT.MD             # Описание продукта
├── ARCHITECTURE.md        # Архитектурные принципы и текущий статус
├── AGENT.MD               # Инструкции для агента
└── .kilo/plans/           # Планы реализации
```

## Технологии

- **Frontend:** React 19, Vite 6, TypeScript 6, Tailwind CSS 4, shadcn/ui
- **State management:** TanStack Query
- **Validation:** Zod
- **Backend (планируется):** FastAPI (Python)

## Запуск frontend

```powershell
cd frontend
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
npm.cmd run dev
```

Приложение откроется по адресу http://localhost:5173/.

## Сборка

```powershell
cd frontend
npm.cmd run build
```

## Что реализовано

- Страница адаптивного интервью.
- Server-driven архитектура: backend (сейчас mock) управляет последовательностью вопросов.
- 4 типа компонентов вопросов: `currency`, `single_choice`, `number`, `yes_no`.
- Сохранение `session_id` в `localStorage` для восстановления прогресса.
- Заглушка под реальный FastAPI backend.

## Следующие шаги

1. Реализовать FastAPI backend.
2. Добавить AI для выбора следующего вопроса.
3. Добавить страницы финансового профиля и бюджета/кошельков.
4. Реализовать оставшиеся компоненты вопросов: `multiple_choice`, `slider`, `frequency`, `date`.
