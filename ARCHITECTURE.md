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

## Current Architecture Status

The following areas are NOT designed yet and should be discussed with the
agent:

- Question Registry
- Question Schema
- Adaptive Interview
- Rules Engine
- Interview State
- AI context
- AI output validation
- Financial Profile
- Wallet model
- Budget adaptation

Do not assume implementation details that have not been explicitly decided.