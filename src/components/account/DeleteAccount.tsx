import React from 'react';
import { useUser } from '@/hooks/useUser';

export function DeleteAccount() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { user } = useUser();

  async function handleDelete() {
    if (!user?.id) return;

    const confirmed = window.confirm(
      'Are you sure? This action cannot be undone.'
    );

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const response = await fetch('/api/account/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });

      if (!response.ok) throw new Error('Failed to delete account');

      // Redirect to home
      window.location.href = '/';
    } catch (error) {
      console.error('Delete account error:', error);
      alert('Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="border-t mt-8 pt-8">
      <h3 className="text-lg font-medium text-red-600 mb-4">
        Delete Account
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        Once you delete your account, all of your data will be permanently removed.
        This action cannot be undone.
      </p>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
      >
        {isDeleting ? 'Deleting...' : 'Delete Account'}
      </button>
    </div>
  );
}