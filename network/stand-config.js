// Public endpoint only. Never put TURN credentials or tokens in this file.
// Set the actual deployed Worker URL after Cloudflare returns its workers.dev host.
// Empty is deliberately fail-closed; the production signaling URL is not a fallback.
export const SIGNAL_SERVER = "";
