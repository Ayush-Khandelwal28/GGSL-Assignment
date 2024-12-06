import { X } from "lucide-react";
import { useUI } from "../hooks/useUI";

export default function ModalContainer({ children }: { children: React.ReactNode }) {
    const { closeModal } = useUI();

    return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Edit User</h2>
                <button onClick={closeModal}>
                    <X className="w-6 h-6" />
                </button>
            </div>
            {children}
        </div>
    </div>

}