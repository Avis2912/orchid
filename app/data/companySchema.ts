import React from 'react';
import { Globe, FileText, Link } from 'lucide-react';

export interface CompanySchema {
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
  interactions: [];
  buyers: [];
}
