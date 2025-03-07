import { useEffect, useRef, type ReactNode } from "react";
import ReactDOM from "react-dom";
import "./modal.css";

interface Props {
  children: ReactNode;
  header: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ children, header, isOpen, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Create a div to render the modal
  const modalRoot = document.getElementById("modal-root") || document.body;

  useEffect(() => {
    if (isOpen) {
      // Save the element that was focused before the modal was opened
      previouslyFocusedElement.current = document.activeElement as HTMLElement;

      // Prevent background scrolling
      document.body.style.overflow = "hidden";

      // Add event listeners
      document.addEventListener("keydown", handleKeyDown);

      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus();
      }

      return () => {
        // Cleanup
        document.body.style.overflow = "auto";
        document.removeEventListener("keydown", handleKeyDown);
        // Return focus to the previously focused element
        if (previouslyFocusedElement.current) {
          previouslyFocusedElement.current.focus();
        }
      };
    }
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }

    // Handle focus trapping
    if (e.key === "Tab" && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    }
  };

  // If user clicks background overlay, close modal
  function handleOverlayClick(e: any) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  const modalContent = (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <div className="header-row">
              <h2>{header}</h2>
              <button className="close-btn" onClick={onClose}>
                ×
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      )}
    </>
  );

  return modalRoot
    ? ReactDOM.createPortal(modalContent, modalRoot)
    : modalContent;
}
