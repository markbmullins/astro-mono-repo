const local = false;
export const SUPABASE_URL = local
  ? "http://localhost:54321/functions/v1/"
  : "https://zcggmtksshovycoelytf.supabase.co/functions/v1";

export const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  Authorization: `Bearer ${import.meta.env.PUBLIC_SUPABASE_KEY}`,
};
