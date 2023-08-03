import { Loader2 } from "lucide-react";
import { FC } from "react";
import type { IconType } from "react-icons";
import { Button } from "./ui/Button";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
  disabled?: boolean;
}

const AuthSocialButton: FC<AuthSocialButtonProps> = ({ icon: Icon, onClick, disabled }) => {
  return (
    <Button variant='outline' onClick={onClick} disabled={disabled} className="inline-flex w-full">
      <Icon />
    </Button>
  );
};

export default AuthSocialButton;
