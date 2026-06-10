"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootPortal() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/th/");
  }, [router]);

  return (
    <div className="layout-container" style={{ padding: "2.5rem 1rem", textAlign: "center" }}>
      <p style={{ marginBottom: "1rem" }}>Redirecting to Thai…</p>
      <p>
        <Link href="/th/">ไทย (Thai)</Link>
        {" · "}
        <Link href="/en/">English</Link>
      </p>
    </div>
  );
}
