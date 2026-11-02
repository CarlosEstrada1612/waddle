"use client";
import { safeHttpsUrl } from "./organization-image";
import Icon from "./icon";
export default function MemberLink({ url, name }) {
  const href = safeHttpsUrl(url);
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" className="member-link" aria-label={`Abrir perfil de ${name} en otra pestaña`}>Ver perfil <Icon name="link" /></a> : null;
}
