import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';

import { useRouter } from 'next/router'; 

export default function NowPlaying() {
    const router = useRouter();
    const handleMovieClick = (movie: any) => {
        localStorage.setItem('selectedMovie', JSON.stringify(movie));
        router.push(`/movie-detail?movieId=${movie.id}`);
      };
  const [movies, setMovies] = useState<
    Array<{ id: number; title: string; poster_path: string; release_date: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const API_KEY = localStorage.getItem('API_KEY');
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ru-RU`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (err) {
        setError('Ошибка при загрузке фильмов');
        console.error('Ошибка при загрузке фильмов:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="mb-8 px-4">
      <h2 className="text-3xl sm:text-5xl md:text-[65px] font-bold mb-6 text-white leading-tight">
        Сейчас в кино
      </h2>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="aspect-[2/3] w-full rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {movies.slice(0, 10).map((movie) => (
            <Card
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
              className="w-full rounded-lg border-none bg-transparent hover:scale-[1.01] transition-transform"
            >
              <CardHeader className="relative w-full aspect-[2/3] overflow-hidden rounded-t-lg">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </CardHeader>
              <CardContent className="px-2 sm:px-3 py-2">
                <CardTitle className="text-sm sm:text-base font-semibold text-white line-clamp-2">
                  {movie.title}
                </CardTitle>
                <p className="text-[#F2F60F] text-xs sm:text-sm">{movie.release_date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
