import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/router';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '../ui/sheet';
import { FaBars, FaVk, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';


export default function NowPlaying() {
  const router = useRouter();
  const handleMovieClick = (movie: any) => {
    localStorage.setItem('selectedMovie', JSON.stringify(movie));
    router.push(`/movie/${movie.id}`);
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
        console.log('Fetched movies:', data.results);
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

  const genres = [
    "Все",
    "Боевики",
    "Приключения",
    "Комедии",
    "Фантастика",
    "Триллеры",
    "Драма",
  ];
  const [activeGenre, setActiveGenre] = useState("Все");

  return (
    <div className="mb-6 px-4">
      <div className='flex items-center text-center justify-center sm:items-start sm:flex-col'>
        <div className='flex items-center justify-center sm:justify-start'>
          <div>
            <h2 className="pb-1 cm:p-0 text-[32px] sm:text-5xl xl:text-[65px] font-bold mb-1 text-white leading-tight">
              Сейчас в кино
            </h2>
          </div>
          <div className="sm:hidden ">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="p-0 text-white">
                  <FaBars />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="bg-[#1b1e2b] text-white  p-5">
                <div className="flex flex-col gap-4">
                  {genres.map((item) => (
                    <SheetClose asChild key={item}>
                      <Link href="#"
                        onClick={() => setActiveGenre(item)}
                        className={`text-sm hover:text-blue-400 transition  transition-all duration-200 ${activeGenre === item
                          ? "text-blue-600 underline underline-blue-600"
                          : "bg-transparent text-white border-gray-500 "
                          }`}
                      >
                        <>
                          {item}
                        </>
                      </Link>
                    </SheetClose>
                  ))}
                  <div className="flex gap-4 mt-4 text-gray-400">
                    <a href="#"><FaVk /></a>
                    <a href="#"><FaInstagram /></a>
                    <a href="#"><FaFacebookF /></a>
                    <a href="#"><FaTwitter /></a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="hidden sm:flex flex-wrap gap-5 sm:gap-8">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant="link"
              onClick={() => setActiveGenre(genre)}
              className={`p-0 py-2 text-sm transition-all duration-200 ${activeGenre === genre
                ? "text-blue-600 underline underline-blue-600"
                : "bg-transparent text-white border-gray-500 "
                }`}
            >
              {genre}
            </Button>
          ))}
        </div>
      </div>

      {
        loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="aspect-[2/3] w-full rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
        )
      }
    </div >
  );
}
