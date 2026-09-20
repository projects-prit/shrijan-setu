import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';

export default function HelpTab({ showToast }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = [
    {
      q: 'How does the AI match score work?',
      a: 'The AI analyzes the text of the citizen-submitted challenge and cross-references it with the "Areas of Expertise" tags in your institution profile. It also factors in geographic proximity to give a final percentage score.'
    },
    {
      q: 'What happens when I accept a challenge?',
      a: 'The challenge is moved to your "My Projects" tab. You can then assign team members, track milestones, and update its stage from Prototype to Deployed.'
    },
    {
      q: 'How do I get funding from Industry/CSR?',
      a: 'Industry partners browse active projects on their portal. If they are interested in your project, you will receive a request in the "Collaboration Requests" tab, which you can accept or decline.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.message) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', message: '' });
      showToast('Message sent to support team.');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1F3864]">Help & Resources</h1>
        <p className="text-sm text-gray-500 mt-1">Get assistance and learn how to use the Srijan Setu dashboard.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg">
          {faqs.map((faq, index) => (
            <div key={index} className="overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                className="w-full text-left px-5 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium text-gray-800">{faq.q}</span>
                {openFaq === index ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
              </button>
              {openFaq === index && (
                <div className="px-5 py-4 bg-white text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Support</h2>
        <p className="text-sm text-gray-500 mb-6">Can't find what you're looking for? Send us a message.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input 
              required
              type="text" 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1F3864] outline-none"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              required
              rows="4" 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1F3864] outline-none"
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-[#1F3864] text-white rounded-lg hover:bg-[#152746] font-medium transition-colors disabled:opacity-70"
          >
            {isSubmitting ? 'Sending...' : <><Send size={18} /> Send Message</>}
          </button>
        </form>
      </div>
    </div>
  );
}
