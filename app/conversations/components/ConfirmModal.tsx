import useConversation from "@/app/hooks/use-conversation";
import { useToast } from "@/app/hooks/use-toast";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() =>
        toast({
          description: "Something went wrong!",
          variant: "destructive",
        })
      )
      .finally(() => setIsLoading(false));
  }, [conversationId, onClose, router, toast]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 justify-center items-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-slate-900"
          >
            Delete Conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-slate-500">
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
        <Button disabled={isLoading} variant="destructive" onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
