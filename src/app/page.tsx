"use client";

import Image from "next/image";
import { AutoUpdatingRecordPlayer } from '@/components/RecordPlayer';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center max-w-[400px] mx-auto pb-16">
      {/* Hero Section */}
      <section className="w-full pt-24 pb-8 px-4 text-center">
        <h1 className="font-heading text-3xl font-bold mb-3">
          自然とつながり、心を解き放つ。
        </h1>
        <p className="text-sm text-foreground/80 mb-6 leading-relaxed">
          Kotarou Cafeは、コーヒーと音楽を通じて、自然と人、人と人をつなぐ場を目指しています。
          特別な味と空間で、特別なひとときをお過ごしください。
        </p>
      </section>

      {/* News Section */}
      <section className="w-full px-4 mb-12">
        <h2 className="text-sm font-medium mb-4">News</h2>
        <div className="border-t border-gray-200 pt-4">
          <Link href="/news/1" className="block mb-6">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">2025/07/15</span>
              <span className="text-xs text-accent mb-1">Information</span>
              <h3 className="text-sm font-medium">ホームページをリニューアルしました</h3>
            </div>
          </Link>
          <Link href="/news" className="text-xs text-accent flex items-center">
            News All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Experience Section */}
      <section className="w-full px-4 mb-12">
        <h2 className="text-sm font-medium mb-4">Experience</h2>
        <p className="text-xs text-foreground/80 mb-6 leading-relaxed">
          「豆」「焙煎」「抽出」「空間」が調和する、コーヒーと音楽の空間。
          厳選された豆と丁寧な焙煎、そして熟練のバリスタによる抽出。
          心地よい音楽とともに、感覚がふっとひらく。
          「あぁ」と自然にこぼれる、そのひとときが、記憶に、やさしく残る。
        </p>
        <div className="relative w-full h-[250px] mb-4">
          <Image 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" 
            alt="Cafe interior" 
            fill 
            style={{objectFit: 'cover'}} 
            className="rounded-md"
            priority
          />
        </div>
      </section>

      {/* Three Concepts */}
      <section className="w-full px-4 mb-12">
        <div className="mb-12">
          <h2 className="text-xl font-heading font-bold mb-4">豆と焙煎が、香りを育てる</h2>
          <p className="text-xs text-foreground/80 mb-6 leading-relaxed">
            世界中から厳選された豆を、丁寧に焙煎。それぞれの豆が持つ個性を最大限に引き出します。
            この一杯のために、最高の瞬間を追求しています。
          </p>
          <div className="relative w-full h-[250px]">
            <Image 
              src="https://images.unsplash.com/photo-1580933073521-dc51f22c5c31" 
              alt="Coffee beans" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-md"
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-heading font-bold mb-4">ラテアートが、目を楽しませる</h2>
          <p className="text-xs text-foreground/80 mb-6 leading-relaxed">
            バリスタの技術と感性が生み出す一期一会のアート。
            飲む前の一瞬の喜びが、コーヒータイムをより特別なものに変えます。
          </p>
          <div className="relative w-full h-[250px]">
            <Image 
              src="https://images.unsplash.com/photo-1541167760496-1628856ab772" 
              alt="Latte Art" 
              fill 
              style={{objectFit: 'cover'}} 
              className="rounded-md"
            />
          </div>
          <div className="mt-4 text-center">
            <Button href="/latte-art" variant="secondary" size="sm">
              View Gallery
            </Button>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-heading font-bold mb-4">音楽が、空間を包み込む</h2>
          <p className="text-xs text-foreground/80 mb-6 leading-relaxed">
            厳選された音楽が流れる空間で、コーヒーの味わいがより深まります。
            週末のDJイベントでは、さらに特別な体験を。
          </p>
          <div className="bg-primary-dark text-white p-6 rounded-md">
            <div className="mb-4">
              <AutoUpdatingRecordPlayer />
            </div>
            <div className="bg-white/10 p-3 rounded-md text-sm mb-4">
              <h3 className="font-heading text-base font-bold mb-2">DJ Schedule</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-white/80">Friday</p>
                  <p className="font-medium text-sm">DJ Kotarou - House</p>
                </div>
                <div>
                  <p className="text-xs text-white/80">Saturday</p>
                  <p className="font-medium text-sm">Guest DJ - Jazz</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="w-full px-4 mb-12">
        <h2 className="text-sm font-medium mb-4">Events</h2>
        <div className="space-y-6">
          <div>
            <div className="relative w-full h-[180px] mb-3">
              <Image
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
                alt="Jazz Night"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-md"
              />
            </div>
            <h3 className="font-medium text-base mb-1">Jazz Night</h3>
            <p className="text-xs text-accent mb-2">Every other Saturday 19:00-21:00</p>
            <p className="text-xs text-foreground/80">
              Enjoy a relaxing evening of jazz by local musicians while sipping on our delicious coffee.
            </p>
          </div>

          <div className="text-center mt-6">
            <Button href="/events" variant="secondary" size="sm">
              View All Events
            </Button>
          </div>
        </div>
      </section>

      {/* Chat with DJ Nyanko */}
      <section className="w-full px-4 mb-12">
        <div className="bg-gradient-to-br from-accent/20 to-primary/20 p-6 rounded-md text-center">
          <h2 className="text-lg font-heading font-bold mb-3">DJ Nyanko AI</h2>
          <p className="text-xs text-foreground/80 mb-4">
            音楽のことならなんでも知っている、Kotarou Cafeの看板猫DJ。
            好きな音楽や気分を伝えれば、ぴったりの一曲をおすすめしてくれます。
          </p>
          <Button href="/chat" variant="accent" size="sm">
            Chat with DJ Nyanko
          </Button>
        </div>
      </section>
    </div>
  );
}
