import { useSubscription } from '@/hooks/useSubscription';
import { useUser } from '@/hooks/useUser';

export default function BillingPage() {
  const { user } = useUser();
  const { subscription } = useSubscription(user?.id);

  async function handlePortalAccess() {
    const response = await fetch('/api/billing/portal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.id })
    });

    const { url } = await response.json();
    window.location.href = url;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Billing & Subscription</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Current Plan</h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">{subscription?.tier.toUpperCase()}</p>
            <p className="text-sm text-gray-500">
              Next billing date: {new Date(subscription?.currentPeriodEnd || '').toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={handlePortalAccess}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Manage Subscription
          </button>
        </div>
      </div>
    </div>
  );
}