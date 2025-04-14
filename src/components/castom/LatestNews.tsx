// components/LatestNews.tsx
import { useEffect, useState } from 'react';
import { FiEye, FiCalendar } from 'react-icons/fi';
import { Card, } from '../ui/card';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LatestNews() {
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const handleMovieClick = (movie: any) => {
        localStorage.setItem('selectedMovie', JSON.stringify(movie));
        router.push('/movie/' + movie.id);
    };

    useEffect(() => {
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
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
                setError('Ошибка при загрузке новостей');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="mb-12 px-4 h-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white">Последние новости</h2>
                <Button variant="link" className="text-white hover:underline underline-offset-4 text-sm md:text-base">
                    Все новости →
                </Button>
            </div>

            {loading ? (
                <div className="flex flex-col md:flex-row gap-6">
                    <Skeleton className="w-full md:w-2/3 h-[250px] sm:h-[300px] md:h-[400px] rounded-xl" />
                    <div className="flex flex-col gap-4 w-full md:w-1/3">
                        {[1, 2, 3].map((_, i) => (
                            <Skeleton key={i} className="w-full h-[100px] rounded-lg" />
                        ))}
                    </div>
                </div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="flex flex-col  xl:flex-row gap-6">
                    {/* Главная новость */}
                    <div className="relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden">
                        <Image
                            src={`https://image.tmdb.org/t/p/original${movies[0]?.backdrop_path}`}
                            alt={movies[0]?.title}
                            width={1000}
                            height={1000}
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                            <div className="flex items-center text-sm gap-4 mb-2 text-gray-300">
                                <div className="flex items-center gap-1">
                                    <FiCalendar size={16} />
                                    <span>{movies[0]?.release_date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FiEye size={16} />
                                    <span>3246</span>
                                </div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-2">{movies[0]?.title}</h3>
                            <p className="hidden md:block text-sm text-gray-300 line-clamp-3">
                                {movies[0]?.overview}
                            </p>
                        </div>
                    </div>

                    {/* Боковые карточки */}
                    <div className="flex overflow-x-auto space-x-1 xl:overflow-x-visible sm:h-45 xl:space-x-0 xl:grid xl:grid-cols-1 gap-1 w-full xl:w-1/3">
                        {movies.slice(1, 4).map((movie) => (
                            <Card
                                key={movie.id}
                                className="relative group flex-shrink-0 w-[250px] sm:w-[330] sm:full xl:h-41 rounded-lg overflow-hidden bg-transparent border-none p-0"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                                        alt={movie.title}
                                        width={1000}
                                        height={1000}
                                        className="w-full h-full object-cover transition duration-300 group-hover:brightness-75 group-hover:saturate-150 group-hover:sepia-[0.3] group-hover:hue-rotate-30"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-blue-500/30 transition duration-300" />

                                    <div className="absolute top-2.5 left-3 right-3 p-1 flex flex-col justify-start">
                                        <p className="text-[13px] font-medium text-white mb-1 flex items-center gap-1">
                                            <FiCalendar size={12} /> {movie.release_date}
                                        </p>
                                    </div>

                                    <div className="absolute bottom-2 left-3 right-3 flex flex-col justify-end">
                                        <h4 className="text-white text-[13px] sm:text-[16px] font-bold leading-tight line-clamp-2">
                                            {movie.title}
                                        </h4>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    className="absolute top-15 left-20 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 mt-2 border-white text-white w-fit h-7 text-xs"
                                    onClick={() => handleMovieClick(movie)}
                                >
                                    Читать новость
                                </Button>
                            </Card>
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
}
