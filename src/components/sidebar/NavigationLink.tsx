import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const linkClass =
  "flex items-center gap-1.5 py-1.5 hover:text-orange-600 group truncate";
const linkActiveClass = cn(
  linkClass,
  "text-orange-600 font-medium [&_svg]:text-orange-600"
);
const linkInActiveClass = cn(linkClass, "text-slate-600");

interface NavigationLinkProps {
  icon: JSX.Element;
  to: string;
  label: string;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  icon,
  to,
  label,
}) => {
  const iconClass =
    "h-5 w-5 text-slate-400 group-hover:text-orange-600 shrink-0";
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? linkActiveClass : linkInActiveClass
      }
      to={to}
    >
      {React.cloneElement(icon, { className: iconClass })}
      <span>{label}</span>
    </NavLink>
  );
};
