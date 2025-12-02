import React from "react";
import Link from "next/link";

interface AlertInfoProps {
  message: string;
  linkText?: string;
  linkHref?: string;
  icon?: React.ReactNode;
  color?: string;
}

export default function AlertInfo({ message, linkText, linkHref, icon = "ℹ️", color = "#3a94e7" }: AlertInfoProps) {
  return (
    <div
      style={{
        background: `${color}15`,
        border: `1px solid ${color}55`,
        borderRadius: 8,
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 15,
        margin: "8px 0"
      }}
      className="alert-info"
    >
      <span style={{ fontSize: 22, color }}>{icon}</span>
      <span style={{ flex: 1 }}>
        {message}
        {linkText && linkHref && (
          <>
            {" "}
            <Link href={linkHref} style={{ color, textDecoration: "underline", fontWeight: 500 }}>
              {linkText}
            </Link>
          </>
        )}
      </span>
    </div>
  );
}
