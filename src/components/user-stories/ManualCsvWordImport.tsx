import React, { useState, useRef } from 'react';
import { Button } from '@/ShadcnComponents/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ShadcnComponents/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ShadcnComponents/ui/card';
import { Input } from '@/ShadcnComponents/ui/input';
import { Textarea } from '@/ShadcnComponents/ui/textarea';
import { X, Upload, Plus, FileSpreadsheet } from 'lucide-react';
import { Label } from '@/ShadcnComponents/ui/label';
import ExcelCsvMapping from './ExcelCsvMapping';
// import { alert } from './use-alert';

interface ManualCsvWordImportProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSubmit?: (data: any) => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  uploadTime: string;
}

interface UserStory {
  id: number;
  title: string;
  description: string;
  criteria: string;
  additionalInfo: string;
}

interface FormData {
  uploadedFiles: UploadedFile[];
  excelCsvFiles: UploadedFile[];
  userStories: UserStory[];
  activeTab: string;
  fieldMappings: Record<string, string>;
}

const initialFormState: FormData = {
  uploadedFiles: [],
  excelCsvFiles: [],
  userStories: [{ id: 1, title: '', description: '', criteria: '', additionalInfo: '' }],
  activeTab: 'documentUpload',
  fieldMappings: {
    title: 'none',
    description: 'none',
    criteria: 'none',
    additionalInfo: 'none'
  }
};

