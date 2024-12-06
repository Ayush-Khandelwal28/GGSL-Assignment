import { Users } from 'lucide-react';

export function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-pulse flex items-center text-xl text-gray-600">
                <Users className="w-6 h-6 mr-2" />
                Loading users...
            </div>
        </div>
    );
}

