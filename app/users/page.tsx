import EmptyState from '@/components/EmptyState';
import { FC } from 'react'

const page: FC = () => {
  return (
    <div className='hidden lg:block lg:pl-80 h-full'>
      <EmptyState />
    </div>
  );
}

export default page