import { useState } from "react";
import UserStoriesHeader from "@/components/user-stories/UserStoriesHeader";
import ImportOptions from "@/components/user-stories/ImportOptions";
import ImportFromJira from "@/components/user-stories/ImportFromJira";
import ManualCsvWordImport from "@/components/user-stories/ManualCsvWordImport";
import AudioVideoImport from "@/components/user-stories/AudioVideoImport";
export const AddUserStory = ({ eventData }: { eventData: any }) => {
  console.log("eventData in AddUserStory:", eventData);

  // Set "jira" as the default active import option
  const [activeImportOption, setActiveImportOption] = useState<string | null>(
    "jira"
  );
  const [activeTab, setActiveTab] = useState<string>("documentUpload");

  // This is the changeable prop for Import User Stories section
  const importUserStoriesProps = {
    title: `Import ${eventData.eventRowData.title}`,
    description: `Select an import method to add ${eventData.eventRowData.title} to your project`,
  };

  const handleImportOptionClick = (option: string) => {
    setActiveImportOption(option);
    console.log(option);
    // Reset tab when changing import option
    setActiveTab("documentUpload");
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
        return <ImportFromJira />; // Fallback to JIRA if no option is selected
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Main User Stories Card - This uses props since it can change */}
        <UserStoriesHeader
          title={eventData.eventRowData.title}
          description={eventData.eventRowData.description}
          icon={eventData.eventRowData.icon}
        />

        {/* Import User Stories Section - This also uses props */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {importUserStoriesProps.title}
          </h2>
          <p className="text-gray-600 mb-4">
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
