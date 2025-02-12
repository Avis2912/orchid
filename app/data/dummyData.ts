import { Globe, FileText, Link } from 'lucide-react';

export const analysisSteps = [
  "Scanning Idaho market data...",
  "Analyzing company financials...",
  "Evaluating market readiness...",
  "Processing growth indicators...",
  "Calculating opportunity scores...",
  "Preparing final recommendations..."
];

export const dummyCompanies = [
  {
    name: 'Greystar Real Estate Partners',
    revenue: '$3.5B',
    readiness: '70%',
    location: 'Charleston, SC',
    growth: '+8% YoY',
    employees: '20,000-25,000',
    industry: 'Real Estate - Multifamily Property Management',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmWZylRO-7U9-dBQHd6WvaFaRBdQlBuqUdhA&s',
    sources: {
      count: 3,
      details: [
        { type: 'Website', url: 'https://www.greystar.com', date: '1 day ago', icon: Globe },
        { type: 'Press Release', url: 'https://www.greystar.com/news/hvac-update', date: 'Last week', icon: FileText },
        { type: 'Blog Post', url: 'https://www.greystar.com/blog/hvac-challenges', date: '2 weeks ago', icon: Link },
      ]
    },
    reasoning: "Despite being a market leader, recurring HVAC issues indicate a need for improved maintenance solutions. Their scale may be hindering rapid response to tenant complaints.",
    tags: ['Market Leader', 'Recurring HVAC Issues', 'Large Scale', 'Multifamily'],
    interactions: [],
    buyers: []
  },
  {
    name: 'Asset Living',
    revenue: '$700M',
    readiness: '75%',
    location: 'Houston, TX',
    growth: '+5% YoY',
    employees: '8,000-9,000',
    industry: 'Real Estate - Property Management',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_sjKbjP6meQ5vkGCm33fRTTEJEP48X9ONQ&s',
    sources: {
      count: 3,
      details: [
        { type: 'Website', url: 'https://www.assetliving.com', date: '1 day ago', icon: Globe },
        { type: 'Press Release', url: 'https://www.assetliving.com/news/hvac-complaints', date: 'Last week', icon: FileText },
        { type: 'Blog Post', url: 'https://www.assetliving.com/blog/hvac-issues', date: '2 weeks ago', icon: Link },
      ]
    },
    reasoning: "Consistent tenant reports of slow HVAC repair times suggest an opportunity to enhance their facility management systems.",
    tags: ['Regional Leader', 'HVAC Complaints', 'Tenant Focus', 'Property Management'],
    interactions: [],
    buyers: []
  },
  {
    name: 'RPM Living',
    revenue: '$750M',
    readiness: '65%',
    location: 'Austin, TX',
    growth: '+7% YoY',
    employees: '4,000-5,000',
    industry: 'Real Estate - Multifamily Property Management',
    logo: 'https://media.licdn.com/dms/image/v2/C560BAQEMbqHT5nij-A/company-logo_200_200/company-logo_200_200/0/1657556782798/rpmliving_logo?e=2147483647&v=beta&t=8tBubx-nUX7v70TZ4xK3thQaWvmOXzH-jd3O2hAUZ0w',
    sources: {
      count: 3,
      details: [
        { type: 'Website', url: 'https://rpmliving.com', date: '1 day ago', icon: Globe },
        { type: 'Press Release', url: 'https://rpmliving.com/news/hvac-outage', date: 'Last week', icon: FileText },
        { type: 'Blog Post', url: 'https://rpmliving.com/blog/hvac-maintenance', date: '2 weeks ago', icon: Link },
      ]
    },
    reasoning: "Repeated HVAC outages have affected tenant satisfaction, indicating a potential for solutions that streamline maintenance operations.",
    tags: ['Growing Firm', 'Maintenance Challenges', 'HVAC Outages', 'Resident Impact'],
    interactions: [],
    buyers: []
  },
  {
    name: 'BH Management Services',
    revenue: '$296M',
    readiness: '80%',
    location: 'Des Moines, IA',
    growth: '+4% YoY',
    employees: '2,500-3,000',
    industry: 'Real Estate - Multifamily Management',
    logo: 'https://livebh.com/wp-content/themes/divi-child/img/logo.webp',
    sources: {
      count: 3,
      details: [
        { type: 'Website', url: 'https://livebh.com', date: '1 day ago', icon: Globe },
        { type: 'Press Release', url: 'https://livebh.com/news/hvac-maintenance', date: 'Last week', icon: FileText },
        { type: 'Blog Post', url: 'https://livebh.com/blog/hvac-complaints', date: '2 weeks ago', icon: Link },
      ]
    },
    reasoning: "Tenant feedback on slow HVAC fixes highlights operational challenges; addressing these could improve resident satisfaction and retention.",
    tags: ['Established', 'Tenant Feedback', 'HVAC Maintenance', 'Operational Challenges'],
    interactions: [],
    buyers: []
  },
  {
    name: 'Cushman & Wakefield',
    revenue: '$9.5B',
    readiness: '60%',
    location: 'Chicago, IL',
    growth: '+2% YoY',
    employees: '50,000-55,000',
    industry: 'Commercial Real Estate Services',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdpNsRoNyZXYHb-F6TLf_C6Mp8mFJiqn2OiA&s',
    sources: {
      count: 3,
      details: [
        { type: 'Website', url: 'https://www.cushmanwakefield.com', date: '1 day ago', icon: Globe },
        { type: 'Press Release', url: 'https://www.cushmanwakefield.com/news/hvac-issues', date: 'Last week', icon: FileText },
        { type: 'Blog Post', url: 'https://www.cushmanwakefield.com/blog/hvac-challenges', date: '2 weeks ago', icon: Link },
      ]
    },
    reasoning: "Even as a global leader in commercial property management, HVAC service issues in certain managed properties indicate opportunities for better service integration.",
    tags: ['Global Leader', 'Commercial Properties', 'Service Integration', 'HVAC Concerns'],
    interactions: [],
    buyers: []
  }
];
