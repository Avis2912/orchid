import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AnalysisStepsProps {
  analysisSteps: string[];
  currentStep: number;
  completedSteps: number[];
}

const dummyQueries = [
  [
    "Fetching market size for Idaho",
    "Analyzing competitor landscape",
    "Identifying key industry trends",
    "Gathering demographic data",
    "Scraping local business directories",
    "Checking economic indicators",
    "Processing regional statistics",
    "Evaluating market saturation",
    "Analyzing growth potential"
  ],
  [
    "Calculating revenue growth rates",
    "Analyzing profit margins",
    "Reviewing balance sheets",
    "Assessing debt-to-equity ratios",
    "Evaluating cash flow statements",
    "Projecting future earnings",
    "Analyzing operational costs",
    "Checking investment history",
    "Evaluating funding rounds"
  ],
  [
    "Evaluating tech adoption rates",
    "Assessing digital maturity",
    "Analyzing customer feedback",
    "Checking online presence",
    "Reviewing marketing strategies",
    "Measuring brand awareness",
    "Analyzing tech stack",
    "Evaluating digital footprint",
    "Checking integration readiness"
  ],
  [
    "Analyzing YoY growth",
    "Evaluating market penetration",
    "Assessing scalability",
    "Reviewing expansion plans",
    "Measuring customer acquisition cost",
    "Identifying new market opportunities",
    "Analyzing hiring patterns",
    "Checking office expansions",
    "Evaluating partnership potential"
  ],
  [
    "Calculating weighted scores",
    "Normalizing data points",
    "Applying scoring algorithms",
    "Identifying top opportunities",
    "Ranking companies by potential",
    "Generating opportunity heatmaps",
    "Computing success probability",
    "Analyzing competitive advantage",
    "Calculating market fit score"
  ],
  [
    "Compiling key findings",
    "Generating actionable insights",
    "Creating final recommendations",
    "Preparing presentation slides",
    "Formatting report data",
    "Generating executive summary",
    "Prioritizing opportunities",
    "Creating action items",
    "Finalizing recommendations"
  ]
];

const AnalysisSteps: React.FC<AnalysisStepsProps> = ({ analysisSteps, currentStep, completedSteps }) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(1);
  const [currentQueries, setCurrentQueries] = useState(dummyQueries[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentQueries(dummyQueries[currentStep] || []);
  }, [currentStep]);

  return (
    <motion.div 
      className="flex items-center justify-center"
      layout // Add this to enable smooth height transitions
    >
      <motion.div 
        className="space-y-6 bg-white/50 backdrop-blur-sm border border-gray-100 rounded-xl p-8"
        initial={{ width: 400 }}
        animate={{ width: 500 }}
        layout // Add this to enable smooth height transitions
        transition={{ 
          duration: 0.3, 
          ease: "easeOut",
          layout: { duration: 0.3 } // Add specific transition for layout changes
        }}
      >
        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-lg font-medium text-gray-900">Analysis in Progress</h2>
          <span className="text-sm tabular-nums text-gray-500">{elapsedSeconds}s</span>
        </div>

        {analysisSteps.map((step, index) => (
          <div key={step} className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-gray-900"
              >
                {currentStep === index ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : completedSteps.includes(index) ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <div className="h-5 w-5" />
                )}
              </motion.div>
              <span className="text-base text-gray-600">{step}</span>
            </motion.div>

            {/* Animated Queries */}
            {currentStep === index && (
              <div className="pl-9">
                <motion.div 
                  className="flex flex-wrap gap-1.5"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentQueries.map((query, idx) => (
                    <motion.span
                      key={query}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: idx * 0.03 }}
                      className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded-md border border-gray-100 whitespace-nowrap"
                    >
                      {query}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AnalysisSteps;
