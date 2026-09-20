import React, { useState } from 'react';
import { Brain, RefreshCw, Activity, Target, Zap } from 'lucide-react';

export default function AIMonitoringTab({ showToast }) {
  const [isRetraining, setIsRetraining] = useState(false);
  const [logs, setLogs] = useState([
    { date: '2026-09-01T02:00:00Z', reason: 'Scheduled Monthly', data: '4.2 GB (Challenges)', impact: '+1.2% Acc' },
    { date: '2026-08-15T14:30:00Z', reason: 'Manual Trigger (Drift)', data: '850 MB (Feedback)', impact: '+3.4% Acc' },
    { date: '2026-08-01T02:00:00Z', reason: 'Scheduled Monthly', data: '3.9 GB (Challenges)', impact: '+0.5% Acc' }
  ]);

  const triggerRetraining = () => {
    if(window.confirm("Are you sure you want to flag the model for immediate retraining? This process consumes high server resources.")) {
      setIsRetraining(true);
      setTimeout(() => {
        setIsRetraining(false);
        setLogs([{ date: new Date().toISOString(), reason: 'Manual Admin Trigger', data: 'Pending processing...', impact: 'Calculating...' }, ...logs]);
        showToast('AI Model Retraining Initiated Successfully');
      }, 2000);
    }
  };

  const metrics = [
    { label: 'Categorization Accuracy', val: '94.2%', icon: <Target size={20} className="text-[#1F3864]"/> },
    { label: 'Duplicate Precision', val: '89.7%', icon: <Zap size={20} className="text-[#C55A11]"/> },
    { label: 'Avg Priority Confidence', val: '91.0%', icon: <Activity size={20} className="text-[#2E7D32]"/> },
    { label: 'Match Acceptance Rate', val: '76.4%', icon: <Brain size={20} className="text-purple-600"/> }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3864]">AI Engine Monitoring</h2>
          <p className="text-sm text-gray-500">Monitor NLP performance, match accuracy, and retrain models.</p>
        </div>
        <button 
          onClick={triggerRetraining} 
          disabled={isRetraining}
          className={`px-4 py-2 text-sm font-semibold text-white rounded-lg flex items-center gap-2 transition-all ${
            isRetraining ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1F3864] hover:bg-[#152746]'
          }`}
        >
          <RefreshCw size={16} className={isRetraining ? "animate-spin" : ""} /> 
          {isRetraining ? 'Initiating...' : 'Force Retrain Models'}
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-gray-50 rounded-full mb-3">{m.icon}</div>
            <div className="text-3xl font-black text-gray-900 mb-1">{m.val}</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-[#1F3864]">Recent Retraining Logs</h3>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="w-full text-left text-sm text-gray-600">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-3 font-semibold text-gray-500">Date/Time</th>
                <th className="p-3 font-semibold text-gray-500">Trigger Reason</th>
                <th className="p-3 font-semibold text-gray-500">Data Volume</th>
                <th className="p-3 font-semibold text-gray-500">Resulting Impact</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-3 font-mono text-xs">{new Date(log.date).toLocaleString()}</td>
                  <td className="p-3 font-medium text-gray-900">{log.reason}</td>
                  <td className="p-3">{log.data}</td>
                  <td className="p-3 font-bold text-[#2E7D32]">{log.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
