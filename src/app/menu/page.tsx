import Image from "next/image";
import Link from "next/link";

export default function Menu() {
  // Menu items data
  const coffeeItems = [
    {
      id: 1,
      name: "スペシャルティコーヒー",
      description: "厳選された豆から抽出した、香り高い一杯をお楽しみください。",
      price: 550,
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    },
    {
      id: 2,
      name: "カフェラテ",
      description: "濃厚なエスプレッソと滑らかなミルクの組み合わせ。",
      price: 600,
      image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f",
    },
    {
      id: 3,
      name: "カプチーノ",
      description: "エスプレッソにふわふわのミルクフォームをのせた一杯。",
      price: 600,
      image: "https://images.unsplash.com/photo-1534778101976-62847782c213",
    },
    {
      id: 4,
      name: "アメリカーノ",
      description: "エスプレッソにお湯を注いだすっきりとした味わい。",
      price: 500,
      image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
    },
  ];

  const teaItems = [
    {
      id: 5,
      name: "抹茶ラテ",
      description: "高級抹茶を使用した、まろやかな味わいのラテです。",
      price: 600,
      image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d",
    },
    {
      id: 6,
      name: "ほうじ茶ラテ",
      description: "香ばしいほうじ茶とミルクのハーモニー。",
      price: 580,
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3",
    },
    {
      id: 7,
      name: "アールグレイティー",
      description: "ベルガモットの香りが特徴的な紅茶。",
      price: 550,
      image: "https://images.unsplash.com/photo-1576867757603-05b134ebc379",
    },
  ];

  const sweetsItems = [
    {
      id: 8,
      name: "ベイクドチーズケーキ",
      description: "濃厚でなめらかな口当たりの自家製チーズケーキです。",
      price: 500,
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
    },
    {
      id: 9,
      name: "ガトーショコラ",
      description: "濃厚なチョコレートの風味が楽しめる一品。",
      price: 550,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    },
    {
      id: 10,
      name: "アップルパイ",
      description: "シナモンの香りとサクサクのパイ生地が絶妙。",
      price: 580,
      image: "https://images.unsplash.com/photo-1568571780765-9276107225d8",
    },
    {
      id: 11,
      name: "パンケーキ",
      description: "ふわふわ食感のパンケーキにメープルシロップをかけて。",
      price: 650,
      image: "https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm border-b border-secondary/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-heading text-2xl font-bold text-primary">
              Kotarou Cafe
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium text-foreground hover:text-accent transition-colors">
              ホーム
            </Link>
            <Link href="/menu" className="font-medium text-primary hover:text-accent transition-colors">
              メニュー
            </Link>
            <Link href="/about" className="font-medium text-foreground hover:text-accent transition-colors">
              お店について
            </Link>
            <Link href="/contact" className="font-medium text-foreground hover:text-accent transition-colors">
              お問い合わせ
            </Link>
          </nav>
          <button className="md:hidden text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Menu Hero */}
      <section className="relative py-20 bg-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-primary">メニュー</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Kotarou Cafeでは、厳選された素材を使用した様々なドリンクとスイーツをご用意しております。
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Coffee Section */}
          <div className="mb-16">
            <h2 className="font-heading text-3xl font-bold mb-8 text-primary border-b pb-2 border-secondary/30">
              コーヒー
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coffeeItems.map((item) => (
                <div key={item.id} className="flex bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative w-1/3 min-h-[180px]">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      style={{objectFit: 'cover'}} 
                    />
                  </div>
                  <div className="w-2/3 p-6">
                    <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">{item.name}</h3>
                    <p className="text-foreground/80 mb-4">{item.description}</p>
                    <p className="font-medium text-primary">¥{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tea Section */}
          <div className="mb-16">
            <h2 className="font-heading text-3xl font-bold mb-8 text-primary border-b pb-2 border-secondary/30">
              ティー
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teaItems.map((item) => (
                <div key={item.id} className="flex bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative w-1/3 min-h-[180px]">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      style={{objectFit: 'cover'}} 
                    />
                  </div>
                  <div className="w-2/3 p-6">
                    <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">{item.name}</h3>
                    <p className="text-foreground/80 mb-4">{item.description}</p>
                    <p className="font-medium text-primary">¥{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sweets Section */}
          <div>
            <h2 className="font-heading text-3xl font-bold mb-8 text-primary border-b pb-2 border-secondary/30">
              スイーツ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sweetsItems.map((item) => (
                <div key={item.id} className="flex bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative w-1/3 min-h-[180px]">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      style={{objectFit: 'cover'}} 
                    />
                  </div>
                  <div className="w-2/3 p-6">
                    <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">{item.name}</h3>
                    <p className="text-foreground/80 mb-4">{item.description}</p>
                    <p className="font-medium text-primary">¥{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">Kotarou Cafe</h3>
              <p className="mb-4">美味しいコーヒーとくつろぎの空間をお楽しみください。</p>
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
              <h3 className="font-heading text-xl font-bold mb-4">リンク</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-accent transition-colors">ホーム</Link></li>
                <li><Link href="/menu" className="hover:text-accent transition-colors">メニュー</Link></li>
                <li><Link href="/about" className="hover:text-accent transition-colors">お店について</Link></li>
                <li><Link href="/contact" className="hover:text-accent transition-colors">お問い合わせ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">お問い合わせ</h3>
              <p className="mb-2">電話: 03-1234-5678</p>
              <p className="mb-2">メール: info@kotarou-cafe.com</p>
              <p>お気軽にお問い合わせください。</p>
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
