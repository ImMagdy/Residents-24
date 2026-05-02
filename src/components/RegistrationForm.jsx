import React, { useState } from 'react';
import { Send, AlertCircle, Loader2 } from 'lucide-react';

export default function RegistrationForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    birthday: '',
    rank: '',
    email: '',
    phone: '',
    address: '',
    maritalStatus: '',
    nextOfKinName: '',
    nextOfKinRelation: '',
    nextOfKinPhone: '',
    militaryStatus: '',
    expectedDeploymentMonth: '',
    orientationMeeting: '',
    familyPlanning: '',
    medicalHistory: '',
    treatmentAccommodations: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.nameAr.trim()) newErrors.nameAr = 'Required';
    if (!formData.nameEn.trim()) newErrors.nameEn = 'Required';
    if (!formData.birthday) newErrors.birthday = 'Required';
    if (!formData.rank) newErrors.rank = 'Required';

    // Strict email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    // Local phone validation (01006146014 format)
    const phoneRegex = /^01\d{9}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Valid 11-digit phone number is required';
    }

    if (!formData.address.trim()) newErrors.address = 'Required';
    if (!formData.maritalStatus) newErrors.maritalStatus = 'Required';
    if (formData.maritalStatus === 'Married' && !formData.familyPlanning) {
      newErrors.familyPlanning = 'Required';
    }
    if (!formData.nextOfKinName.trim()) newErrors.nextOfKinName = 'Required';
    if (!formData.nextOfKinRelation.trim()) newErrors.nextOfKinRelation = 'Required';
    if (!formData.nextOfKinPhone.trim() || !phoneRegex.test(formData.nextOfKinPhone)) {
      newErrors.nextOfKinPhone = 'Valid 11-digit phone number is required';
    }

    if (!formData.medicalHistory) newErrors.medicalHistory = 'Required';
    if (formData.medicalHistory === 'Yes' && !formData.treatmentAccommodations.trim()) {
      newErrors.treatmentAccommodations = 'Required';
    }

    if (!formData.militaryStatus) newErrors.militaryStatus = 'Required';
    if (!formData.orientationMeeting) newErrors.orientationMeeting = 'Required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Replace with your actual Google Apps Script Web App URL
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxWjSxxH59Lm2d8b0QTXQl8oiA_vi2rUqthFbiLy08MpLRxYKiobuWGQIJJFb42oUl5Bg/exec';

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        // Depending on your setup, you might need 'text/plain' to avoid CORS preflight issues
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === 'success') {
        onSubmitSuccess();
      } else {
        throw new Error(result.message || 'Submission failed on server');
      }
    } catch (error) {
      console.error('Submission failed', error);
      alert('An error occurred during submission. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-medical-blue p-6 text-white">
          <h2 className="text-xl font-bold">Resident Registration Form</h2>
          <p className="text-medical-blue-100 text-sm mt-1">Please fill out all mandatory fields carefully.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">

          {/* --- Personal Details --- */}
          <section className="space-y-5">
            <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Personal Details</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name (Arabic) *</label>
                <input
                  type="text"
                  name="nameAr"
                  dir="rtl"
                  value={formData.nameAr}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all ${errors.nameAr ? 'border-red-500' : 'border-slate-200'}`}
                  placeholder="الاسم الثلاثي أو الرباعي"
                />
                <p className="mt-1.5 text-xs text-slate-500 font-arabic flex flex-col gap-0.5">
                  <span>EN: Please enter your name exactly as it appears on your National ID.</span>
                  <span>AR: يرجى كتابة الاسم مطابقاً لبطاقة الرقم القومي.</span>
                </p>
                {errors.nameAr && <p className="text-red-500 text-xs mt-1">{errors.nameAr}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name (English) *</label>
                <input
                  type="text"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all ${errors.nameEn ? 'border-red-500' : 'border-slate-200'}`}
                  placeholder="e.g. Ahmed Mohamed Ali"
                />
                <p className="mt-1.5 text-xs text-slate-500 font-arabic flex flex-col gap-0.5">
                  <span>EN: Please enter your name exactly as it appears on your National ID.</span>
                  <span>AR: يرجى كتابة الاسم مطابقاً لبطاقة الرقم القومي.</span>
                </p>
                {errors.nameEn && <p className="text-red-500 text-xs mt-1">{errors.nameEn}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Birthday *</label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all ${errors.birthday ? 'border-red-500' : 'border-slate-200'}`}
                  />
                  {errors.birthday && <p className="text-red-500 text-xs mt-1">{errors.birthday}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">University Rank *</label>
                  <input
                    type="number"
                    name="rank"
                    value={formData.rank}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all ${errors.rank ? 'border-red-500' : 'border-slate-200'}`}
                    placeholder="e.g. 45"
                  />
                  <p className="mt-1.5 text-xs text-slate-500 font-arabic flex flex-col gap-0.5">
                    <span>EN: Your final numerical rank in your graduating class.</span>
                    <span>AR: ترتيبك الرقمي النهائي على دفعة التخرج.</span>
                  </p>
                  {errors.rank && <p className="text-red-500 text-xs mt-1">{errors.rank}</p>}
                </div>
              </div>
            </div>
          </section>

          {/* --- Contact Information --- */}
          <section className="space-y-5">
            <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Contact Information</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-slate-200'}`}
                  placeholder="01000000000"
                />
                <p className="mt-1.5 text-xs text-slate-500 font-arabic flex flex-col gap-0.5">
                  <span>EN: Must be an 11-digit local number, e.g., 0100...</span>
                  <span>AR: يجب أن يكون رقماً محلياً من ١١ رقماً، مثال: ...0100</span>
                </p>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Address *</label>
                <textarea
                  name="address"
                  rows={2}
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all resize-none ${errors.address ? 'border-red-500' : 'border-slate-200'}`}
                  placeholder="Street, District, City"
                />
                <p className="mt-1.5 text-xs text-slate-500 font-arabic flex flex-col gap-0.5">
                  <span>EN: Your current residential address during residency.</span>
                  <span>AR: عنوان السكن الحالي خلال فترة النيابة.</span>
                </p>
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>
          </section>

          {/* --- Social & Emergency Context --- */}
          <section className="space-y-5">
            <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Social & Emergency Context</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Marital Status *</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all ${errors.maritalStatus ? 'border-red-500' : 'border-slate-200'}`}
                >
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Engaged">Engaged</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
                {errors.maritalStatus && <p className="text-red-500 text-xs mt-1">{errors.maritalStatus}</p>}
              </div>

              {formData.maritalStatus === 'Married' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Family Planning (Residency Period) *</label>
                  <select
                    name="familyPlanning"
                    value={formData.familyPlanning}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all ${errors.familyPlanning ? 'border-red-500' : 'border-slate-200'}`}
                  >
                    <option value="">Select Option</option>
                    <option value="No">No</option>
                    <option value="Yes - Currently have children">Yes - Currently have children</option>
                    <option value="Yes - Planning pregnancy/Expecting">Yes - Planning pregnancy/Expecting</option>
                  </select>
                  <p className="mt-1.5 text-xs text-slate-500 font-arabic flex flex-col gap-0.5">
                    <span>EN: Do you have children or are you planning a pregnancy during the 3-year residency?</span>
                    <span>AR: هل لديك أطفال أو تخطط/تخططين لحمل خلال فترة النيابة؟</span>
                  </p>
                  {errors.familyPlanning && <p className="text-red-500 text-xs mt-1">{errors.familyPlanning}</p>}
                </div>
              )}

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
                <h4 className="font-medium text-slate-700 text-sm">Emergency Contact (Next of Kin)</h4>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                  <input
                    type="text"
                    name="nextOfKinName"
                    value={formData.nextOfKinName}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all ${errors.nextOfKinName ? 'border-red-500' : 'border-slate-200'}`}
                    placeholder="e.g. Mohamed Ali"
                  />
                  {errors.nextOfKinName && <p className="text-red-500 text-xs mt-1">{errors.nextOfKinName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Relationship *</label>
                    <input
                      type="text"
                      name="nextOfKinRelation"
                      value={formData.nextOfKinRelation}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all ${errors.nextOfKinRelation ? 'border-red-500' : 'border-slate-200'}`}
                      placeholder="e.g. Father, Spouse"
                    />
                    {errors.nextOfKinRelation && <p className="text-red-500 text-xs mt-1">{errors.nextOfKinRelation}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      name="nextOfKinPhone"
                      value={formData.nextOfKinPhone}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all ${errors.nextOfKinPhone ? 'border-red-500' : 'border-slate-200'}`}
                      placeholder="01000000000"
                    />
                    {errors.nextOfKinPhone && <p className="text-red-500 text-xs mt-1">{errors.nextOfKinPhone}</p>}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- Occupational Health --- */}
          <section className="space-y-5">
            <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Occupational Health</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Medical History *</label>
                <select
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all ${errors.medicalHistory ? 'border-red-500' : 'border-slate-200'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Prefer not to answer">Prefer not to answer</option>
                </select>
                <p className="mt-1.5 text-xs text-slate-500 font-arabic flex flex-col gap-0.5">
                  <span>EN: Do you have any chronic medical or <span className="font-bold text-slate-800">psychological</span> conditions?</span>
                  <span>AR: هل تعاني من أي أمراض مزمنة أو <span className="font-bold text-slate-800">نفسية</span>؟</span>
                </p>
                {errors.medicalHistory && <p className="text-red-500 text-xs mt-1">{errors.medicalHistory}</p>}
              </div>

              {formData.medicalHistory === 'Yes' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Treatment & Accommodations *</label>
                  <textarea
                    name="treatmentAccommodations"
                    rows={3}
                    value={formData.treatmentAccommodations}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all resize-none ${errors.treatmentAccommodations ? 'border-red-500' : 'border-slate-200'}`}
                    placeholder="Provide details here..."
                  />
                  <p className="mt-1.5 text-xs text-slate-500 font-arabic flex flex-col gap-0.5">
                    <span>EN: Please briefly detail if you are currently receiving treatment or if you require any specific workplace accommodations.</span>
                    <span>AR: يرجى توضيح ما إذا كنت تتلقى أي علاج حالياً أو إذا كنت تحتاج إلى أي تجهيزات خاصة في العمل.</span>
                  </p>
                  {errors.treatmentAccommodations && <p className="text-red-500 text-xs mt-1">{errors.treatmentAccommodations}</p>}
                </div>
              )}
            </div>
          </section>

          {/* --- Administrative Details --- */}
          <section className="space-y-5">
            <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Administrative Details</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Military Duty Status *</label>
                <select
                  name="militaryStatus"
                  value={formData.militaryStatus}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all ${errors.militaryStatus ? 'border-red-500' : 'border-slate-200'}`}
                >
                  <option value="">Select Status</option>
                  <option value="For Duty">For Duty</option>
                  <option value="Exempted">Exempted</option>
                  <option value="Completed">Completed</option>
                  <option value="Females (N/A)">Females (Not Applicable)</option>
                </select>
                {errors.militaryStatus && <p className="text-red-500 text-xs mt-1">{errors.militaryStatus}</p>}
              </div>

              {formData.militaryStatus === 'For Duty' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Expected Month of Deployment (Optional)</label>
                  <select
                    name="expectedDeploymentMonth"
                    value={formData.expectedDeploymentMonth}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all"
                  >
                    <option value="">Select Month</option>
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  <p className="mt-1.5 text-xs text-slate-500 font-arabic flex flex-col gap-0.5">
                    <span>EN: Select the expected month of your conscription.</span>
                    <span>AR: اختر الشهر المتوقع لبدء التجنيد.</span>
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Orientation Meeting *</label>
                <select
                  name="orientationMeeting"
                  value={formData.orientationMeeting}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all ${errors.orientationMeeting ? 'border-red-500' : 'border-slate-200'}`}
                >
                  <option value="">Select Date</option>
                  <option value="May 13">May 13</option>
                  <option value="May 14">May 14</option>
                  <option value="May 15">May 15</option>
                  <option value="To be determined">To be determined</option>
                </select>
                {errors.orientationMeeting && <p className="text-red-500 text-xs mt-1">{errors.orientationMeeting}</p>}
              </div>
            </div>
          </section>

          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 border border-red-100">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm">Please correct the errors above before submitting.</p>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-medical-blue hover:bg-medical-blue-dark text-white font-semibold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Registration
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
