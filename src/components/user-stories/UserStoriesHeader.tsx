import React from 'react';
import { FileText, Diamond, FileSpreadsheet, Mic } from 'lucide-react';
import { Label } from '@/ShadcnComponents/ui/label';

interface UserStoriesHeaderProps {
  title: string;
  description: string;
  icon: React.ReactNode; // Updated from string to React.ReactNode
}

const UserStoriesHeader: React.FC<UserStoriesHeaderProps> = ({ title, description, icon }) => {
  // Dynamic icon selection based on prop
  const IconComponent = () => {
    switch (icon) {
      case 'diamond':
        return <Diamond className="h-6 w-6 text-blue-500" />;
      case 'spreadsheet':
        return <FileSpreadsheet className="h-6 w-6 text-blue-500" />;
      case 'mic':
        return <Mic className="h-6 w-6 text-blue-500" />;
      case 'file-text':
      default:
        return <FileText className="h-6 w-6 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <IconComponent />
        <Label className="text-2xl font-semibold text-gray-800">{title}</Label>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default UserStoriesHeader;
