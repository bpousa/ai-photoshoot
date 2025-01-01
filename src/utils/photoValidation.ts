export interface PhotoValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface PhotoRequirements {
  minPhotos: number;
  maxPhotos: number;
  minResolution: number;
  maxFileSize: number; // in bytes
}

const DEFAULT_REQUIREMENTS: PhotoRequirements = {
  minPhotos: 8,
  maxPhotos: 15,
  minResolution: 1024,
  maxFileSize: 10 * 1024 * 1024, // 10MB
};

export async function validatePhoto(
  file: File,
  requirements = DEFAULT_REQUIREMENTS
): Promise<PhotoValidationResult> {
  const errors: string[] = [];

  // Check file size
  if (file.size > requirements.maxFileSize) {
    errors.push('File size exceeds 10MB limit');
  }

  // Check image dimensions
  try {
    const dimensions = await getImageDimensions(file);
    if (dimensions.width < requirements.minResolution || 
        dimensions.height < requirements.minResolution) {
      errors.push(`Image must be at least ${requirements.minResolution}x${requirements.minResolution} pixels`);
    }
  } catch (error) {
    errors.push('Unable to read image dimensions');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    img.src = URL.createObjectURL(file);
  });
}