import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';

export default function HelpTab({ showToast }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = [
    {
      q: 'Does funding through Srijan Setu count towards CSR obligations under Indian Law (Section 135)?',
      a: 'Yes! Funding provided to public Higher Education Institutions (HEIs) and approved incubators for technology incubators is eligible under Schedule VII of the Companies Act, 2013. The downloadable CSR Impact Report can be used for compliance.'
    },
    {
      q: 'How do I disburse funds?',
      a: 'Once a university accepts your support offer, you can negotiate disbursement schedules outside the platform, but you must log the tranches in the "Funding & Resources" tab so we can generate accurate impact reports for you.'
    },
    {
      q: 'Can I just offer mentoring without funding?',
      a: 'Absolutely. Many projects, especially in the Prototype or Testing phase, are desperately seeking technical guidance or go-to-market strategies. Just select "Mentoring" when offering support.'
    },
    {
      q: 'How is citizen impact calculated?',
      a: 'Our AI engine aggregates the geographic scope of the original citizen complaint and cross-references it with the HEI\'s deployment scale to estimate total citizens impacted by the solution.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.message) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', message: '' });
      showToast('Support ticket submitted successfully.');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1F3864]">Help & Resources</h1>
        <p className="text-sm text-gray-500 mt-1">Get assistance with CSR compliance, platform usage, and support.</p>
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
        <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Platform Support</h2>
        <p className="text-sm text-gray-500 mb-6">Need help setting up a partnership or generating a custom report? Let us know.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name / Designation</label>
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
