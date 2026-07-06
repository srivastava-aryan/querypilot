# AI SQL Agent Architecture

---

# High-Level Architecture

```
                    ┌──────────────────────┐
                    │      React UI        │
                    │  (Vite + Tailwind)   │
                    └──────────┬───────────┘
                               │
                        HTTP (Axios)
                               │
                               ▼
                  ┌────────────────────────┐
                  │     Express Server      │
                  └──────────┬─────────────┘
                             │
         ┌───────────────────┼────────────────────┐
         │                   │                    │
         ▼                   ▼                    ▼
   PostgreSQL            Redis Memory         AI Services
                                              │
                                  ┌───────────┴───────────┐
                                  │                       │
                                  ▼                       ▼
                            Groq LLM                LangChain RAG
                                                       │
                                               MemoryVectorStore
```

---

# Folder Structure

```
ai-sql-agent/

│
├── client/
│
│   ├── src/
│   │
│   ├── components/
│   │
│   │    ├── chat/
│   │    │
│   │    │     ChatBox.tsx
│   │    │
│   │    │     MessageBubble.tsx
│   │    │
│   │    │     QueryInput.tsx
│   │    │
│   │    │     SQLPreview.tsx
│   │    │
│   │    │     ResultTable.tsx
│   │    │
│   │    │     ChartRenderer.tsx
│   │
│   │
│   ├── layout/
│   │
│   │     Sidebar.tsx
│   │
│   ├── pages/
│   │
│   │     Dashboard.tsx
│   │
│   ├── services/
│   │
│   │     api.ts
│   │
│   ├── types/
│   │
│   │     query.ts
│   │
│   └── main.tsx
│
│
├── server/
│
│   ├── db/
│   │
│   │     db.index.js
│   │
│   ├── routes/
│   │
│   │     queryRoutes.js
│   │
│   ├── services/
│   │
│   │     aiService.js
│   │
│   │     ragService.js
│   │
│   │     repairService.js
│   │
│   │     chatService.js
│   │
│   │     sessionService.js
│   │
│   │     schemaService.js
│   │
│   ├── utils/
│   │
│   │     memory.js
│   │
│   │     sqlUtils.js
│   │
│   └── index.js
│
├── docker-compose.yml
│
└── docs/
```

---

# Request Lifecycle

When a user asks

```
Show all users
```

the request follows this path.

```
Browser

↓

Axios

↓

POST /api/query

↓

queryRoutes.js

↓

generateSQL()

↓

Groq

↓

SQL Returned

↓

SQL Cleaning

↓

SQL Safety Check

↓

Execute PostgreSQL Query

↓

If Error

↓

Repair Agent

↓

Execute Again

↓

Save Conversation

↓

Return SQL + Rows

↓

Frontend

↓

SQL Preview

↓

Table

↓

Charts
```

---

# Backend Architecture

Backend responsibilities are divided into small services.

Instead of putting everything inside one route,

each concern has its own module.

Example

```
Routes

↓

Services

↓

Database

↓

Utilities
```

This makes the project scalable.

---

# Frontend Architecture

React is component-based.

Dashboard

↓

Sidebar

↓

ChatBox

↓

MessageBubble

↓

SQLPreview

↓

ResultTable

↓

ChartRenderer

Each component has one responsibility.

---

# AI Pipeline

Current Flow

```
User Question

↓

Retrieve Business Context

↓

Retrieve Conversation Memory

↓

Retrieve Database Schema

↓

Prompt Construction

↓

Groq

↓

Generated SQL

↓

Clean SQL

↓

Validate SQL

↓

Execute Query

↓

Repair if Needed

↓

Return Data
```

---

# Database Responsibilities

PostgreSQL stores

Business Tables

```
users

orders
```

Application Tables

```
chat_sessions

conversations
```

---

# Redis Responsibilities

Redis stores

Short-term conversation memory.

Purpose

Improve follow-up questions.

Example

User

```
Show all users
```

Then

```
Only active ones
```

Redis remembers previous context.

---

# RAG Responsibilities

Business knowledge is stored separately.

Example

```
Active users

Recent users

High value customers
```

Instead of placing these inside prompts,

they are retrieved semantically.

Advantages

Smaller prompts

Better reasoning

Easier maintenance

---

# SQL Repair Agent

Sometimes LLMs generate invalid SQL.

Instead of failing,

the project

Reads

Generated SQL

↓

Database Error

↓

Schema

↓

Question

↓

Groq Repair Prompt

↓

New SQL

↓

Retry

This greatly improves reliability.

---

# Session Management

Every new chat receives

```
UUID
```

Example

```
4d9d...

```

A session stores

- title
- creation time

Conversation stores

- user message
- assistant response
- SQL
- returned data

---

# Current Technology Choices

Frontend

React

Reason

Component architecture.

---

Tailwind CSS

Reason

Fast UI development.

---

Express

Reason

Simple REST API.

---

Groq

Reason

Fast inference.

Production-ready.

---

Redis

Reason

Temporary conversational memory.

---

PostgreSQL

Reason

Reliable relational database.

---

Docker

Reason

Environment consistency.

Runs the same on every machine.

---

# Design Principles

Throughout this project,

the following principles are followed.

- Separation of Concerns

- Reusable Components

- Modular Services

- AI-first Architecture

- Production-oriented Structure

- Easy Debugging

- Docker-first Development
