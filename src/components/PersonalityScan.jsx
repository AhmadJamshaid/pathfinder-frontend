import { useState, useRef, useEffect } from 'react';

const SCAN_QUESTIONS = [
  {
    id: 'interests',
    title: "What areas naturally attract your interests?",
    subtitle: "Think about topics you love exploring in your free time.",
    type: 'text',
    placeholder: "e.g., technology, design, business, psychology",
    required: true
  },
  {
    id: 'strengths',
    title: "What are you naturally good at or enjoy doing?",
    subtitle: "Think about tasks that feel effortless or what friends ask your help for.",
    type: 'text',
    placeholder: "e.g., problem solving, creativity, building things",
    required: true
  },
  {
    id: 'skill_level',
    title: "How would you describe your current skill level?",
    type: 'options',
    options: ['Just starting', 'Basic knowledge', 'Some experience', 'Confident']
  },
  {
    id: 'work_preference',
    title: "What kind of work environment suits you best?",
    type: 'options',
    options: ['Independent work', 'Small team', 'Large organization', 'Flexible / Remote Focus']
  },
  {
    id: 'career_intent',
    title: "Which path are you more inclined towards?",
    type: 'options',
    options: ['Full-time Job', 'Freelancing', 'Starting a Business', 'Not sure yet']
  },
  {
    id: 'time_commitment',
    title: "How much time can you realistically invest per week?",
    type: 'options',
    options: ['Less than 10 hours', '10–20 hours', '20+ hours', 'Full time (40+ hours)']
  },
  {
    id: 'core_goal',
    title: "What is your primary goal right now?",
    type: 'options',
    options: ['Earn money quickly', 'Build a long-term career', 'Follow my passion', 'Find a balanced mix']
  },
  {
    id: 'extra_depth',
    title: "Anything else that can help us guide you?",
    subtitle: "Any degrees, constraints, or wild dreams we should know about?",
    type: 'textarea',
    placeholder: "Optional: Tell us more about your background...",
    required: false
  }
];

