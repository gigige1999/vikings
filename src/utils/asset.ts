/**
 * Resolve a public/ asset path (a leading-slash path inside public/) against the deploy base URL,
 * so images load both at a domain root and under a sub-path such as /vikings/.
 */
export function asset(path: string): string {
  if (!path || /^(https?:|data:|blob:)/.test(path)) return path;
  const base = import.meta.env.BASE_URL || "/";
  return base.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
}
