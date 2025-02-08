'use client';

import { Home, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Bell, label: 'Alerts', id: 'alerts' },
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
        {/* Orchid Logo (keep color black) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-8">
                <Image 
                  src={orchidLogo} 
                  alt="Orchid Logo" 
                  width={22} 
                  height={22}
                  className="object-contain ml-1"
                />
                <h1 className="font-cormorant pl-0 text-[30px] tracking-normal font-light text-black">
                  Orchid
                </h1>
              </div>
              <nav className="space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={twMerge(
                      'group flex w-full items-center rounded-sm px-2 py-2.5 text-sm font-medium transition-colors',
                      currentPage === item.id
                        ? 'bg-gray-25 text-gray-900'
                        : 'text-gray-400 hover:bg-gray-20 hover:text-gray-900'
                    )}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    <span className="font-light">{item.label}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Fixed Toggle Button at the bottom right */}
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
