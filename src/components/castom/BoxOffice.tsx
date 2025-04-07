'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import clsx from 'clsx';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  revenue: number;
}

interface ApiResponse {
  results: Movie[];
}

export default function BoxOffice() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<'ru' | 'world' | 'us'>('world');

  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ru-RU&page=1`
        );
        const data: ApiResponse = await response.json();
        setMovies(data.results.slice(0, 5));
      } catch (err) {
        setError('Ошибка при загрузке кассовых сборов');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-white text-[36px] sm:text-[48px] md:text-[65px] font-bold leading-tight">
            Кассовые сборы
          </h2>
          <p className="text-white/70 mt-1 text-base sm:text-lg">13 марта — 15 марта</p>
        </div>

        <div className="flex gap-4 flex-wrap">
          {[
            { label: 'Россия', value: 'ru' },
            { label: 'Весь мир', value: 'world' },
            { label: 'США и Канада', value: 'us' },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveRegion(filter.value as 'ru' | 'world' | 'us')}
              className={clsx(
                'text-white text-sm sm:text-base font-medium transition-opacity',
                activeRegion === filter.value ? 'underline underline-offset-4' : 'opacity-50 hover:opacity-80'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      {loading ? (
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-[140px] sm:w-[160px] h-[280px] sm:h-[300px] rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-hide">
          {movies.map((movie, index) => (
            <div key={movie.id} className="w-[140px] sm:w-[160px] shrink-0">
              <div className="relative h-[210px] sm:h-[230px] w-full rounded-xl overflow-hidden mb-2">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
              <div className="text-white text-sm sm:text-base">
                <span className="font-bold text-[#F2F60F]">{index + 1}. </span>
                <span className="font-semibold">{movie.title}</span>
                <p className="text-[#F2F60F] font-semibold mt-1">${movies.length - index} млн</p>
                <p className="text-white/50 text-xs">{`за ${index + 1} неделю`}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
