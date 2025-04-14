'use client';
import Image from "next/image";
import { FaThumbsUp, FaThumbsDown, FaVk, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DetailMain({
    movie,
    credits,
    postersPoster,
    recommendations,
    similarMovies,
    genresMap,
    officialTrailer,
}: {
    movie: any;
    credits: any[];
    postersBackdrop: any[];
    postersPoster: any[];
    recommendations: any[];
    similarMovies: any[];
    officialTrailer: any | null;
    genresMap: any;
    [key: number]: string;
}) {
    console.log(movie);
    const director = movie.credits.crew.find((person: any) => person.job === "Director");
    const writers = movie.credits.crew.filter((person: any) => person.job === "Writer" || person.department === "Writing");
    const producers = movie.credits.crew.filter((person: any) => person.job === "Producer");
    const composer = movie.credits.crew.find((person: any) => person.job === "Original Music Composer");
    const countries = movie.production_countries.map((c: any) => c.name).join(", ");

    const [page, setPage] = useState(0);
    const postersPerPage = 4;

    const totalPages = Math.ceil(postersPoster.length / postersPerPage);
    const currentPosters = postersPoster.slice(
        page * postersPerPage,
        (page + 1) * postersPerPage
    );

    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));
    const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages - 1));

    const router = useRouter();
    const handleMovieClick = (actor: any) => {
      localStorage.setItem('selectedMovie', JSON.stringify(movie));
      router.push(`/person/${actor.id}`);
    };

    return (
        <div className="flex px-4 py-15 w-full">
            <div className="flex flex-col w-full items-center w-full">
                {/* Основная информация */}
                <div className="pt-20 sm:p-0 sm:flex gap-14 sm:w[660px] lg:w-[850px] xl:w-300">
                    <div className="w-[225px] lg:w-[297px] lg:h-[402px] xl:w-[395px] xl:h-[539px]">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={395}
                            height={539}
                            className="rounded-lg object-cover h-full"
                            loading="lazy"
                        />
                    </div>

                    <div className="w-full text-start relative">
                        <Breadcrumb className="absolute top-[-500] sm:static">
                            <BreadcrumbList className="flex">
                                <BreadcrumbItem><BreadcrumbLink href="/" className="text-[#777]">Главная</BreadcrumbLink></BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem><BreadcrumbPage className="text-white">{movie.title}</BreadcrumbPage></BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <h1 className="font-bold text-white text-[32px] lg:text-[40px] xl:text-[48px] mt-6 absolute top-[-499] sm:static">{movie.title}</h1>
                        <h2 className="text-[20px] xl:text-[28px] text-[#BBB] font-semibold absolute top-[-430] sm:static">{movie.original_title}</h2>

                        <div className="mt-3 items-center gap-4 flex-wrap">
                            <div className="flex flex-col sm:flex-row items-center gap-[25px] sm:gap-2 absolute top-[-230] right-15 sm:static">
                                <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold">{movie.vote_average}</div>
                                <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold">{movie.vote_count}</div>
                            </div>
                            <p className="mb-20 sm:mb-0 text-[#BBB] mt-2 max-w-[697px] lg:w-[508px] lg:h-[50px] h-[100px] sm:h-auto xl:h-auto xl:text-[17px] no-scrollbar overflow-y-auto sm:overflow-hidden lg:overflow-y-auto">{movie.overview}</p>

                            <button className="lg:absolute lg:bottom-[20] absolute bottom-10  sm:static xl:static bg-[#1f80e0] hover:bg-[#1866b6] transition text-white px-5 py-2 rounded-md font-semibold ">
                                ▶ Смотреть трейлер
                            </button>

                            <div className="flex lg:absolute lg:bottom-[-10] xl:static items-center gap-2 text-[20px] text-white ml-4">
                                <span className="text-yellow-400"><FaHeart className="text-white" /></span>
                                <span className="text-white-500 text-[14px] lg:text-[14px] xl:text-[20px] cursor-pointer">{`В избранном у ${movie.popularity} человек`}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Таблица характеристик */}
                <div className="flex flex-col sm:flex-row items-center gap-5 sm:w[660px] lg:w-[850px] xl:w-300">
                    <div className="grid grid-cols-2 text-[#F2F60F] text-start gap-y-2 mt-10 text-[16px]">
                        <div className="font-semibold text-white">Год:</div><div className="underline decoration-[#F2F60F]">{movie.release_date?.split("-")[0]}</div>
                        <div className="font-semibold text-white">Страна:</div><div className="underline decoration-[#F2F60F]">{countries}</div>
                        <div className="font-semibold text-white">Слоган:</div><div className="underline decoration-[#F2F60F]">{movie.tagline || '—'}</div>
                        <div className="font-semibold text-white">Режиссёр:</div><div className="underline decoration-[#F2F60F]">{director?.name || '—'}</div>
                        <div className="font-semibold text-white">Сценарий:</div><div className="underline decoration-[#F2F60F]">{writers.slice(0, 3).map((w: any) => w.name).join(", ") || '—'}...</div>
                        <div className="font-semibold text-white">Продюсер:</div><div className="underline decoration-[#F2F60F]">{producers.slice(0, 4).map((p: any) => p.name).join(", ") || '—'}</div>
                    </div>
                    <div className="grid grid-cols-2 text-[#F2F60F] text-start gap-y-2 mt-10 text-[16px]">
                        <div className="w-[318px] font-semibold text-white">Композитор:</div><div className="underline decoration-[#F2F60F]">{composer?.name || '—'}</div>
                        <div className="font-semibold text-white">Жанр:</div><div className="underline decoration-[#F2F60F]">{movie.genres.map((id: number) => genresMap[id]).join(", ")}</div>
                        <div className="font-semibold text-white">Премьера:</div><div className="underline decoration-[#F2F60F]">{movie.release_date}</div>
                        <div className="font-semibold text-white">Бюджет:</div><div className="underline decoration-[#F2F60F]">${movie.budget.toLocaleString()}</div>
                        <div className="font-semibold text-white">Сборы:</div><div className="underline decoration-[#F2F60F]">${movie.revenue.toLocaleString()}</div>
                    </div>
                </div>

                {/* Главные роли */}
                <div className="mt-12 sm:w[660px] lg:w-[850px] xl:w-300">
                    <h3 className=" text-start text-white text-[40px] xl:text-[65px] font-bold mb-4">В главных ролях:</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 overflow-x-auto">
                        {credits.slice(0, 10).map(actor => (
                            <div key={actor.id} className="flex flex-col items-start text-white"
                            onClick={() => {handleMovieClick(actor)}}
                            >
                                <Image
                                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : "/placeholder.png"}
                                    width={1000}
                                    height={1000}
                                    alt={actor.name}
                                    className="lg:w-[251px] xl:w-full h-[252px] object-cover"
                                />
                                <p className="text-white">{actor.name}</p>
                                <p className="text-[#BBB] text-sm">{actor.original_name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Трейлер */}
                <div className="mt-16 w-[368px] sm:w[660px] lg:w-[850px] xl:w-300">
                    <h2 className="text-white text-[40px] xl:text-[65px] font-bold mb-6">Трейлеры фильма</h2>
                    {officialTrailer ? (
                        <div className="aspect-video rounded-lg overflow-hidden">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${officialTrailer.key}`}
                                title="Трейлер"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <div className="text-white">Трейлер не найден</div>
                    )}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-wrap sm:flex-row gap-10 items-center">
                            <h3 className="text-[25px] sm:text-[30px] lg:text-[35px] xl:text-[45px] font-bold text-white">{movie.title}</h3>
                            <FaVk className="text-[#6D7792]" />
                            <FaInstagram className="text-[#6D7792]" />
                            <FaFacebookF className="text-[#6D7792]" />
                            <FaTwitter className="text-[#6D7792]" />
                        </div>
                        <div className="flex items-center gap-5 h-[80px]">
                            <span className="flex flex-col items-center gap-2">
                                <FaThumbsUp className="text-[#ffff]" />
                                <span className="text-[#ffff]">{movie.vote_average}</span>
                            </span>
                            <span className="flex flex-col items-center gap-2">
                                <FaThumbsDown className="text-[#ffff]" />
                                <span className="text-[#ffff]">{movie.vote_count}</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Постеры */}
                <div className="mt-20 sm:w[660px] lg:w-[850px] xl:w-300">
                    <div className="flex justify-between items-center">
                        <h2 className="text-white text-[40px] xl:text-[65px] font-bold mb-4">Постеры к фильму</h2>
                        <Button variant='link' className="text-white text-[22px] font-medium">Все постеры →</Button>
                    </div>
                    <div className="flex owerflow-x-auto no-scrollbar overflow-x-auto whitespace-nowrap sm:grid grid-cols-4 gap-14">
                        {currentPosters.map((poster, index) => (
                            <div
                                key={index}
                                className="relative max-w-[339px] min-w-[155px] lg:w-[202px] lg:h-[275px] xl:w-[300px] xl:h-[462px] rounded overflow-hidden"
                            >
                                <Image
                                    src={`https://image.tmdb.org/t/p/w300${poster.file_path}`}
                                    alt={`Постер ${index}`}
                                    width={500}
                                    height={500}
                                    className="w-[162px] h-[230px] lg:w-[202px] lg:h-[275px] xl:w-[300] xl:h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center items-center mt-4">
                        <button
                            onClick={handlePrev}
                            disabled={page === 0}
                            className="cursor-pointer px-4 py-2 text-white rounded disabled:opacity-0"
                        >
                            ←
                        </button>
                        <span className="text-white">
                            {page + 1}/{totalPages}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={page === totalPages - 1}
                            className="cursor-pointer px-4 py-2 text-white rounded disabled:opacity-0"
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* Сиквелы и приквелы */}
                <div className="mt-20 sm:w[660px] lg:w-[850px] xl:w-[1200px]">
                    <center>
                        <h2 className="text-white xl:text-[65px] text-[40px] font-bold mb-6">
                            Сиквелы и приквелы
                        </h2>
                    </center>

                    <div className="flex gap-3 sm:w-180 lg:w-auto overflow-x-auto whitespace-nowrap no-scrollbar">
                        {recommendations.slice(0, 8).map((film) => (
                            <div
                                key={film.id}
                                className="text-white shrink-0 w-[200px] xl:w-[339px]"
                            >
                                <div className="w-full h-[240px] xl:h-[462px] relative">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                                        alt={film.title}
                                        fill
                                        className="rounded-lg object-cover"
                                        sizes="(min-width: 1280px) 339px, 200px"
                                    />
                                </div>
                                <p className="mt-2 font-semibold text-sm line-clamp-2">
                                    {film.title}
                                </p>
                                <p className="text-sm text-[#F2F60F] font-medium line-clamp-1">
                                    {film.genre_ids.map((id: number) => genresMap[id]).join(", ")}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Цитаты */}
                <div className="mt-20 sm:w[660px] lg:w-[850px] xl:w-300">
                    <h2 className="text-white text-[40px] xl:text-[65px] font-bold mb-4">Цитаты из фильма</h2>
                    <div className="p-1 rounded-lg text-white space-y-4">
                        <p className="italic">"Свобода — это не просто слово. Это выбор, который ты делаешь каждый день."</p>
                        <p className="italic">"Надежда — это хорошая вещь. Возможно, даже лучшая из всех."</p>
                        <p className="italic">Иногда путь к победе — это просто не сдаваться.</p>
                        <p className="italic">Мы определяем себя не тем, кем были, а тем, кем хотим стать."</p>
                        <p className="italic">Настоящая сила — в умении контролировать свои страхи, а не прятаться от них.</p>
                    </div>
                </div>

                {/* Похожие фильмы */}
                <div className="mt-20 sm:w[660px] lg:w-[850px] xl:w-300">
                    <center>
                        <h2 className="text-white text-[40px] xl:text-[65px] font-bold mb-6">Похожие фильмы</h2>
                    </center>
                    <div className="flex gap-3 sm:w-180 lg:w-auto overflow-x-auto whitespace-nowrap no-scrollbar">
                        {similarMovies.slice(0, 8).map(film => (
                            <div key={film.id} className="text-white w-[200px] flex-shrink-0">
                                <div className="relative w-full aspect-[2/3]">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                                        alt={film.title}
                                        fill
                                        className="rounded-lg object-cover"
                                    />
                                </div>
                                <p className="mt-2 font-semibold text-[16px]">
                                    {film.title.split(" ").slice(0, 2).join(" ").length > 15
                                        ? film.title.split(" ").slice(0, 2).join(" ") + "..."
                                        : film.title.split(" ").slice(0, 2).join(" ")}
                                </p>
                                <p className="text-sm text-[#F2F60F] font-medium">
                                    {film.genre_ids.map((id: number) => genresMap[id]).join(", ").split(" ").slice(0, 2).join(" ")}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
