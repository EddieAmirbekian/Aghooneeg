import Sidebar from "@/components/Sidebar/Sidebar";
import { FC } from "react";
import getUsers from "../actions/getUsers";
import { User } from "@prisma/client";
import UserList from "./components/UserList";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = async ({ children }) => {
  const users = await getUsers() as User[];
  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
};

export default layout;
