"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { generateMockHistoryData } from '@/lib/serato';
import NowPlaying from '@/components/NowPlaying';
import { NowPlaying as NowPlayingType } from '@/types/serato';

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
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm border-b border-secondary/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-heading text-2xl font-bold text-primary">Kotarou Cafe</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium text-primary hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/menu" className="font-medium text-foreground hover:text-accent transition-colors">
              Menu
            </Link>
            <Link href="/events" className="font-medium text-foreground hover:text-accent transition-colors">
              Events
            </Link>
            <Link href="/about" className="font-medium text-foreground hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/contact" className="font-medium text-foreground hover:text-accent transition-colors">
              Contact
            </Link>
          </nav>
          <button className="md:hidden text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

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
          <Link href="/menu" className="inline-block bg-primary hover:bg-accent text-white font-medium py-3 px-8 rounded-full transition-colors">
            View Menu
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-12 text-primary">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">Specialty Coffee</h3>
              <p className="text-foreground/80">We carefully select and roast our beans to bring you the perfect cup.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">Relaxing Space</h3>
              <p className="text-foreground/80">A comfortable environment where you can unwind and enjoy your time.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">Homemade Sweets</h3>
              <p className="text-foreground/80">Our chef prepares delicious treats daily with care and attention to detail.</p>
            </div>
          </div>
        </div>
      </section>

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
      <section className="py-16 bg-primary-light/10">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-4 text-primary">Events</h2>
          <p className="text-center mb-8 max-w-2xl mx-auto">Join us for various events at Kotarou Cafe. From live performances and DJ nights to workshops, there&apos;s always something exciting happening.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Event 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
                  alt="Jazz Night"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-xl font-bold mb-2">Jazz Night</h3>
                <p className="text-sm text-blue-600 mb-2">Every other Saturday 19:00-21:00</p>
                <p className="text-sm mb-4 line-clamp-2">Enjoy a relaxing evening of jazz by local musicians while sipping on our delicious coffee.</p>
              </div>
            </div>
            
            {/* Event 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1513829596324-4bb2800c5efb"
                  alt="Coffee Workshop"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-xl font-bold mb-2">Coffee Workshop</h3>
                <p className="text-sm text-blue-600 mb-2">Monthly on Sunday 14:00-16:00</p>
                <p className="text-sm mb-4 line-clamp-2">Learn the art of brewing the perfect cup of coffee from our expert baristas.</p>
              </div>
            </div>
            
            {/* Event 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1505236858219-8359eb29e329"
                  alt="Acoustic Live"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-xl font-bold mb-2">Acoustic Live</h3>
                <p className="text-sm text-blue-600 mb-2">Every Friday 18:00-20:00</p>
                <p className="text-sm mb-4 line-clamp-2">Enjoy soothing acoustic performances by talented local artists in our cozy atmosphere.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/events" className="inline-block bg-primary hover:bg-accent text-white font-medium py-3 px-8 rounded-full transition-colors">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">Kotarou Cafe</h3>
              <p className="mb-4">A place where coffee meets art and music.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-accent transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
                <li><Link href="/menu" className="hover:text-accent transition-colors">Menu</Link></li>
                <li><Link href="/events" className="hover:text-accent transition-colors">Events</Link></li>
                <li><Link href="/latte-art" className="hover:text-accent transition-colors">Latte Art</Link></li>
                <li><Link href="/music" className="hover:text-accent transition-colors">Music</Link></li>
                <li><Link href="/about" className="hover:text-accent transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">Contact Us</h3>
              <p className="mb-2">Phone: 03-1234-5678</p>
              <p className="mb-2">Email: info@kotarou-cafe.com</p>
              <p>Feel free to contact us anytime.</p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Kotarou Cafe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
