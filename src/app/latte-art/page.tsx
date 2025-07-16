import React from 'react';
import Link from 'next/link';
import LatteArtGallery from '../../components/LatteArtGallery';

export default function LatteArtPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <LatteArtGallery />
        </div>
      </main>


    </div>
  );
}