export default function PersonalityScan({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [answers, setAnswers] = useState({});
  const [textInput, setTextInput] = useState('');
  const [direction, setDirection] = useState('forward'); // 'forward' | 'backward'
  
  const inputRef = useRef(null);
  const currentQuestion = SCAN_QUESTIONS[currentIndex];

  if (!currentQuestion) return null; // Safety render guard

  // Sync textInput with saved answers and focus input
  useEffect(() => {
    const savedAnswer = answers[currentQuestion.id];
    if (savedAnswer !== undefined && (currentQuestion.type === 'text' || currentQuestion.type === 'textarea')) {
      setTextInput(savedAnswer);
    } else {
      setTextInput('');
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, isAnimating]);

  const handleNext = (overrideAnswer = null) => {
    // Determine the final answer to save
    let finalAnswer = overrideAnswer !== null ? overrideAnswer : textInput;
    
    // If navigating via the header "Next" button on an options question, 
    // prioritize the already selected answer in state.
    if (overrideAnswer === null && currentQuestion.type === 'options' && answers[currentQuestion.id]) {
      finalAnswer = answers[currentQuestion.id];
    }
    
    // Use "Not provided" for skipped answers
    const processedAnswer = finalAnswer && finalAnswer.toString().trim() !== "" ? finalAnswer.toString().trim() : "Not provided";

    setAnswers(prev => ({ ...prev, [currentQuestion.id]: processedAnswer }));
    setDirection('forward');
    setIsAnimating(true);
    setTimeout(() => {
      if (currentIndex < SCAN_QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Here we would typically submit `answers` to an API.
        const finalResults = { ...answers, [currentQuestion.id]: finalAnswer };
        console.log("Final Answers: ", finalResults);
        onComplete?.(finalResults);
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      // Save current input before going back
      if (currentQuestion.type === 'text' || currentQuestion.type === 'textarea') {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: textInput }));
      }
      
      setDirection('backward');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && currentQuestion.type === 'text') {
      handleNext();
    }
  };

  const progressPercentage = ((currentIndex + 1) / SCAN_QUESTIONS.length) * 100;
  
  // Skipping is always allowed as per request
  const isContinueDisabled = false;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col min-h-[500px] md:min-h-[550px] bg-slate-900/40 p-5 sm:p-8 rounded-[2rem] md:rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-xl">
      {/* Header / Progress bar */}
      <div className="w-full mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={handleBack}
            disabled={currentIndex === 0}
            className={`p-2 rounded-lg transition-all duration-200 ${
              currentIndex === 0 
                ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed opacity-30' 
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 active:scale-95'
            }`}
            title={currentIndex === 0 ? "" : "Go back"}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={() => handleNext()}
            disabled={isContinueDisabled}
            className={`p-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
              isContinueDisabled
                ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed opacity-30' 
                : currentIndex === SCAN_QUESTIONS.length - 1
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 active:scale-95'
            }`}
            title={currentIndex === SCAN_QUESTIONS.length - 1 ? "Finish & Analyze" : "Next question"}
          >
            {currentIndex === SCAN_QUESTIONS.length - 1 ? (
              <>
                <span className="text-[10px] font-black uppercase tracking-wider ml-1 hidden sm:inline">Analyze</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
          <div className="flex-grow">
            <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
              <span>Question {currentIndex + 1} of {SCAN_QUESTIONS.length}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question Container */}
      <div className="flex-grow flex flex-col justify-center relative w-full overflow-hidden">
        <div 
          className={`w-full transition-all duration-300 ease-out
            ${isAnimating 
              ? `opacity-0 ${direction === 'forward' ? '-translate-x-12' : 'translate-x-12'}` 
              : 'opacity-100 translate-x-0'}
          `}
        >
          <div className="text-center px-2 w-full mx-auto max-w-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-100 mb-2 leading-tight">
              {currentQuestion.title}
            </h2>
            {currentQuestion.subtitle && (
              <p className="text-slate-400 mb-6 md:mb-10 text-xs sm:text-sm md:text-base px-2">
                {currentQuestion.subtitle}
              </p>
            )}
            {!currentQuestion.subtitle && <div className="mb-6 md:mb-10"></div>}
            
            <div className="flex flex-col gap-4 w-full">
              
              {/* Type: Text */}
              {currentQuestion.type === 'text' && (
                <>
                  <input
                    ref={inputRef}
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={currentQuestion.placeholder}
                    className="w-full px-5 py-3.5 md:px-6 md:py-4 rounded-xl border border-slate-700 bg-slate-950/50 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-base md:text-lg"
                  />
                  <button 
                    onClick={() => handleNext()}
                    disabled={isContinueDisabled}
                    className={`mt-4 w-full px-6 py-4 rounded-xl font-medium tracking-wide transition-all duration-300
                      ${isContinueDisabled 
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]'
                      }
                    `}
                  >
                    Continue
                  </button>
                </>
              )}

              {/* Type: Textarea */}
              {currentQuestion.type === 'textarea' && (
                <>
                  <textarea
                    ref={inputRef}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    rows="4"
                    className="w-full px-5 py-4 rounded-xl border border-slate-700 bg-slate-950/50 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-base resize-none"
                  />
                  <button 
                    onClick={() => handleNext()}
                    className="mt-4 w-full px-6 py-4 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]"
                  >
                    Finish & Analyze
                  </button>
                  {!currentQuestion.required && (
                    <button 
                      onClick={() => handleNext()}
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors py-2"
                    >
                      Skip this question
                    </button>
                  )}
                </>
              )}

              {/* Type: Options */}
              {currentQuestion.type === 'options' && (
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNext(option)}
                      className={`group w-full px-5 py-3.5 md:px-6 md:py-4 rounded-xl border transition-all duration-200 text-left font-medium flex items-center justify-between text-sm md:text-base
                        ${answers[currentQuestion.id] === option 
                          ? 'border-indigo-500 bg-indigo-600/10 text-white' 
                          : 'border-slate-700 bg-slate-800/40 hover:bg-indigo-600/10 hover:border-indigo-500 text-slate-200'}
                      `}
                    >
                      <span>{option}</span>
                      <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-colors
                        ${answers[currentQuestion.id] === option ? 'border-indigo-500' : 'border-slate-600 group-hover:border-indigo-500'}
                      `}>
                        <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-indigo-500 transition-opacity
                          ${answers[currentQuestion.id] === option ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                        `} />
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
