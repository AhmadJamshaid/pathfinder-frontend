import { useState } from 'react'
import PersonalityScan from './components/PersonalityScan'
import ResultsSection from './components/ResultsSection'

function App() {
  const [appState, setAppState] = useState('home') // 'home' | 'scanning' | 'results'
  const [scanAnswers, setScanAnswers] = useState(null)
  const [isCooldown, setIsCooldown] = useState(false)

  const handleScanComplete = async (answers) => {
    setAppState('loading');
    
    // Add artificial delay to respect rate limits and improve perceived value
    const minimumWait = new Promise(resolve => setTimeout(resolve, 5000));
    
    try {
      const response = await fetch('https://pathfinder-backend-two.vercel.app/api/analyze-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers)
      });
      
      const result = await response.json();
      console.log("FULL RESPONSE:", JSON.stringify(result, null, 2));
      
      if (result.success) {
        await minimumWait; // Ensure at least 5s has passed
        setScanAnswers(result.data);
        setAppState('results');
        
        // Activate cooldown after successful scan
        setIsCooldown(true);
        setTimeout(() => setIsCooldown(false), 10000); // 10s cooldown
      } else {
        console.error("API returned an error:", result.error);
        setAppState('error');
      }
    } catch (error) {
      console.error("Failed to connect to backend", error);
      setAppState('error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setAppState('home')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              PF
            </div>
            <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 hover:brightness-110 transition-all">
              PathFinder AI
            </h1>
          </div>
          <nav>
            <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
              About
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center max-w-5xl">
        
        {appState === 'home' && (
          <div className="text-center w-full space-y-8 animate-fade-in opacity-0 max-w-4xl mx-auto">
            
            {/* Hero Section */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">True Path</span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-light">
                Realistic Career Guidance powered by Artificial Intelligence
              </p>
            </div>

            {/* Call to Action Container */}
            <div className="pt-8 mb-16">
              <button 
                onClick={() => !isCooldown && setAppState('scanning')}
                disabled={isCooldown}
                className={`group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-8 font-medium transition-all duration-300 ${
                  isCooldown 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                    : 'bg-indigo-600 text-neutral-50 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]'
                }`}
              >
                <span className="flex items-center gap-2 relative z-10">
                  {isCooldown ? 'Cooldown active (Wait 10s)' : 'Start Personality Scan'}
                  {!isCooldown && (
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  )}
                </span>
                {!isCooldown && (
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)] z-0">
                    <div className="relative h-full w-8 bg-white/20" />
                  </div>
                )}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
              {[
                { title: 'AI Guided', desc: 'Personalized career roadmaps based on your skills and market trends.' },
                { title: 'Realistic Steps', desc: 'Actionable advice, courses, and milestones to achieve your goals.' },
                { title: 'Market Insights', desc: 'Real-time data on job demand, salary expectations, and skills needed.' }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
                  <h3 className="text-lg font-semibold text-slate-200 mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>

          </div>
        )}

        {appState === 'scanning' && (
          <div className="w-full max-w-4xl mx-auto animate-fade-in-fast opacity-0">
            <PersonalityScan onComplete={handleScanComplete} />
          </div>
        )}

        {appState === 'loading' && (
          <div className="w-full max-w-lg mx-auto text-center space-y-10 py-20 relative z-10">
            {/* Pulsing Outer Ring */}
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-l-purple-500 border-r-transparent border-b-transparent animate-spin"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                <svg className="w-8 h-8 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 tracking-tight">
                Synthesizing Your Future
              </h2>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-[0.2em] animate-pulse">
                  Analyzing Personality Data
                </p>
                <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 animate-[loading_5s_ease-in-out_infinite]"></div>
                </div>
              </div>
              <p className="text-slate-500 text-xs italic max-w-xs mx-auto">
                "Our AI is scanning thousands of market opportunities to find your perfect match..."
              </p>
            </div>
          </div>
        )}

        {appState === 'error' && (
          <div className="w-full max-w-lg mx-auto text-center space-y-6 py-20 animate-fade-in">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-red-500/20">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-400">
              Something went wrong. Please try again.
            </h2>
            <button 
              onClick={() => setAppState('home')}
              className="mt-6 px-8 py-3 rounded-xl border border-slate-700 bg-slate-900 text-white font-medium hover:bg-slate-800 transition"
            >
              Back to Home
            </button>
          </div>
        )}

        {appState === 'results' && (
          <ResultsSection answers={scanAnswers} onRestart={() => setAppState('home')} />
        )}
        
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} PathFinder AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
