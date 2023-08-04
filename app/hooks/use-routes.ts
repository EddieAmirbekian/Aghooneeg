import { usePathname } from "next/navigation";
import useConversation from "./use-conversation";
import { useMemo } from "react";
import { LogOut, MessageCircle, Users } from "lucide-react";
import { signOut } from "next-auth/react";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: MessageCircle,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: Users,
        active: pathname === "/users",
      },
      {
        label: "Log out",
        href: "#",
        onClick: () => signOut(),
        icon: LogOut,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
