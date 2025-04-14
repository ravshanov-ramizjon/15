'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import clsx from 'clsx';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const handleMovieClick = (movie: any) => {
    localStorage.setItem('selectedMovie', JSON.stringify(movie));
    router.push(`/movie/${movie.id}`);
  };
  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      setMovies([]);

      try {
        let language = 'en';

        if (activeRegion === 'ru') {
          language = 'ru-RU';
        } else if (activeRegion === 'us') {
          language = 'en-US';
        }

        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${language}&sort_by=revenue.desc&page=1`;

        const response = await fetch(url);
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
  }, [activeRegion]);

  return (
    <div className="py-8 px-4 ">
      <div className="lg:flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className='flex flex-col sm:flex-row items-center gap-8'>
          <h2 className="text-white text-[36px] sm:text-[48px] xl:text-[65px] font-bold leading-tight">
            Кассовые сборы
          </h2>
          <p className="text-white/70 mt-1 text-base sm:text-lg">13 марта — 15 марта</p>
        </div>
        <div className="hidden sm:flex gap-4 flex-wrap">
          {[{ label: 'Россия', value: 'ru' }, { label: 'Весь мир', value: 'world' }, { label: 'США и Канада', value: 'us' }]
            .map((filter) => (
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
            <Skeleton key={index} className="w-[140px] sm:w-[160px] h-[280px] sm:h-[180px] rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {movies.map((movie, index) => (
            <Button
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
              className='w-full h-full p-0'
            >
              <div className="flex items-center gap-[9px] sm: w-full shrink-0">
                <div className="relative h-[109px] w-[74px] sm:h-[118px] sm:w-[80] lg:w[97px] lg:h-[144] rounded-xl overflow-hidden mb-2">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
                <div className="text-white text-start text-sm sm:text-base">
                  <span className="font-bold text-[#F2F60F]">{index + 1}. </span>
                  <span className="font-semibold text[15px] sm:text[16px] lg:text[18px]">
                    {movie.title.split(" ").length > 2
                      ? `${movie.title.split(" ")[0]}...`
                      : movie.title}
                  </span>
                  <p className="text-[#F2F60F] font-semibold text[13px] lg:text[15px] mt-1">${movies.length - index} млн</p>
                  <p className="text-white/50 text[12px] lg:text[14px] text-xs">{`за ${index + 1} неделю`}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
