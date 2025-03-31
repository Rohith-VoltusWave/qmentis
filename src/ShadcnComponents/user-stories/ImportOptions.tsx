import React from 'react';
import { Diamond, FileSpreadsheet, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImportOptionsProps {
  onOptionClick: (option: string) => void;
  activeOption: string | null;
}

const ImportOptions: React.FC<ImportOptionsProps> = ({ onOptionClick, activeOption }) => {
  const options = [
    {
      id: 'jira',
      title: 'Import from JIRA',
      description: 'Connect to JIRA and import user stories directly from your projects',
      icon: <Diamond className="h-6 w-6 text-blue-500" />
    },
    {
      id: 'manual',
      title: 'Manual/CSV/Word',
      description: 'Upload documents or manually enter user stories',
      icon: <FileSpreadsheet className="h-6 w-6 text-blue-500" />
    },
    {
      id: 'audio',
      title: 'Audio/Video',
      description: 'Import user stories from audio or video recordings',
      icon: <Mic className="h-6 w-6 text-blue-500" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {options.map((option) => (
        <div
          key={option.id}
          onClick={() => onOptionClick(option.id)}
          className={cn(
            'bg-white rounded-lg p-6 cursor-pointer transition-all border',
            activeOption === option.id
              ? 'border-blue-500 shadow-md'
              : 'border-gray-200 hover:border-blue-300'
          )}>
          <div className="flex justify-center mb-4">
            <div className="bg-blue-50 p-4 rounded-full">{option.icon}</div>
          </div>
          <h3 className="text-lg font-medium text-center mb-2">{option.title}</h3>
          <p className="text-gray-500 text-center text-sm">{option.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ImportOptions;
