'use client';

import { useState } from 'react';
import { Search, CheckCircle2, Loader2, ArrowRight, Users, FileText, Phone, User as IconUser } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '@/components/navigation/sidebar';
import { ICON_BORDER_RADIUS, THEME } from '@/lib/universalVariables';
import { Tooltip } from '@/components/ui/tooltip';

const analysisSteps = [
  "Scanning Idaho market data...",
  "Analyzing company financials...",
  "Evaluating market readiness...",
  "Processing growth indicators...",
  "Calculating opportunity scores...",
  "Preparing final recommendations..."
];

const dummyCompanies = [
  { 
    name: 'Alpine Tech Solutions',
    revenue: '$2.3M',
    readiness: '87%',
    location: 'Boise',
    growth: '+24% YoY',
    employees: '45-50',
    industry: 'Software Development',
    logo: '🏔️'
  },
  { 
    name: 'Idaho Innovators Inc',
    revenue: '$1.8M',
    readiness: '92%',
    location: 'Meridian',
    growth: '+31% YoY',
    employees: '30-35',
    industry: 'Tech Consulting',
    logo: '💡'
  },
  { 
    name: 'Gem State Digital',
    revenue: '$3.1M',
    readiness: '85%',
    location: 'Nampa',
    growth: '+18% YoY',
    employees: '60-70',
    industry: 'Digital Marketing',
    logo: '💎'
  },
  { 
    name: 'Mountain Data Systems',
    revenue: '$4.2M',
    readiness: '78%',
    location: 'Idaho Falls',
    growth: '+22% YoY',
    employees: '80-90',
    industry: 'Data Analytics',
    logo: '📊'
  },
  { 
    name: 'Sawtooth Solutions',
    revenue: '$2.7M',
    readiness: '90%',
    location: 'Twin Falls',
    growth: '+28% YoY',
    employees: '40-45',
    industry: 'Cloud Services',
    logo: '☁️'
  },
  { 
    name: 'Cascade Computing',
    revenue: '$1.5M',
    readiness: '95%',
    location: 'Pocatello',
    growth: '+35% YoY',
    employees: '25-30',
    industry: 'IT Services',
    logo: '🌊'
  },
  { 
    name: 'Silver Valley Tech',
    revenue: '$2.9M',
    readiness: '82%',
    location: 'Coeur d\'Alene',
    growth: '+20% YoY',
    employees: '50-55',
    industry: 'Hardware Solutions',
    logo: '⚡'
  },
];

const SearchSettings = ({ iconSettings, toggleIcon, reasoningLevel, toggleReasoning }: any) => {
  const icons = [
    { key: 'crm', icon: Users, title: 'CRM' },
    { key: 'pressReleases', icon: FileText, title: 'Press Releases' },
    { key: 'earningsCalls', icon: Phone, title: 'Earnings Calls' },
    { key: 'personData', icon: IconUser, title: 'Person Data' },
  ];

  return (
    <div className="flex gap-4 mt-4 justify-end w-full">
      {icons.map(({ key, icon: Icon, title }) => (
        <Tooltip key={key} content={title}>
          <button 
            type="button"
            onClick={() => toggleIcon(key as keyof typeof iconSettings)}
            className={`
              w-9 h-9 flex items-center justify-center
              transition-all duration-200 ease-in-out
              bg-white hover:bg-gray-50
              ${iconSettings[key as keyof typeof iconSettings] 
                ? 'border border-gray-300' 
                : ''
              }
            `}
            style={{ borderRadius: ICON_BORDER_RADIUS }}
          >
            <Icon className="h-4 w-4 text-gray-700" />
          </button>
        </Tooltip>
      ))}
      <Tooltip content={`Reasoning Level: ${reasoningLevel}`}>
        <button 
          type="button"
          onClick={toggleReasoning}
          className="px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800 transition-colors"
          style={{ borderRadius: ICON_BORDER_RADIUS }}
        >
          {reasoningLevel}
        </button>
      </Tooltip>
    </div>
  );
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

  const handleSearch = () => {
    if (isSearching) return;
    
    setIsSearching(true);
    setShowResults(false);
    setCurrentStep(0);
    setCompletedSteps([]);
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const newStep = prev + 1;
        setCompletedSteps(steps => [...steps, prev]);
        
        if (newStep >= analysisSteps.length) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSearching(false);
            setShowResults(true);
          }, 800); // Increased from 500
        }
        return newStep;
      });
    }, 1200); // Increased from 800
  };

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar currentPage={currentPage} />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center relative p-12">
          {/* Golden background only shows on initial search screen */}
          {!isSearching && !showResults && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[120px] z-0">
              <div
                className="w-[800px] h-[250px] rounded-full blur-[120px]"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255, 198, 10, 0.34), rgba(199, 149, 108, 0))'
                }}
              />
            </div>
          )}
          
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
                    Hi Avi - find your next customer
                    </h1>
                    <form onSubmit={handleSubmit} className="w-full relative mx-auto">
                    <Search 
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" 
                    />
                    <motion.input
                      type="text"
                      placeholder="Find me customers likely ready to buy in Idaho..."
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
                  <div className="space-y-4"> {/* Increased spacing between items */}
                    {analysisSteps.map((step, index) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4" // Increased icon spacing
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-gray-900"
                        >
                          {currentStep === index ? (
                            <Loader2 className="h-5 w-5 animate-spin" /> // Increased icon size
                          ) : completedSteps.includes(index) ? (
                            <CheckCircle2 className="h-5 w-5" /> // Increased icon size
                          ) : (
                            <div className="h-5 w-5" /> // Increased placeholder size
                          )}
                        </motion.div>
                        <span className="text-base text-gray-600">{step}</span> {/* Increased text size */}
                      </motion.div>
                    ))}
                  </div>
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
                  {/* Added title section */}
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl text-gray-900 font-[350]">Companies Found</h2>
                    <p className="text-sm text-gray-500">Found {dummyCompanies.length} matches</p>
                  </div>
                  
                  {/* Updated border styling to match items */}
                  <div className="rounded-lg overflow-hidden border border-gray-100">
                    {dummyCompanies.map((company, index) => (
                      <motion.div
                        key={company.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }} // Increased from 0.1
                        className="bg-white hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="px-6 py-4">
                          <div className="flex items-center gap-6">
                            <div className="flex-none text-2xl">{company.logo}</div>
                            <div className="flex-1 grid grid-cols-4 gap-6">
                              <div className="space-y-1">
                                <p className="text-sm font-[450] text-gray-900">{company.name}</p>
                                <p className="text-xs text-gray-500">{company.location}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-900 font-[350]">{company.revenue}</p> {/* Reduced boldness */}
                                <p className="text-xs text-emerald-600 font-medium">{company.growth}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-600">{company.employees}</p>
                                <p className="text-xs text-gray-500">{company.industry}</p>
                              </div>
                              <div className="text-right">
                                <div className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1">
                                  <span className="text-xs font-medium text-emerald-700">
                                    {company.readiness} Ready
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}