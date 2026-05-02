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
          <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-2">Join our communities</h2>
          
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm"
          >
            <MessageCircle className="w-5 h-5" />
            Join WhatsApp Group 1
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm"
          >
            <MessageCircle className="w-5 h-5" />
            Join WhatsApp Group 2
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#1877F2] hover:bg-[#166fe5] text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm"
          >
            <Users className="w-5 h-5" />
            Join Facebook Page
          </a>
        </div>
      </div>
    </div>
  );
}
