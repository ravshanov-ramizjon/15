'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UpcomingMovies() {
    const router = useRouter();
    const handleMovieClick = (movie: any) => {
        localStorage.setItem('selectedMovie', JSON.stringify(movie));
         router.push('/movie-detail');
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
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ru-RU&page=1`
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
  const [currentPage, setCurrentPage] = useState(1);
const moviesPerPage = 4;

const totalPages = Math.ceil(movies.length / moviesPerPage);

const handleNextPage = () => {
  if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
};

const handlePrevPage = () => {
  if (currentPage > 1) setCurrentPage((prev) => prev - 1);
};

const paginatedMovies = movies.slice(
  (currentPage - 1) * moviesPerPage,
  currentPage * moviesPerPage
);

  return (
    <div className="mb-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-white text-3xl md:text-[48px] lg:text-[65px] font-bold">
          Ожидаемые новинки
        </h2>
        <div className="flex items-center gap-2 text-white text-sm md:text-base">
  <button
    onClick={handlePrevPage}
    disabled={currentPage === 1}
    className="p-2 hover:bg-white/10 rounded-full disabled:opacity-30"
  >
    <ChevronLeft size={20} />
  </button>
  <span className="text-white font-medium">
    {currentPage} / {totalPages}
  </span>
  <button
    onClick={handleNextPage}
    disabled={currentPage === totalPages}
    className="p-2 hover:bg-white/10 rounded-full disabled:opacity-30"
  >
    <ChevronRight size={20} />
  </button>
</div>

      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[400px] w-full rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative w-full h-[250]">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="px-2 pt-3">
                <h3 className="text-white text-sm md:text-base font-semibold truncate">
                  {movie.title}
                </h3>
                <p className="text-[#F2F60F] text-xs mt-1">
                  {formatDate(movie.release_date)} в России
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleDateString('ru-RU', options);
}
