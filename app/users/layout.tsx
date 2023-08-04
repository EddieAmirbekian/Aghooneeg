import Sidebar from "@/components/Sidebar/Sidebar";
import { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = async ({ children }) => {
  return <Sidebar><div className="h-full">Sidebar</div></Sidebar>
};

export default layout;
