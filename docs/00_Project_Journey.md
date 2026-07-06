# AI SQL Agent

> Personal Engineering Documentation

---

# Project Overview

AI SQL Agent is a full-stack AI-powered analytics platform that allows users to query a PostgreSQL database using natural language.

Instead of writing SQL manually, users ask questions such as:

> Show all users created this month

or

> Top 5 customers by spending

The system converts natural language into PostgreSQL queries using an LLM, executes the SQL safely, and visualizes the results with tables and charts.

---

# Goals

This project was built to:

- Learn modern AI engineering
- Learn Agentic AI workflows
- Learn Retrieval Augmented Generation (RAG)
- Build a production-quality full stack application
- Learn Docker
- Learn Redis
- Learn PostgreSQL
- Learn LangChain
- Build a portfolio project worthy of internships/full-time roles

---

# Initial Tech Stack

Frontend

- React
- Vite
- Tailwind CSS
- Chart.js
- Axios

Backend

- Node.js
- Express.js

Database

- PostgreSQL

AI

- Ollama
- Llama3
- nomic-embed-text

Caching

- Redis

RAG

- LangChain
- MemoryVectorStore

---

# Current Tech Stack

Frontend

- React
- TypeScript
- Tailwind CSS
- Chart.js

Backend

- Node.js
- Express

Database

- PostgreSQL

AI

- Groq
- Llama 3.3 70B

Embeddings

(Currently migrating from Ollama embeddings)

RAG

- LangChain
- MemoryVectorStore

Caching

- Redis

Containerization

- Docker
- Docker Compose

---

# Project Timeline

## Phase 1

Created a basic React UI.

Added:

- Query input
- SQL preview
- Result table
- Charts

---

## Phase 2

Connected frontend with backend.

Created

POST

/api/query

Pipeline

User

↓

Backend

↓

Ollama

↓

SQL

↓

PostgreSQL

↓

Frontend

---

## Phase 3

Added SQL cleaning.

Removed:

- markdown
- code fences
- unwanted tokens

before executing SQL.

---

## Phase 4

Added SQL safety validation.

Allowed only:

SELECT

Rejected:

DROP

DELETE

UPDATE

ALTER

INSERT

etc.

---

## Phase 5

Added SQL Repair Agent.

If generated SQL fails,

the repair agent:

reads

- failed SQL
- schema
- database error

and asks the LLM to repair it automatically.

---

## Phase 6

Added RAG.

Business knowledge became searchable.

Examples:

Active users

High value customers

Recent users

Instead of hardcoding these into prompts.

---

## Phase 7

Added Conversation Memory.

The AI now remembers previous user questions during the current session.

Memory stored in Redis.

---

## Phase 8

Added Chat History.

Created tables:

chat_sessions

conversations

Each conversation is permanently stored.

Features:

- previous chats
- history loading
- session switching

---

## Phase 9

Frontend became ChatGPT-style.

Old UI

Question

↓

SQL

↓

Table

New UI

User

↓

Assistant

↓

SQL

↓

Table

↓

Charts

↓

History

---

## Phase 10

Added Sidebar.

Features

- Chat sessions
- New Chat
- Session switching

---

## Phase 11

Dockerization

Containerized:

Frontend

Backend

PostgreSQL

Redis

Removed dependency on locally installed services.

---

## Phase 12

Migrated LLM.

Old

Ollama

↓

Llama3

New

Groq API

↓

Llama 3.3 70B

Reason

- production ready
- much faster
- cloud hosted
- deployable

---

# Major Bugs Solved

Redis

Problem

ECONNREFUSED

Reason

Redis client was connecting to localhost.

Solution

Connect using Docker hostname.

---

Ollama

Problem

ECONNREFUSED

Reason

Container tried localhost.

Solution

host.docker.internal

then later

migrated to Groq.

---

Docker Networking

Learned

Inside Docker,

localhost

is NOT the host machine.

Use

postgres

redis

backend

service names.

---

Database

Created tables

chat_sessions

conversations

users

orders

---

Current Features

✔ Natural language SQL

✔ SQL Repair

✔ SQL Safety

✔ PostgreSQL

✔ Redis Memory

✔ Chat Sessions

✔ Chat History

✔ SQL Preview

✔ Charts

✔ Docker

✔ Groq

✔ RAG

---

Current Status

Project works locally.

Runs inside Docker.

Uses Groq for SQL generation.

Currently migrating embeddings away from Ollama.

---

Next Planned Features

- Hosted Embeddings
- AI Insight Layer
- Export CSV
- Export PDF
- Dashboard Cards
- Authentication
- pgvector
- Production Deployment
- Portfolio Website Integration

---

Lessons Learned

This project taught:

React

Express

Redis

PostgreSQL

Docker

LangChain

LLMs

Prompt Engineering

RAG

Session Management

Caching

Container Networking

AI Application Architecture

Production Migration

Full Stack Development

Agentic AI
