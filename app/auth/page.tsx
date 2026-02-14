"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        window.location.href = "/";
      }
    });

    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "#09090b",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <p style={{ color: "#71717a", fontSize: 15 }}>Signing you in...</p>
    </div>
  );
}