const ManualCsvWordImport: React.FC<ManualCsvWordImportProps> = ({
  activeTab,
  setActiveTab,
  onSubmit
}) => {
  const [formData, setFormData] = useState<FormData>({
    ...initialFormState,
    activeTab
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const excelFileInputRef = useRef<HTMLInputElement>(null);
  const unstructuredTextRef = useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      activeTab
    }));
  }, [activeTab]);

  const removeFile = (id: string, fileType: 'document' | 'excel') => {
    if (fileType === 'document') {
      setFormData((prev) => ({
        ...prev,
        uploadedFiles: prev.uploadedFiles.filter((file) => file.id !== id)
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        excelCsvFiles: prev.excelCsvFiles.filter((file) => file.id !== id),
        ...(prev.excelCsvFiles.length <= 1 && {
          fieldMappings: {
            title: 'none',
            description: 'none',
            criteria: 'none',
            additionalInfo: 'none'
          }
        })
      }));
    }
  };

  const addNewUserStory = () => {
    setFormData((prev) => ({
      ...prev,
      userStories: [
        ...prev.userStories,
        {
          id: prev.userStories.length + 1,
          title: '',
          description: '',
          criteria: '',
          additionalInfo: ''
        }
      ]
    }));
  };

  const removeUserStory = (id: number) => {
    if (formData.userStories.length > 1) {
      setFormData((prev) => ({
        ...prev,
        userStories: prev.userStories.filter((story) => story.id !== id)
      }));
    }
  };

  const updateUserStory = (id: number, field: keyof UserStory, value: string) => {
    setFormData((prev) => ({
      ...prev,
      userStories: prev.userStories.map((story) =>
        story.id === id ? { ...story, [field]: value } : story
      )
    }));
  };

  const handleBrowseClick = (fileType: 'document' | 'excel') => {
    if (fileType === 'document' && fileInputRef.current) {
      fileInputRef.current.click();
    } else if (fileType === 'excel' && excelFileInputRef.current) {
      excelFileInputRef.current.click();
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: 'document' | 'excel'
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newUploadedFiles: UploadedFile[] = [];

    Array.from(files).forEach((file) => {
      const size = formatFileSize(file.size);

      newUploadedFiles.push({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: size,
        uploadTime: 'just now'
      });
    });

    if (fileType === 'document') {
      setFormData((prev) => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...newUploadedFiles]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        excelCsvFiles: [...prev.excelCsvFiles, ...newUploadedFiles],
        fieldMappings: {
          title: 'none',
          description: 'none',
          criteria: 'none',
          additionalInfo: 'none'
        }
      }));
    }

    if (fileType === 'document' && fileInputRef.current) {
      fileInputRef.current.value = '';
    } else if (fileType === 'excel' && excelFileInputRef.current) {
      excelFileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFieldsMapping = (mappings: Record<string, string>) => {
    setFormData((prev) => ({
      ...prev,
      fieldMappings: mappings
    }));

    console.log('Field mappings updated:', mappings);
  };

  const resetFormData = () => {
    if (activeTab === 'documentUpload') {
      setFormData((prev) => ({
        ...prev,
        uploadedFiles: []
      }));
    } else if (activeTab === 'excelCsv') {
      setFormData((prev) => ({
        ...prev,
        excelCsvFiles: [],
        fieldMappings: {
          title: 'none',
          description: 'none',
          criteria: 'none',
          additionalInfo: 'none'
        }
      }));
    } else if (activeTab === 'manualEntry') {
      setFormData((prev) => ({
        ...prev,
        userStories: [
          {
            id: 1,
            title: '',
            description: '',
            criteria: '',
            additionalInfo: ''
          }
        ]
      }));
    } else if (activeTab === 'unstructuredEntry' && unstructuredTextRef.current) {
      unstructuredTextRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    let submissionData = null;

    if (activeTab === 'documentUpload' && formData.uploadedFiles.length > 0) {
      submissionData = {
        source: 'Document Upload',
        files: formData.uploadedFiles,
        type: 'document'
      };

      alert({
        title: 'Documents submitted',
        description: `Processing ${formData.uploadedFiles.length} document(s)`
      });
    } else if (activeTab === 'excelCsv' && formData.excelCsvFiles.length > 0) {
      submissionData = {
        source: 'Excel/CSV',
        files: formData.excelCsvFiles,
        fieldMappings: formData.fieldMappings,
        type: 'excel'
      };

      alert({
        title: 'Excel/CSV submitted',
        description: `Processing with field mappings`
      });
    } else if (activeTab === 'manualEntry' && formData.userStories.length > 0) {
      const validUserStories = formData.userStories.filter(
        (story) =>
          story.title.trim() !== '' ||
          story.description.trim() !== '' ||
          story.criteria.trim() !== ''
      );

      if (validUserStories.length === 0) {
        alert({
          title: 'No valid user stories',
          description: 'Please enter at least one user story with content',
          variant: 'destructive'
        });
        return null;
      }

      submissionData = {
        source: 'Manual Entry',
        userStories: validUserStories,
        type: 'manual'
      };

      alert({
        title: 'User stories submitted',
        description: `Saving ${validUserStories.length} user story/stories`
      });
    } else if (activeTab === 'unstructuredEntry') {
      const unstructuredText = unstructuredTextRef.current;
      if (!unstructuredText || unstructuredText.value.trim() === '') {
        alert({
          title: 'No text entered',
          description: 'Please enter some unstructured text to process',
          variant: 'destructive'
        });
        return null;
      }

      submissionData = {
        source: 'Unstructured Entry',
        text: unstructuredText.value,
        type: 'unstructured'
      };

      alert({
        title: 'Unstructured text submitted',
        description: 'Processing text to extract user stories'
      });
    }

    if (submissionData) {
      console.log('Submission data:', submissionData);

      if (onSubmit) {
        onSubmit(submissionData);
      }

      resetFormData();
    } else {
      alert({
        title: 'No data to submit',
        description: 'Please ensure you have entered the required data',
        variant: 'destructive'
      });
      return null;
    }

    return submissionData;
  };

  const tabs = [
    { value: 'documentUpload', label: 'Document Upload' },
    { value: 'excelCsv', label: 'Excel/CSV' },
    { value: 'manualEntry', label: 'Manual Entry' },
    { value: 'unstructuredEntry', label: 'Manual Entry - Unstructured' }
  ];

  return (
    <Card className="import-card border shadow-sm">
      <CardHeader className="import-card-header">
        <CardTitle className="import-card-title text-xl font-semibold">
          Manual/CSV/Word Import
        </CardTitle>
        <p className="import-card-description text-gray-600 text-sm">
          Upload documents or manually enter user stories
        </p>
      </CardHeader>
      <CardContent className="import-card-content">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="import-tabs w-full">
          <TabsList className="import-tabs-list mb-8 w-full grid grid-cols-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className={`tab-${tab.value}`}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="documentUpload" className="document-upload-tab">
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e, 'document')}
              className="hidden"
              multiple
              accept=".pdf,.docx,.txt"
            />

            <div className="document-upload-zone border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="upload-icon-container flex justify-center mb-4">
                <Upload className="upload-icon h-10 w-10 text-gray-400" />
              </div>
              <p className="upload-instructions text-gray-700 mb-2">
                Drag and drop files here or click to browse
              </p>
              <p className="upload-format-info text-xs text-gray-500 mb-4">
                Supported formats: PDF, DOCX, TXT (Max size: 10MB per file)
              </p>
              <Button
                variant="outline"
                className="browse-files-btn mx-auto"
                onClick={() => handleBrowseClick('document')}>
                Browse Files
              </Button>
            </div>

            {formData.uploadedFiles.length > 0 && (
              <div className="uploaded-files-container mt-6 space-y-3">
                {formData.uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="uploaded-file-item flex items-center justify-between bg-white p-3 border rounded-md">
                    <div className="file-info flex items-center space-x-3">
                      <div className="file-icon bg-blue-100 p-2 rounded">
                        <svg
                          className="file-icon-svg h-5 w-5 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="file-details">
                        <p className="file-name text-sm font-medium">{file.name}</p>
                        <p className="file-meta text-xs text-gray-500">
                          {file.size} • Uploaded {file.uploadTime}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id, 'document')}
                      className="remove-file-btn text-gray-400 hover:text-red-500"
                      aria-label="Remove file">
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="excelCsv" className="excel-csv-tab">
            <input
              type="file"
              ref={excelFileInputRef}
              onChange={(e) => handleFileChange(e, 'excel')}
              className="hidden"
              accept=".csv,.xlsx,.xls"
            />

            <div className="excel-upload-zone border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="excel-icon-container flex justify-center mb-4">
                <FileSpreadsheet className="excel-icon h-10 w-10 text-gray-400" />
              </div>
              <p className="excel-instructions text-gray-700 mb-2">
                Drag and drop Excel/CSV files here or click to browse
              </p>
              <p className="excel-format-info text-xs text-gray-500 mb-4">
                Supported formats: XLSX, CSV (Max size: 10MB per file)
              </p>
              <Button
                variant="outline"
                className="browse-excel-btn mx-auto"
                onClick={() => handleBrowseClick('excel')}>
                Browse Files
              </Button>
            </div>

            {formData.excelCsvFiles.length > 0 && (
              <div className="uploaded-excel-files-container mt-6 space-y-3">
                {formData.excelCsvFiles.map((file) => (
                  <div
                    key={file.id}
                    className="uploaded-file-item flex items-center justify-between bg-white p-3 border rounded-md">
                    <div className="file-info flex items-center space-x-3">
                      <div className="file-icon bg-green-100 p-2 rounded">
                        <FileSpreadsheet className="file-icon-svg h-5 w-5 text-green-600" />
                      </div>
                      <div className="file-details">
                        <p className="file-name text-sm font-medium">{file.name}</p>
                        <p className="file-meta text-xs text-gray-500">
                          {file.size} • Uploaded {file.uploadTime}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id, 'excel')}
                      className="remove-file-btn text-gray-400 hover:text-red-500"
                      aria-label="Remove file">
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8">
              <ExcelCsvMapping
                uploadedFile={formData.excelCsvFiles[0] || null}
                onFieldsMapping={handleFieldsMapping}
              />
            </div>
          </TabsContent>

          <TabsContent value="manualEntry" className="manual-entry-tab space-y-8">
            {formData.userStories.map((story) => (
              <div key={story.id} className="user-story-container space-y-4 pb-6 border-b">
                <div className="user-story-header flex justify-between items-center">
                  <h3 className="user-story-title text-md font-medium">User Story #{story.id}</h3>
                  {formData.userStories.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeUserStory(story.id)}
                      className="remove-story-btn text-red-500 hover:text-red-700 hover:bg-red-50">
                      Remove
                    </Button>
                  )}
                </div>

                <div className="story-form-fields space-y-4">
                  <div className="story-title-field">
                    <Label
                      htmlFor={`title-${story.id}`}
                      className="story-field-label text-sm font-medium">
                      Title <span className="required-marker text-red-500">*</span>
                    </Label>
                    <Input
                      id={`title-${story.id}`}
                      value={story.title}
                      onChange={(e) => updateUserStory(story.id, 'title', e.target.value)}
                      placeholder="Enter user story title"
                      className="story-title-input mt-1"
                    />
                  </div>

                  <div className="story-description-field">
                    <Label
                      htmlFor={`description-${story.id}`}
                      className="story-field-label text-sm font-medium">
                      Description <span className="required-marker text-red-500">*</span>
                    </Label>
                    <Textarea
                      id={`description-${story.id}`}
                      value={story.description}
                      onChange={(e) => updateUserStory(story.id, 'description', e.target.value)}
                      placeholder="Enter a detailed description of the user story"
                      className="story-description-input mt-1 min-h-[120px]"
                    />
                  </div>

                  <div className="story-criteria-field">
                    <Label
                      htmlFor={`criteria-${story.id}`}
                      className="story-field-label text-sm font-medium">
                      Acceptance Criteria <span className="required-marker text-red-500">*</span>
                    </Label>
                    <Textarea
                      id={`criteria-${story.id}`}
                      value={story.criteria}
                      onChange={(e) => updateUserStory(story.id, 'criteria', e.target.value)}
                      placeholder="Enter acceptance criteria"
                      className="story-criteria-input mt-1 min-h-[120px]"
                    />
                  </div>

                  <div className="story-additional-field">
                    <Label
                      htmlFor={`additional-${story.id}`}
                      className="story-field-label text-sm font-medium">
                      Additional Information
                    </Label>
                    <Textarea
                      id={`additional-${story.id}`}
                      value={story.additionalInfo}
                      onChange={(e) => updateUserStory(story.id, 'additionalInfo', e.target.value)}
                      placeholder="Enter any additional information or context"
                      className="story-additional-input mt-1 min-h-[120px]"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              onClick={addNewUserStory}
              variant="outline"
              className="add-story-btn flex items-center gap-2">
              <Plus size={16} />
              Add Another User Story
            </Button>
          </TabsContent>

          <TabsContent value="unstructuredEntry" className="unstructured-entry-tab space-y-4">
            <div className="unstructured-form-container">
              <div className="unstructured-text-field">
                <Label htmlFor="unstructured-text" className="field-label text-sm font-medium">
                  User Story Text <span className="required-marker text-red-500">*</span>
                </Label>
                <Textarea
                  id="unstructured-text"
                  placeholder="Paste or type your unstructured user story text here"
                  className="unstructured-input mt-1 min-h-[300px]"
                  ref={unstructuredTextRef}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Paste your user story in any format. Our AI will attempt to extract the title,
                  description, and acceptance criteria.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="import-card-footer flex justify-between border-t p-4 mt-4">
        <Button variant="outline" className="cancel-btn">
          Cancel
        </Button>
        <Button
          className="action-btn"
          onClick={handleSubmit}
          disabled={
            (activeTab === 'documentUpload' && formData.uploadedFiles.length === 0) ||
            (activeTab === 'excelCsv' &&
              formData.excelCsvFiles.length === 0 &&
              Object.values(formData.fieldMappings).every((v) => v === 'none'))
          }>
          {activeTab === 'documentUpload'
            ? 'Process Documents'
            : activeTab === 'excelCsv'
              ? 'Import User Stories'
              : activeTab === 'manualEntry'
                ? 'Save User Stories'
                : 'Process Unstructured Text'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ManualCsvWordImport;
