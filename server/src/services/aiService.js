// import { schema } from "../utils/schema.js";
import { getDatabaseSchema } from "./schemaService.js";
import { getMemory } from "../utils/memory.js";
import { retrieveContext } from "./ragService.js";
import groq from "../config/groq.js";

export async function generateSQL(query, sessionId) {
  const context = await retrieveContext(query);
  const schema = await getDatabaseSchema();
  console.log("[generateSQL] Retrieved schema:", schema);
  const history = (await getMemory(sessionId))
    .map((msg) => `User: ${msg}`)
    .join("\n");
  const prompt = `
You are an expert SQL generator.

Database Schema:
${schema}

Business Context:
${context}

Conversation History:
${history}

Rules:
- Only generate PostgreSQL SQL syntax
- Do not use MySQL functions like DATE_SUB
- Only generate SQL
- No explanations
- Use only provided schema information

User Query:
"${query}"
`;

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    model: "llama-3.3-70b-versatile",

    temperature: 0,
  });

  const sql = completion.choices[0].message.content;

  console.log("[generateSQL] Groq SQL:", sql);

  return sql;
}

//This code defines the generateSQL function, which takes a natural language query as input,
//constructs a prompt for the Ollama API to convert it into a SQL query, and then makes a POST request to the Ollama API.
//It handles the response, checks for errors, and returns the generated SQL query.
