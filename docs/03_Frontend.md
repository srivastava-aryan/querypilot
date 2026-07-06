# Frontend Documentation

---

# Overview

The frontend is built using:

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Chart.js

The objective of the frontend is to provide a ChatGPT-like interface for querying databases using natural language.

Instead of exposing SQL directly to the user, the interface allows users to ask questions naturally while still displaying the generated SQL for transparency.

---

# Frontend Folder Structure

```
client/

├── src/
│
├── components/
│
│   ├── chat/
│   │
│   │   ChatBox.tsx
│   │   MessageBubble.tsx
│   │   QueryInput.tsx
│   │   SQLPreview.tsx
│   │   ResultTable.tsx
│   │   ChartRenderer.tsx
│   │
│   ├── layout/
│   │
│   │   Sidebar.tsx
│   │
│   ├── common/
│   │
│   │   (future reusable components)
│
├── pages/
│
│   Dashboard.tsx
│
├── services/
│
│   api.ts
│
├── types/
│
│   query.ts
│
├── App.tsx
│
└── main.tsx
```

---

# High-Level Component Tree

```
App

↓

Dashboard

├── Sidebar
│
└── ChatBox
      │
      ├── MessageBubble
      │
      ├── SQLPreview
      │
      ├── ResultTable
      │
      ├── ChartRenderer
      │
      └── QueryInput
```

---

# App.tsx

Purpose

Root component.

Responsibilities

- Render Dashboard
- Future authentication routing

Current

```
<App>

↓

Dashboard
```

---

# Dashboard.tsx

Purpose

Acts as the page controller.

Responsibilities

- Store active session
- Load all sessions
- Handle new chat creation
- Pass selected session to ChatBox
- Pass session list to Sidebar

State

```
sessions

sessionId
```

Flow

```
Dashboard

↓

Sidebar

↓

User selects session

↓

Dashboard updates

↓

ChatBox reloads history
```

---

# Sidebar.tsx

Purpose

Display chat history.

Responsibilities

- Display previous sessions
- Highlight current session
- Create new chat
- Switch conversations

Receives

```
sessions

currentSession

onSelect()

onNewChat()
```

No API calls are made directly from Sidebar.

Dashboard owns the state.

---

# ChatBox.tsx

Most important frontend component.

Responsibilities

- Store messages
- Send user queries
- Receive backend response
- Load history
- Render conversation
- Display loading state

State

```
query

messages

loading

sessionId
```

Main responsibilities

```
Load History

↓

Display Messages

↓

Submit Question

↓

Receive SQL

↓

Receive Rows

↓

Render Table

↓

Render Chart
```

---

# Message Flow

```
User

↓

QueryInput

↓

handleSubmit()

↓

Axios POST

↓

Backend

↓

Response

↓

Assistant Message

↓

setMessages()

↓

MessageBubble
```

---

# QueryInput.tsx

Purpose

Collect user input.

Responsibilities

- Text input
- Enter key handling
- Submit button
- Disable while loading

Props

```
query

setQuery

onSubmit

loading
```

Very small component.

No API logic.

---

# MessageBubble.tsx

Purpose

Render one message.

Supports

User messages

Assistant messages

Responsibilities

Display

- Message
- SQL
- Table
- Charts

Current layout

```
Assistant

↓

Text

↓

SQL

↓

Table

↓

Charts
```

Styling

User

Right aligned

Blue

Assistant

Left aligned

Dark theme

---

# SQLPreview.tsx

Purpose

Display generated SQL.

Advantages

Transparency

Debugging

Educational value

Future improvements

- Copy SQL
- Syntax highlighting
- Collapse
- Expand

---

# ResultTable.tsx

Purpose

Display PostgreSQL results.

Input

```
Array<Object>
```

Features

Automatically

- Detects columns
- Creates headers
- Creates rows

Advantages

Works for every query.

No hardcoded columns.

---

# ChartRenderer.tsx

Purpose

Automatically generate charts.

Current workflow

```
Receive Rows

↓

Check Data

↓

Determine Chart Type

↓

Render Chart.js
```

Charts only appear if data is chartable.

Examples

```
Sales

↓

Bar Chart

Revenue

↓

Line Chart

Category Count

↓

Pie Chart
```

Future

AI-selected chart types.

---

# api.ts

Purpose

Central Axios configuration.

Advantages

Single place to configure

Base URL

Headers

Timeout

Future

JWT authentication

Interceptors

Automatic refresh tokens

---

# query.ts

Purpose

Type definitions.

Contains

```
Message

HistoryMessage

Session

Response
```

Benefits

Type safety

Autocomplete

Compile-time validation

---

# Current UI Flow

```
Dashboard

↓

ChatBox

↓

QueryInput

↓

User Types

↓

Axios

↓

Backend

↓

SQL

↓

Rows

↓

MessageBubble

↓

SQL Preview

↓

Result Table

↓

Chart
```

---

# State Ownership

Dashboard

Owns

```
Sessions

Current Session
```

ChatBox

Owns

```
Messages

Query

Loading
```

MessageBubble

Stateless.

Pure UI component.

---

# Styling

Framework

Tailwind CSS

Theme

Dark

Primary Colors

Blue

Slate

Goals

Minimal

Modern

Readable

ChatGPT-inspired

---

# Responsive Design

Current

Desktop-first

Future

Tablet optimization

Mobile optimization

Responsive sidebar

---

# Features Completed

✅ Chat Interface

✅ Session Switching

✅ Sidebar

✅ SQL Preview

✅ Dynamic Tables

✅ Automatic Charts

✅ Loading State

✅ Conversation History

✅ Chat Persistence

---

# Planned UI Improvements

- Copy SQL button
- Download CSV
- Download PDF
- Code syntax highlighting
- Toast notifications
- AI Insights card
- Query execution time
- Row count badge
- Animated message streaming
- Better chart selection
- Skeleton loaders
- Empty state illustrations
- Theme switcher
- User authentication

---

# Design Principles

The frontend follows:

- Component-based architecture
- Separation of concerns
- Reusable UI
- Stateless presentation components
- Centralized API layer
- Type safety
- Minimal prop drilling
- Clean user experience

---

# Lessons Learned

Building this frontend provided experience with:

- React component architecture
- State management using hooks
- TypeScript interfaces
- Dynamic rendering
- Conditional rendering
- REST API integration
- Axios
- Chart.js
- Tailwind CSS
- Session-based chat applications
- AI application UI patterns