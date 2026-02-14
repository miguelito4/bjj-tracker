"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}` },
    });
    setLoading(false);
    if (!error) setSent(true);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#09090b", display: "flex",
      alignItems: "center", justifyContent: "center", padding: 20,
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <div style={{ width: "100%", maxWidth: 360, textAlign: "center" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fafafa", marginBottom: 4 }}>
          BJJ Tracker
        </h1>
        <p style={{ color: "#52525b", fontSize: 14, marginBottom: 32 }}>
          Log mat time. Track progress.
        </p>
        <p style={{ color: "#3f3f46", fontSize: 12, marginBottom: 32, lineHeight: 1.5 }}>
          Completely private. Your data is isolated at the database level. No tracking. No analytics. No ads.
        </p>
        {sent ? (
          <div style={{
            background: "#18181b", borderRadius: 14, padding: 24,
            border: "1px solid #27272a",
          }}>
            <p style={{ color: "#10b981", fontSize: 15, fontWeight: 600 }}>
              Check your email
            </p>
            <p style={{ color: "#71717a", fontSize: 13, marginTop: 8 }}>
              We sent a magic link to <strong style={{ color: "#a1a1aa" }}>{email}</strong>
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%", padding: "14px 16px", borderRadius: 12,
                border: "1px solid #27272a", background: "#18181b",
                color: "#fafafa", fontSize: 15, outline: "none",
                marginBottom: 12, boxSizing: "border-box",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: 14, borderRadius: 12, border: "none",
                background: "#3b82f6", color: "#fff", fontSize: 15,
                fontWeight: 600, cursor: "pointer", opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Sending..." : "Send Magic Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}