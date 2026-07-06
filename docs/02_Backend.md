# Backend Documentation

---

# Overview

The backend is responsible for:

- Receiving natural language queries
- Retrieving conversation memory
- Retrieving business context (RAG)
- Retrieving database schema
- Generating SQL using AI
- Cleaning generated SQL
- Validating SQL safety
- Executing SQL on PostgreSQL
- Automatically repairing invalid SQL
- Saving conversations
- Managing chat sessions
- Returning SQL and query results

The backend follows a service-oriented architecture where each file has one responsibility.

---

# Backend Folder Structure

```
server/

├── db/
│     db.index.js
│
├── routes/
│     queryRoutes.js
│
├── services/
│     aiService.js
│     ragService.js
│     repairService.js
│     schemaService.js
│     chatService.js
│     sessionService.js
│
├── utils/
│     memory.js
│     sqlUtils.js
│
├── index.js
│
└── .env
```

---

# index.js

Purpose

Application entry point.

Responsibilities

- Create Express server
- Register middleware
- Register routes
- Initialize vector store
- Start HTTP server

Flow

```
Start Express

↓

Initialize RAG

↓

Register Routes

↓

Listen on Port 5000
```

---

# db.index.js

Purpose

Create PostgreSQL connection pool.

Uses

pg

Responsibilities

- Create reusable connection pool
- Read credentials from environment variables
- Export pool instance

Every database operation uses this pool.

Example

```
pool.query(...)
```

instead of creating new connections.

Advantages

- Faster
- Connection reuse
- Production ready

---

# queryRoutes.js

Most important file.

Responsibilities

- Receive HTTP requests
- Coordinate every service
- Return API responses

Endpoints

```
POST /query

GET /history/:sessionId

GET /sessions
```

---

POST /query

Pipeline

```
Receive Question

↓

Check Session

↓

Create Session if Needed

↓

Save User Message

↓

Generate SQL

↓

Clean SQL

↓

Validate SQL

↓

Execute SQL

↓

Repair SQL if Needed

↓

Execute Again

↓

Save Assistant Message

↓

Return SQL + Data
```

---

GET /history

Returns

```
Entire conversation
```

for one session.

Frontend uses this when opening an old chat.

---

GET /sessions

Returns

All chat sessions.

Sidebar displays these.

---

# aiService.js

Purpose

Convert natural language into SQL.

Responsibilities

Retrieve

- Schema
- RAG Context
- Conversation Memory

Build prompt

↓

Send prompt to Groq

↓

Receive SQL

↓

Return SQL

Prompt contains

Database schema

Business context

Conversation history

User question

Rules

Only PostgreSQL SQL

No explanation

No markdown

Only SQL

---

# schemaService.js

Purpose

Automatically retrieve database schema.

Instead of hardcoding tables,

the backend asks PostgreSQL

```
information_schema
```

for

Tables

Columns

Types

Benefits

Whenever database changes,

AI immediately knows the new schema.

No code modification required.

---

# ragService.js

Purpose

Provide business knowledge.

Business knowledge

≠

Database schema.

Example

Schema

```
users
```

Business rule

```
Active users logged in within 30 days.
```

Vector Store contains

```
Recent users

Active users

High value customers
```

Workflow

```
Question

↓

Embeddings

↓

Similarity Search

↓

Top Documents

↓

Prompt
```

---

Current Vector Store

MemoryVectorStore

Future

pgvector

or

Pinecone

---

# repairService.js

Purpose

Automatically fix invalid SQL.

Instead of failing,

LLM receives

Question

Generated SQL

Database Error

Database Schema

and generates corrected SQL.

Pipeline

```
SQL Failed

↓

PostgreSQL Error

↓

Repair Prompt

↓

Groq

↓

Correct SQL

↓

Retry
```

Advantages

Greatly improves reliability.

---

# memory.js

Purpose

Store short-term conversation.

Current implementation

Redis

Stores

```
Session ID

↓

Messages
```

Example

```
User

Show all users

↓

Later

Only active ones
```

Redis remembers previous conversation.

---

# chatService.js

Purpose

Persist conversation.

Table

```
conversations
```

Stores

Session ID

Role

Content

SQL

Returned Data

Created Time

Functions

```
saveMessage()

getConversation()
```

---

# sessionService.js

Purpose

Manage chat sessions.

Table

```
chat_sessions
```

Functions

```
createSession()

getSessions()
```

Stores

Session ID

Title

Created Time

Used by

Sidebar.

---

# sqlUtils.js

Contains helper functions.

cleanSQL()

Removes

```
```sql

```

and extra formatting.

Prevents execution errors.

---

isSafeQuery()

Allows only

SELECT

Rejects

DROP

DELETE

UPDATE

INSERT

ALTER

TRUNCATE

etc.

Protects database.

---

# Database Tables

Business

```
users

orders
```

Application

```
chat_sessions

conversations
```

---

# Complete Backend Request Flow

```
React

↓

Axios

↓

POST /query

↓

queryRoutes.js

↓

chatService

↓

aiService

↓

schemaService

↓

memory

↓

ragService

↓

Groq

↓

cleanSQL

↓

isSafeQuery

↓

PostgreSQL

↓

repairService (optional)

↓

PostgreSQL

↓

saveMessage

↓

Response

↓

Frontend
```

---

# Environment Variables

Current

```
PORT

DB_HOST

DB_PORT

DB_USER

DB_PASSWORD

DB_NAME

REDIS_HOST

REDIS_PORT

GROQ_API_KEY
```

Future

```
OPENAI_API_KEY
```

for hosted embeddings.

---

# Common Errors Faced During Development

## Redis

Problem

```
ECONNREFUSED
```

Cause

Container attempted localhost.

Solution

```
REDIS_HOST=redis
```

---

## Ollama

Problem

```
Model not found
```

Solution

```
ollama pull
```

Later migrated to Groq.

---

## PostgreSQL

Problem

```
relation does not exist
```

Cause

Missing tables.

Solution

Create

```
chat_sessions

conversations
```

---

## Missing Column

Problem

```
column data does not exist
```

Solution

```
ALTER TABLE conversations
ADD COLUMN data JSONB;
```

---

# Future Improvements

- OpenAI Embeddings
- pgvector
- Authentication
- Export CSV
- Export PDF
- AI Insights
- Streaming Responses
- Query Analytics
- User Roles
- Database Connection Wizard