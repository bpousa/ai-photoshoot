import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export function ImageUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length + files.length > 10) {
        alert('Maximum 10 photos allowed');
        return;
      }
      setFiles(prev => [...prev, ...acceptedFiles]);
    }
  });

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setProgress(0);
    
    try {
      // Convert files to base64 for fal.ai
      const imagePromises = files.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const images = await Promise.all(imagePromises);
      
      // Start training process
      const response = await fetch('/api/train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images })
      });

      if (!response.ok) throw new Error('Training failed');
      
      // Clear files after successful upload
      setFiles([]);
      setProgress(100);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}
        `}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive
            ? 'Drop your photos here...'
            : 'Drag & drop up to 10 photos here, or click to select'}
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Upload ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <p>{files.length} photos selected</p>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Start Upload'}
            </button>
          </div>

          {uploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}