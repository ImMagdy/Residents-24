import React from 'react';
import { CheckCircle2, MessageCircle, Users } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 border border-slate-100 flex flex-col items-center text-center text-slate-800">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Registration Successful!</h1>
        <p className="text-slate-500 mb-8 text-sm">
          Thank you for submitting your details. We are excited to welcome you to the Anesthesia Department.
        </p>

        <div className="w-full space-y-4">
          <div className="bg-amber-50 text-amber-800 text-sm font-medium px-4 py-3 rounded-lg mb-2 text-left border border-amber-200">
            <strong>Action Required:</strong> You MUST join all the groups below to receive important schedules and departmental announcements.
          </div>
          
          <a
            href="https://chat.whatsapp.com/G0DPZ00fWu4KvnAYBemDtL?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm"
          >
            <MessageCircle className="w-5 h-5" />
            Anaesthesia Community Whatsapp Group
          </a>

          <a
            href="https://chat.whatsapp.com/LZk5NyCyehY4haxyElsBGS?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm"
          >
            <MessageCircle className="w-5 h-5" />
            Official Anaesthesia Residents '24
          </a>

          <a
            href="https://www.facebook.com/groups/1682354225233732"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#1877F2] hover:bg-[#166fe5] text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm"
          >
            <Users className="w-5 h-5" />
            Anaesthesia Department Official Facebook Group
          </a>
        </div>
      </div>
    </div>
  );
}
