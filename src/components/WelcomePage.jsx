import React from 'react';
import { UserPlus, ArrowRight, ShieldPlus, UserRound } from 'lucide-react';

import ainShamsLogo from '../assets/ain-shams-logo.png';
import magdyPic from '../assets/magdy-pic.jpg';
import hanyPic from '../assets/hany-pic.jpg';

export default function WelcomePage({ onNext }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">
      {/* Header Section */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 mb-6 border border-slate-100 flex flex-col items-center text-center">
        {/* Logos */}
        <div className="flex justify-center mb-6">
          <img 
            src={ainShamsLogo} 
            alt="Ain Shams Logo" 
            className="h-24 object-contain" 
          />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome to the Anesthesia Department</h1>
        <p className="text-slate-500 mb-6 text-sm">
          Ain Shams University Hospitals
        </p>

        <button
          onClick={onNext}
          className="w-full bg-medical-blue hover:bg-medical-blue-dark text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
        >
          Start Registration
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Contacts Section */}
      <div className="w-full max-w-md">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 px-2">Key Contacts</h2>
        
        <div className="flex flex-col gap-4">
          {/* Magdy Contact Card */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={magdyPic} 
                alt="Magdy" 
                className="w-12 h-12 rounded-full object-cover border border-slate-200" 
              />
              <div>
                <h3 className="font-semibold text-slate-900">Magdy</h3>
                <p className="text-xs text-slate-500">Chief Resident / Admin</p>
              </div>
            </div>
            <a
              href="/magdy.vcf"
              download="magdy.vcf"
              className="flex items-center gap-1.5 text-sm font-medium text-medical-blue bg-medical-blue/5 hover:bg-medical-blue/15 px-3 py-2 rounded-lg transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Save
            </a>
          </div>

          {/* Ahmed Hany Contact Card */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={hanyPic} 
                alt="Ahmed Hany" 
                className="w-12 h-12 rounded-full object-cover border border-slate-200" 
              />
              <div>
                <h3 className="font-semibold text-slate-900">Ahmed Hany</h3>
                <p className="text-xs text-slate-500">Chief Resident / Admin</p>
              </div>
            </div>
            <a
              href="/ahmed_hany.vcf"
              download="ahmed_hany.vcf"
              className="flex items-center gap-1.5 text-sm font-medium text-medical-blue bg-medical-blue/5 hover:bg-medical-blue/15 px-3 py-2 rounded-lg transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Save
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
