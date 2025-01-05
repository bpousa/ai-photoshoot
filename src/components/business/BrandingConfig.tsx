import React from 'react';
import { SketchPicker } from 'react-color';
import { BusinessProfile } from '@/types/business';

interface BrandingConfigProps {
  profile: BusinessProfile;
  onUpdate: (branding: BusinessProfile['branding']) => Promise<void>;
}

export function BrandingConfig({ profile, onUpdate }: BrandingConfigProps) {
  const [logo, setLogo] = React.useState<File | null>(null);
  const [colors, setColors] = React.useState(profile.branding.colors);
  const [saving, setSaving] = React.useState(false);

  async function handleLogoUpload(file: File) {
    try {
      const formData = new FormData();
      formData.append('logo', file);

      const response = await fetch('/api/business/upload-logo', {
        method: 'POST',
        body: formData
      });

      const { url } = await response.json();
      return url;
    } catch (error) {
      console.error('Logo upload error:', error);
      throw error;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      let logoUrl = profile.branding.logo;

      if (logo) {
        logoUrl = await handleLogoUpload(logo);
      }

      await onUpdate({
        ...profile.branding,
        logo: logoUrl,
        colors
      });
    } catch (error) {
      console.error('Branding update error:', error);
      alert('Failed to update branding');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Business Logo
        </label>
        <div className="flex items-center space-x-4">
          {(profile.branding.logo || logo) && (
            <img
              src={logo ? URL.createObjectURL(logo) : profile.branding.logo}
              alt="Logo"
              className="h-12 w-12 object-contain"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
      </div>

      {/* Color Picker */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Primary Color
          </label>
          <SketchPicker
            color={colors.primary}
            onChange={(color) => setColors({
              ...colors,
              primary: color.hex
            })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Secondary Color
          </label>
          <SketchPicker
            color={colors.secondary}
            onChange={(color) => setColors({
              ...colors,
              secondary: color.hex
            })}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full bg-blue-500 text-white p-2 rounded-lg
          hover:bg-blue-600 disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Branding'}
      </button>
    </form>
  );
}