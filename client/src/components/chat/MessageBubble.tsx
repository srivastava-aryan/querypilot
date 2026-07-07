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
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs tracking-[0.22em] border shadow-sm
        ${isUser ? "bg-orange-500/15 border-orange-400/40 text-orange-100" : "bg-emerald-500/15 border-emerald-400/40 text-emerald-100"}`}
        >
          {isUser ? "U" : "AI"}
        </div>

        <div
          className={`rounded-2xl px-5 py-4 shadow-lg transition duration-300 hover:shadow-[0_0_24px_rgba(249,115,22,0.10)] ${
            isUser
              ? "border border-orange-400/30 bg-white/[0.04] text-zinc-50"
              : "border border-zinc-800 bg-[#0f0f0f] text-zinc-100"
          }`}
        >
          <p className="whitespace-pre-wrap leading-relaxed text-[0.98rem]">{content}</p>

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
