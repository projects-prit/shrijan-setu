import React from 'react';
import { User, Shield } from 'lucide-react';

export default function AdminProfileTab({ showToast }) {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in mt-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-[#1F3864]"></div>
        <div className="px-8 pb-8">
          <div className="w-24 h-24 bg-white rounded-full p-1 -mt-12 shadow-md relative z-10 mb-4">
            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-500">AD</div>
          </div>
          
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Admin User</h2>
              <p className="text-gray-500">admin@srijansetu.in • Super Admin</p>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-200 flex items-center gap-1">
              <Shield size={14}/> 2FA Enabled
            </span>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">My Activity Log</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                <span className="text-gray-600">Changed role of Sunita Devi to Suspended</span>
                <span className="text-gray-400 font-mono text-xs">Today, 16:05</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                <span className="text-gray-600">Verified Institution: BIT Mesra</span>
                <span className="text-gray-400 font-mono text-xs">Yesterday, 14:20</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
