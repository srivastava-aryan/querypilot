export const canRenderChart = (data: Record<string, any>[]) => {
  if (!data.length) return false;

  const sample = data[0];
  const values = Object.values(sample);

  const hasLabel = values.some((v) => typeof v === "string");
  const hasNumericLike = values.some((v) => {
    if (typeof v === "number") return true;
    if (typeof v === "string" && v.trim() !== "") {
      return !Number.isNaN(Number(v));
    }
    return false;
  });

  return hasLabel && hasNumericLike;
};