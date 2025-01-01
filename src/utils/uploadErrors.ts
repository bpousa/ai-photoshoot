export const UPLOAD_ERRORS = {
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  CORRUPTED_IMAGE: 'CORRUPTED_IMAGE',
  NETWORK_ERROR: 'NETWORK_ERROR',
  LOW_RESOLUTION: 'LOW_RESOLUTION',
} as const;

export function getErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case UPLOAD_ERRORS.FILE_TOO_LARGE:
      return 'File size exceeds the 10MB limit';
    case UPLOAD_ERRORS.INVALID_FILE_TYPE:
      return 'Only JPEG and PNG files are allowed';
    case UPLOAD_ERRORS.CORRUPTED_IMAGE:
      return 'The image file appears to be corrupted';
    case UPLOAD_ERRORS.NETWORK_ERROR:
      return 'Network error occurred while uploading';
    case UPLOAD_ERRORS.LOW_RESOLUTION:
      return 'Image resolution too low (minimum 1024x1024)';
    default:
      return 'An unexpected error occurred';
  }
}