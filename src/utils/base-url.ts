import { env } from "~/env";

export const getBaseUrl = () => {
  if (env.NEXT_PUBLIC_PRODUCTION_URL) return env.NEXT_PUBLIC_PRODUCTION_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};
