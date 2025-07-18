"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const [instagramPosts] = useState([
    {
      id: "1",
      imageUrl: "https://source.unsplash.com/random/600x600/?cafe",
      caption: "Enjoying a peaceful morning at Kotarou Cafe ☕ #morningcoffee #kotaroucafe",
      likes: 42,
      timestamp: "2025-07-10T09:30:00Z",
    },
    {
      id: "2",
      imageUrl: "https://source.unsplash.com/random/600x600/?latte",
      caption: "Today's special latte art 🍃 #latteart #barista #kotaroucafe",
      likes: 67,
      timestamp: "2025-07-09T14:15:00Z",
    },
    {
      id: "3",
      imageUrl: "https://source.unsplash.com/random/600x600/?coffeeshop",
      caption: "Weekend vibes with live music 🎵 #livemusic #weekend #kotaroucafe",
      likes: 53,
      timestamp: "2025-07-08T18:45:00Z",
    },
  ]);

  // Instagram投稿を取得するモック関数
  // 将来的には実際のInstagram Graph APIと連携
  useEffect(() => {
    // モックデータを使用
    console.log("Instagram posts loaded");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダーセクション */}
      <section className="relative h-[30vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb"
              alt="Kotarou Cafe Interior"
              fill
              style={{ objectFit: "cover" }}
              priority
              className="brightness-[0.7]"
            />
          </div>
        </div>
        <div className="max-w-[400px] mx-auto px-4 z-10 text-center">
          <h1 className="font-heading text-2xl font-bold text-white mb-2 drop-shadow-lg">
            About Us
          </h1>
          <p className="text-sm text-white mb-4 mx-auto drop-shadow-md">
            A place where coffee, art, and music come together
          </p>
        </div>
      </section>

      {/* カフェコンセプト */}
      <section className="py-8 bg-background">
        <div className="max-w-[400px] mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <div>
              <h2 className="font-heading text-xl font-bold mb-4 text-primary text-center">Our Concept</h2>
              <p className="text-sm mb-3 text-foreground/90">
                Kotarou Cafe was born from a passion for creating a space where people can enjoy exceptional coffee in a relaxing atmosphere, surrounded by art and music.
              </p>
              <p className="text-sm mb-3 text-foreground/90">
                We believe that a cafe should be more than just a place to grab coffee – it should be an experience that engages all your senses and creates memorable moments.
              </p>
              <p className="text-sm text-foreground/90">
                From our carefully selected beans to our handcrafted latte art and curated music selection, every detail at Kotarou Cafe is designed to create a unique and welcoming environment.
              </p>
            </div>
            <div className="relative h-[250px] w-full rounded-lg overflow-hidden shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24"
                alt="Cafe Concept"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 店舗基本情報 */}
      <section className="py-8 bg-primary/5">
        <div className="max-w-[400px] mx-auto px-4">
          <h2 className="font-heading text-xl font-bold mb-6 text-primary text-center">Cafe Information</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="font-heading text-lg font-bold mb-3 text-primary">Hours & Location</h3>
              
              <div className="mb-4">
                <h4 className="font-medium text-base mb-2">Opening Hours</h4>
                <ul className="space-y-1 text-foreground/80 text-sm">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 10:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-base mb-2">Address</h4>
                <p className="text-foreground/80 text-sm mb-1">123 Coffee Street, Shibuya</p>
                <p className="text-foreground/80 text-sm mb-1">Tokyo, Japan 150-0002</p>
                <p className="text-foreground/80 text-sm mb-3">Phone: 03-1234-5678</p>
                
                <Link 
                  href="https://maps.google.com" 
                  target="_blank"
                  className="inline-flex items-center text-primary hover:text-accent transition-colors text-sm"
                >
                  <span>View on Google Maps</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="relative h-[200px] w-full rounded-lg overflow-hidden shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24"
                alt="Cafe Interior"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* お店の理念・想い */}
      <section className="py-8 bg-background">
        <div className="max-w-[400px] mx-auto px-4">
          <h2 className="font-heading text-xl font-bold mb-5 text-primary text-center">Our Philosophy</h2>
          
          <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="flex flex-col gap-5 items-center">
              <div className="relative h-[150px] w-[150px] rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507133750040-4a8f57021571"
                  alt="Coffee Beans"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>
              
              <div>
                <h3 className="font-heading text-lg font-bold mb-3 text-primary text-center">Quality & Community</h3>
                <p className="text-foreground/80 mb-3 text-sm">
                  At Kotarou Cafe, we believe in the power of quality coffee to bring people together. Our philosophy is built on three core principles:
                </p>
                <ul className="space-y-2 text-foreground/80 mb-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Quality without compromise</strong> - We source the finest beans and train our baristas to perfect their craft.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Community connection</strong> - We strive to create a welcoming space where everyone feels at home.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Creative expression</strong> - Through latte art and music, we celebrate creativity in all its forms.</span>
                  </li>
                </ul>
                <p className="text-foreground/80 text-sm">
                  We&apos;re committed to sustainable practices and supporting local artists and musicians, making Kotarou Cafe more than just a business—it&apos;s a community hub.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SNS連携（Instagram） */}
      <section className="py-8 bg-gradient-to-b from-background to-primary/10">
        <div className="max-w-[400px] mx-auto px-4">
          <h2 className="font-heading text-xl font-bold mb-3 text-primary text-center">Connect With Us</h2>
          <p className="text-center text-foreground/80 text-sm mx-auto mb-6">
            Follow us on social media to stay updated with our latest creations, events, and special offers.
          </p>
          
          <div className="mb-8">
            <h3 className="font-heading text-lg font-bold mb-4 text-primary text-center">
              <span className="inline-block mr-2">📱</span>
              Instagram Feed
            </h3>
            
            <div className="space-y-4">
              {instagramPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={post.imageUrl}
                      alt={`Instagram post ${post.id}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-foreground/80 mb-2">{post.caption}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-foreground/60">
                        {new Date(post.timestamp).toLocaleDateString()}
                      </span>
                      <span className="flex items-center text-xs text-foreground/60">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        {post.likes}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <a
                href="https://www.instagram.com/kotaroucafe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium py-2 px-4 rounded-full transition-transform hover:scale-105"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
                Follow us on Instagram
              </a>
            </div>
          </div>
          
          {/* ライブ投稿セクション */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-heading text-lg font-bold mb-3 text-primary text-center">Share Your Experience</h3>
            <p className="text-center text-foreground/80 text-sm mb-4">
              Tag us in your posts or use #KotarouCafe to share your experience with us!
            </p>
            
            <form className="mx-auto">
              <div className="mb-3">
                <label htmlFor="name" className="block text-xs font-medium text-foreground/80 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="message" className="block text-xs font-medium text-foreground/80 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Share your experience at Kotarou Cafe..."
                ></textarea>
              </div>
              
              <div className="mb-3">
                <label htmlFor="photo" className="block text-xs font-medium text-foreground/80 mb-1">
                  Upload Photo (optional)
                </label>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary hover:bg-accent text-white text-sm font-medium py-1.5 px-4 rounded-md transition-colors"
                >
                  Share Your Story
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
