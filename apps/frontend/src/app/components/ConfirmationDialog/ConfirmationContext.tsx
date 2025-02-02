import { createContext, useContext, useState, ReactNode } from 'react';
import { ConfirmationDialog } from './ConfirmationDialog';

type ConfirmationContextType = {
  confirm: (title: string, message: string) => Promise<boolean>;
};

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(
  undefined
);

export const ConfirmationProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmationState, setConfirmationState] = useState<{
    title: string;
    message: string;
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = (title: string, message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmationState({ title, message, resolve });
      setIsOpen(true);
    });
  };

  const handleConfirm = () => {
    if (confirmationState) {
      confirmationState.resolve(true);
      setIsOpen(false);
      setConfirmationState(null);
    }
  };

  const handleCancel = () => {
    if (confirmationState) {
      confirmationState.resolve(false);
      setIsOpen(false);
      setConfirmationState(null);
    }
  };

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}
      {confirmationState && (
        <ConfirmationDialog
          isOpen={isOpen}
          title={confirmationState.title}
          message={confirmationState.message}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ConfirmationContext.Provider>
  );
};

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error(
      'useConfirmation must be used within a ConfirmationProvider'
    );
  }
  return context;
};
