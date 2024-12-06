import { Pencil, Trash2, Mail } from 'lucide-react';
import { Button } from './Button';
import { User } from '../types/user';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">
          {user.first_name} {user.last_name}
        </h3>
        <div className="flex items-center mt-2 text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          <a href={`mailto:${user.email}`} className="text-sm hover:text-blue-600">
            {user.email}
          </a>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button
            variant="secondary"
            onClick={() => onEdit(user)}
            className="flex-1 flex items-center justify-center"
          >
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => onDelete(user.id)}
            className="flex-1 flex items-center justify-center"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}