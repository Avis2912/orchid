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

interface Buyer {
  name: string;
  role: string;
  timing: string;
  relevance: 'High' | 'Medium' | 'Low';
}

interface Interaction {
  type: string;
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
    logo: '🏔️',
    sources: {
      count: 4,
      details: [
        { type: 'Website', url: 'alpinetech.com', date: '2 days ago', icon: Globe },
        { type: 'Press Release', url: 'PR: Q2 Growth', date: 'Last week', icon: FileText },
        { type: 'Blog Post', url: 'Tech Expansion Plans', date: '2 weeks ago', icon: Link },
      ]
    },
    reasoning: "High growth rate combined with recent expansion signals readiness for new solutions. Their tech stack shows gaps in key areas matching your offering.",
    tags: ['Series A', 'High Growth', 'Tech-enabled', 'Product-led', 'Market Leader'],
    interactions: [
      { type: 'Email Campaign', date: '2 weeks ago', details: 'Responded positively to cloud solutions', outcome: 'Positive' },
      { type: 'Sales Call', date: 'Last month', details: 'Discussed implementation timeline', outcome: 'Neutral' },
      { type: 'Demo Request', date: 'Yesterday', details: 'Requested product demo', outcome: 'Pending' },
    ] as Interaction[],
    buyers: [
      {
        name: 'Sarah Chen',
        role: 'Head of Engineering',
        timing: 'Active Search',
        relevance: 'High',
        imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        title: 'Senior Director of Engineering',
        responsibility: 'Leads technical infrastructure decisions and oversees cloud migration initiatives',
        linkedin: 'sarahchen',
        twitter: 'schen_tech'
      },
      { name: 'Michael Torres', role: 'VP Technology', timing: 'Planning Phase', relevance: 'High', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg', title: 'VP of Technology', responsibility: 'Oversees all technology-related operations and initiatives' },
      { name: 'Jamie Roberts', role: 'Engineering Manager', timing: 'Evaluating', relevance: 'Medium', imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg', title: 'Engineering Manager', responsibility: 'Manages engineering teams and evaluates new technologies' },
    ] as BuyerDetail[]
  },
  {
    name: 'Idaho Innovators Inc',
    revenue: '$1.8M',
    readiness: '92%',
    location: 'Meridian',
    growth: '+31% YoY',
    employees: '30-35',
    industry: 'Tech Consulting',
    logo: '💡',
    sources: {
      count: 4,
      details: [
        { type: 'Website', url: 'idahoinnovators.com', date: '2 days ago', icon: Globe },
        { type: 'Press Release', url: 'PR: Q2 Growth', date: 'Last week', icon: FileText },
        { type: 'Blog Post', url: 'Tech Expansion Plans', date: '2 weeks ago', icon: Link },
      ]
    },
    reasoning: "High growth rate combined with recent expansion signals readiness for new solutions. Their tech stack shows gaps in key areas matching your offering.",
    tags: ['Series A', 'High Growth', 'Tech-enabled', 'Product-led'],
    interactions: [
      { type: 'Email Campaign', date: '2 weeks ago', details: 'Responded positively to cloud solutions', outcome: 'Positive' },
      { type: 'Sales Call', date: 'Last month', details: 'Discussed implementation timeline', outcome: 'Neutral' },
      { type: 'Demo Request', date: 'Yesterday', details: 'Requested product demo', outcome: 'Pending' },
    ] as Interaction[],
    buyers: [
      {
        name: 'Sarah Chen',
        role: 'Head of Engineering',
        timing: 'Active Search',
        relevance: 'High',
        imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        title: 'Senior Director of Engineering',
        responsibility: 'Leads technical infrastructure decisions and oversees cloud migration initiatives',
        linkedin: 'sarahchen',
        twitter: 'schen_tech'
      },
      { name: 'Michael Torres', role: 'VP Technology', timing: 'Planning Phase', relevance: 'High', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg', title: 'VP of Technology', responsibility: 'Oversees all technology-related operations and initiatives' },
      { name: 'Jamie Roberts', role: 'Engineering Manager', timing: 'Evaluating', relevance: 'Medium', imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg', title: 'Engineering Manager', responsibility: 'Manages engineering teams and evaluates new technologies' },
    ] as BuyerDetail[]
  },
  {
    name: 'Gem State Digital',
    revenue: '$3.1M',
    readiness: '85%',
    location: 'Nampa',
    growth: '+18% YoY',
    employees: '60-70',
    industry: 'Digital Marketing',
    logo: '💎',
    sources: {
      count: 4,
      details: [
        { type: 'Website', url: 'gemstatedigital.com', date: '2 days ago', icon: Globe },
        { type: 'Press Release', url: 'PR: Q2 Growth', date: 'Last week', icon: FileText },
        { type: 'Blog Post', url: 'Tech Expansion Plans', date: '2 weeks ago', icon: Link },
      ]
    },
    reasoning: "High growth rate combined with recent expansion signals readiness for new solutions. Their tech stack shows gaps in key areas matching your offering.",
    tags: ['Series A', 'High Growth', 'Tech-enabled', 'Product-led'],
    interactions: [
      { type: 'Email Campaign', date: '2 weeks ago', details: 'Responded positively to cloud solutions', outcome: 'Positive' },
      { type: 'Sales Call', date: 'Last month', details: 'Discussed implementation timeline', outcome: 'Neutral' },
      { type: 'Demo Request', date: 'Yesterday', details: 'Requested product demo', outcome: 'Pending' },
    ] as Interaction[],
    buyers: [
      {
        name: 'Sarah Chen',
        role: 'Head of Engineering',
        timing: 'Active Search',
        relevance: 'High',
        imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        title: 'Senior Director of Engineering',
        responsibility: 'Leads technical infrastructure decisions and oversees cloud migration initiatives',
        linkedin: 'sarahchen',
        twitter: 'schen_tech'
      },
      { name: 'Michael Torres', role: 'VP Technology', timing: 'Planning Phase', relevance: 'High', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg', title: 'VP of Technology', responsibility: 'Oversees all technology-related operations and initiatives' },
      { name: 'Jamie Roberts', role: 'Engineering Manager', timing: 'Evaluating', relevance: 'Medium', imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg', title: 'Engineering Manager', responsibility: 'Manages engineering teams and evaluates new technologies' },
    ] as BuyerDetail[]
  },
  {
    name: 'Mountain Data Systems',
    revenue: '$4.2M',
    readiness: '78%',
    location: 'Idaho Falls',
    growth: '+22% YoY',
    employees: '80-90',
    industry: 'Data Analytics',
    logo: '📊',
    sources: {
      count: 4,
      details: [
        { type: 'Website', url: 'mountaindata.com', date: '2 days ago', icon: Globe },
        { type: 'Press Release', url: 'PR: Q2 Growth', date: 'Last week', icon: FileText },
        { type: 'Blog Post', url: 'Tech Expansion Plans', date: '2 weeks ago', icon: Link },
      ]
    },
    reasoning: "High growth rate combined with recent expansion signals readiness for new solutions. Their tech stack shows gaps in key areas matching your offering.",
    tags: ['Series A', 'High Growth', 'Tech-enabled', 'Product-led'],
    interactions: [
      { type: 'Email Campaign', date: '2 weeks ago', details: 'Responded positively to cloud solutions', outcome: 'Positive' },
      { type: 'Sales Call', date: 'Last month', details: 'Discussed implementation timeline', outcome: 'Neutral' },
      { type: 'Demo Request', date: 'Yesterday', details: 'Requested product demo', outcome: 'Pending' },
    ] as Interaction[],
    buyers: [
      {
        name: 'Sarah Chen',
        role: 'Head of Engineering',
        timing: 'Active Search',
        relevance: 'High',
        imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        title: 'Senior Director of Engineering',
        responsibility: 'Leads technical infrastructure decisions and oversees cloud migration initiatives',
        linkedin: 'sarahchen',
        twitter: 'schen_tech'
      },
      { name: 'Michael Torres', role: 'VP Technology', timing: 'Planning Phase', relevance: 'High', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg', title: 'VP of Technology', responsibility: 'Oversees all technology-related operations and initiatives' },
      { name: 'Jamie Roberts', role: 'Engineering Manager', timing: 'Evaluating', relevance: 'Medium', imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg', title: 'Engineering Manager', responsibility: 'Manages engineering teams and evaluates new technologies' },
    ] as BuyerDetail[]
  },
  {
    name: 'Sawtooth Solutions',
    revenue: '$2.7M',
    readiness: '90%',
    location: 'Twin Falls',
    growth: '+28% YoY',
    employees: '40-45',
    industry: 'Cloud Services',
    logo: '☁️',
    sources: {
      count: 4,
      details: [
        { type: 'Website', url: 'sawtoothsolutions.com', date: '2 days ago', icon: Globe },
        { type: 'Press Release', url: 'PR: Q2 Growth', date: 'Last week', icon: FileText },
        { type: 'Blog Post', url: 'Tech Expansion Plans', date: '2 weeks ago', icon: Link },
      ]
    },
    reasoning: "High growth rate combined with recent expansion signals readiness for new solutions. Their tech stack shows gaps in key areas matching your offering.",
    tags: ['Series A', 'High Growth', 'Tech-enabled', 'Product-led'],
    interactions: [
      { type: 'Email Campaign', date: '2 weeks ago', details: 'Responded positively to cloud solutions', outcome: 'Positive' },
      { type: 'Sales Call', date: 'Last month', details: 'Discussed implementation timeline', outcome: 'Neutral' },
      { type: 'Demo Request', date: 'Yesterday', details: 'Requested product demo', outcome: 'Pending' },
    ] as Interaction[],
    buyers: [
      {
        name: 'Sarah Chen',
        role: 'Head of Engineering',
        timing: 'Active Search',
        relevance: 'High',
        imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        title: 'Senior Director of Engineering',
        responsibility: 'Leads technical infrastructure decisions and oversees cloud migration initiatives',
        linkedin: 'sarahchen',
        twitter: 'schen_tech'
      },
      { name: 'Michael Torres', role: 'VP Technology', timing: 'Planning Phase', relevance: 'High', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg', title: 'VP of Technology', responsibility: 'Oversees all technology-related operations and initiatives' },
      { name: 'Jamie Roberts', role: 'Engineering Manager', timing: 'Evaluating', relevance: 'Medium', imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg', title: 'Engineering Manager', responsibility: 'Manages engineering teams and evaluates new technologies' },
    ] as BuyerDetail[]
  },
  {
    name: 'Cascade Computing',
    revenue: '$1.5M',
    readiness: '95%',
    location: 'Pocatello',
    growth: '+35% YoY',
    employees: '25-30',
    industry: 'IT Services',
    logo: '🌊',
    sources: {
      count: 4,
      details: [
        { type: 'Website', url: 'cascadecomputing.com', date: '2 days ago', icon: Globe },
        { type: 'Press Release', url: 'PR: Q2 Growth', date: 'Last week', icon: FileText },
        { type: 'Blog Post', url: 'Tech Expansion Plans', date: '2 weeks ago', icon: Link },
      ]
    },
    reasoning: "High growth rate combined with recent expansion signals readiness for new solutions. Their tech stack shows gaps in key areas matching your offering.",
    tags: ['Series A', 'High Growth', 'Tech-enabled', 'Product-led'],
    interactions: [
      { type: 'Email Campaign', date: '2 weeks ago', details: 'Responded positively to cloud solutions', outcome: 'Positive' },
      { type: 'Sales Call', date: 'Last month', details: 'Discussed implementation timeline', outcome: 'Neutral' },
      { type: 'Demo Request', date: 'Yesterday', details: 'Requested product demo', outcome: 'Pending' },
    ] as Interaction[],
    buyers: [
      {
        name: 'Sarah Chen',
        role: 'Head of Engineering',
        timing: 'Active Search',
        relevance: 'High',
        imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        title: 'Senior Director of Engineering',
        responsibility: 'Leads technical infrastructure decisions and oversees cloud migration initiatives',
        linkedin: 'sarahchen',
        twitter: 'schen_tech'
      },
      { name: 'Michael Torres', role: 'VP Technology', timing: 'Planning Phase', relevance: 'High', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg', title: 'VP of Technology', responsibility: 'Oversees all technology-related operations and initiatives' },
      { name: 'Jamie Roberts', role: 'Engineering Manager', timing: 'Evaluating', relevance: 'Medium', imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg', title: 'Engineering Manager', responsibility: 'Manages engineering teams and evaluates new technologies' },
    ] as BuyerDetail[]
  },
  {
    name: 'Silver Valley Tech',
    revenue: '$2.9M',
    readiness: '82%',
    location: 'Coeur d\'Alene',
    growth: '+20% YoY',
    employees: '50-55',
    industry: 'Hardware Solutions',
    logo: '⚡',
    sources: {
      count: 4,
      details: [
        { type: 'Website', url: 'silvervalleytech.com', date: '2 days ago', icon: Globe },
        { type: 'Press Release', url: 'PR: Q2 Growth', date: 'Last week', icon: FileText },
        { type: 'Blog Post', url: 'Tech Expansion Plans', date: '2 weeks ago', icon: Link },
      ]
    },
    reasoning: "High growth rate combined with recent expansion signals readiness for new solutions. Their tech stack shows gaps in key areas matching your offering.",
    tags: ['Series A', 'High Growth', 'Tech-enabled', 'Product-led'],
    interactions: [
      { type: 'Email Campaign', date: '2 weeks ago', details: 'Responded positively to cloud solutions', outcome: 'Positive' },
      { type: 'Sales Call', date: 'Last month', details: 'Discussed implementation timeline', outcome: 'Neutral' },
      { type: 'Demo Request', date: 'Yesterday', details: 'Requested product demo', outcome: 'Pending' },
    ] as Interaction[],
    buyers: [
      {
        name: 'Sarah Chen',
        role: 'Head of Engineering',
        timing: 'Active Search',
        relevance: 'High',
        imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        title: 'Senior Director of Engineering',
        responsibility: 'Leads technical infrastructure decisions and oversees cloud migration initiatives',
        linkedin: 'sarahchen',
        twitter: 'schen_tech'
      },
      { name: 'Michael Torres', role: 'VP Technology', timing: 'Planning Phase', relevance: 'High', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg', title: 'VP of Technology', responsibility: 'Oversees all technology-related operations and initiatives' },
      { name: 'Jamie Roberts', role: 'Engineering Manager', timing: 'Evaluating', relevance: 'Medium', imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg', title: 'Engineering Manager', responsibility: 'Manages engineering teams and evaluates new technologies' },
    ] as BuyerDetail[]
  },
];

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
                  <AnalysisSteps
                    analysisSteps={analysisSteps}
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
                      <p>Found {dummyCompanies.length} matches</p>
                    </div>
                  </div>

                  <CompanyList companies={dummyCompanies} />

                  {/* Updated CRM Button */}
                  <div className="mt-6 flex justify-end">
                    <button className="flex items-center gap-2 px-2.5 py-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
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
    </div>
  );
}