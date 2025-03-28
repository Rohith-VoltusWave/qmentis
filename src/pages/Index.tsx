import { useState } from "react";
import UserStoriesHeader from "@/components/user-stories/UserStoriesHeader";
import ImportOptions from "@/components/user-stories/ImportOptions";
import ImportFromJira from "@/components/user-stories/ImportFromJira";
import ManualCsvWordImport from "@/components/user-stories/ManualCsvWordImport";
import AudioVideoImport from "@/components/user-stories/AudioVideoImport";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  // Set "jira" as the default active import option
  const [activeImportOption, setActiveImportOption] = useState<string | null>(
    "jira"
  );
  const [activeTab, setActiveTab] = useState<string>("documentUpload");
  const isMobile = useIsMobile();

  // This is the changeable prop for the main User Stories section
  const userStoriesProps = {
    title: "User Stories",
    description: "Import, create and manage user stories for your project",
    icon: "file-text", // This can be changed as needed
  };

  // This is the changeable prop for Import User Stories section
  const importUserStoriesProps = {
    title: "Import User Stories",
    description: "Select an import method to add user stories to your project",
  };

  const handleImportOptionClick = (option: string) => {
    setActiveImportOption(option);
    // Reset tab when changing import option
    if (option === "manual") {
      setActiveTab("documentUpload");
    } else if (option === "jira") {
      // No tab for JIRA
    } else if (option === "audio") {
      // No tab for Audio/Video
    }
  };

  const renderActiveImportContent = () => {
    switch (activeImportOption) {
      case "jira":
        return <ImportFromJira />;
      case "manual":
        return (
          <ManualCsvWordImport
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
      case "audio":
        return <AudioVideoImport />;
      default:
        return <ImportFromJira />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Main User Stories Card - This uses props since it can change */}
        <UserStoriesHeader
          title={userStoriesProps.title}
          description={userStoriesProps.description}
          icon={userStoriesProps.icon}
        />

        {/* Import User Stories Section - This also uses props */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
            {importUserStoriesProps.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
            {importUserStoriesProps.description}
          </p>
        </div>

        {/* Import Options Grid */}
        <ImportOptions
          onOptionClick={handleImportOptionClick}
          activeOption={activeImportOption}
        />

        {/* Active Import Content */}
        {renderActiveImportContent()}
      </div>
    </div>
  );
};

export default Index;
