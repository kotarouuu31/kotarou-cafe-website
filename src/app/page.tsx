"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { generateMockHistoryData } from '@/lib/recordbox';
import NowPlaying from '@/components/NowPlaying';
import { NowPlaying as NowPlayingType } from '@/types/recordbox';
import { Button } from '@/components/ui/Button';
import { Section, SectionTitle } from '@/components/ui/Section';
import { Card, CardContent, CardImage, CardTitle, CardDescription } from '@/components/ui/Card';

export default function Home() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingType>({ track: null, startedAt: null });
  
  // デモ用：30秒ごとに曲を切り替える
  useEffect(() => {
    // 初期データをセット
    const mockData = generateMockHistoryData(5);
    setNowPlaying(mockData.nowPlaying);
    
    // 定期的に更新
    const switchTrackInterval = setInterval(() => {
      const mockData = generateMockHistoryData(5);
      setNowPlaying(mockData.nowPlaying);
    }, 30000);
    
    return () => clearInterval(switchTrackInterval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" 
              alt="Cafe interior" 
              fill 
              style={{objectFit: 'cover'}} 
              priority
              className="brightness-[0.85]"
            />
          </div>
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Kotarou Cafe
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md">
            Enjoy delicious coffee and a relaxing atmosphere
          </p>
          <Button href="/menu" size="lg" variant="accent">
            View Menu
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <Section bgColor="default" spacing="lg">
        <SectionTitle 
          title="Our Features"
          subtitle=""
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <CardTitle>Specialty Coffee</CardTitle>
              <CardDescription>We carefully select and roast our beans to bring you the perfect cup.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <CardTitle>Relaxing Space</CardTitle>
              <CardDescription>A comfortable environment where you can unwind and enjoy your time.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
              </div>
              <CardTitle>Homemade Sweets</CardTitle>
              <CardDescription>Our chef prepares delicious treats daily with care and attention to detail.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Latte Art Section */}
      <section className="py-16 bg-gradient-to-b from-background to-[#f9f5f1]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-4 text-primary">Latte Art Gallery</h2>
          <p className="text-center text-foreground/80 max-w-2xl mx-auto mb-10">
            Discover our evolving latte art creations. Experience coffee that delights not only your taste buds but also your eyes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Latte Art Preview Images */}
            <div className="relative h-64 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 bg-white">
              <div className="relative h-48">
                <Image 
                  src="https://source.unsplash.com/vSuQJKZkt4U" 
                  alt="Heart Latte Art" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading font-bold text-lg text-primary">Heart</h3>
                <p className="text-sm text-foreground/80 mb-2">Free Pour Technique</p>
              </div>
            </div>
            
            <div className="relative h-64 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 bg-white">
              <div className="relative h-48">
                <Image 
                  src="https://source.unsplash.com/Mw4wfleYxfU" 
                  alt="Swan Latte Art" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading font-bold text-lg text-primary">Swan</h3>
                <p className="text-sm text-foreground/80 mb-2">Free Pour & Etching</p>
              </div>
            </div>
            
            <div className="relative h-64 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 bg-white">
              <div className="relative h-48">
                <Image 
                  src="https://source.unsplash.com/6VhPY27jdps" 
                  alt="Leaf Latte Art" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading font-bold text-lg text-primary">Autumn Leaf</h3>
                <p className="text-sm text-foreground/80 mb-2">Etching & Color Art</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/latte-art" className="inline-block bg-primary hover:bg-accent text-white font-medium py-2 px-6 rounded-full transition-colors">
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section className="py-16 bg-primary-light/10">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-4 text-primary">Music Corner</h2>
          <p className="text-center mb-8 max-w-2xl mx-auto">
            Enjoy the perfect soundtrack to your coffee experience. Our carefully curated music selection enhances your time at Kotarou Cafe.
          </p>
          
          <div className="bg-gradient-to-br from-primary-dark to-primary-light/80 text-white py-8 px-4 rounded-lg shadow-xl mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Now Playing */}
              <div className="lg:col-span-2">
                <h3 className="font-heading text-2xl font-bold mb-4">
                  <span className="inline-block animate-bounce-slow mr-2">🎧</span>
                  Now Playing
                </h3>
                <NowPlaying nowPlaying={nowPlaying} />
              </div>
              
              {/* DJ Schedule Preview */}
              <div>
                <h3 className="font-heading text-2xl font-bold mb-4">DJ Schedule</h3>
                <div className="bg-white/10 p-4 rounded-md">
                  <div className="mb-3">
                    <p className="text-sm text-white/80">Friday</p>
                    <p className="font-medium">DJ Kotarou - House Vibes</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-white/80">Saturday</p>
                    <p className="font-medium">Guest DJ - Jazz Fusion</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link 
                href="/music"
                className="inline-block py-3 px-6 rounded-md transition-all bg-white/20 hover:bg-white/30 font-medium"
              >
                Explore Our Music
                <span className="ml-2">▶</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview Section */}
      {/* 重複しているイベントセクションを削除 */}

      {/* Latte Art Section */}
      <Section bgColor="muted" spacing="lg">
        <SectionTitle 
          title="Latte Art Gallery"
          subtitle="Discover our evolving latte art creations. Experience coffee that delights not only your taste buds but also your eyes."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Latte Art Preview Images */}
          <Card className="transition-transform hover:scale-105">
            <CardImage>
              <Image 
                src="https://images.unsplash.com/photo-1541167760496-1628856ab772" 
                alt="Heart Latte Art" 
                fill 
                style={{objectFit: 'cover'}} 
              />
            </CardImage>
            <CardContent>
              <CardTitle>Heart</CardTitle>
              <CardDescription>Free Pour</CardDescription>
            </CardContent>
          </Card>
          
          <Card className="transition-transform hover:scale-105">
            <CardImage>
              <Image 
                src="https://images.unsplash.com/photo-1534805539898-da7c4915c75f" 
                alt="Swan Latte Art" 
                fill 
                style={{objectFit: 'cover'}} 
              />
            </CardImage>
            <CardContent>
              <CardTitle>Swan</CardTitle>
              <CardDescription>Free Pour & Etching</CardDescription>
            </CardContent>
          </Card>
          
          <Card className="transition-transform hover:scale-105">
            <CardImage>
              <Image 
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31" 
                alt="Autumn Leaf Latte Art" 
                fill 
                style={{objectFit: 'cover'}} 
              />
            </CardImage>
            <CardContent>
              <CardTitle>Autumn Leaf</CardTitle>
              <CardDescription>Etching & Color Art</CardDescription>
            </CardContent>
          </Card>
        </div>
      
        <div className="text-center">
          <Button href="/latte-art" variant="secondary">
            View Gallery
          </Button>
        </div>
      </Section>
      
      {/* Music Section */}
      <section className="py-16 bg-primary-dark text-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Music Corner"
            subtitle="Enjoy our carefully curated playlists and live DJ sessions while you relax with your coffee."
            centered
            className="text-white"
          />
        
          <div className="bg-gradient-to-br from-primary-dark to-primary-light/80 text-white py-8 px-4 rounded-lg shadow-xl mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Now Playing */}
              <div className="lg:col-span-2">
                <h3 className="font-heading text-2xl font-bold mb-4">
                  <span className="inline-block animate-bounce-slow mr-2">🎧</span>
                  Now Playing
                </h3>
                <NowPlaying nowPlaying={nowPlaying} />
              </div>
              
              {/* DJ Schedule Preview */}
              <div>
                <h3 className="font-heading text-2xl font-bold mb-4">DJ Schedule</h3>
                <div className="bg-white/10 p-4 rounded-md">
                  <div className="mb-3">
                    <p className="text-sm text-white/80">Friday</p>
                    <p className="font-medium">DJ Kotarou - House Vibes</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-white/80">Saturday</p>
                    <p className="font-medium">Guest DJ - Jazz Fusion</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button 
                href="/music"
                variant="outline"
                className="bg-white/20 hover:bg-white/30 border-white/50"
              >
                Explore Our Music
                <span className="ml-2">▶</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Events Preview Section */}
      <Section bgColor="default" spacing="lg">
        <SectionTitle 
          title="Events"
          subtitle="Join us for various events at Kotarou Cafe. From live performances and DJ nights to workshops, there's always something exciting happening."
          centered
        />
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Event 1 */}
          <Card>
            <CardImage>
              <Image
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
                alt="Jazz Night"
                fill
                style={{ objectFit: 'cover' }}
              />
            </CardImage>
            <CardContent>
              <CardTitle>Jazz Night</CardTitle>
              <p className="text-sm text-blue-600 mb-2">Every other Saturday 19:00-21:00</p>
              <CardDescription>Enjoy a relaxing evening of jazz by local musicians while sipping on our delicious coffee.</CardDescription>
            </CardContent>
          </Card>
          
          {/* Event 2 */}
          <Card>
            <CardImage>
              <Image
                src="https://images.unsplash.com/photo-1513829596324-4bb2800c5efb"
                alt="Coffee Workshop"
                fill
                style={{ objectFit: 'cover' }}
              />
            </CardImage>
            <CardContent>
              <CardTitle>Coffee Workshop</CardTitle>
              <p className="text-sm text-blue-600 mb-2">Monthly on Sunday 14:00-16:00</p>
              <CardDescription>Learn the art of brewing the perfect cup of coffee from our expert baristas.</CardDescription>
            </CardContent>
          </Card>
          
          {/* Event 3 */}
          <Card>
            <CardImage>
              <Image
                src="https://images.unsplash.com/photo-1505236858219-8359eb29e329"
                alt="Acoustic Live"
                fill
                style={{ objectFit: 'cover' }}
              />
            </CardImage>
            <CardContent>
              <CardTitle>Acoustic Live</CardTitle>
              <p className="text-sm text-blue-600 mb-2">Every Friday 18:00-20:00</p>
              <CardDescription>Enjoy soothing acoustic performances by talented local artists in our cozy atmosphere.</CardDescription>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Button href="/events" variant="secondary">
            View All Events
          </Button>
        </div>
      </Section>
    </>
  );
}
