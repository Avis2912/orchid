'use client';

import { Home, Bell, ChevronLeft, ChevronRight, Play, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME } from '@/lib/universalVariables';
import Image from 'next/image';
import orchidLogo from './img2.png'; // Update this to match your actual image filename

interface SidebarProps {
  currentPage: string;
}

export function Sidebar({ currentPage }: SidebarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isRunsOpen, setIsRunsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { 
      icon: Bell, 
      label: 'Alerts', 
      id: 'alerts',
      badge: '7'
    },
    {
      icon: Play, // Changed from FolderClosed to Play
      label: 'Runs',
      id: 'runs',
      hasDropdown: true,
      subitems: [
        { label: 'Idaho Tech Companies', date: 'Today' },
        { label: 'Series A Startups', date: 'Yesterday' },
        { label: 'Healthcare Sector', date: 'Jun 15' },
        { label: 'Enterprise Sales', date: 'Jun 12' },
      ]
    }
  ];

  const navigateTo = (page: string) => {
    if (page === 'alerts') {
      router.push('/alerts');
    } else if (page === 'home') {
      router.push('/');
    }
  };

  return (
    <motion.div
      initial={{ width: 256 }}
      animate={{ width: isOpen ? 256 : 64 }}
      className="border-r border-gray-100 min-h-screen relative"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="p-8 py-10">
        <div className={isOpen ? "flex items-center gap-2 mb-8" : "flex justify-center mb-8"}>
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: isOpen ? 0 : 8, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-shrink-0 w-6 h-6"
          >
            <Image 
              src={orchidLogo} 
              alt="Orchid Logo" 
              width={22} 
              height={22}
              className="object-contain"
            />
          </motion.div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="font-cormorant text-[30px] tracking-normal font-light text-black">
                  Orchid
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="space-y-3">
                {navItems.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => item.hasDropdown ? setIsRunsOpen(!isRunsOpen) : navigateTo(item.id)}
                      className={twMerge(
                        'group flex w-full items-center justify-between rounded-sm px-2 py-2.5 text-sm font-medium transition-colors',
                        currentPage === item.id
                          ? 'bg-gray-25 text-gray-900'
                          : 'text-gray-400 hover:bg-gray-20 hover:text-gray-900'
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-3 h-4 w-4" />
                        <span className="font-light flex items-center">
                          {item.label}
                          {item.hasDropdown && (
                            <ChevronDown 
                              className={`ml-2 h-3.5 w-3.5 transition-transform duration-300 ${isRunsOpen ? 'rotate-180' : ''}`} 
                            />
                          )}
                          {item.badge && (
                            <span className="ml-2 text-xs bg-yellow-500/10 text-yellow-700 px-1.5 py-0.5 rounded-full font-medium">
                              {item.badge}
                            </span>
                          )}
                        </span>
                      </div>
                    </button>
                    
                    {item.hasDropdown && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: isRunsOpen ? 'auto' : 0,
                          opacity: isRunsOpen ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-1 ml-2 space-y-1">
                          {item.subitems?.map((subitem, idx) => (
                            <button
                              key={idx}
                              className="w-full text-left px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center justify-between group rounded-sm hover:bg-gray-50"
                            >
                              <span className="font-light">{subitem.label}</span>
                              <span className="text-xs text-gray-400 group-hover:text-gray-500">{subitem.date}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button
        onClick={toggleSidebar}
        className="absolute bottom-8 right-4 p-1 hover:bg-gray-100 transition-colors rounded-sm"
        title="Toggle Sidebar"
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        )}
      </button>
    </motion.div>
  );
}
