import React, { useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { uploadMedia } from '../lib/supabase';

interface MediaUploadProps {
  childId: string;
  onUploadComplete: (urls: string[]) => void;
  type: 'photo' | 'video';
}

const MediaUpload: React.FC<MediaUploadProps> = ({ childId, onUploadComplete, type }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = {
    photo: 'image/*',
    video: 'video/*'
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    setIsUploading(true);
    const uploadPromises: Promise<string | null>[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      uploadPromises.push(uploadMedia(file, childId));
      setProgress((i + 1) / files.length * 100);
    }

    const urls = (await Promise.all(uploadPromises)).filter((url): url is string => url !== null);
    onUploadComplete(urls);
    setIsUploading(false);
    setProgress(0);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes[type]}
        multiple
        onChange={handleFileSelect}
        className="hidden"
        id="media-upload"
      />
      <label
        htmlFor="media-upload"
        className={`w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer
          ${isUploading ? 'bg-gray-50 border-gray-300' : 'border-indigo-300 hover:border-indigo-400 hover:bg-indigo-50'}`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            <span className="mt-2 text-sm text-gray-500">Uploading... {progress.toFixed(0)}%</span>
          </div>
        ) : (
          <>
            <Upload className="w-8 h-8 text-indigo-500 mb-2" />
            <span className="text-sm text-gray-500">
              Click to upload {type === 'photo' ? 'photos' : 'videos'}
            </span>
          </>
        )}
      </label>
    </div>
  );
};

export default MediaUpload