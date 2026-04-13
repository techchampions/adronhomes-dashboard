'use client';

// import { Card } from '@/components/ui/card';
import { AlertCircle, Webhook } from 'lucide-react';
import { Card } from './ui/Card';

export function WebhookInfo() {
  return (
    <div className="space-y-4 mt-8">
      <div className="flex items-start gap-3">
        <Webhook className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-gray-900">paystack Webhook Integration</h3>
          <p className="text-sm text-gray-600 mt-1">
            This payment flow includes a realistic paystack webhook simulation. When you select paystack and approve the payment:
          </p>
          <ul className="text-sm text-gray-600 mt-3 space-y-2 ml-4">
            <li>✓ You'll be redirected to a paystack approval screen</li>
            <li>✓ After approval, a webhook notification is sent to <code className="bg-gray-100 px-2 py-1 rounded text-xs">/api/webhooks/paystack</code></li>
            <li>✓ The webhook confirms the payment and triggers success state</li>
            <li>✓ The API call to your payment endpoint includes the paystack approval code</li>
          </ul>
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200 p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-blue-900">For Production:</p>
            <p className="text-blue-700 mt-1">
              Replace the webhook simulation with real paystack API calls using the paystack SDK. The webhook endpoint will receive actual paystack IPN (Instant Payment Notification) events.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
