import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import Header from '../Header';
import { X } from 'lucide-react';

type Props = {
    children: ReactNode;
    isOpen: boolean;
    name: string;
    onClose: () => void;
}

const Modal = ({ children, isOpen, name, onClose }: Props) => {

    if (!isOpen) return null;

    return (
        ReactDOM.createPortal(
            <div className='fixed inset-0 flex size-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4'>
                <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secondary">
                    <Header name={name} buttonComponent={
                        <button
                            onClick={onClose}
                            className='flex size-7 items-center justify-center rounded-full bg-blue-primary text-white hover:bg-blue-600'>
                            <X size={18} />
                        </button>
                    }
                        isSmallText
                    />
                    {children}
                </div>
            </div>,
            document.body
        )
    )
}

export default Modal