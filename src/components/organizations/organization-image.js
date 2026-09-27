"use client";
import { useState } from "react";
export function safeHttpsUrl(value) {
  try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password ? url.href : null; } catch { return null; }
}
export default function OrganizationImage({ src, name, cover = false }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const url = safeHttpsUrl(src);
  const style = cover ? "organization-cover-image" : "organization-logo-image";
  if (!url || failedSrc === src) return <div aria-hidden="true" className={`${style} image-placeholder`}>{cover ? <span className="cover-orbit" /> : (name?.trim().slice(0,2).toUpperCase() || "AG")}</div>;
  // Imágenes externas sin proxy de servidor; únicamente HTTPS.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt={cover ? "" : `Logo de ${name}`} loading="lazy" referrerPolicy="no-referrer" onError={() => setFailedSrc(src)} className={style} />;
}
