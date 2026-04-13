'use client';

import { useState } from 'react';

import { CreditCard } from 'lucide-react';
// import Button from '../Button'; 
import { PaymentModal } from './PaymentModal';
import { WebhookInfo } from './WebhookInfo';
import { Button } from './ui/Button';

export default function Payment() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
              <CreditCard className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white text-balance">
            Modern Payment Flow
          </h1>
          <p className="text-lg text-gray-400 text-balance">
            A beautiful, multi-step payment modal with wallet and PayPal integration
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: '💰',
              title: 'Amount Input',
              description: 'Easily specify the payment amount with validation',
            },
            {
              icon: '💳',
              title: 'Multiple Methods',
              description: 'Choose between wallet or PayPal payment options',
            },
            {
              icon: '✅',
              title: 'Confirmation',
              description: 'Real-time transaction verification and receipts',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 backdrop-blur-xl transition-all duration-300 space-y-3"
            >
              <div className="text-3xl">{feature.icon}</div>
              <h3 className="font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="flex flex-col items-center gap-6 pt-8">
          <Button
            onClick={() => setIsPaymentModalOpen(true)}
            className="px-8 py-3 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-900/50 transition-all duration-300 transform hover:scale-105"
          >
            <CreditCard className="w-5 h-5" />
            Open Payment Modal
          </Button>
          <p className="text-sm text-gray-500">Click the button above to test the payment flow</p>
        </div>

        {/* Demo Info */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-white mb-4">Demo Credentials</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Wallet Balance:</span>
              <span className="font-mono text-cyan-400">₦5,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Contract ID:</span>
              <span className="font-mono text-cyan-400">23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">API Endpoint:</span>
              <span className="font-mono text-cyan-400 text-xs">
                adron.microf10.sg-host.com/api/user/pay-for-contract
              </span>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 mt-4">
            <p className="text-xs text-gray-500">
              Try entering an amount greater than ₦5,000 to see the insufficient wallet balance alert, which suggests using PayPal instead.
            </p>
          </div>
        </div>

        {/* Webhook Info */}
        <WebhookInfo />
      </div>

      {/* Payment Modal */}
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} contractId={23} userEmail='john@gmial.com'/>
    </main>
  );
}
