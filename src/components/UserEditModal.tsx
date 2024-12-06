import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button, ButtonProps } from './Button';
import { Input } from './Input';
import { User } from '../types/user';
import { updateUser } from '../services/users';
import { useUI } from '../hooks/useUI';
import ModalContainer from './ModalContainer';

interface UserEditModalProps {
  user: User;
  onUpdate: (user: User) => void;
}


export function UserEditModal({ user, onUpdate }: UserEditModalProps) {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { closeModal } = useUI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedUser = await updateUser(user.id, formData);
      onUpdate({ ...user, ...updatedUser });
      toast.success('User updated successfully');
      closeModal();
    } catch (error) {
      toast.error('Failed to update user');
    } finally {
      setIsLoading(false);
    }
  };

  const formFields = [
    { label: 'First Name', value: formData.first_name, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, first_name: e.target.value }), type: 'text' },
    { label: 'Last Name', value: formData.last_name, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, last_name: e.target.value }), type: 'text' },
    { label: 'Email', value: formData.email, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value }), type: 'email' },
  ];

  const buttonFields: ButtonProps[] = [
    { type: 'button', variant: 'secondary', onClick: closeModal, children: 'Cancel' },
    { type: 'submit', isLoading, children: 'Save Changes' }
  ]

  return (
    <ModalContainer>
      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map((field, index) => {
          return (
            <Input
              key={index}
              label={field.label}
              value={field.value}
              onChange={field.onChange}
              type={field.type}
            />
          );
        })}
        <div className="flex justify-end space-x-2">
          {buttonFields.map((field, index) => {
            return <Button key={index} {...field} />;
          })}
        </div>
      </form>
    </ModalContainer>
  );
}