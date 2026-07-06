import groq from "../config/groq.js";

export async function repairSQL({
  question,
  failedSQL,
  errorMessage,
  schema,
}) {
  const prompt = `
You are a PostgreSQL SQL repair assistant.

Database Schema:
${schema}

User Question:
${question}

Failed SQL:
${failedSQL}

Database Error:
${errorMessage}

Fix the SQL query.

Rules:
- Return ONLY valid PostgreSQL SQL.
- Do NOT include explanations.
- Do NOT use markdown.
- Preserve the user's intent.
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content.trim();
}