"use client";

import Modal from "@/components/Modal";
import Image from "next/image";
import { FC } from "react";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image className="object-cover" fill src={src} alt="image" />
      </div>
    </Modal>
  );
};

export default ImageModal;
