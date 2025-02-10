import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, LinkedinIcon, Plus, Users2Icon } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';

interface Buyer {
  name: string;
  role: string;
  timing: string;
  relevance: 'High' | 'Medium' | 'Low';
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

interface PeopleButtonProps {
  company: string;
  buyers: BuyerDetail[];
  isExpanded: boolean;
  onToggle: () => void;
}

const PeopleButton: React.FC<PeopleButtonProps> = ({ company, buyers, isExpanded, onToggle }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const handleClick = () => {
    if (isLoading) return;
    if (!isActivated) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsActivated(true);
        onToggle();
      }, 5000);
    } else {
      onToggle();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-1 rounded-md transition-all duration-200 ${
        isActivated ? 'text-yellow-700' : 'text-gray-500 hover:bg-gray-100'
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Users2Icon className="h-4 w-4" />
      )}
    </button>
  );
};

interface ExpandedPeopleSectionProps {
  buyers: BuyerDetail[];
}

const ExpandedPeopleSection: React.FC<ExpandedPeopleSectionProps> = ({ buyers }) => (
  <div className="px-6 py-4 bg-white border-b border-gray-100">
    <div className="space-y-2">
      {buyers.map((buyer, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: idx * 0.05,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="flex items-center gap-6 p-3 hover:bg-gray-50/50 rounded-lg transition-all duration-200"
        >
          {/* Left Section: Avatar & Status */}
          <div className="relative flex-shrink-0">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(buyer.name)}&background=random&bold=true&format=svg`}
              alt={buyer.name}
              className="w-11 h-11 rounded-lg object-cover shadow-sm"
            />
            <div className={`absolute -right-0.5 -bottom-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
              buyer.relevance === 'High'
                ? 'bg-emerald-500'
                : buyer.relevance === 'Medium'
                  ? 'bg-amber-400'
                  : 'bg-gray-300'
            }`} />
          </div>

          {/* Center Section: Main Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-medium text-gray-900">{buyer.name}</h3>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  buyer.timing === 'Active Search'
                    ? 'bg-emerald-50 text-emerald-700'
                    : buyer.timing === 'Planning Phase'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-gray-100 text-gray-600'
                }`}>
                  {buyer.timing}
                </span>
                {buyer.influence && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                    {buyer.influence}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
              <span>{buyer.title}</span>
              <span>•</span>
              <span className="text-gray-600">{buyer.responsibility}</span>
            </div>
            {buyer.linkedin && (
              <a
                href={`https://linkedin.com/in/${buyer.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                View LinkedIn
              </a>
            )}
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center gap-2 ml-4">
            {buyer.linkedin && (
              <Tooltip content="LinkedIn">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://linkedin.com/in/${buyer.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </motion.a>
              </Tooltip>
            )}
            <Tooltip content="Add to CRM">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-md transition-all"
              >
                <Plus className="h-4 w-4" />
              </motion.button>
            </Tooltip>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export { PeopleButton, ExpandedPeopleSection };
