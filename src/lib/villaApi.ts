export const SUPA = "https://dclonxvipkzcujrrtppu.supabase.co/functions/v1";
export const ANON = "sb_publishable_JIaXygHUQe367f0kpaF9Hg_Gwpeqh5l";
export const BIEN = "villa-reve-dazur";

export const baseHeaders = {
  apikey: ANON,
  "Content-Type": "application/json",
};

export async function publicGet<T>(path: string): Promise<{ status: number; data: T }> {
  const res = await fetch(`${SUPA}${path}`, { headers: baseHeaders });
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { status: res.status, data: data as T };
}

export async function publicPost<T>(
  path: string,
  body: unknown,
): Promise<{ status: number; data: T }> {
  const res = await fetch(`${SUPA}${path}`, {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify(body),
  });
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { status: res.status, data: data as T };
}

export async function adminCall<T>(
  key: string,
  body: Record<string, unknown>,
): Promise<{ status: number; data: T }> {
  const res = await fetch(`${SUPA}/admin`, {
    method: "POST",
    headers: {
      apikey: ANON,
      "Content-Type": "application/json",
      "x-admin-key": key,
    },
    body: JSON.stringify(body),
  });
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { status: res.status, data: data as T };
}

export const ADMIN_KEY_STORAGE = "villa_admin_key";
