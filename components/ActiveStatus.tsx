"use client";

import useActiveChannel from '@/app/hooks/use-active-channel';
import { FC } from 'react'

const ActiveStatus: FC = () => {
  useActiveChannel();
  return null;
}

export default ActiveStatus