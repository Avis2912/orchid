
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Building2 } from 'lucide-react';

interface Interaction {
  type: string;
  date: string;
  details: string;
  outcome: 'Positive' | 'Neutral' | 'Pending';
}

interface CrmButtonProps {
  company: string;
  interactions: Interaction[];
}

const CrmButton: React.FC<CrmButtonProps> = ({ company, interactions }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleClick = () => {
    if (isLoading) return;
    if (!isActivated) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsActivated(true);
      }, 5000);
    } else {
      setShowHistory(!showHistory);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`p-1 rounded-md transition-all duration-200 ${
          isActivated ? 'text-blue-600' : 'text-gray-500 hover:bg-gray-100'
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Building2 className="h-4 w-4" />
        )}
      </button>

      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 z-50"
          >
            <div className="p-3">
              <h4 className="text-xs font-medium text-gray-500 mb-2">CRM HISTORY</h4>
              <div className="space-y-2">
                {interactions.map((interaction, idx) => (
                  <div key={idx} className="p-2 hover:bg-gray-50 rounded-md transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium text-gray-900">{interaction.type}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        interaction.outcome === 'Positive' ? 'bg-emerald-50 text-emerald-700' :
                        interaction.outcome === 'Pending' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {interaction.outcome}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{interaction.details}</p>
                    <p className="text-xs text-gray-400 mt-1">{interaction.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { CrmButton };