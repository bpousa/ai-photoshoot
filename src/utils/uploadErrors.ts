export class PhotoUploadError extends Error {
  code: string;
  details?: any;

  constructor(code: string, message: string, details?: any) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'PhotoUploadError';
  }
}

export const UPLOAD_ERRORS = {
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  CORRUPTED_IMAGE: 'CORRUPTED_IMAGE',
  NETWORK_ERROR: 'NETWORK_ERROR',
  LOW_RESOLUTION: 'LOW_RESOLUTION',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  MAX_FILES_EXCEEDED: 'MAX_FILES_EXCEEDED'
} as const;

export function getErrorMessage(error: PhotoUploadError): string {
  switch (error.code) {
    case UPLOAD_ERRORS.FILE_TOO_LARGE:
      return 'File size exceeds the 10MB limit';
    case UPLOAD_ERRORS.INVALID_FILE_TYPE:
      return 'Only JPEG and PNG files are allowed';
    case UPLOAD_ERRORS.CORRUPTED_IMAGE:
      return 'The image file appears to be corrupted';
    case UPLOAD_ERRORS.NETWORK_ERROR:
      return 'Network error occurred while uploading';
    case UPLOAD_ERRORS.LOW_RESOLUTION:
      return `Image resolution too low (minimum 1024x1024)`;
    case UPLOAD_ERRORS.QUOTA_EXCEEDED:
      return 'Upload quota exceeded';
    case UPLOAD_ERRORS.MAX_FILES_EXCEEDED:
      return 'Maximum number of files (15) exceeded';
    default:
      return 'An unexpected error occurred';
  }
}