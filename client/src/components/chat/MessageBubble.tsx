import SQLPreview from "../sql/SQLPreview";
import ResultTable from "../table/ResultTable";
import ChartRenderer from "../charts/ChartRenderer";
import { canRenderChart } from "../../utils/chartUtils";
import { motion } from "framer-motion";

interface Props {
  role: "user" | "assistant";
  content: string;
  sql?: string;
  data?: Record<string, any>[];
}

const MessageBubble = ({ role, content, sql, data }: Props) => {
  const isUser = role === "user";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex mb-6 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-4xl flex gap-3 ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
        ${isUser ? "bg-blue-600" : "bg-emerald-600"}`}
        >
          {isUser ? "U" : "AI"}
        </div>

        {/* Bubble */}
        <div
          className={`rounded-2xl px-5 py-4 shadow-lg ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-slate-900 border border-slate-700 text-slate-100"
          }`}
        >
          <p className="whitespace-pre-wrap">{content}</p>

          {sql && (
            <div className="mt-4">
              <SQLPreview sql={sql} />
            </div>
          )}

          {data && data.length > 0 && (
            <>
              <div className="mt-4">
                <ResultTable data={data} />
              </div>

              {canRenderChart(data) && (
                <div className="mt-6">
                  <ChartRenderer data={data} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
