import React from 'react';
import LatteArtGallery from '../../components/LatteArtGallery';

export default function LatteArtPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-[400px] mx-auto px-4 py-6">
          <LatteArtGallery />
        </div>
      </main>
    </div>
  );
}
