import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { businessRules } from "../data/businessRules.js"; 

let vectorStore;

export async function initVectorStore() {
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-embedding-001",
  });

  vectorStore = await MemoryVectorStore.fromTexts(
    businessRules,
    businessRules.map((_, i) => ({ id: i+1 })),
    embeddings
  );

  console.log("✅ Gemini Vector store initialized");
}

export async function retrieveContext(query) {
  const results = await vectorStore.similaritySearch(query, 2);

  return results.map((doc) => doc.pageContent).join("\n");
}