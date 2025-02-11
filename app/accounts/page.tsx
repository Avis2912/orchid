'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/navigation/sidebar';

const accountsData = [
    {
        id: 1,
        name: 'Acme Corp',
        industry: 'Technology',
        location: 'San Francisco, CA',
        annualRevenue: '$50M',
        contacts: [
            { name: 'John Doe', email: 'john.doe@acmecorp.com', logo: 'https://via.placeholder.com/50' },
            { name: 'Jane Roe', email: 'jane.roe@acmecorp.com', logo: 'https://via.placeholder.com/50' }
        ],
        stage: 'Negotiation',
        closeDate: '2024-12-31',
        priority: 'High', // New field
        logo: 'https://via.placeholder.com/150', // Replace with actual logo URL
        description: 'Acme Corp is a leading technology company specializing in cloud solutions.',
        keyMetrics: {
            employees: 250,
            customerSatisfaction: '95%',
            marketShare: '15%',
        },
        tags: ['Cloud', 'SaaS', 'Enterprise', 'Tech', 'Innovation']
    },
    {
        id: 2,
        name: 'Beta Industries',
        industry: 'Manufacturing',
        location: 'Chicago, IL',
        annualRevenue: '$25M',
        contacts: [
            { name: 'Jane Smith', email: 'jane.smith@betaindustries.com', logo: 'https://via.placeholder.com/50' },
            { name: 'John Smith', email: 'john.smith@betaindustries.com', logo: 'https://via.placeholder.com/50' }
        ],
        stage: 'Proposal',
        closeDate: '2024-11-15',
        priority: 'Medium', // New field
        logo: 'https://via.placeholder.com/150', // Replace with actual logo URL
        description: 'Beta Industries is a well-established manufacturing company with a focus on sustainable practices.',
        keyMetrics: {
            employees: 150,
            customerSatisfaction: '90%',
            marketShare: '8%',
        },
        tags: ['Manufacturing', 'Sustainability', 'Green', 'Eco-Friendly']
    },
    // Add more account data as needed
];
interface Account {
    id: number;
    name: string;
    industry: string;
    location: string;
    annualRevenue: string;
    contacts: { name: string; email: string; logo: string; }[];
    stage: string;
    closeDate: string;
    priority: string;
    logo: string;
    description: string;
    keyMetrics: {
        employees: number;
        customerSatisfaction: string;
        marketShare: string;
    };
    tags: string[];
}

const AccountCard = ({ account }: { account: Account }) => {
    return (
        <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all hover:scale-102 border border-gray-100"
        >
            <div className="md:flex">
                <div className="md:w-1/4 p-4 bg-gray-50 flex items-center justify-center border-r border-gray-100">
                    <img src={account.logo} className="w-24 h-24 object-contain rounded-full shadow-md" alt={`${account.name} Logo`} />
                </div>
                <div className="md:w-3/4 p-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{account.name}</h2>
                    <p className="text-gray-600 mb-3 text-sm">{account.description}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                        {account.tags.map((tag, index) => (
                            <span key={index} className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-xs font-medium text-gray-700 mb-0.5">Industry:</p>
                            <p className="text-sm text-gray-900">{account.industry}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-xs font-medium text-gray-700 mb-0.5">Location:</p>
                            <p className="text-sm text-gray-900">{account.location}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-xs font-medium text-gray-700 mb-0.5">Annual Revenue:</p>
                            <p className="text-sm text-gray-900">{account.annualRevenue}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-xs font-medium text-gray-700 mb-0.5">Stage:</p>
                            <p className="text-sm text-gray-900">{account.stage}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-xs font-medium text-gray-700 mb-0.5">Close Date:</p>
                            <p className="text-sm text-gray-900">{account.closeDate}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-xs font-medium text-gray-700 mb-0.5">Priority:</p>
                            <p className="text-sm text-gray-900">{account.priority}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contacts</h3>
                            <div className="flex flex-wrap gap-3">
                                {account.contacts.map((contact, index) => (
                                    <div key={index} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                                        <img src={contact.logo} className="w-8 h-8 object-contain rounded-full shadow-md" alt={`${contact.name} Logo`} />
                                        <div>
                                            <p className="text-xs font-medium text-gray-900">{contact.name}</p>
                                            <p className="text-xs text-gray-600">{contact.email}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Metrics</h3>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-gray-50 p-2 rounded-lg">
                                    <p className="text-xs font-medium text-gray-700 mb-0.5">Employees:</p>
                                    <p className="text-sm text-gray-900">{account.keyMetrics.employees}</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded-lg">
                                    <p className="text-xs font-medium text-gray-700 mb-0.5">Customer Satisfaction:</p>
                                    <p className="text-sm text-gray-900">{account.keyMetrics.customerSatisfaction}</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded-lg">
                                    <p className="text-xs font-medium text-gray-700 mb-0.5">Market Share:</p>
                                    <p className="text-sm text-gray-900">{account.keyMetrics.marketShare}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></div>
        </motion.div>
    );
};

export default function AccountsPage() {
    const [currentPage] = useState('accounts');

    return (
        <div className="min-h-screen flex bg-gray-50">
            <Sidebar currentPage={currentPage} />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Accounts</h2>
                <div className="space-y-4">
                    {accountsData.map((account) => (
                        <AccountCard key={account.id} account={account} />
                    ))}
                </div>
            </div>
        </div>
    );
}
