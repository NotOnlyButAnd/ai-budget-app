# Personal Finance AI

## Product

AI-powered personal finance assistant.

The user provides information about their income, lifestyle, expenses,
financial obligations and goals.

The system analyzes this information and creates a personalized monthly
budget divided into "wallets".

Example:

User income: 200,000 RUB/month.

Possible wallets:

- Housing
- Food
- Transport
- Entertainment
- Future expenses
- Emergency fund
- Investments
- Free money

The exact wallets and amounts depend on the individual user.

The system should NOT rely on generic rules such as 50/30/20.

## Core User Journey

Interview
→ Financial Profile
→ Calculations
→ AI Analysis
→ Wallets
→ Actual Spending
→ Plan vs Actual
→ Budget Adaptation

## Adaptive Interview

The onboarding interview should not be a fixed questionnaire.

The system should ask only questions that are relevant to the user and
that materially improve the financial profile.

Example:

car_owned = false
→ do not ask about fuel, insurance or maintenance.

housing_type = rent
→ ask about rent.

The interview should minimize the number of questions while collecting
enough information to generate a useful budget.

## Dynamic UI

Questions are rendered using a controlled set of frontend components.

Examples:

- single choice
- multiple choice
- currency
- number
- slider
- frequency
- date
- yes/no

The AI may choose a component and provide its data, but must not generate
arbitrary frontend code.

## AI

AI is responsible for:

- selecting the next useful question
- natural-language formulation
- interpreting the financial profile
- grouping expenses
- recommending wallets
- explaining recommendations

AI is NOT responsible for:

- financial calculations
- business rules
- validation
- database integrity
- arbitrary UI generation

## Important Product Principle

The product should hide financial complexity from the user.

The user should feel that the system understands their lifestyle and creates
a realistic financial plan specifically for them.

## Current Status

- Frontend MVP (адаптивное интервью) реализован в `frontend/`.
- Реализованы компоненты вопросов: `currency`, `single_choice`, `number`, `yes_no`.
- Backend и AI-логика выбора вопросов находятся в стадии проектирования/реализации.
