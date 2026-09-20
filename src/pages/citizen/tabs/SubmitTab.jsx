import React, { useState } from 'react';
import { Camera, MapPin, ArrowLeft, ArrowRight, CheckCircle2, Navigation, Upload, Loader2, Sparkles } from 'lucide-react';
import api from '../../../api/axios';

export default function SubmitTab({ setActiveTab, setMyReports, showToast }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    image: null
  });

  const categories = ['Water Issue', 'Road/Infrastructure', 'Education', 'Health', 'Environment', 'Other'];

  const handleNext = () => {
    if (step === 1 && !formData.description) return showToast('Please describe the issue first.');
    if (step === 3 && !formData.location) return showToast('Please provide a location.');
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSimulateAI = (text) => {
    setFormData({ ...formData, description: text });
    if (text.toLowerCase().includes('water') || text.toLowerCase().includes('leak')) {
      setFormData(prev => ({ ...prev, category: 'Water Issue' }));
    } else if (text.toLowerCase().includes('road') || text.toLowerCase().includes('pothole')) {
      setFormData(prev => ({ ...prev, category: 'Road/Infrastructure' }));
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await api.post('/challenges', {
        title: formData.title || formData.description.substring(0, 30) + '...',
        category: formData.category || 'Other',
        description: formData.description,
        location: formData.location,
        district: 'Pune', // Mock district for now
      });
      
      const newReport = res.data.data;
      setTrackingId(newReport.tracking_id);
      
      // Add to local state to reflect immediately
      setMyReports(prev => [newReport, ...prev]);
      setSuccess(true);
    } catch (err) {
      showToast('Error submitting report. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-[70vh] animate-fade-in-up px-4">
        <div className="w-24 h-24 bg-green-100 text-[#2E7D32] rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted!</h2>
        <p className="text-gray-600 mb-6 text-lg">Thank you. Your tracking ID is <br/><span className="font-bold text-[#1F3864] text-xl block mt-2">{trackingId}</span></p>
        
        <div className="space-y-3 w-full">
          <button 
            onClick={() => setActiveTab('reports')}
            className="w-full bg-[#1F3864] text-white py-4 rounded-xl font-bold text-lg shadow-md active:scale-95 transition-transform"
          >
            Track This Challenge
          </button>
          <button 
            onClick={() => {
              setFormData({title: '', category: '', description: '', location: '', image: null});
              setStep(1);
              setSuccess(false);
            }}
            className="w-full bg-white text-[#1F3864] py-4 rounded-xl font-bold text-lg border border-gray-200 active:scale-95 transition-transform"
          >
            Report Another Issue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      
      {/* Header & Progress */}
      <div className="flex items-center gap-4">
        {step > 1 && (
          <button onClick={handleBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
            <ArrowLeft size={24} />
          </button>
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#1F3864]">Report an Issue</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Step {step} of 4</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        {[1,2,3,4].map(i => (
          <div key={i} className={`h-2 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-[#1F3864]' : 'bg-gray-200'}`}></div>
        ))}
      </div>

      <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in-up">
        
        {/* Step 1: Description & Category */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">Tell us what's happening</label>
              <p className="text-sm text-gray-500 mb-4">A short, plain description helps us understand the problem.</p>
              <textarea 
                rows="4" 
                placeholder="E.g., The main road has deep potholes that are causing accidents..."
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:border-[#1F3864] focus:ring-0 outline-none transition-colors"
                value={formData.description}
                onChange={e => handleSimulateAI(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                Category <Sparkles size={18} className="text-[#C55A11]" />
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setFormData({...formData, category: cat})}
                    className={`px-4 py-2 rounded-full border-2 text-sm md:text-base font-medium transition-colors ${formData.category === cat ? 'border-[#1F3864] bg-blue-50 text-[#1F3864]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {formData.description.length > 10 && !formData.category && (
                <p className="text-xs text-orange-600 mt-2 italic flex items-center gap-1"><Sparkles size={12}/> Our AI is trying to suggest a category.</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Photo Evidence */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">Add a photo (Optional)</label>
              <p className="text-sm text-gray-500 mb-4">A picture helps universities understand the severity of the problem.</p>
              
              {formData.image ? (
                <div className="relative rounded-xl overflow-hidden border-2 border-gray-200">
                  <img src={formData.image} alt="Preview" className="w-full h-48 object-cover" />
                  <button 
                    onClick={() => setFormData({...formData, image: null})}
                    className="absolute top-2 right-2 bg-white/90 text-red-600 px-3 py-1 rounded-full text-sm font-bold shadow-sm"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                  <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageUpload} />
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-400">
                    <Camera size={32} />
                  </div>
                  <p className="font-bold text-gray-700 text-lg mb-1">Tap to upload a photo</p>
                  <p className="text-sm text-gray-500">Take a picture or choose from gallery</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">Where is this happening?</label>
              <p className="text-sm text-gray-500 mb-4">Provide a specific address or landmark.</p>
              
              <div className="relative mb-4">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                <input 
                  type="text" 
                  placeholder="E.g., Near ZP School, Ward 4..."
                  className="w-full border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-lg focus:border-[#1F3864] focus:ring-0 outline-none transition-colors"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <button 
                onClick={() => {
                  setFormData({...formData, location: 'Current Location (Auto-detected)'});
                  showToast('Location acquired successfully.');
                }}
                className="w-full flex items-center justify-center gap-2 bg-blue-50 text-[#1F3864] py-3 rounded-xl font-bold border border-blue-100 active:bg-blue-100 transition-colors"
              >
                <Navigation size={20} /> Use My Current Location
              </button>
            </div>
            
            <div className="h-40 bg-gray-200 rounded-xl border border-gray-300 overflow-hidden relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-100">
                <MapPin size={32} className="mb-2 opacity-50" />
                <span className="text-sm font-medium">Map preview will appear here</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Review your report</h2>
              
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-4">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Category</p>
                  <p className="font-medium text-gray-900">{formData.category || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Description</p>
                  <p className="text-gray-900">{formData.description}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Location</p>
                  <p className="font-medium text-gray-900 flex items-center gap-1"><MapPin size={16} className="text-gray-400"/> {formData.location}</p>
                </div>
                {formData.image && (
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Photo</p>
                    <img src={formData.image} alt="Evidence" className="w-24 h-24 object-cover rounded-lg border border-gray-300" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4">
        {step < 4 ? (
          <button 
            onClick={handleNext}
            className="w-full bg-[#1F3864] text-white py-4 rounded-xl font-bold text-lg shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            Continue <ArrowRight size={20} />
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-[#2E7D32] text-white py-4 rounded-xl font-bold text-lg shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-70"
          >
            {isSubmitting ? <><Loader2 size={24} className="animate-spin" /> Submitting...</> : <><Upload size={24} /> Submit Challenge</>}
          </button>
        )}
      </div>

    </div>
  );
}
