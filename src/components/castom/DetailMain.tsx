'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import {
    FaVk,
    FaInstagram,
    FaFacebookF,
    FaTwitter,
} from "react-icons/fa";


export default function DetailMain() {
    const [movie, setMovie] = useState<any>(null);
    const [credits, setCredits] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [officialTrailer, setOfficialTrailer] = useState<any | null>(null);
    const [posters, setPosters] = useState<any[]>([]);
    const [similarMovies, setSimilarMovies] = useState<any[]>([]);
    const [recommendations, setRecommendations] = useState<any[]>([]);

    useEffect(() => {
        const storedMovie = localStorage.getItem('selectedMovie');
        if (storedMovie) {
            const movieData = JSON.parse(storedMovie);
            setMovie(movieData);
        }
    }, []);
    
    useEffect(() => {
        if (!movie?.id) return;
    
        const fetchMovieDetails = async () => {
            setLoading(true);
            try {
                const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
                const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=ru&append_to_response=credits,videos,images`);
                const movieFullData = await movieRes.json();
                const trailers = movieFullData.videos.results;
                const official = trailers.find((vid: any) => vid.type === "Trailer" && vid.site === "YouTube");
    
                setOfficialTrailer(official);
                setMovie(movieFullData);
                setCredits(movieFullData.credits.cast.slice(0, 10));
                setPosters(movieFullData.images.posters.slice(0, 5));
            } catch (err) {
                setError('Ошибка при загрузке информации о фильме');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
    
        const fetchExtraData = async () => {
            try {
                const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
                const similarRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=${API_KEY}&language=ru`);
                const similarData = await similarRes.json();
                setSimilarMovies(similarData.results.slice(0, 4));
    
                const recRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/recommendations?api_key=${API_KEY}&language=ru`);
                const recData = await recRes.json();
                setRecommendations(recData.results.slice(0, 4));
            } catch (error) {
                console.error("Ошибка при получении дополнительных данных", error);
            }
        };
    
        fetchMovieDetails();
        fetchExtraData();
    }, [movie?.id]);
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!movie) return <div>No movie data found.</div>;

    const director = movie.credits.crew.find((person: any) => person.job === "Director");
    const writers = movie.credits.crew.filter((person: any) => person.job === "Writer" || person.department === "Writing");
    const producers = movie.credits.crew.filter((person: any) => person.job === "Producer");
    const composer = movie.credits.crew.find((person: any) => person.job === "Original Music Composer");
    const genres = movie.genres.map((g: any) => g.name).join(", ");
    const countries = movie.production_countries.map((c: any) => c.name).join(", ");
    const menuItems = [
        "Премьеры", "Трейлеры", "Рецензии", "Студии", "Цитаты",
        "Сиквелы и приквелы", "Постеры", "Кадры", "Награды"
    ];

    const handleClick = (index: number) => {
        setActiveIndex(index); // Устанавливаем активный индекс
    };

    return (
        <div className="flex px-4 py-5 w-full">
            <div className="flex flex-col w-full items-center w-300">
                <div className="flex gap-14 w-300">
                    <div className="w-[395px] h-[539px]">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={395}
                            height={539}
                            className="rounded-lg object-cover h-full"
                            loading="lazy"
                        />
                    </div>

                    <div className="w-full text-start">
                        <Breadcrumb>
                            <BreadcrumbList className="flex">
                                <BreadcrumbItem><BreadcrumbLink href="/" className="text-[#777]">Главная</BreadcrumbLink></BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem><BreadcrumbLink href="/" className="text-[#777]">Фильмы</BreadcrumbLink></BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem><BreadcrumbPage className="text-white">{movie.title}</BreadcrumbPage></BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <h1 className="font-bold text-white text-[48px] mt-6">{movie.title}</h1>
                        <h2 className="text-[28px] text-[#BBB] font-semibold">{movie.original_title}</h2>

                        <div className="mt-3 flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2">
                                <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold">{movie.vote_average}</div>
                                <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold">{movie.vote_count}</div>
                            </div>
                            <p className="text-[#BBB] mt-2 max-w-[800px] text-[17px]">{movie.overview}</p>

                            <button className="bg-[#1f80e0] hover:bg-[#1866b6] transition text-white px-5 py-2 rounded-md font-semibold">
                                ▶ Смотреть трейлер
                            </button>

                            <div className="flex items-center gap-2 text-[20px] text-white ml-4">
                                <span className="text-yellow-400">★ ★ ★ ★ ★ ★ ★ ☆ ☆ ☆</span>
                                <span className="text-red-500 text-[26px] cursor-pointer">❤</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="grid grid-cols-2 text-[#F2F60F] text-start gap-y-2 mt-10 text-[16px] w-300">
                    <div className="font-semibold text-white">Год:</div><div className="underline decoration-[#F2F60F]">{movie.release_date?.split("-")[0]}</div>
                    <div className="font-semibold text-white">Страна:</div><div className="underline decoration-[#F2F60F]">{countries}</div>
                    <div className="font-semibold text-white">Слоган:</div><div className="underline decoration-[#F2F60F]">{movie.tagline || '—'}</div>
                    <div className="font-semibold text-white">Режиссёр:</div><div className="underline decoration-[#F2F60F]">{director?.name || '—'}</div>
                    <div className="font-semibold text-white">Сценарий:</div><div className="underline decoration-[#F2F60F]">{writers.slice(0, 3).map((w: any) => w.name).join(", ") || '—'} ...</div>
                    <div className="font-semibold text-white">Продюсер:</div><div className="underline decoration-[#F2F60F]">{producers.slice(0, 4).map((p: any) => p.name).join(", ") || '—'}</div>
                    <div className="font-semibold text-white">Композитор:</div><div className="underline decoration-[#F2F60F]">{composer?.name || '—'}</div>
                    <div className="font-semibold text-white">Жанр:</div><div className="underline decoration-[#F2F60F]">{genres}</div>
                    <div className="font-semibold text-white">Премьера:</div><div className="underline decoration-[#F2F60F]">{movie.release_date}</div>
                    <div className="font-semibold text-white">Бюджет:</div><div className="underline decoration-[#F2F60F]">${movie.budget.toLocaleString()}</div>
                    <div className="font-semibold text-white">Сборы:</div><div className="underline decoration-[#F2F60F]">${movie.revenue.toLocaleString()}</div>
                </div>

                <div className="mt-12 w-300">
                    <h3 className=" text-start text-white text-[65px] font-bold mb-4">В главных ролях:</h3>
                    <div className="grid grid-cols-5 gap-6 overflow-x-auto">
                        {credits.map(actor => (
                            <div key={actor.id} className="flex flex-col items-start text-white]">
                                <Image
                                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : "/placeholder.png"}
                                    width={1000}
                                    height={1000}
                                    alt={actor.name}
                                    className="w-full h-[250px] object-cover"
                                />
                                <p>{actor.name}</p>
                                <p className="text-[#BBB] text-sm">{actor.character}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href="#"
                            onClick={() => handleClick(index)}
                            className={`py-1 px-3 rounded-lg text-[#777] text-lg font-medium cursor-pointer transition-all ${activeIndex === index
                                ? "text-white bg-blue-600"
                                : "hover:text-blue-500"
                                }`}
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Трейлер секция */}
                <div className="mt-16 w-300">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-white text-[65px] font-bold">Трейлеры фильма</h2>
                        <Link href="#" className="text-[#9CA3AF] hover:text-white text-sm transition">Все трейлеры →</Link>
                    </div>

                    {officialTrailer ? (
                        <div className="w-full aspect-video rounded-lg overflow-hidden">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${officialTrailer.key}`}
                                title="Трейлер"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="rounded-lg"
                            />
                        </div>
                    ) : (
                        <div className="text-white">Трейлер не найден</div>
                    )}

                    <div className="flex items-center text-center justify-between gap-4 text-[#9CA3AF] mt-2">
                        <div className="flex items-center gap-4">
                            <h1 className="text-[30px] text-white font-bold">{movie.title}</h1>
                            <FaVk />
                            <FaInstagram />
                            <FaFacebookF />
                            <FaTwitter />
                            ...
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1">
                                <FaThumbsUp /> <span>420</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FaThumbsDown /> <span>16</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Постеры */}
                <div className="mt-20 w-300">
                    <div className="flex text-start items-center justify-between mb-4">
                        <h2 className="text-white text-[65px] font-bold">Постеры к фильму</h2>
                        <Link href="#" className="text-[#9CA3AF] hover:text-white text-sm transition">Все постеры →</Link>
                    </div>
                    <p className="text-white text-start text-[35px] font-bold mb-3">{movie.title}</p>
                    <div className="grid grid-cols-4 gap-4 overflow-x-auto">
                        {posters.map((poster, index) => (
                            <div key={index} className="relative max-w-[339px] min-w-[150px] h-[462px] rounded overflow-hidden">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w300${poster.file_path}`}
                                    alt={`Постер ${index}`}
                                    width={300}
                                    height={450}
                                    className="w-full h-full object-cover"
                                />
                                {index === 4 && posters.length > 5 && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold">
                                        +{posters.length - 4}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Кадры */}
                <div className="mt-20 w-300">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-white text-[65px] font-bold">Кадры из фильма</h2>
                        <Link href="#" className="text-[#9CA3AF] hover:text-white text-sm transition">Все кадры →</Link>
                    </div>
                    <p className="text-white text-start text-[35px] font-semibold mb-3">{movie.title}</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                        {posters.map((poster, index) => (
                            <div key={index} className="relative rounded max-w-[339px] min-w-[150px] h-[462px] overflow-hidden">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w300${poster.file_path}`}
                                    alt={`Кадр ${index}`}
                                    width={300}
                                    height={180}
                                    className="w-full h-full  object-cover"
                                />
                                {index === 5 && posters.length > 6 && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold">
                                        +{posters.length - 5}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 w-300">
                    <h2 className="text-white text-[32px] font-bold mb-6">Сиквелы и приквелы</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {recommendations.map(film => (
                            <div key={film.id} className="text-white">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                                    alt={film.title}
                                    width={500}
                                    height={750}
                                    className="rounded-lg w-full h-[300px] object-cover"
                                />
                                <p className="mt-2 font-semibold text-sm">{film.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Цитаты из фильма */}
                <div className="mt-20 w-300">
                    <h2 className="text-white text-[32px] font-bold mb-4">Цитаты из фильма</h2>
                    <div className=" p-6 rounded-lg text-white space-y-4">
                        <p className="italic">"Цитата 1 из фильма. Lorem ipsum dolor sit amet, consectetur adipiscing elit."</p>
                        <p className="italic">"Цитата 2. Aliquam erat volutpat. Donec ac nisi ut libero sagittis congue."</p>
                        <p className="italic">"Цитата 3. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe."</p>
                    </div>
                </div>

                {/* Похожие фильмы */}
                <div className="mt-20">
                    <h2 className="text-white text-[32px] font-bold mb-6">Похожие фильмы</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {similarMovies.map(film => (
                            <div key={film.id} className="text-white">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                                    alt={film.title}
                                    width={500}
                                    height={750}
                                    className="rounded-lg w-full h-[300px] object-cover"
                                />
                                <p className="mt-2 font-semibold text-sm">{film.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

