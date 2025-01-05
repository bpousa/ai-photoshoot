import { PackageFormData, PackageFormErrors } from '@/types/packages/forms';

export function validatePackageForm(data: PackageFormData): PackageFormErrors {
  const errors: PackageFormErrors = {};

  // Basic validations
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.description.trim()) {
    errors.description = 'Description is required';
  }

  if (data.price <= 0) {
    errors.price = 'Price must be greater than 0';
  }

  // Credits validation
  if (data.credits.photos < 0) {
    errors.credits = {
      ...errors.credits,
      photos: 'Photo credits cannot be negative'
    };
  }

  if (data.credits.videos < 0) {
    errors.credits = {
      ...errors.credits,
      videos: 'Video credits cannot be negative'
    };
  }

  // At least one type of credit must be provided
  if (data.credits.photos === 0 && data.credits.videos === 0) {
    errors.credits = {
      ...errors.credits,
      photos: 'At least one type of credit must be provided'
    };
  }

  return errors;
}