import React, { useState } from 'react';
import { MapPin, ThumbsUp, Star, Search, Filter } from 'lucide-react';

export default function CommunityTab({ communityFeed, setCommunityFeed, showToast }) {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Infrastructure', 'Environment', 'Education', 'Water Issue'];

  const handleUpvote = (id) => {
    setCommunityFeed(communityFeed.map(item => {
      const itemId = item.tracking_id || item._id;
      if (itemId === id) {
        // Prevent double voting in mock
        if (item.hasVoted) return item;
        showToast('Thanks for your feedback!');
        return { ...item, upvotes: (item.upvotes || 0) + 1, hasVoted: true };
      }
      return item;
    }));
  };

  const filteredFeed = communityFeed.filter(item => filter === 'All' || item.category === filter);

  return (
    <div className="space-y-4 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F3864]">Community Impact</h1>
        <p className="text-sm text-gray-500 mt-1">See how citizens and universities are transforming your district.</p>
      </div>

      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 gap-2 hide-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border-2 transition-colors ${
              filter === cat 
                ? 'bg-[#1F3864] text-white border-[#1F3864]' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredFeed.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
            <p className="text-gray-500 text-lg">No resolved projects found in this category yet.</p>
          </div>
        ) : (
          filteredFeed.map(item => (
            <div key={item.tracking_id || item._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-[#1F3864] bg-blue-50 px-2 py-1 rounded uppercase tracking-wider">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-1 rounded">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold">{item.rating || '4.8'}</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-gray-900 text-xl leading-tight mb-2">{item.title}</h3>
                <p className="text-gray-600 text-base mb-4 leading-relaxed">{item.description}</p>
                
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-1"><MapPin size={16} /> {item.location}</div>
                  <div className="flex items-center gap-1"><span className="font-bold text-gray-400">•</span> Solved by: <span className="font-semibold text-gray-800">{item.solver || 'Local HEI'}</span></div>
                  {item.partner && (
                     <div className="flex items-center gap-1"><span className="font-bold text-gray-400">•</span> Supported by: <span className="font-semibold text-gray-800">{item.partner}</span></div>
                  )}
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                  <span className="text-sm text-gray-400 font-medium">Deployed {item.created_at ? new Date(item.created_at).toLocaleDateString() : item.date}</span>
                  <button 
                    onClick={() => handleUpvote(item.tracking_id || item._id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${
                      item.hasVoted 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 active:scale-95'
                    }`}
                  >
                    <ThumbsUp size={18} className={item.hasVoted ? 'fill-current' : ''} />
                    {item.hasVoted ? 'Helped Me' : 'This Helped Me'} ({item.upvotes || 0})
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
