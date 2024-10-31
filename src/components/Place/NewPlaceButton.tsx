import NewPlaceForm from './NewPlaceForm.tsx';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { PlusIcon } from 'lucide-react';

export function NewPlaceButton() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center"
                onClick={() => setShowModal(true)}
                aria-haspopup="dialog"
                aria-expanded={showModal}
            >
                <PlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                <span>Add New Place</span>
            </button>
            {showModal &&
                createPortal(
                    <div
                        role="dialog"
                        aria-modal="true"
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    >
                        <NewPlaceForm onClose={() => setShowModal(false)} />
                    </div>,
                    document.body
                )}
        </>
    );
}
