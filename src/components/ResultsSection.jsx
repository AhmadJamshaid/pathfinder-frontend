import { useEffect, useState } from 'react';

export default function ResultsSection({ answers, onRestart }) {
  const [expandedIdx, setExpandedIdx] = useState(0); // Default expand the first one
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="w-full flex flex-col items-center animate-fade-in opacity-0">
      {/* Decorative Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-purple-600/10 blur-[120px]"></div>
        <div className="absolute top-[40%] right-[10%] w-[25%] h-[25%] rounded-full bg-blue-600/5 blur-[100px]"></div>
      </div>

      {/* Header Section */}
      <div className="text-center w-full max-w-3xl mb-12 md:mb-16 relative z-10 px-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6 md:mb-8 font-semibold text-[10px] md:text-[11px] uppercase tracking-[0.2em] animate-pulse">
          <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Analysis Complete
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 md:mb-6 text-white leading-[1.1]">
          Your Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 drop-shadow-sm">Future Path</span>
        </h2>
        <p className="text-base md:text-lg text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
          We've processed your profile through our market engine to synthesize a high-probability career roadmap.
        </p>
      </div>

      {/* Main Results Stack */}
      <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pb-12">
        
        {/* Suggested Careers */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/20 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-semibold text-indigo-400 uppercase tracking-widest mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Suggested Careers
            </h3>
            
            <div className="space-y-4">
              {answers?.careers?.map((career, idx) => {
                const labels = ["Top Choice", "Second Best", "Third Best"];
                const isExpanded = expandedIdx === idx;
                
                return (
                  <div 
                    key={idx} 
                    className={`overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border transition-all duration-700 relative backdrop-blur-md group/card ${
                      isExpanded 
                        ? 'border-indigo-500/40 bg-slate-900/60 shadow-[0_20px_50px_rgba(79,70,229,0.15)] md:scale-[1.02]' 
                        : 'border-slate-800/60 bg-slate-900/30 hover:border-slate-600 cursor-pointer shadow-xl hover:bg-slate-900/50 hover:shadow-indigo-500/5'
                    } ${idx === 0 ? 'ring-1 ring-indigo-500/30 shadow-[0_0_20px_rgba(79,70,229,0.1)]' : ''}`}
                    onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                  >
                    {/* Animated Border Gradient for Expanded State */}
                    {isExpanded && (
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>
                    )}

                    {/* Ranking Label */}
                    <div className={`absolute top-0 right-0 text-[9px] font-black px-6 py-2 rounded-bl-3xl shadow-lg flex items-center gap-2 z-10 uppercase tracking-[0.2em] transition-colors duration-500 ${
                      isExpanded ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${isExpanded ? 'bg-white animate-pulse' : 'bg-slate-600'}`}></div>
                      {labels[idx]}
                    </div>

                    {/* Card Header (Always Visible) */}
                    <div className="p-6 md:p-8 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg border ${
                          isExpanded ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400' : 'bg-slate-800 border-slate-700 text-slate-500'
                        }`}>
                          {idx + 1}
                        </div>
                        <h4 className={`text-xl md:text-2xl font-bold transition-colors ${isExpanded ? 'text-white' : 'text-slate-300'}`}>
                          {career.title}
                        </h4>
                      </div>
                      
                      <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-indigo-400' : 'text-slate-500'}`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-6 md:px-8 pb-8 space-y-6 border-t border-slate-800/50 pt-6">
                        
                        {/* Tags */}
                        <div 
                          className="flex gap-3 flex-wrap transition-all duration-500"
                          style={{ transitionDelay: isExpanded ? '100ms' : '0ms', transform: isExpanded ? 'translateY(0)' : 'translateY(10px)' }}
                        >
                          <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider">
                            {career.match}% Match
                          </span>
                          <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-700 text-slate-300 text-xs font-medium">
                            {career.demandTag}
                          </span>
                          {career.attributeTag && (
                            <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-700 text-slate-300 text-xs font-medium">
                              {career.attributeTag}
                            </span>
                          )}
                        </div>

                        {/* Role Overview & Why Fit */}
                        <div 
                          className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500"
                          style={{ transitionDelay: isExpanded ? '200ms' : '0ms', transform: isExpanded ? 'translateY(0)' : 'translateY(10px)' }}
                        >
                          <div className="space-y-4">
                            <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                              <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Role Overview
                            </h5>
                            <p className="text-slate-300 leading-relaxed text-sm font-light">
                              {career.role_overview}
                            </p>
                          </div>
                          <div className="bg-slate-950/40 p-5 rounded-2xl border border-indigo-500/10">
                            <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2 block flex items-center gap-2">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Why It Fits You
                            </span>
                            <p className="text-slate-300 text-sm italic">"{career.why_fit}"</p>
                          </div>
                        </div>

                        {/* Metrics Grid */}
                        <div 
                          className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500"
                          style={{ transitionDelay: isExpanded ? '300ms' : '0ms', transform: isExpanded ? 'translateY(0)' : 'translateY(10px)' }}
                        >
                          <div className="p-6 rounded-2xl bg-slate-950/50 border border-green-500/10 hover:border-green-500/20 transition-colors">
                            <div className="text-[9px] text-green-500/80 mb-3 uppercase tracking-[0.2em] font-black flex items-center gap-2">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Income Potential
                            </div>
                            <div className="text-xl font-bold text-green-400">{career.income}</div>
                          </div>
                          <div className="p-6 rounded-2xl bg-slate-950/50 border border-purple-500/10 hover:border-purple-500/20 transition-colors">
                            <div className="text-[9px] text-purple-500/80 mb-3 uppercase tracking-[0.2em] font-black flex items-center gap-2">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Time to Earn
                            </div>
                            <div className="text-xl font-bold text-purple-300">{career.time_to_earn}</div>
                          </div>
                        </div>

                        {/* Skills */}
                        <div 
                          className="transition-all duration-500"
                          style={{ transitionDelay: isExpanded ? '400ms' : '0ms', transform: isExpanded ? 'translateY(0)' : 'translateY(10px)' }}
                        >
                          <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.642.321a2 2 0 01-1.584 0l-.642-.321a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-1.167 1.167a2 2 0 000 2.828l1.167 1.167a2 2 0 001.022.547l2.387.477a6 6 0 003.86-.517l.642-.321a2 2 0 011.584 0l.642.321a6 6 0 003.86.517l2.387-.477a2 2 0 001.022-.547l1.167-1.167a2 2 0 000-2.828l-1.167-1.167z" />
                            </svg>
                            Required Skills
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {career.skills?.map((skill, sIdx) => (
                              <span 
                                key={sIdx} 
                                title={skill.simple_explanation}
                                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border cursor-help transition-all duration-200 hover:scale-105 active:scale-95 ${
                                  skill.type === 'core' 
                                    ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/20 shadow-lg shadow-indigo-500/5' 
                                    : skill.type === 'secondary'
                                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                                    : 'bg-pink-500/10 text-pink-300 border-pink-500/30 hover:bg-pink-500/20 shadow-lg shadow-pink-500/5'
                                }`}
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Roadmap */}
                        <div 
                          className="transition-all duration-500"
                          style={{ transitionDelay: isExpanded ? '500ms' : '0ms', transform: isExpanded ? 'translateY(0)' : 'translateY(10px)' }}
                        >
                          <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L16 4m0 13V4m0 0L9 7" />
                            </svg>
                            Step-by-step Execution
                          </h5>
                          <div className="space-y-4 relative">
                            {/* Vertical Line for Timeline */}
                            <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-slate-800 z-0"></div>
                            
                            {career.roadmap?.map((step, rIdx) => (
                              <div key={rIdx} className="flex gap-4 p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 items-start relative z-10 hover:bg-slate-900/50 transition-colors">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold border border-indigo-400 shadow-lg shadow-indigo-500/20 font-mono text-[10px] mt-0.5">
                                  {rIdx + 1}
                                </div>
                                <div>
                                  <h6 className="font-bold text-slate-200 text-sm mb-1">{step.title}</h6>
                                  <p className="text-xs text-slate-400 leading-relaxed font-light">{step.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Global Sections (Deep data nested above) */}

        {/* Reality Check */}
        <div className="p-6 sm:p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-orange-500/20 bg-slate-900/40 backdrop-blur-md relative overflow-hidden shadow-2xl group">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 text-orange-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            Reality Check
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {[
              { label: 'Competition Level', value: answers?.reality_check?.competition, color: 'text-orange-400' },
              { label: 'Risk Level', value: answers?.reality_check?.risk, color: 'text-red-400' },
              { label: 'Effort Required', value: answers?.reality_check?.effort, color: 'text-yellow-400' }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-black/30 border border-slate-800 hover:border-orange-500/20 transition-all duration-300 hover:bg-black/40 shadow-inner">
                <div className="text-[10px] text-slate-500 mb-3 uppercase tracking-[0.2em] font-black">{item.label}</div>
                <p className={`text-sm leading-relaxed ${item.color} font-medium`}>
                  {item.value || "Evaluating..."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Alternative Paths & What to Avoid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alternative Paths */}
          {answers?.alternative_paths && answers.alternative_paths.length > 0 && (
            <div className="p-6 sm:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-800 bg-slate-900/40 backdrop-blur-md shadow-2xl">
              <h3 className="text-lg md:text-xl font-bold text-white mb-6 md:mb-8 flex items-center gap-4">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20 text-teal-400">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                Alternative Paths
              </h3>
              <div className="space-y-4">
                {answers.alternative_paths.map((alt, idx) => (
                  <div key={idx} className="p-5 md:p-6 rounded-2xl bg-black/20 border border-slate-800 border-l-4 border-l-teal-500/50 hover:bg-black/30 transition-colors shadow-inner">
                    <h4 className="text-base md:text-lg font-bold text-slate-100 mb-1 md:mb-2">{alt.title}</h4>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-light">{alt.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What To Avoid */}
          {answers?.what_to_avoid && answers.what_to_avoid.length > 0 && (
            <div className="p-6 sm:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-red-500/20 bg-slate-900/40 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl"></div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-6 md:mb-8 flex items-center gap-4 relative z-10">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                What To Avoid
              </h3>
              <div className="space-y-4 relative z-10">
                {answers.what_to_avoid.map((item, idx) => (
                  <div key={idx} className="flex gap-3 md:gap-4 p-4 md:p-5 rounded-2xl bg-black/30 border border-red-500/10 items-start hover:bg-black/40 transition-colors shadow-inner">
                    <div className="mt-1 p-1 rounded bg-red-500/20 text-red-400">
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-red-300 mb-1">{item.pitfall}</h4>
                      <p className="text-[11px] md:text-sm text-slate-400 leading-relaxed font-light">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Retake Button */}
        <div className="pt-4 flex justify-center w-full">
          <button 
            onClick={onRestart}
            className="px-8 py-4 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 font-medium hover:bg-slate-800 hover:text-white transition-all shadow-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retake AI Scan
          </button>
        </div>

      </div>
    </div>
  );
}
