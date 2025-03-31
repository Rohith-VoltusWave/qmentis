import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/ShadcnComponents/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/ShadcnComponents/ui/select';
import { Label } from '@/ShadcnComponents/ui/label';

interface ExcelCsvMappingProps {
  uploadedFile: {
    id: string;
    name: string;
    size: string;
    uploadTime: string;
  } | null;
  onFieldsMapping: (mappings: Record<string, string>) => void;
}

interface FieldMapping {
  qmentisField: string;
  excelColumn: string;
  preview: string;
}

const ExcelCsvMapping: React.FC<ExcelCsvMappingProps> = ({ uploadedFile, onFieldsMapping }) => {
  const [mappings, setMappings] = useState<Record<string, string>>({
    title: 'none',
    description: 'none',
    criteria: 'none',
    additionalInfo: 'none'
  });

  const [previewData, setPreviewData] = useState<Record<string, string>>({
    title: 'No respected column',
    description: 'No respected column',
    criteria: 'No respected column',
    additionalInfo: 'No respected column'
  });

  const availableColumns = [
    { value: 'none', label: 'Please select' },
    { value: 'story_title', label: 'Story Title' },
    { value: 'description', label: 'Description' },
    { value: 'acceptance_criteria', label: 'Acceptance Criteria' },
    { value: 'additional_info', label: 'Additional Info' }
  ];

  const handleFieldMapping = (qmentisField: string, excelColumn: string) => {
    const newMappings = { ...mappings, [qmentisField]: excelColumn };
    setMappings(newMappings);
    onFieldsMapping(newMappings);

    let previewValue = 'No respected column';

    if (excelColumn !== 'none') {
      switch (excelColumn) {
        case 'story_title':
          previewValue = 'As a user, I want to reset my p...';
          break;
        case 'description':
          previewValue = 'The user should be able to res...';
          break;
        case 'acceptance_criteria':
          previewValue = '1. User can click "Forgot Passw...';
          break;
        case 'additional_info':
          previewValue = 'This feature should be access...';
          break;
        default:
          previewValue = 'No respected column';
      }
    }

    setPreviewData((prev) => ({
      ...prev,
      [qmentisField]: previewValue
    }));
  };

  useEffect(() => {
    if (uploadedFile) {
      console.log(`Loading preview data from file: ${uploadedFile.name}`);

      const initialMappings = {
        title: 'none',
        description: 'none',
        criteria: 'none',
        additionalInfo: 'none'
      };

      setMappings(initialMappings);
      onFieldsMapping(initialMappings);

      setPreviewData({
        title: 'No respected column',
        description: 'No respected column',
        criteria: 'No respected column',
        additionalInfo: 'No respected column'
      });
    }
  }, [uploadedFile]);

  return (
    <div className="space-y-4">
      <div className="map-fields-header">
        <h3 className="text-lg font-medium">Map Fields</h3>
        <p className="text-sm text-gray-500 mb-4">
          {uploadedFile
            ? 'Map your Excel/CSV columns to the required user story fields'
            : 'Select how your Excel/CSV columns will map to user story fields'}
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3 text-left">QMentisAI Field</TableHead>
            <TableHead className="w-1/3 text-left">Your Excel/CSV Column</TableHead>
            <TableHead className="w-1/3 text-left">Preview</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Label className="flex items-center">
                Title <span className="text-red-500 ml-1">*</span>
              </Label>
            </TableCell>
            <TableCell>
              <Select
                value={mappings.title}
                onValueChange={(value) => handleFieldMapping('title', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                  {availableColumns.map((column) => (
                    <SelectItem key={column.value} value={column.value}>
                      {column.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="text-sm text-gray-600">{previewData.title}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Label className="flex items-center">
                Description <span className="text-red-500 ml-1">*</span>
              </Label>
            </TableCell>
            <TableCell>
              <Select
                value={mappings.description}
                onValueChange={(value) => handleFieldMapping('description', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                  {availableColumns.map((column) => (
                    <SelectItem key={column.value} value={column.value}>
                      {column.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="text-sm text-gray-600">{previewData.description}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Label className="flex items-center">
                Acceptance Criteria <span className="text-red-500 ml-1">*</span>
              </Label>
            </TableCell>
            <TableCell>
              <Select
                value={mappings.criteria}
                onValueChange={(value) => handleFieldMapping('criteria', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                  {availableColumns.map((column) => (
                    <SelectItem key={column.value} value={column.value}>
                      {column.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="text-sm text-gray-600">{previewData.criteria}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Label>Additional Information</Label>
            </TableCell>
            <TableCell>
              <Select
                value={mappings.additionalInfo}
                onValueChange={(value) => handleFieldMapping('additionalInfo', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                  {availableColumns.map((column) => (
                    <SelectItem key={column.value} value={column.value}>
                      {column.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="text-sm text-gray-600">{previewData.additionalInfo}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {!uploadedFile && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-sm text-amber-800">
            Please upload an Excel or CSV file to map your actual data. The preview will update
            automatically.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExcelCsvMapping;
