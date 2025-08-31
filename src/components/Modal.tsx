import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';

interface ModalProps {
    title: ReactNode;
    isOpen: boolean;
    showCloseIcon?: boolean;
    onClose: () => void;
    children: ReactNode;
}

function Modal({ title, isOpen, onClose, children, showCloseIcon = false }: ModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const handleClose = () => {
        if (onClose) onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
            onClick={handleClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                {showCloseIcon && (
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                        aria-label="Close"
                    >
                        <X className="h-6" />
                    </button>
                )}
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
                <div>{children}</div>
            </div>
        </div>
    );
}

export default Modal;
