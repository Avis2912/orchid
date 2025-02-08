'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/navigation/sidebar';

const industryNews = [
  {
    title: 'Major Tech Expansion in Boise',
    company: 'Tech Giants Corp',
    type: 'Industry Move',
    impact: 'High',
    description: 'New headquarters announcement with 500 job openings',
    time: '2 hours ago',
    icon: '🏢'
  },
  {
    title: 'Idaho Tax Incentives for Tech Companies',
    company: 'State Government',
    type: 'Policy Change',
    impact: 'Medium',
    description: 'New tax benefits for technology sector businesses',
    time: '4 hours ago',
    icon: '📋'
  },
  // Add more news items as needed
];

export default function AlertsPage() {
  const [currentPage] = useState('alerts');

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar currentPage={currentPage} />

      {/* Main Content */}
      <div className="flex-1">
        <div className="h-full flex flex-col p-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Today's Digest</h2>
          <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
            {industryNews.map((news, index) => (
              <motion.div
                key={news.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="px-6 py-4 hover:bg-gray-50 transition-colors border-b last:border-b-0 border-gray-100"
              >
                <div className="flex items-center space-x-6">
                  <div className="text-2xl">{news.icon}</div>
                  <div className="flex-1 grid grid-cols-4 gap-4">
                    <div className="col-span-2">
                      <h3 className="text-gray-900">{news.title}</h3>
                      <p className="text-sm text-gray-500 font-light">{news.description}</p>
                    </div>
                    <div>
                      <p className="text-sm font-light text-gray-900">{news.company}</p>
                      <p className="text-sm text-gray-500 font-light">{news.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-light text-gray-900">Impact: {news.impact}</p>
                      <p className="text-sm text-gray-500 font-light">{news.time}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
