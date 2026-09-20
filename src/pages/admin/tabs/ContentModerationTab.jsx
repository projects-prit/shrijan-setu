import React, { useState } from 'react';

const mockFlaggedContent = [
  { id: 'FLG-001', title: 'Water pump broken', reason: 'Duplicate Cluster', source: 'Citizen', severity: 'Medium', date: '2026-09-14' },
  { id: 'FLG-002', title: 'Spam submission test', reason: 'User Report (Inappropriate)', source: 'Citizen', severity: 'High', date: '2026-09-13' },
  { id: 'FLG-003', title: 'Low Quality Feedback on Project', reason: 'Low Rating Flag', source: 'HEI', severity: 'Low', date: '2026-09-12' }
];;

import { Flag, ShieldAlert, CheckCircle, Trash2, Layers } from 'lucide-react';


export default function ContentModerationTab({ showToast }) {
  const [flagged, setFlagged] = useState(mockFlaggedContent);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmData, setConfirmData] = useState(null);

  const triggerAction = (action, item) => {
    setConfirmData({ action, item });
    setShowConfirm(true);
  };

  const executeAction = () => {
    setFlagged(flagged.filter(f => f.id !== confirmData.item.id));
    if (confirmData.action === 'remove') showToast(`Content "${confirmData.item.title}" removed successfully.`);
    if (confirmData.action === 'dismiss') showToast(`Flag for "${confirmData.item.title}" dismissed.`);
    if (confirmData.action === 'merge') showToast(`Cluster "${confirmData.item.title}" merged into parent challenge.`);
    setShowConfirm(false);
  };

  const getSeverityBadge = (s) => {
    if (s === 'High') return 'bg-red-100 text-red-800 border-red-200';
    if (s === 'Medium') return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-[#1F3864]">Content Moderation</h2>
        <p className="text-sm text-gray-500">Review flagged content, user reports, and AI duplicate detections.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flagged.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-start">
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getSeverityBadge(item.severity)}`}>
                {item.severity} Severity
              </span>
              <span className="text-xs text-gray-400 font-mono">{item.date}</span>
            </div>
            <div className="p-5 flex-1">
              <div className="flex items-center gap-2 mb-2 text-sm text-[#B02A2A] font-bold">
                <ShieldAlert size={16}/> {item.reason}
              </div>
              <h3 className="font-bold text-gray-900 mb-2 leading-tight">{item.title}</h3>
              <p className="text-xs text-gray-500">Source: <span className="font-semibold">{item.source} Dashboard</span></p>
              <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600 border border-gray-100 line-clamp-3">
                "Content preview would normally go here showing the exact user submission, feedback text, or challenge description that triggered the flag."
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 grid grid-cols-2 gap-2">
              <button 
                onClick={() => triggerAction('dismiss', item)}
                className="py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center gap-1"
              >
                <CheckCircle size={14}/> Dismiss
              </button>
              {item.reason.includes('Duplicate') ? (
                <button 
                  onClick={() => triggerAction('merge', item)}
                  className="py-2 text-xs font-semibold text-white bg-[#1F3864] rounded hover:bg-blue-900 flex items-center justify-center gap-1"
                >
                  <Layers size={14}/> Merge
                </button>
              ) : (
                <button 
                  onClick={() => triggerAction('remove', item)}
                  className="py-2 text-xs font-semibold text-white bg-[#B02A2A] rounded hover:bg-red-800 flex items-center justify-center gap-1"
                >
                  <Trash2 size={14}/> Remove
                </button>
              )}
            </div>
          </div>
        ))}
        {flagged.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-400">
            <CheckCircle size={48} className="mx-auto mb-4 text-green-300" />
            <p>Queue is empty! All flagged content has been reviewed.</p>
          </div>
        )}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">{confirmData.action} Content</h3>
            <p className="text-sm text-gray-600 mb-6">
              {confirmData.action === 'remove' && "Are you sure you want to permanently delete this content? The original submitter will be notified."}
              {confirmData.action === 'dismiss' && "Dismissing this flag will mark the content as safe and remove it from the moderation queue."}
              {confirmData.action === 'merge' && "This will merge the selected challenge into its identified parent cluster. The submitters will be notified."}
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={executeAction} className={`px-4 py-2 text-sm font-semibold text-white rounded-lg ${
                confirmData.action === 'remove' ? 'bg-[#B02A2A] hover:bg-red-800' : 'bg-[#1F3864] hover:bg-blue-900'
              }`}>
                Confirm {confirmData.action}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
