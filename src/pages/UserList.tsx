import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Users } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { UserCard } from '../components/UserCard';
import { Pagination } from '../components/Pagination';
import { UserEditModal } from '../components/UserEditModal';
import { Loading } from '../components/Loading';
import { getUsers, deleteUser } from '../services/users';
import { User } from '../types/user';
import { useDebounce } from '../hooks/useDebounce';
import { useUI } from '../hooks/useUI';

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { openModal } = useUI();
  const fetchUsers = async (page: number) => {
    try {
      const response = await getUsers(page);
      setUsers(response.data);
      setTotalPages(response.total_pages);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const searchTerm = debouncedSearch.toLowerCase();
      return (
        user.first_name.toLowerCase().includes(searchTerm) ||
        user.last_name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredUsers(filtered);
  }, [users, debouncedSearch]);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUsers(users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    ));
  };


  function handleEdit(user: User) {
    openModal(<UserEditModal user={user} onUpdate={handleUserUpdate} />);
  }

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center mb-4 sm:mb-0">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          </div>
          <div className="w-full sm:w-72">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No users found matching your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}