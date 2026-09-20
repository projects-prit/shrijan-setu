import React from 'react';

export function StatusChip({ status }) {
  const statusConfig = {
    'Submitted': { color: 'bg-gray-200 text-gray-700', dots: '●○○○○' },
    'Matched': { color: 'bg-blue-100 text-blue-800', dots: '●●○○○' },
    'Prototype': { color: 'bg-yellow-100 text-yellow-800', dots: '●●●○○' },
    'Pilot': { color: 'bg-purple-100 text-purple-800', dots: '●●●●○' },
    'Deployed': { color: 'bg-[#2E7D32]/10 text-[#2E7D32]', dots: '●●●●●', icon: '✔' },
  };

  const config = statusConfig[status] || statusConfig['Submitted'];

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <span className="mr-1 tracking-widest">{config.dots}</span>
      {status} {config.icon && <span className="ml-1">{config.icon}</span>}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const priorityConfig = {
    'High': { color: 'bg-[#C55A11] text-white', icon: '⚠' },
    'Medium': { color: 'bg-orange-400 text-white', icon: '●' },
    'Low': { color: 'bg-green-500 text-white', icon: '○' },
  };

  const config = priorityConfig[priority] || priorityConfig['Medium'];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${config.color}`}>
      <span className="mr-1">{config.icon}</span> {priority} PRIORITY
    </span>
  );
}

export function MatchScoreBar({ score }) {
  let color = 'bg-green-500';
  if (score < 50) color = 'bg-red-500';
  else if (score < 80) color = 'bg-yellow-500';

  return (
    <div className="flex items-center gap-2">
      <div className="w-full bg-gray-200 rounded-full h-2.5 flex-1">
        <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${score}%` }}></div>
      </div>
      <span className="text-sm font-semibold text-gray-700 w-12 text-right">{score}%</span>
    </div>
  );
}
