import { Tooltip } from '@/components/ui/tooltip';
import { FileText, Phone, User as IconUser, } from 'lucide-react';
import Image from 'next/image';
import { ICON_BORDER_RADIUS } from '@/lib/universalVariables';

interface SearchSettingsProps {
  iconSettings: {
    crm: boolean;
    pressReleases: boolean;
    earningsCalls: boolean;
    personData: boolean;
  };
  toggleIcon: (key: keyof SearchSettingsProps["iconSettings"]) => void;
  reasoningLevel: 'Low' | 'Medium' | 'High';
  toggleReasoning: () => void;
}

const SearchSettings: React.FC<SearchSettingsProps> = ({ iconSettings, toggleIcon, reasoningLevel, toggleReasoning }) => {
  const icons: { key: keyof SearchSettingsProps["iconSettings"]; icon: any; title: string }[] = [
    {
      key: 'crm',
      icon: () => (
        <Image
          src="https://1000logos.net/wp-content/uploads/2017/08/Salesforce-logo.jpg"
          alt="Salesforce"
          width={25}
          height={25}
          className="opacity-80"
        />
      ),
      title: 'CRM Data'
    },
    { key: 'pressReleases', icon: FileText, title: 'Press Releases' },
    { key: 'earningsCalls', icon: Phone, title: 'Earnings Calls' },
    { key: 'personData', icon: IconUser, title: 'Person Data' },
  ];

  return (
    <div className="flex gap-4 mt-4 justify-end w-full">
      {icons.map(({ key, icon: Icon, title }) => (
        <Tooltip key={key} content={title}>
          <button
            type="button"
            onClick={() => toggleIcon(key as keyof SearchSettingsProps["iconSettings"])}
            className={`
              w-9 h-9 flex items-center justify-center
              transition-all duration-200 ease-in-out
              bg-white hover:bg-gray-50
              ${iconSettings[key]
                ? 'border border-gray-300'
                : ''
              }
            `}
            style={{ borderRadius: ICON_BORDER_RADIUS }}
          >
            <Icon className="h-4 w-4 text-gray-700" />
          </button>
        </Tooltip>
      ))}
      <Tooltip content={`Reasoning Level: ${reasoningLevel}`}>
        <button
          type="button"
          onClick={toggleReasoning}
          className="px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800 transition-colors"
          style={{ borderRadius: ICON_BORDER_RADIUS }}
        >
          {reasoningLevel}
        </button>
      </Tooltip>
    </div>
  );
};

export default SearchSettings;
