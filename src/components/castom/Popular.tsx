import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import { useRouter } from 'next/navigation';

export default function Popular() {
    const router = useRouter();
    const handleMovieClick = (movie: any) => {
        localStorage.setItem('selectedMovie', JSON.stringify(movie));
         router.push('/movie-detail');
      };
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const API_KEY = localStorage.getItem('API_KEY');
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ru-RU&page=1`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (err) {
        setError('Ошибка при загрузке популярных фильмов');
        console.error('Ошибка при загрузке популярных фильмов:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="mb-8 px-4">
      <h2 className="text-3xl sm:text-5xl md:text-[65px] font-bold mb-6 text-white">
        Популярные
      </h2>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[2/3] w-full rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.slice(0, 4).map((movie) => (
            <Card
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
              className="w-full bg-transparent border-none rounded-lg hover:scale-[1.01] transition-transform"
            >
              <CardHeader className="relative w-full aspect-[2/3] rounded-t-lg overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </CardHeader>
              <CardContent className="px-2 py-2">
                <CardTitle className="text-base font-semibold text-white line-clamp-2">
                  {movie.title}
                </CardTitle>
                <p className="text-sm text-[#F2F60F]">{movie.release_date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
