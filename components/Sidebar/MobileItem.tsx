"use client";

import clsx from "clsx";
import { Link, LucideIcon } from "lucide-react";
import { FC } from "react";

interface MobileItemProps {
  label: string;
  icon: LucideIcon;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem: FC<MobileItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
        href={href}
        onClick={handleClick}
        className={clsx(
          "group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-slate-500 hover:text-cyan-600 hover:bg-slate-100",
          active && "text-cyan-600 bg-slate-100"
        )}
      >
        <Icon className="h-6 w-6" />
        as
      </Link>
  );
};

export default MobileItem;
