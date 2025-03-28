import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileAudio, FileVideo, Upload, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface AudioVideoImportProps {
  onSubmit?: (data: any) => void;
}

const AudioVideoImport: React.FC<AudioVideoImportProps> = ({ onSubmit }) => {
  const [activeTab, setActiveTab] = useState<string>("audio");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const isMobile = useIsMobile();

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith("audio/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an audio file",
          variant: "destructive",
        });
        return;
      }

      setAudioFile(file);
      toast({
        title: "Audio file uploaded",
        description: `Uploaded: ${file.name}`,
      });
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith("video/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload a video file",
          variant: "destructive",
        });
        return;
      }

      setVideoFile(file);
      toast({
        title: "Video file uploaded",
        description: `Uploaded: ${file.name}`,
      });
    }
  };

  const handleRemoveAudio = () => {
    setAudioFile(null);
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
  };

  const resetFiles = () => {
    if (activeTab === "audio") {
      setAudioFile(null);
    } else if (activeTab === "video") {
      setVideoFile(null);
    }
  };

  const handleSubmit = () => {
    let submissionData = null;

    if (activeTab === "audio" && audioFile) {
      submissionData = {
        source: "Audio",
        fileName: audioFile.name,
        fileSize: audioFile.size,
        fileType: audioFile.type,
        type: "audio",
      };

      toast({
        title: "Audio file submitted",
        description: `Processing: ${audioFile.name}`,
      });
    } else if (activeTab === "video" && videoFile) {
      submissionData = {
        source: "Video",
        fileName: videoFile.name,
        fileSize: videoFile.size,
        fileType: videoFile.type,
        type: "video",
      };

      toast({
        title: "Video file submitted",
        description: `Processing: ${videoFile.name}`,
      });
    } else {
      toast({
        title: "No file selected",
        description: "Please upload a file before submitting",
        variant: "destructive",
      });
      return null;
    }

    if (submissionData) {
      console.log("Submission data:", submissionData);

      if (onSubmit) {
        onSubmit(submissionData);
      }

      resetFiles();
    }

    return submissionData;
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
        <CardTitle className="text-lg sm:text-xl font-semibold">
          Audio/Video Import
        </CardTitle>
        <p className="text-xs sm:text-sm text-gray-600">
          Import user stories from audio or video recordings
        </p>
      </CardHeader>
      <CardContent className="px-3 sm:px-6 pb-4">
        <Tabs
          defaultValue="audio"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-4 sm:mb-6 w-full grid grid-cols-2">
            <TabsTrigger
              value="audio"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2"
            >
              <FileAudio className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Audio</span>
            </TabsTrigger>
            <TabsTrigger
              value="video"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2"
            >
              <FileVideo className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Video</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="audio">
            <div className="flex flex-col items-center justify-center py-6 sm:py-10">
              {!audioFile ? (
                <div className="text-center">
                  <div className="bg-gray-100 p-4 sm:p-6 rounded-full mb-4 sm:mb-6 inline-block">
                    <FileAudio className="h-8 w-8 sm:h-12 sm:w-12 text-blue-500" />
                  </div>
                  <h3 className="text-md sm:text-lg font-semibold mb-2 sm:mb-3">
                    Upload Audio File
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto">
                    Upload your audio recording to extract user stories using AI
                  </p>
                  <label htmlFor="audio-upload" className="cursor-pointer">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 bg-blue-500 text-white py-2 px-3 sm:px-4 rounded-md hover:bg-blue-600 text-xs sm:text-sm">
                      <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Select Audio File</span>
                    </div>
                    <input
                      id="audio-upload"
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={handleAudioUpload}
                    />
                  </label>
                </div>
              ) : (
                <div className="w-full max-w-md">
                  <div className="bg-blue-50 p-3 sm:p-4 rounded-md mb-3 sm:mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <FileAudio className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                      <div className="overflow-hidden">
                        <p className="font-medium text-xs sm:text-sm truncate max-w-[180px] sm:max-w-none">
                          {audioFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleRemoveAudio}
                      aria-label="Remove audio file"
                      className="h-7 w-7 sm:h-9 sm:w-9"
                    >
                      <X className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                    Your audio file will be processed to extract user stories
                    using AI.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="video">
            <div className="flex flex-col items-center justify-center py-6 sm:py-10">
              {!videoFile ? (
                <div className="text-center">
                  <div className="bg-gray-100 p-4 sm:p-6 rounded-full mb-4 sm:mb-6 inline-block">
                    <FileVideo className="h-8 w-8 sm:h-12 sm:w-12 text-blue-500" />
                  </div>
                  <h3 className="text-md sm:text-lg font-semibold mb-2 sm:mb-3">
                    Upload Video File
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto">
                    Upload your video recording to extract user stories using AI
                  </p>
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 bg-blue-500 text-white py-2 px-3 sm:px-4 rounded-md hover:bg-blue-600 text-xs sm:text-sm">
                      <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Select Video File</span>
                    </div>
                    <input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleVideoUpload}
                    />
                  </label>
                </div>
              ) : (
                <div className="w-full max-w-md">
                  <div className="bg-blue-50 p-3 sm:p-4 rounded-md mb-3 sm:mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <FileVideo className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                      <div className="overflow-hidden">
                        <p className="font-medium text-xs sm:text-sm truncate max-w-[180px] sm:max-w-none">
                          {videoFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleRemoveVideo}
                      aria-label="Remove video file"
                      className="h-7 w-7 sm:h-9 sm:w-9"
                    >
                      <X className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                    Your video file will be processed to extract user stories
                    using AI.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-3 sm:p-4 flex-wrap gap-2">
        <Button
          variant="outline"
          size={isMobile ? "sm" : "default"}
          className="text-xs sm:text-sm"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={
            (activeTab === "audio" && !audioFile) ||
            (activeTab === "video" && !videoFile)
          }
          size={isMobile ? "sm" : "default"}
          className="text-xs sm:text-sm"
        >
          Process {activeTab === "audio" ? "Audio" : "Video"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AudioVideoImport;
