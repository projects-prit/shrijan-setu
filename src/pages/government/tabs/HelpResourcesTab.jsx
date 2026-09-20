import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, LifeBuoy, FileText, Send } from 'lucide-react';

export default function HelpResourcesTab({ showToast }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [msg, setMsg] = useState('');

  const faqs = [
    { q: "How often is the analytics data updated?", a: "The analytics data shown on the dashboard is updated in near real-time as citizens submit challenges and institutions update their project stages." },
    { q: "Can I directly message an Institution from here?", a: "Direct messaging is currently restricted to platform administrators. Government users can assign follow-up tasks via the Citizen Feedback tab which alerts the institution." },
    { q: "How is the AI Policy Insight generated?", a: "Our proprietary AI engine continuously scans all challenge metadata, feedback ratings, and resolution timelines to identify statistical anomalies and emerging trends across districts." },
    { q: "How do I export the data for my legislative session?", a: "Navigate to the Analytics & Reports tab. Select your desired date range and click 'Export Report'. A PDF summarizing the impact metrics will be downloaded." }
  ];

  const handleSupport = (e) => {
    e.preventDefault();
    showToast("Support ticket submitted. Our IT team will contact you shortly.");
    setMsg('');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-[#1F3864]">Help & Resources</h2>
        <p className="text-gray-500 mt-1">Platform documentation, FAQs, and technical support.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2 font-bold text-gray-700">
            <HelpCircle size={18}/> Frequently Asked Questions
          </div>
          <div className="divide-y divide-gray-100">
            {faqs.map((faq, i) => (
              <div key={i} className="p-4">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex justify-between items-center w-full text-left font-bold text-gray-800 hover:text-[#1F3864] focus:outline-none"
                >
                  <span className="text-sm">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={16} className="text-gray-400 shrink-0"/> : <ChevronDown size={16} className="text-gray-400 shrink-0"/>}
                </button>
                {openFaq === i && (
                  <div className="mt-3 text-sm text-gray-600 leading-relaxed pr-6 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center gap-3">
            <FileText size={24} className="text-[#1F3864]" />
            <div>
              <div className="font-bold text-sm text-gray-800">Need more details?</div>
              <a href="#" className="text-xs font-semibold text-blue-600 hover:underline">Download the Full User Manual (PDF)</a>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2 font-bold text-gray-700">
            <LifeBuoy size={18}/> Contact IT Support
          </div>
          <form onSubmit={handleSupport} className="p-6 space-y-4">
            <p className="text-sm text-gray-600 mb-4">Experiencing a bug or need access to a specific feature? Send a message directly to the Srijan Setu technical operations team.</p>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Issue Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1F3864]">
                <option>Technical Bug / Error</option>
                <option>Data Inaccuracy</option>
                <option>Feature Request</option>
                <option>Access Issue</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Description</label>
              <textarea 
                required
                value={msg}
                onChange={e => setMsg(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1F3864] h-32"
                placeholder="Please describe the issue in detail..."
              ></textarea>
            </div>
            <div className="pt-2">
              <button type="submit" className="w-full bg-[#1F3864] text-white py-2 rounded-lg font-bold text-sm hover:bg-blue-900 transition-colors flex items-center justify-center gap-2">
                <Send size={16}/> Submit Support Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
