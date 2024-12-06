import { createContext, useState, ReactNode, useCallback } from 'react';

interface UIContextProps {
    modal: ReactNode;
    openModal: (modal: ReactNode) => void;
    closeModal: () => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {

    const [modal, setModal] = useState<ReactNode>();
    const [isLoading, setIsLoading] = useState(false);

    const openModal = useCallback((modal: ReactNode) => {
        setModal(modal);
    }, []);

    const closeModal = useCallback(() => {
        setModal(undefined);
    }, []);

    return (
        <UIContext.Provider value={{ modal, openModal, closeModal, isLoading, setIsLoading }}>
            {children}
        </UIContext.Provider>
    );
};

