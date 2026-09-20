import React, { useState } from 'react';
import { Lightbulb, Bookmark, BookmarkCheck, ArrowRight, Sparkles } from 'lucide-react';
import { mockInsights } from '../govtMockData';

export default function PolicyInsightsTab({ setActiveTab }) {
  const [insights, setInsights] = useState(mockInsights);

  const toggleBookmark = (id) => {
    setInsights(insights.map(i => i.id === id ? { ...i, bookmarked: !i.bookmarked } : i));
  };

  const bookmarked = insights.filter(i => i.bookmarked);
  const unbookmarked = insights.filter(i => !i.bookmarked);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3864]">AI Policy Insights</h2>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <Sparkles size={16} className="text-[#C55A11]" /> 
            Auto-generated intelligence to guide legislative focus and funding.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-gray-900 uppercase text-xs tracking-wider">Latest Insights</h3>
          {unbookmarked.map(insight => (
            <div key={insight.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex gap-4">
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-[#1F3864]">
                <Lightbulb size={24} />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium mb-3">{insight.text}</p>
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1 rounded text-sm font-bold text-[#1F3864] border border-gray-100">
                    Data Point: {insight.metric}
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setActiveTab('analytics')} className="text-sm font-semibold text-gray-500 hover:text-[#1F3864] flex items-center gap-1">
                      View Data <ArrowRight size={14}/>
                    </button>
                    <button onClick={() => toggleBookmark(insight.id)} className="text-gray-400 hover:text-[#C55A11]">
                      <Bookmark size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 h-fit">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookmarkCheck size={20} className="text-[#1F3864]" /> Saved for Review
          </h3>
          <div className="space-y-4">
            {bookmarked.map(insight => (
              <div key={insight.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative group">
                <p className="text-sm text-gray-800 pr-8">{insight.text}</p>
                <button 
                  onClick={() => toggleBookmark(insight.id)} 
                  className="absolute top-4 right-4 text-[#C55A11]"
                >
                  <BookmarkCheck size={18} className="fill-[#C55A11] opacity-100 transition-opacity group-hover:opacity-50" />
                </button>
                <button onClick={() => setActiveTab('analytics')} className="text-xs font-bold text-[#1F3864] mt-3 hover:underline">
                  Open in Analytics
                </button>
              </div>
            ))}
            {bookmarked.length === 0 && (
              <p className="text-sm text-gray-500 italic">No insights bookmarked yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
