'use client';

import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react'

interface DesktopItemProps {
  label: string;
  icon: LucideIcon;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: FC<DesktopItemProps> = ({label, icon: Icon, href, onClick, active}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return <li onClick={handleClick}>
    <Link href={href} className={clsx('group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-slate-500 hover:text-cyan-600 hover:bg-slate-100', active && 'text-cyan-600 bg-slate-100')}>
      <Icon className='h-6 w-6 shrink-0' />
      <span className='sr-only'>{label}</span>
    </Link>
  </li>
}

export default DesktopItem