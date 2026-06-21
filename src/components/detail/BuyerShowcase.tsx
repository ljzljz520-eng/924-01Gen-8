import { Star, User } from 'lucide-react';
import type { BuyerShowcaseData } from '@/types';

interface Props {
  data: BuyerShowcaseData;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
          }`}
        />
      ))}
    </div>
  );
}

export default function BuyerShowcase({ data }: Props) {
  const { title, images, layout } = data;

  return (
    <section className="py-10 bg-white">
      {title && (
        <div className="px-8 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 mb-3">
            <User className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-medium text-rose-600 tracking-wide">REAL REVIEWS</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900">{title}</h2>
          <div className="mt-3 flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-amber-600">4.9</span>
            </div>
            <span className="text-slate-400">|</span>
            <span className="text-slate-500">累计 {images.length * 3241}+ 条好评</span>
          </div>
        </div>
      )}

      <div
        className={`px-8 grid ${
          layout === 'grid'
            ? 'grid-cols-2 gap-5'
            : 'grid-cols-1 gap-4'
        }`}
      >
        {images.map((img, i) => (
          <article
            key={i}
            className="group rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 hover:shadow-card transition-all duration-300"
          >
            <div className="relative aspect-square overflow-hidden bg-slate-100">
              <img
                src={img.url}
                alt={`buyer-${i}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
                <Stars rating={img.rating} />
              </div>
              {i === 0 && (
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-accent text-white text-xs font-bold shadow-md">
                  精选好评
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-brand text-white flex items-center justify-center text-xs font-bold">
                  {img.userName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{img.userName}</p>
                  <Stars rating={img.rating} />
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">{img.comment}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
