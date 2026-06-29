"use client";

import React, { useState, useEffect } from 'react';

// The exact Voiceover captions mapped to 10-second intervals

// Heatmap data representing Integrity Risk Scores
const heatmapData = [
  'bg-red-500', 'bg-yellow-500', 'bg-green-500',
  'bg-green-500', 'bg-red-500', 'bg-green-500',
  'bg-yellow-500', 'bg-green-500', 'bg-green-500'
];

export default function PaceArchitecture() {
  const [step, setStep] = useState(0);

  // Time-tracking logic for perfect 60-second looping (0 drift)
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentStep = Math.floor((elapsed % 60000) / 10000);
      setStep(currentStep);
    }, 100); // Polling every 100ms keeps UI perfectly synced with real time

    return () => clearInterval(interval);
  }, []);

  // Node Active States
  const isPulseAll = step === 0;
  const isVercelActive = step === 1 || step === 3 || step === 5 || isPulseAll;
  const isGroqActive = step === 2 || isPulseAll;
  const isAwsActive = step === 2 || step === 4 || isPulseAll;

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center font-sans overflow-hidden">
      
      {/* Required CSS for the terminal typing effect without touching tailwind config */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes typing { from { width: 0; } to { width: 100%; } }
        @keyframes blink { 50% { border-color: transparent; } }
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
        .typewriter {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid currentColor;
          animation: typing 1.5s steps(40, end) forwards, blink 1s step-end infinite;
        }
      `}} />

      {/* Main 1920x1080 Reference Container */}
      <div className="relative w-full max-w-[1920px] aspect-video bg-[#0a0a0a] border border-neutral-900 shadow-2xl overflow-hidden">
        
        {/* === BACKGROUND GRID & SVG PATHS === */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)]"></div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1920 1080">
          <defs>
            {/* Base Paths mapped to Node Centers (Vercel: 960,300 | Groq: 480,700 | AWS: 1440,700) */}
            <path id="path-v-g" d="M 960 300 Q 720 500 480 700" fill="none" />
            <path id="path-g-v" d="M 480 700 Q 720 500 960 300" fill="none" />
            <path id="path-v-a" d="M 960 300 Q 1200 500 1440 700" fill="none" />
            <path id="path-a-v" d="M 1440 700 Q 1200 500 960 300" fill="none" />
            
            {/* Glowing Filters */}
            <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-yellow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Static Dashed Connection Lines */}
          <path d="M 960 300 Q 720 500 480 700" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" strokeDasharray="6 6" />
          <path d="M 960 300 Q 1200 500 1440 700" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" strokeDasharray="6 6" />
          <path d="M 480 700 Q 960 800 1440 700" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" strokeDasharray="6 6" />

          {/* === DYNAMIC DATA PACKETS (SVG animateMotion) === */}
          
          {/* Step 1: Vercel -> Groq (Blue text payload) */}
          {step === 1 && (
            <circle r="12" fill="#3b82f6" filter="url(#glow-blue)">
              <animateMotion dur="2s" repeatCount="indefinite"><mpath href="#path-v-g" /></animateMotion>
            </circle>
          )}

          {/* Step 2: Groq -> Vercel (Yellow JSON) AND Vercel -> AWS (Blue PutCommand) */}
          {step === 2 && (
            <>
              <circle r="12" fill="#eab308" filter="url(#glow-yellow)">
                <animateMotion dur="2s" repeatCount="indefinite"><mpath href="#path-g-v" /></animateMotion>
              </circle>
              <circle r="12" fill="#3b82f6" filter="url(#glow-blue)">
                <animateMotion dur="2s" repeatCount="indefinite" begin="0.8s"><mpath href="#path-v-a" /></animateMotion>
              </circle>
            </>
          )}

          {/* Step 3: Vercel -> AWS Rapid Proctoring (Green UpdateCommands) */}
          {step === 3 && (
            <>
              {[0, 0.4, 0.8].map(delay => (
                <circle key={delay} r="8" fill="#22c55e" filter="url(#glow-green)">
                  <animateMotion dur="1.2s" repeatCount="indefinite" begin={`${delay}s`}><mpath href="#path-v-a" /></animateMotion>
                </circle>
              ))}
            </>
          )}

          {/* Step 4: AWS -> Vercel (Green Session Data from Scan) */}
          {step === 4 && (
            <circle r="14" fill="#22c55e" filter="url(#glow-green)">
              <animateMotion dur="2s" repeatCount="indefinite"><mpath href="#path-a-v" /></animateMotion>
            </circle>
          )}
        </svg>

        {/* === ARCHITECTURE NODES === */}
        {/* Nodes use pure percentages to stay flawlessly aligned with the SVG viewBox across all resolutions */}

        {/* TOP CENTER: Vercel / Next.js */}
        <div className={`absolute left-[50%] top-[27.77%] -translate-x-1/2 -translate-y-1/2 w-80 p-6 rounded-2xl border transition-all duration-700 bg-neutral-950 flex flex-col items-center z-10
            ${isVercelActive ? 'border-white shadow-[0_0_40px_rgba(255,255,255,0.15)] scale-105' : 'border-neutral-800 scale-100 opacity-60'}`}>
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="white"/>
            </svg>
            <h2 className="text-2xl font-bold text-white tracking-tight">Vercel</h2>
          </div>
          <p className="text-sm text-neutral-400 mt-1 font-medium">Next.js Route Handlers</p>
          
          {/* Vercel Inner Dashboard (Heatmap) */}
          <div className="mt-6 w-full p-3 border border-neutral-800 rounded-lg bg-black h-32 flex flex-col justify-center">
            <div className="text-[10px] text-neutral-500 mb-2 uppercase tracking-widest text-center">Live Risk Analytics</div>
            <div className="grid grid-cols-3 gap-1 h-full w-full">
              {heatmapData.map((color, idx) => (
                <div key={idx} 
                  className={`w-full h-full rounded-sm transition-all duration-700 ease-out
                  ${step === 5 ? `${color} opacity-90 scale-100` : 'bg-neutral-900 opacity-20 scale-95'}`}
                  style={{ transitionDelay: step === 5 ? `${idx * 100}ms` : '0ms' }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM LEFT: Groq AI */}
        <div className={`absolute left-[25%] top-[64.81%] -translate-x-1/2 -translate-y-1/2 w-80 p-6 rounded-2xl border transition-all duration-700 bg-neutral-950 flex flex-col items-center z-10
            ${isGroqActive ? 'border-orange-500 shadow-[0_0_40px_rgba(249,115,22,0.2)] scale-105' : 'border-neutral-800 scale-100 opacity-60'}`}>
          <h2 className="text-2xl font-bold text-orange-500 tracking-tight">Groq AI</h2>
          <p className="text-sm text-neutral-400 mt-1 font-medium">Llama 3.1 Model</p>
          
          <div className="mt-6 w-full p-4 border border-neutral-800 rounded-lg bg-black h-28 flex flex-col items-center justify-center gap-2">
            <div className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Inference Engine</div>
            <div className="flex gap-1.5 items-end h-10">
              {/* Animated Equalizer indicating LLM generation */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-3 bg-orange-500 rounded-sm transition-all duration-150
                  ${step === 2 ? `animate-pulse h-${[6,10,8,10,6][i]}` : 'h-2'}`}
                  style={{ animationDelay: `${i * 150}ms` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM RIGHT: AWS DynamoDB */}
        <div className={`absolute left-[75%] top-[64.81%] -translate-x-1/2 -translate-y-1/2 w-96 p-6 rounded-2xl border transition-all duration-700 bg-neutral-950 flex flex-col items-center z-10
            ${isAwsActive ? 'border-sky-500 shadow-[0_0_40px_rgba(14,165,233,0.2)] scale-105' : 'border-neutral-800 scale-100 opacity-60'}`}>
          <h2 className="text-2xl font-bold text-sky-500 tracking-tight">AWS DynamoDB</h2>
          <p className="text-sm text-neutral-400 mt-1 font-medium">Serverless NoSQL</p>
          
          {/* AWS Interactive Terminal Log */}
          <div className="mt-6 w-full p-3 border border-neutral-800 rounded-lg bg-[#0a0a0a] h-32 font-mono text-[11px] flex flex-col justify-end items-start overflow-hidden relative">
            <div className="absolute top-2 right-3 text-neutral-600">SDK v3</div>
            
            {step < 2 && <div className="text-neutral-600 mb-1">&gt; Waiting for traffic...</div>}
            
            {step >= 2 && (
              <div className={`text-green-400 mb-1 inline-block ${step === 2 ? 'typewriter' : 'w-full'}`}>
                &gt; + PutCommand (Quizzes)
              </div>
            )}
            {step >= 3 && (
              <div className={`text-yellow-400 mb-1 inline-block ${step === 3 ? 'typewriter' : 'w-full'}`}>
                &gt; ~ UpdateCommand (QuizSessions)
              </div>
            )}
            {step >= 4 && (
              <div className={`text-blue-400 mb-1 inline-block ${step === 4 ? 'typewriter' : 'w-full'}`}>
                &gt; ~ ScanCommand (Filter: quizId)
              </div>
            )}
            
            <div className="w-2 h-3 bg-neutral-500 animate-pulse mt-1"></div>
          </div>
        </div>

    
      </div>
    </div>
  );
}