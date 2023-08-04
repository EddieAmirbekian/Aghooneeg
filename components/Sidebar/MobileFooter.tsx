"use client";

import useConversation from "@/app/hooks/use-conversation";
import useRoutes from "@/app/hooks/use-routes";
import { FC } from "react";
import MobileItem from "./MobileItem";

interface MobileFooterProps {}

const MobileFooter: FC<MobileFooterProps> = ({}) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      {routes.map((item) => (
        <MobileItem key={item.label} {...item} />
      ))}
    </div>
  );
};

export default MobileFooter;
