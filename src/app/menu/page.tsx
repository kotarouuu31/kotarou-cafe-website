import Image from "next/image";

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

      {/* Menu Hero */}
      <section className="relative py-12 bg-secondary/10">
        <div className="max-w-[400px] mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl font-bold mb-4 text-primary">メニュー</h1>
          <p className="text-sm max-w-xs mx-auto mb-4">
            Kotarou Cafeでは、厳選された素材を使用した様々なドリンクとスイーツをご用意しております。
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-8">
        <div className="max-w-[400px] mx-auto px-4">
          {/* Coffee Section */}
          <div className="mb-10">
            <h2 className="font-heading text-2xl font-bold mb-6 text-primary border-b pb-2 border-secondary/30">
              コーヒー
            </h2>
            <div className="space-y-6">
              {coffeeItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative w-full h-48">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">{item.name}</h3>
                    <p className="text-sm text-foreground/80 mb-3">{item.description}</p>
                    <p className="font-medium text-primary text-right">¥{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tea Section */}
          <div className="mb-10">
            <h2 className="font-heading text-2xl font-bold mb-6 text-primary border-b pb-2 border-secondary/30">
              ティー
            </h2>
            <div className="space-y-6">
              {teaItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative w-full h-48">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">{item.name}</h3>
                    <p className="text-sm text-foreground/80 mb-3">{item.description}</p>
                    <p className="font-medium text-primary text-right">¥{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sweets Section */}
          <div className="mb-6">
            <h2 className="font-heading text-2xl font-bold mb-6 text-primary border-b pb-2 border-secondary/30">
              スイーツ
            </h2>
            <div className="space-y-6">
              {sweetsItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative w-full h-48">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">{item.name}</h3>
                    <p className="text-sm text-foreground/80 mb-3">{item.description}</p>
                    <p className="font-medium text-primary text-right">¥{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
