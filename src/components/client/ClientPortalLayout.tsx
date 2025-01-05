import React from 'react';
import { ClientPortal, ClientUser } from '@/types/clientPortal';

interface ClientPortalLayoutProps {
  portal: ClientPortal;
  user?: ClientUser;
  children: React.ReactNode;
}

export function ClientPortalLayout({ 
  portal, 
  user,
  children 
}: ClientPortalLayoutProps) {
  const { theme, features } = portal;

  return (
    <div className={`min-h-screen ${theme.darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {theme.showLogo && (
              <div className="flex-shrink-0">
                <img
                  src={portal.logo}
                  alt="Business Logo"
                  className="h-8 w-auto"
                />
              </div>
            )}

            {/* Navigation */}
            {theme.navStyle === 'top' && (
              <nav className="flex space-x-4">
                <a 
                  href="/gallery" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300"
                >
                  Gallery
                </a>
                {features.downloads && (
                  <a 
                    href="/downloads" 
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300"
                  >
                    Downloads
                  </a>
                )}
                {features.support && (
                  <a 
                    href="/support" 
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300"
                  >
                    Support
                  </a>
                )}
              </nav>
            )}

            {/* User Menu */}
            {user && (
              <div className="flex items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300 mr-4">
                  Credits: {user.credits.photos} photos, {user.credits.videos} videos
                </span>
                <button className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
                  {user.name}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} {portal.businessName}
          </div>
        </div>
      </footer>
    </div>
  );
}