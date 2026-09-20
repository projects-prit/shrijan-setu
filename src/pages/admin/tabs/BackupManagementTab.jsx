import React, { useState } from 'react';
import { Database, Download, CheckCircle } from 'lucide-react';

export default function BackupManagementTab({ showToast }) {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [progress, setProgress] = useState(0);

  const triggerBackup = () => {
    setIsBackingUp(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if(p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsBackingUp(false);
            showToast('Manual backup completed successfully!');
          }, 500);
          return 100;
        }
        return p + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto mt-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#1F3864]">Backup & Data Management</h2>
        <p className="text-gray-500 mt-2">Manage database snapshots and export raw data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <Database size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">System Backup</h3>
          <p className="text-sm text-gray-500 mb-6">Last automated backup was 4 hours ago (14.2 GB).</p>
          
          {isBackingUp ? (
            <div className="w-full">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-[#1F3864] transition-all duration-300" style={{width: `${progress}%`}}></div>
              </div>
              <div className="text-xs text-gray-500 font-semibold">{progress}% Completed...</div>
            </div>
          ) : (
            <button onClick={triggerBackup} className="w-full py-3 bg-[#1F3864] text-white font-bold rounded-xl hover:bg-[#152746] transition-colors">
              Trigger Manual Backup
            </button>
          )}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-50 text-[#2E7D32] rounded-full flex items-center justify-center mb-4">
            <Download size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Data Export</h3>
          <p className="text-sm text-gray-500 mb-6">Download CSV snapshots of specific collections.</p>
          
          <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none mb-3">
            <option>Users Collection</option>
            <option>Challenges Collection</option>
            <option>Projects Collection</option>
          </select>
          <button onClick={()=>showToast('Exporting collection to CSV...')} className="w-full py-3 bg-[#2E7D32] text-white font-bold rounded-xl hover:bg-green-800 transition-colors">
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
}
