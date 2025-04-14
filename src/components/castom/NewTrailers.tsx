import { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { PlayIcon } from 'lucide-react';
import Image from 'next/image';
import {
    FaVk,
    FaTelegramPlane,
    FaFacebookF,
    FaTwitter,
    FaThumbsUp,
    FaThumbsDown,
} from 'react-icons/fa';

export default function NewTrailers() {
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
    const [trailer, setTrailer] = useState<string | null>(null);  // Для хранения ссылки на трейлер

    const fetchTrailer = async (movieId: number) => {
        const API_KEY = localStorage.getItem('API_KEY');
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=ru-RU`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const trailerVideo = data.results.find((video: any) => video.type === 'Trailer');
                if (trailerVideo) {
                    setTrailer(`https://www.youtube.com/embed/${trailerVideo.id}`);
                } else {
                    setTrailer(null);  // Если трейлер не найден
                }
            } else {
                setTrailer(null);  // Если нет данных о видео
            }
        } catch (err) {
            console.error('Ошибка при загрузке трейлера', err);
            setTrailer(null);  // В случае ошибки
        }
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
                setSelectedMovie(data.results[0]);
                await fetchTrailer(data.results[0].id);  // Получаем трейлер для первого фильма
            } catch (err) {
                setError('Ошибка при загрузке новых трейлеров');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);  // Загрузим фильмы и трейлеры при монтировании компонента

    const handleMovieClick = async (movie: any) => {
        setSelectedMovie(movie);
        await fetchTrailer(movie.id);  // Загружаем трейлер для нового фильма
        const newMovies = [...movies];
        const movieIndex = newMovies.indexOf(movie);
        // Перемещаем выбранный фильм на верх
        newMovies.splice(movieIndex, 1);
        newMovies.unshift(movie); // Добавляем фильм в начало
        setMovies(newMovies);
    };

    return (
        <div className="mb-8 px-4 py-6 rounded-xl">
            <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-6">
                <h2 className="text-3xl md:text-[48px] xl:text-[65px] font-bold text-white">Новые трейлеры</h2>
                <Button
                    variant="link"
                    className="text-white text-sm md:text-base underline-offset-4 hover:underline p-0"
                >
                    Все трейлеры → 
                </Button>
            </div>

            {loading ? (
                <>
                    <Skeleton className="w-full h-[300px] md:h-[400px] rounded-xl mb-6" />
                    <Skeleton className="w-1/2 md:w-1/3 h-8 rounded-md mb-3" />
                    <div className="flex gap-4 overflow-x-auto">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="min-w-[160px] md:min-w-[200px] h-[160px] rounded-lg" />
                        ))}
                    </div>
                </>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <>
                    {/* Всплывающее окно с трейлером */}
                    {trailer ? (
                        <div className="relative w-full h-[500px] mb-8 rounded-xl overflow-hidden">
                            <iframe
                                src={trailer}
                                width="100%"
                                height="100%"
                                title="Movie Trailer"
                                className="object-cover"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <div className="text-white">Трейлер не доступен</div>
                    )}

                    <div className="w-full rounded-lg p-2 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
                            <h2 className="text-2xl sm:text-[32px] md:text-[40px] font-bold text-white leading-tight">
                                {selectedMovie?.title?.split(' ').slice(0, -1).join(' ')}{' '}
                                <span className="text-blue-500">
                                    {selectedMovie?.title?.split(' ').slice(-1)}
                                </span>
                            </h2>

                            <div className="flex justify-center sm:justify-start space-x-3 text-gray-400 text-[15px]">
                                <FaVk />
                                <FaTelegramPlane />
                                <FaFacebookF />
                                <FaTwitter />
                            </div>
                        </div>
                        <div className="flex justify-center sm:justify-end items-center space-x-4 text-sm text-gray-300">
                            <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                                <FaThumbsUp />
                                <span>3 246</span>
                            </div>
                            <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                                <FaThumbsDown />
                                <span>489</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-1 bg-[#1b1e2a] rounded-full overflow-hidden mt-2 mb-6">
                        <div className="w-1/4 h-1 bg-blue-500 rounded-full" />
                    </div>

                    <div className="flex gap-4 overflow-x-auto scrollbar-hide no-scrollbar pb-2">
                        {movies
                            .slice(1, 11) // Скипаем первый элемент, так как он уже на верхней позиции
                            .map((movie) => (
                                <Card
                                    key={movie.id}
                                    onClick={() => handleMovieClick(movie)}  // Перемещаем выбранный трейлер в верх
                                    className="min-w-[160px] md:min-w-[200px] bg-transparent border-none p-0"
                                >
                                    <div className="relative w-full h-[140px] sm:h-[150px] rounded-lg overflow-hidden">
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                                            alt={movie.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <CardContent className="mt-2 p-0">
                                        <CardTitle className="text-sm font-medium text-white line-clamp-2">
                                            {movie.title}
                                        </CardTitle>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </>
            )}
        </div>
    );
}
