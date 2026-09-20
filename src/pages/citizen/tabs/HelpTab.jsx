import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Send, CheckCircle2 } from 'lucide-react';

export default function HelpTab({ showToast }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: 'What happens after I submit a report?',
      a: 'Your report is reviewed by our AI system and immediately sent to local universities. A university team will adopt it as a project and build a solution.'
    },
    {
      q: 'How long will it take to fix my issue?',
      a: 'It depends on the problem. Simple issues might be fixed in weeks. Larger infrastructure issues may take a few months as students have to design, test, and find funding for the solution.'
    },
    {
      q: 'Is my personal information kept private?',
      a: 'Yes. Only your first name and the issue location are visible to the public. Your phone number is kept private.'
    },
    {
      q: 'Who pays for these solutions?',
      a: 'Once a university tests a solution, large companies and CSR (Corporate Social Responsibility) partners step in to provide the funding to deploy it in your neighborhood.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
      showToast('Message sent to our support team!');
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-6">
      
      <div>
        <h1 className="text-2xl font-bold text-[#1F3864]">Help & Support</h1>
        <p className="text-sm text-gray-500 mt-1">Learn how Srijan Setu works or contact us.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">How it works</h2>
        
        <div className="relative">
          <div className="absolute left-6 top-6 bottom-6 w-1 bg-blue-100 rounded-full z-0"></div>
          
          <div className="space-y-8 relative z-10">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-[#1F3864] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">1</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">You report a problem</h3>
                <p className="text-gray-600 leading-relaxed mt-1">Take a photo and tell us what's wrong in your neighborhood.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">2</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Universities find a solution</h3>
                <p className="text-gray-600 leading-relaxed mt-1">Local engineering and science students design a modern fix for your issue.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">3</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Companies fund it</h3>
                <p className="text-gray-600 leading-relaxed mt-1">Industry partners provide the money needed to actually build the solution.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">4</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Problem Fixed!</h3>
                <p className="text-gray-600 leading-relaxed mt-1">The solution is deployed and you get to rate how well it worked.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <HelpCircle size={24} className="text-[#1F3864]" />
          <h2 className="text-xl font-bold text-gray-900">Common Questions</h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button 
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                className="w-full text-left px-6 py-5 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-lg text-gray-800 pr-4">{faq.q}</span>
                {openFaq === index ? <ChevronUp size={24} className="text-gray-400 shrink-0" /> : <ChevronDown size={24} className="text-gray-400 shrink-0" />}
              </button>
              {openFaq === index && (
                <div className="px-6 py-4 bg-gray-50 text-gray-700 text-lg leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Still need help?</h2>
        <p className="text-gray-500 mb-4">Send us a message and we'll get back to you soon.</p>
        
        {submitted ? (
          <div className="bg-green-50 text-green-800 p-4 rounded-xl flex items-center gap-3 border border-green-100">
            <CheckCircle2 size={24} className="text-green-600 shrink-0" />
            <p className="font-medium text-lg">Message sent successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea 
              required
              rows="4" 
              placeholder="Type your message here..."
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:border-[#1F3864] focus:ring-0 outline-none"
              value={message}
              onChange={e => setMessage(e.target.value)}
            ></textarea>
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 bg-[#1F3864] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#152746] transition-colors"
            >
              <Send size={20} /> Send Message
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
