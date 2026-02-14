"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BJJTracker from "@/components/BJJTracker";

export default function HomePage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return (
    <div style={{
      minHeight: "100vh", background: "#09090b",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ color: "#52525b" }}>Loading...</div>
    </div>
  );

  if (!session) {
    if (typeof window !== "undefined") window.location.href = "/auth";
    return null;
  }

  return <BJJTracker />;
}