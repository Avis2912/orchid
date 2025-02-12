import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown } from 'lucide-react';
import { PeopleButton, ExpandedPeopleSection } from './PeopleSection';
import { CrmButton } from './CrmButton';

interface Interaction {
  type: string;
  date: string;
  details: string;
  outcome: 'Positive' | 'Neutral' | 'Pending';
}

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

interface Company {
  name: string;
  revenue: string;
  readiness: string;
  location: string;
  growth: string;
  employees: string;
  industry: string;
  logo: string;
  sources: {
    count: number;
    details: {
      type: string;
      url: string;
      date: string;
      icon: React.ComponentType<any>;
    }[];
  };
  reasoning: string;
  tags: string[];
  interactions: Interaction[];
  buyers: BuyerDetail[];
}

interface CompanyListProps {
  companies: Company[];
}

const TableHeader = () => (
  <div className="border-b border-gray-100">
    <div
      className="px-6 py-3 grid items-center"
      style={{
        gridTemplateColumns: "40px 1fr 1fr 1fr 1fr 1fr",
        gap: "24px"
      }}
    >
      <div className="w-8"></div>
      <div className="text-xs font-medium text-gray-500">COMPANY</div>
      <div className="text-xs font-medium text-gray-500">FINANCIALS</div>
      <div className="text-xs font-medium text-gray-500">TEAM</div>
      <div className="text-xs font-medium text-gray-500">GENERAL FIT</div>
      <div className="text-xs font-medium text-gray-500">SOURCES</div>
    </div>
  </div>
);

const CompanyList: React.FC<CompanyListProps> = ({ companies }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [expandedPeople, setExpandedPeople] = useState<string | null>(null);

  return (
    <>
      {/* Updated border styling to match items */}
      <div className="rounded-lg overflow-hidden border border-gray-100">
        <TableHeader />
        {companies.map((company, index) => (
          <div key={company.name} className="group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }} // Increased from 0.1
              className="bg-white hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <div className="px-6 py-4">
                <div className="grid items-center" style={{
                  gridTemplateColumns: "40px 1fr 1fr 1fr 1fr 1fr",
                  gap: "24px"
                }}>
                  {/* <div className="flex-none text-2xl">{company.logo}</div> */}
                  <img src={company.logo} className='w-10 h-10 rounded-lg' />
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
                  <div>
                    <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded">
                      {company.readiness} Ready
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-gray-400" />
                      {company.sources.count}
                    </span>
                    <button
                      onClick={() => setExpandedRow(expandedRow === company.name ? null : company.name)}
                      className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <ChevronDown
                        className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                          expandedRow === company.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <PeopleButton
                      company={company.name}
                      buyers={company.buyers}
                      isExpanded={expandedPeople === company.name}
                      onToggle={() => setExpandedPeople(expandedPeople === company.name ? null : company.name)}
                    />
                    <CrmButton company={company.name} interactions={company.interactions} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Expandable Sources Panel */}
            <AnimatePresence>
              {expandedRow === company.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden bg-gray-50 border-b border-gray-100"
                >
                  <div className="px-6 py-4 grid grid-cols-[1.5fr,1fr] gap-8">
                    {/* Reasoning Section - Left */}
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {company.reasoning}
                      </p>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {[...company.tags].map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sources Section - Right */}
                    <div className="text-right space-y-2">
                      {company.sources.details.map((source, idx) => (
                        <div key={idx} className="flex items-center justify-end gap-3 text-sm text-gray-600">
                          <source.icon className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{source.type}:</span>
                          <span>{source.url}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-400">{source.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              {expandedPeople === company.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="overflow-hidden"
                >
                  <ExpandedPeopleSection buyers={company.buyers} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </>
  );
};

export default CompanyList;
