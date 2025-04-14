import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '../ui/sheet';
import { FaBars, FaVk, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';


export default function Popular() {
  const router = useRouter();
  const handleMovieClick = (movie: any) => {
    localStorage.setItem('selectedMovie', JSON.stringify(movie));
    router.push('/movie/' + movie.id);
  };
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [className, setClassName] = useState<string>("Всё время");

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

  const data = [
    {
      id: 1,
      data: "Всё время"
    },
    {
      id: 2,
      data: "2025",
    },
    {
      id: 3,
      data: "2024",
    },
    {
      id: 4,
      data: "2023",
    },
    {
      id: 5,
      data: "2022",
    },
    {
      id: 6,
      data: "2021",
    },
    {
      id: 7,
      data: "2020",
    },
  ]

  return (
    <div className="mb-8 px-4">
      <div className='flex sm:block lg:flex justify-between items-center mb-6'>
        <h2 className="text-[32px] sm:text-5xl xl:text-[65px] font-bold text-white">
          Популярные фильмы
        </h2>
        <div
          className='hidden sm:flex gap-5 my-6 lg:mt-5 lg:mb-0'
        >
          {data.map((item) => (
            <Button
              key={item.id}
              variant="link"
              className={`p-0 text-white text-sm sm:text-base font-medium transition-opacity ${className === item.data ? 'underline underline-offset-4' : 'opacity-50 hover:opacity-80'}`}
              onClick={() => setClassName(item.data)}
            >
              {item.data}
            </Button>
          ))}
        </div>
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="pt-3 text-white">
                <FaBars />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-[#1b1e2b] text-white  p-5">
              <div className="flex flex-col gap-4">
                {data.map((item) => (
                  <SheetClose asChild key={item.id}>
                    <Link href="#"
                      className={`p-0 hover:text-blue-400 transition text-white text-sm sm:text-base font-medium transition-opacity ${className === item.data ? 'underline underline-offset-4' : 'opacity-50 hover:opacity-80'}`}
                      onClick={() => setClassName(item.data)}
                    >
                      {item.data}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {
        loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3] w-full rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-[#888] scrollbar-track-transparent snap-x snap-mandatory">
            {movies.slice(0, 8).map((movie) => (
              <Card
                key={movie.id}
                onClick={() => handleMovieClick(movie)}
                className="min-w-[150px] sm:min-w-[180px] md:min-w-[200px] bg-transparent border-none rounded-lg hover:scale-[1.01] transition-transform snap-start"
              >
                <CardHeader className="relative w-full aspect-[2/3] rounded-t-lg overflow-hidden">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="w-full h-[331px]"
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

        )
      }
    </div >
  );
}
