'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '@/components/navigation/sidebar';
import AnalysisSteps from '@/components/home/AnalysisSteps';
import CompanyList from '@/components/home/CompanyList';
import SearchSettings from '@/components/home/SearchSettings';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { Users } from 'lucide-react';
import { dummyCompanies, analysisSteps } from '@/app/data/dummyData';
import { planSearchStrategy, runDeepAnalysisFlow } from '@/backend/orchid';

interface Buyer {
  name: string;
  role: string;
  timing: string;
  relevance: 'High' | 'Medium' | 'Low';
}

interface Interaction {
  date: string;
  details: string;
  outcome: 'Positive' | 'Neutral' | 'Pending';
}

interface BuyerDetail extends Buyer {
  imageUrl: string;
  title: string;
  responsibility: string;
  linkedin?: string;
  twitter?: string;
  department?: string;
  influence?: 'Decision Maker' | 'Influencer' | 'Champion';
  lastActive?: string;
  avatar?: string; // We'll use better avatars
}

import { Globe, Link, FileText } from 'lucide-react';

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return minutes > 0 
    ? `${minutes}m ${remainingSeconds}s`
    : `${remainingSeconds}s`;
};

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [reasoningLevel, setReasoningLevel] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [iconSettings, setIconSettings] = useState({
    crm: true,
    pressReleases: true,
    earningsCalls: true,
    personData: true,
  });
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [analysisFlow, setAnalysisFlow] = useState<{ steps: { step_title: string; queries: string[] }[]; partialResults: any[]; finalAnswer?: string }>({
    steps: [],
    partialResults: []
  });
  const [finalCompanies, setFinalCompanies] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 1;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSearching) { // Only count time during analysis
      interval = setInterval(() => {
        setTotalElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSearching]); // Remove showResults dependency

  const reasoningOptions: Array<'Low' | 'Medium' | 'High'> = ['Low', 'Medium', 'High'];
  const toggleReasoning = () => {
    const nextIndex = (reasoningOptions.indexOf(reasoningLevel) + 1) % reasoningOptions.length;
    setReasoningLevel(reasoningOptions[nextIndex]);
  };

  const toggleIcon = (key: keyof typeof iconSettings) => {
    setIconSettings({ ...iconSettings, [key]: !iconSettings[key] });
  };

  const canSearch = searchQuery.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSearch || isSearching) return;
    handleSearch();
  };

  const handleSearch = async () => {
    if (isSearching) return;
    
    setError(null);
    setIsSearching(true);
    setShowResults(false);
    setCurrentStep(0);
    setCompletedSteps([]);
    setAnalysisFlow({ steps: [], partialResults: [] });

    const attemptFetch = async (url: string, body: any, attempt: number): Promise<any> => {
        try {
            console.log(`Attempting request ${attempt + 1}/${MAX_RETRIES}`);
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message || 'Server returned an error');
            }

            return data;

        } catch (err: any) {
            console.error(`Attempt ${attempt + 1} failed:`, err);
            if (attempt < MAX_RETRIES - 1) {
                await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
                return attemptFetch(url, body, attempt + 1);
            }
            throw err;
        }
    };

    try {
        // Phase 1: Get search plan
        const planData = await attemptFetch(
            'http://localhost:3699/api/plan',
            { query: searchQuery },
            0
        );

        // Immediately log and show planned steps
        console.log('Planned Steps:', planData.steps);
        setAnalysisFlow(prev => ({
            ...prev,
            steps: planData.steps.map((step: any) => ({
                step_title: step.step_title,
                queries: step.queries || []
            }))
        }));
        setCurrentStep(0);

        // Phase 2: Execute analysis with received plan
        const analysisData = await attemptFetch(
            'http://localhost:3699/api/deepAnalysis',
            {
                query: searchQuery,
                steps: planData.steps
            },
            0
        );

        // Update progress state
        analysisData.progress?.forEach((p: any, idx: number) => {
            setCurrentStep(idx);
            setCompletedSteps(prev => [...prev, idx]);
        });

        // Set final results
        setAnalysisFlow(prev => ({
            ...prev,
            partialResults: analysisData.results.partialResults,
            finalAnswer: JSON.stringify(analysisData.results.companies)
        }));

        setFinalCompanies(analysisData.results.companies);
        setShowResults(true);

    } catch (err: any) {
        setError(err.message || 'Failed to complete analysis');
        console.error('Search failed:', err);
    } finally {
        setIsSearching(false);
    }
};

  return (
    <div className="h-screen w-screen flex bg-white overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="w-64 fixed h-screen bg-white">
        <Sidebar currentPage={currentPage} />
      </div>

      {/* Main content - with background effect container */}
      <div className="flex-1 ml-64 h-screen overflow-y-auto scrollbar-hide relative" style={{ WebkitOverflowScrolling: 'touch' }}>
        {/* Fixed background effect */}
        {!isSearching && !showResults && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-[120px] z-0 pointer-events-none">
            <div
              className="w-[800px] h-[250px] rounded-full blur-[120px]"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255, 198, 10, 0.34), rgba(199, 149, 108, 0))'
              }}
            />
          </div>
        )}

        {/* Scrollable content */}
        <div className="min-h-screen flex items-center justify-center relative p-12">
          <div className="w-full max-w-5xl mx-auto relative z-10">
            <AnimatePresence mode="wait">
              {/* Search Input Section */}
              {!isSearching && !showResults && (
                <motion.div
                  key="search"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full flex flex-col items-center px-28 space-y-5"
                >
                  <h1 className="text-[42px] text-gray-600 tracking-tight font-[250] font-instrument-serif">
                    Hi Avi - find your next account
                  </h1>
                  <form onSubmit={handleSubmit} className="w-full relative mx-auto">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                    />
                    <motion.input
                      type="text"
                      placeholder="Find me idaho media companies with more than 25 ad sales employees..."
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      className={`
                      w-full h-14 pl-12 pr-16 text-sm bg-white border 
                      ${isInputFocused ? 'border-5 border-yellow-600' : 'border-gray-200'} 
                      rounded-[7.5px] focus:border-5 focus:border-yellow-600 focus:outline-none transition-colors text-gray-800
                      `}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      // Continuous modern, subtle pulsating glow animation
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(255,198,10,0)",
                          "0 0 4px rgba(255,198,10,0.1)",
                          "0 0 0px rgba(255,198,10,0)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                    <button
                      type="submit"
                      disabled={!canSearch}
                      onClick={handleSubmit}
                      className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-md transition-colors ${
                        canSearch
                          ? 'bg-gray-900 text-white hover:bg-gray-800'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                  {/* Search Settings: Right aligned icons with on/off styling */}
                  <SearchSettings
                    iconSettings={iconSettings}
                    toggleIcon={toggleIcon}
                    reasoningLevel={reasoningLevel}
                    toggleReasoning={toggleReasoning}
                  />
                </motion.div>
              )}

              {/* Analysis Steps Section */}
              {isSearching && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center"
                >
                  <AnalysisSteps
                    analysisSteps={analysisFlow.steps.length > 0 ? analysisFlow.steps : analysisSteps}
                    currentStep={currentStep}
                    completedSteps={completedSteps}
                  />
                </motion.div>
              )}

              {/* Results Section */}
              {showResults && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4"
                >
                  {/* Updated title section */}
                  <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl text-gray-900 font-[350]">Companies Found</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="tabular-nums">Took {formatTime(totalElapsedTime)}</span>
                      <span>|</span>
                      <p>Found {finalCompanies.length} matches</p>
                    </div>
                  </div>

                  <CompanyList companies={finalCompanies.length ? finalCompanies : dummyCompanies} />

                  {/* Updated CRM Button */}
                  <div className="mt-6 flex justify-end">
                    <button className="flex items-center gap-2 px-2.5 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                      <Image
                        src="https://1000logos.net/wp-content/uploads/2017/08/Salesforce-logo.jpg"
                        alt="Salesforce"
                        width={16}
                        height={16}
                        className="opacity-80"
                      />
                      <span className="text-sm text-gray-600">Add All to CRM</span>
                      {/* <Users className="h-3.5 w-3.5 text-gray-400" /> */}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {error && (
        <div className="fixed top-4 right-4 bg-red-50 text-red-600 px-4 py-2 rounded-md shadow-sm">
          {error}
          <button 
            onClick={() => handleSearch()} 
            className="ml-2 underline"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}