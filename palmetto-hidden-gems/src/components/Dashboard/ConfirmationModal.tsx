import React from "react";
import { Modal } from "@components/Modal/Modal.tsx";
import styles from "./confirmation-modal.module.css";
interface ConfirmationModalProps {
  header: string;
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

export const ConfirmationModal = ({
  header,
  onClose,
  isOpen,
  children,
}: ConfirmationModalProps) => {
  return (
    <Modal header={header} onClose={onClose} isOpen={isOpen}>
      <div className={styles.modalContent}>{children}</div>
    </Modal>
  );
};
