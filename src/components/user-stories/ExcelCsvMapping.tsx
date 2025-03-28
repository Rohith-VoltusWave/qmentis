import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";

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

const ExcelCsvMapping: React.FC<ExcelCsvMappingProps> = ({
  uploadedFile,
  onFieldsMapping,
}) => {
  const [mappings, setMappings] = useState<Record<string, string>>({
    title: "none",
    description: "none",
    criteria: "none",
    additionalInfo: "none",
  });

  const [previewData, setPreviewData] = useState<Record<string, string>>({
    title: "No respected column",
    description: "No respected column",
    criteria: "No respected column",
    additionalInfo: "No respected column",
  });

  const isMobile = useIsMobile();

  const availableColumns = [
    { value: "none", label: "Please select" },
    { value: "story_title", label: "Story Title" },
    { value: "description", label: "Description" },
    { value: "acceptance_criteria", label: "Acceptance Criteria" },
    { value: "additional_info", label: "Additional Info" },
  ];

  // Update mappings when a field is selected
  const handleFieldMapping = (qmentisField: string, excelColumn: string) => {
    const newMappings = { ...mappings, [qmentisField]: excelColumn };
    setMappings(newMappings);
    onFieldsMapping(newMappings);

    let previewValue = "No respected column";

    if (excelColumn !== "none") {
      switch (excelColumn) {
        case "story_title":
          previewValue = "As a user, I want to reset my p...";
          break;
        case "description":
          previewValue = "The user should be able to res...";
          break;
        case "acceptance_criteria":
          previewValue = '1. User can click "Forgot Passw...';
          break;
        case "additional_info":
          previewValue = "This feature should be access...";
          break;
        default:
          previewValue = "No respected column";
      }
    }

    setPreviewData((prev) => ({
      ...prev,
      [qmentisField]: previewValue,
    }));
  };

  // Reset preview data and mappings when a new file is uploaded
  useEffect(() => {
    if (uploadedFile) {
      console.log(`Loading preview data from file: ${uploadedFile.name}`);

      const initialMappings = {
        title: "none",
        description: "none",
        criteria: "none",
        additionalInfo: "none",
      };

      setMappings(initialMappings);
      onFieldsMapping(initialMappings);

      // Reset preview data
      setPreviewData({
        title: "No respected column",
        description: "No respected column",
        criteria: "No respected column",
        additionalInfo: "No respected column",
      });
    }
  }, [uploadedFile]);

  // Mobile-friendly rendering of mapping fields
  const renderMobileMapping = () => {
    return (
      <div className="space-y-4">
        <div className="mapping-field space-y-2 border-b pb-4">
          <Label className="flex items-center font-medium">
            Title <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select
            value={mappings.title}
            onValueChange={(value) => handleFieldMapping("title", value)}
          >
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="Please select" />
            </SelectTrigger>
            <SelectContent>
              {availableColumns.map((column) => (
                <SelectItem
                  key={column.value}
                  value={column.value}
                  className="text-xs"
                >
                  {column.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="preview mt-1 text-xs text-gray-600 italic">
            Preview: {previewData.title}
          </div>
        </div>

        <div className="mapping-field space-y-2 border-b pb-4">
          <Label className="flex items-center font-medium">
            Description <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select
            value={mappings.description}
            onValueChange={(value) => handleFieldMapping("description", value)}
          >
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="Please select" />
            </SelectTrigger>
            <SelectContent>
              {availableColumns.map((column) => (
                <SelectItem
                  key={column.value}
                  value={column.value}
                  className="text-xs"
                >
                  {column.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="preview mt-1 text-xs text-gray-600 italic">
            Preview: {previewData.description}
          </div>
        </div>

        <div className="mapping-field space-y-2 border-b pb-4">
          <Label className="flex items-center font-medium">
            Acceptance Criteria <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select
            value={mappings.criteria}
            onValueChange={(value) => handleFieldMapping("criteria", value)}
          >
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="Please select" />
            </SelectTrigger>
            <SelectContent>
              {availableColumns.map((column) => (
                <SelectItem
                  key={column.value}
                  value={column.value}
                  className="text-xs"
                >
                  {column.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="preview mt-1 text-xs text-gray-600 italic">
            Preview: {previewData.criteria}
          </div>
        </div>

        <div className="mapping-field space-y-2">
          <Label className="flex items-center font-medium">
            Additional Information
          </Label>
          <Select
            value={mappings.additionalInfo}
            onValueChange={(value) =>
              handleFieldMapping("additionalInfo", value)
            }
          >
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="Please select" />
            </SelectTrigger>
            <SelectContent>
              {availableColumns.map((column) => (
                <SelectItem
                  key={column.value}
                  value={column.value}
                  className="text-xs"
                >
                  {column.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="preview mt-1 text-xs text-gray-600 italic">
            Preview: {previewData.additionalInfo}
          </div>
        </div>
      </div>
    );
  };

  // Desktop table view of mapping fields
  const renderDesktopTable = () => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3 text-left text-xs sm:text-sm">
              QMentisAI Field
            </TableHead>
            <TableHead className="w-1/3 text-left text-xs sm:text-sm">
              Your Excel/CSV Column
            </TableHead>
            <TableHead className="w-1/3 text-left text-xs sm:text-sm">
              Preview
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="py-2 sm:py-4">
              <Label className="flex items-center text-xs sm:text-sm">
                Title <span className="text-red-500 ml-1">*</span>
              </Label>
            </TableCell>
            <TableCell className="py-2 sm:py-4">
              <Select
                value={mappings.title}
                onValueChange={(value) => handleFieldMapping("title", value)}
              >
                <SelectTrigger className="w-full text-xs sm:text-sm">
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
            <TableCell className="text-xs sm:text-sm text-gray-600 py-2 sm:py-4">
              {previewData.title}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="py-2 sm:py-4">
              <Label className="flex items-center text-xs sm:text-sm">
                Description <span className="text-red-500 ml-1">*</span>
              </Label>
            </TableCell>
            <TableCell className="py-2 sm:py-4">
              <Select
                value={mappings.description}
                onValueChange={(value) =>
                  handleFieldMapping("description", value)
                }
              >
                <SelectTrigger className="w-full text-xs sm:text-sm">
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
            <TableCell className="text-xs sm:text-sm text-gray-600 py-2 sm:py-4">
              {previewData.description}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="py-2 sm:py-4">
              <Label className="flex items-center text-xs sm:text-sm">
                Acceptance Criteria <span className="text-red-500 ml-1">*</span>
              </Label>
            </TableCell>
            <TableCell className="py-2 sm:py-4">
              <Select
                value={mappings.criteria}
                onValueChange={(value) => handleFieldMapping("criteria", value)}
              >
                <SelectTrigger className="w-full text-xs sm:text-sm">
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
            <TableCell className="text-xs sm:text-sm text-gray-600 py-2 sm:py-4">
              {previewData.criteria}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="py-2 sm:py-4">
              <Label className="text-xs sm:text-sm">
                Additional Information
              </Label>
            </TableCell>
            <TableCell className="py-2 sm:py-4">
              <Select
                value={mappings.additionalInfo}
                onValueChange={(value) =>
                  handleFieldMapping("additionalInfo", value)
                }
              >
                <SelectTrigger className="w-full text-xs sm:text-sm">
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
            <TableCell className="text-xs sm:text-sm text-gray-600 py-2 sm:py-4">
              {previewData.additionalInfo}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="space-y-4">
      <div className="map-fields-header">
        <h3 className="text-md sm:text-lg font-medium">Map Fields</h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
          {uploadedFile
            ? "Map your Excel/CSV columns to the required user story fields"
            : "Select how your Excel/CSV columns will map to user story fields"}
        </p>
      </div>

      {isMobile ? renderMobileMapping() : renderDesktopTable()}

      {!uploadedFile && (
        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-xs sm:text-sm text-amber-800">
            Please upload an Excel or CSV file to map your actual data. The
            preview will update automatically.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExcelCsvMapping;
