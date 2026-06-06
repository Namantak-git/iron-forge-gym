'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ShieldCheck, Flame, Droplets, Brain, QrCode, X } from 'lucide-react';
import QRCode from 'qrcode';

export default function MemberOverview() {
  const [waterCount, setWaterCount] = useState(750); // in ml
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrSrc, setQrSrc] = useState('');
  const [aiTip, setAiTip] = useState('Generating recommendations...');

  useEffect(() => {
    // Generate access token QR code
    QRCode.toDataURL('member-access-token-john-doe-123')
      .then((url) => setQrSrc(url))
      .catch((err) => console.error(err));

    // Simple delay for AI suggestion effect
    setTimeout(() => {
      setAiTip(
        'Based on your target of gaining 5kg muscle: Ensure you consume 150g protein today and focus on progressive overload on your upcoming Day 3 Legs squat set.'
      );
    }, 1500);
  }, []);

  const addWater = () => {
    setWaterCount((prev) => prev + 250);
  };

  return (
    <DashboardLayout role="member">
      {/* Top Banner and Quick QR trigger */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Membership Info */}
        <Card className="md:col-span-2 relative flex flex-col justify-between border border-primary/20 glow-border-red" hoverable={false}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full filter blur-2xl pointer-events-none" />
          <div>
            <span className="text-[10px] bg-primary/20 text-primary border border-primary/30 font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
              Active Gold Member
            </span>
            <h3 className="text-2xl font-black text-white uppercase mt-4">Gold Quarterly Plan</h3>
            <p className="text-neutral-400 text-xs mt-1">Valid till Sept 05, 2026 • 91 Days Remaining</p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center space-x-2 text-neutral-300 text-xs">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Assigned Personal Coach: <strong>Alex Mercer</strong></span>
          </div>
        </Card>

        {/* QR Access Token Box */}
        <Card className="text-center flex flex-col justify-center items-center border" hoverable={true}>
          <QrCode className="h-12 w-12 text-primary mb-4" />
          <h4 className="font-bold text-white uppercase tracking-wider text-sm">Gym Access Key</h4>
          <p className="text-neutral-500 text-xs mt-1">Scan this at the front desk to log check-in</p>
          <Button variant="primary" size="sm" className="mt-4" onClick={() => setShowQrModal(true)}>
            View Code
          </Button>
        </Card>
      </div>

      {/* Tracker Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Water Intake Tracker */}
        <Card hoverable={false} className="relative border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Hydration Monitor</h3>
              <p className="text-xs text-neutral-500">Target intake: 3000ml (3.0 L)</p>
            </div>
            <Droplets className="h-5 w-5 text-sky-400 animate-bounce" />
          </div>

          <div className="text-center py-6">
            <div className="text-4xl font-black text-sky-400">{waterCount} <span className="text-sm text-neutral-500 font-semibold">ml</span></div>
            <div className="mt-2 text-xs text-neutral-500 font-semibold uppercase">{(waterCount / 3000 * 100).toFixed(0)}% of daily quota</div>
          </div>

          <Button variant="glass" fullWidth className="border-sky-500/20 text-sky-400 hover:bg-sky-500/10" onClick={addWater}>
            Add 250ml cup
          </Button>
        </Card>

        {/* AI Recommendations */}
        <Card hoverable={false} className="relative border border-white/5">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">AI Fitness Coach</h3>
          </div>
          <div className="p-4 bg-neutral-900/80 border border-white/5 rounded-lg text-sm leading-relaxed text-neutral-300">
            {aiTip}
          </div>
          <div className="mt-4 text-[10px] text-neutral-500 uppercase tracking-widest font-semibold text-center">
            Updated instantly based on your current stats log.
          </div>
        </Card>
      </div>

      {/* QR Code Modal Drawer */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="glass-card max-w-sm w-full p-8 border border-white/10 rounded-xl relative text-center">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-black text-white uppercase tracking-wider mb-2">Access QR Code</h3>
            <p className="text-neutral-400 text-xs mb-6">Hold this code in front of the scanner at entrance.</p>
            {qrSrc && (
              <img src={qrSrc} alt="Gym entry QR code" className="mx-auto border border-white/10 rounded-lg p-2 bg-white w-48 h-48" />
            )}
            <p className="text-xs text-neutral-500 mt-6 uppercase tracking-widest font-semibold">John Doe • MEMBER</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
