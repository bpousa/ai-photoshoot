import React from 'react';
import { validatePhoto } from '@/utils/photoValidation';

interface PhotoQualityCheckerProps {
  file: File;
  onValidationComplete: (isValid: boolean) => void;
}

export function PhotoQualityChecker({ file, onValidationComplete }: PhotoQualityCheckerProps) {
  const [isChecking, setIsChecking] = React.useState(true);
  const [errors, setErrors] = React.useState<string[]>([]);

  React.useEffect(() => {
    let mounted = true;

    async function checkQuality() {
      setIsChecking(true);
      const result = await validatePhoto(file);
      
      if (mounted) {
        setErrors(result.errors);
        setIsChecking(false);
        onValidationComplete(result.isValid);
      }
    }

    checkQuality();
    return () => { mounted = false; };
  }, [file]);

  if (isChecking) {
    return (
      <div className="p-2 text-sm text-blue-600">
        Checking photo quality...
      </div>
    );
  }

  if (errors.length > 0) {
    return (
      <div className="p-2 text-sm text-red-600">
        <ul className="list-disc pl-5">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="p-2 text-sm text-green-600">
      Photo quality looks good! ✓
    </div>
  );
}