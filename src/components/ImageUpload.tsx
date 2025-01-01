import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export function ImageUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      setFiles(prev => [...prev, ...acceptedFiles]);
    }
  });

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    try {
      // TODO: Implement file upload to S3
      // TODO: Start model training
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
        <input {...getInputProps()} />
        <p>Drag & drop up to 10 photos here, or click to select files</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <p>{files.length} files selected</p>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Start Upload'}
          </button>
        </div>
      )}
    </div>
  );
}