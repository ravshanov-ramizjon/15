import Image from "next/image";
import { LineChartPro } from "@mui/x-charts-pro/LineChartPro";
import { ZoomData } from "@mui/x-charts-pro/context";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { Button } from "../ui/button";
import { FiCalendar, FiEye } from "react-icons/fi";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card } from "../ui/card";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";

interface Props {
    person: any;
    combinedCredits: any;
    bestMovies: any;
    movies: any[];
    personImg: any;
    genresMap: { [key: number]: string };
}

interface FilmographyItem {
    title: string;
    year: number | null;
    vote_average: number | null;
    popularity: number | null;
    poster_path?: string;
    id?: number;
}
interface CombinedCreditsCastItem {
    title?: string;
    name?: string;
    release_date?: string;
    first_air_date?: string;
    vote_average?: number;
    popularity?: number;
    poster_path?: string;
    id?: number;
}

const PersonContent = ({ person, combinedCredits, bestMovies, movies, personImg, genresMap }: Props) => {
    const [activeTab, setActiveTab] = useState<"info" | "bio">("info");
    const [zoom, setZoom] = useState<ZoomData | undefined>(undefined);
    const [yearRange, setYearRange] = useState<{ start: number; end: number }>({
        start: 2000,
        end: 2006,
    });
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(bestMovies.length / itemsPerPage);
    const paginatedBestMovies = bestMovies.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    );
    const router = useRouter();
    const handleMovieClick = (movie: any) => {
        localStorage.setItem('selectedMovie', JSON.stringify(movie));
        router.push('/movie/' + movie.id);
    };
    console.log("person", person);
    console.log("personImg", personImg);
    const filmographyData: FilmographyItem[] = (combinedCredits.cast || [])
        .map((item: CombinedCreditsCastItem): FilmographyItem => {
            const releaseDate: string | undefined = item.release_date || item.first_air_date;
            const year: number | null = releaseDate ? parseInt(releaseDate.slice(0, 4)) : null;
            return {
                title: item.title || item.name || "",
                year,
                vote_average: typeof item.vote_average === "number" ? item.vote_average : null,
                popularity: typeof item.popularity === "number" ? item.popularity : null,
                poster_path: item.poster_path,
                id: item.id,
            };
        })
        .filter((item: FilmographyItem) => item.year && item.vote_average !== null)
        .sort((a: FilmographyItem, b: FilmographyItem) => (a.year || 0) - (b.year || 0));

    const filteredFilmography = filmographyData.filter(
        (item) => item.year! >= yearRange.start && item.year! <= yearRange.end
    );

    const chartLabels = filteredFilmography.map((item) => `${item.year}`);
    const ratingValues = filteredFilmography.map((item) =>
        parseFloat(item.vote_average!.toFixed(1))
    );

    return (
        <div className="w-300 mx-auto py-10 text-white">
            <div className="flex gap-10 flex-wrap">
                <div className="min-w-[300px] h-[450px] rounded-lg overflow-hidden">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                        alt={person.name}
                        width={300}
                        height={450}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="w-full max-w-[700px] font-sans">
                    <Breadcrumb>
                        <BreadcrumbList className="flex">
                            <BreadcrumbItem><BreadcrumbLink href="/" className="text-[#777]">Главная</BreadcrumbLink></BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem><BreadcrumbPage className="text-white">{person.name}</BreadcrumbPage></BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h1 className="text-[48px] font-bold leading-none mb-1">{person.name}</h1>
                    <p className="flex items-center gap-3 text-[#BBB] text-[20px] mb-4">
                        <span className="text-white text-[38px] leading-none mb-1">
                            {person.also_known_as?.[0] || person.name}
                        </span>
                        <span className="cursor-pointer p-1 border border-[#2B354E] rounded-full">
                            <FaFacebookF size={14} />
                        </span>
                        <span className="cursor-pointer p-1 border border-[#2B354E] rounded-full">
                            <FaTwitter size={14} />
                        </span>
                    </p>

                    <div className="flex flex-col gap-6 mt-4 text-[16px]">
                        <div className="flex  gap-4">
                            <Button
                                variant="link"
                                onClick={() => setActiveTab("info")}
                                className={`font-semibold ${activeTab === "info" ? "text-white underline" : "text-[#888]"}`}
                            >
                                Информация
                            </Button>
                            <Button
                                variant="link"
                                onClick={() => setActiveTab("bio")}
                                className={`font-semibold ${activeTab === "bio" ? "text-white underline" : "text-[#888]"}`}
                            >
                                Биография
                            </Button>
                        </div>

                        {activeTab === "info" && (
                            <div className="space-y-2 text-[#BBB]">
                                <p>Карьера:{" "}
                                    {person.known_for_department === "Acting" && (
                                        <span className="text-[#F2F60F] underline cursor-pointer">Актёр</span>
                                    )}
                                    {person.job === "Producer" && (
                                        <>, <span className="text-[#F2F60F] underline cursor-pointer">Продюсер</span></>
                                    )}
                                    {person.job === "Writer" && (
                                        <>, <span className="text-[#F2F60F] underline cursor-pointer">Сценарист</span></>
                                    )}
                                </p>
                                <p>Рост: <span className="text-white">{person.height || "—"}</span></p>
                                <p>Дата рождения:{" "}
                                    <span className="text-[#F2F60F] underline cursor-pointer">
                                        {person.birthday || "—"}
                                    </span>{" "}
                                    {person.age && <span className="text-white">({person.age} лет)</span>}
                                </p>
                                <p>Место рождения:{" "}
                                    <span className="text-[#F2F60F] underline cursor-pointer">
                                        {person.place_of_birth || "—"}
                                    </span>
                                </p>
                                <p>Жанры:{" "}
                                    {(person.genres || []).map((genre: string, index: number) => (
                                        <span key={genre}>
                                            <span className="text-[#F2F60F] underline cursor-pointer">
                                                {genre}
                                            </span>
                                            {index < person.genres.length - 1 && ", "}
                                        </span>
                                    ))}
                                </p>
                                <p>Всего фильмов:{" "}
                                    <span className="text-[#F2F60F] underline cursor-pointer">
                                        {person.movie_credits?.cast?.length || "—"}, {person.first_movie_year || "—"} — {person.last_movie_year || "—"}
                                    </span>
                                </p>
                            </div>
                        )}

                        {activeTab === "bio" && (
                            <div className="space-y-2 text-[#BBB]">
                                {person.biography
                                    ? person.biography.split(" ").slice(0, 110).join(" ") + "..."
                                    : "Биография недоступна."}
                            </div>
                        )}

                        <p className="mt-6 text-[#BBB] text-[14px]">
                            В избранном у {person.popularity?.toLocaleString("ru-RU") || "—"} человек
                        </p>
                    </div>
                </div>
            </div>
            {/* Лучшие фильмы */}
            <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[32px] font-bold">Лучшие фильмы</h2>
                    <div className="flex items-center gap-3 text-sm text-white">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                            disabled={currentPage === 0}
                            className="px-3 py-1 rounded bg-[#2B354E] hover:bg-[#3A4662] disabled:opacity-40"
                        >
                            ←
                        </button>
                        <span>
                            {currentPage * itemsPerPage + 1}/{Math.min((currentPage + 1) * itemsPerPage, bestMovies.length)}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                            disabled={currentPage >= totalPages - 1}
                            className="px-3 py-1 rounded bg-[#2B354E] hover:bg-[#3A4662] disabled:opacity-40"
                        >
                            →
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {paginatedBestMovies.map((movie: any) => (
                        <div key={movie.id} className="text-white">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                width={500}
                                height={750}
                                className="rounded-lg w-full h-[300px] object-cover"
                            />
                            <p>{movie.title.split(" ").slice(0, 6).join(" ")}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* {Новость} */}
            <div className="my-12 h-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">Последние новости</h2>
                    <Button variant="link" className="text-white hover:underline underline-offset-4 text-sm md:text-base">
                        Все новости →
                    </Button>
                </div>
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Главная новость */}
                    <div className="relative w-full h-[300px] md:h-[772px] rounded-xl overflow-hidden bg-gradient-to-b from-gray via-gray-50 to-black">
                        <Image
                            src={`https://image.tmdb.org/t/p/original${movies[0]?.backdrop_path || movies[0]?.poster_path}`}
                            alt={movies[0]?.title || movies[0]?.name}
                            width={1000}
                            height={1000}
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                            <div className="flex items-center text-sm gap-4 mb-2 text-gray-300">
                                <div className="flex items-center gap-1">
                                    <FiCalendar size={16} />
                                    <span>{movies[0]?.release_date || movies[0]?.first_air_date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FiEye size={16} />
                                    <span>3246</span>
                                </div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-2">{movies[0]?.title || movies[0]?.name}</h3>
                            <p className="hidden md:block text-sm text-gray-300 line-clamp-3">
                                {movies[0]?.overview}
                            </p>
                        </div>
                    </div>

                    {/* Боковые карточки */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-2 w-full lg:w-1/3">
                        {movies.slice(1, 5).map((movie) => (
                            <Card
                                key={movie.id}
                                className="relative group flex w-full h-46.5 rounded-lg overflow-hidden bg-transparent border-none p-0"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                                        alt={movie.title || movie.name}
                                        width={1000}
                                        height={1000}
                                        className="h-full object-cover transition duration-300 group-hover:brightness-75 group-hover:saturate-150 group-hover:sepia-[0.3] group-hover:hue-rotate-30"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-blue-500/30 transition duration-300" />
                                    <div className="absolute top-2.5 left-3 right-3 p-1 flex flex-col justify-start">
                                        <p className="text-[13px] font-medium text-white mb-1 flex items-center gap-1">
                                            <FiCalendar size={12} /> {movie.release_date || movie.first_air_date}
                                        </p>
                                    </div>
                                    <div className="absolute bottom-2 left-3 right-3 flex flex-col justify-end">
                                        <h4 className="text-white text-[16px] font-bold leading-tight line-clamp-2">
                                            {movie.title || movie.name}
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
            </div>

            {/* Фото */}
            <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">Фото</h2>
                    <Link
                        href="#"
                        className="text-white hover:underline underline-offset-4 text-sm md:text-base"
                    >
                        Все фото →
                    </Link>
                </div>

                <h3 className="text-white text-xl font-semibold mb-4">{person.name}</h3>

                <div className="grid grid-cols-4 gap-[22px]">
                    {(Array.isArray(personImg) ? personImg.slice(0, 6) : []).map((photo: any, index: number) => {
                        const isWide = index === 0 || index === 4;

                        return (
                            <div
                                key={index}
                                className={`relative h-[462px]  rounded-lg overflow-hidden ${isWide ? "col-span-2" : "col-span-1 w-[280px] "
                                    }`}
                            >
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${photo.file_path}` || person.profile_path}
                                    alt={`${person.name} photo ${index + 1}`}
                                    fill
                                    className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* График */}
            <div className="mt-12 w-full">
                <div className="flex item-center text-center justify-between pb-6">
                    <h2 className="text-[32px] flex items-center font-bold">График фильмографии</h2>
                    <span className="flex items-center">_____</span>
                    <div className="flex gap-4 items-center text-center">
                        <Select
                            value={yearRange.start.toString()}
                            onValueChange={(value: string) =>
                                setYearRange((prev) => ({ ...prev, start: parseInt(value) }))
                            }
                        >
                            <SelectTrigger className="w-[100px] bg-transparent border border-gray-600 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: 21 }, (_, i) => 2000 + i).map((year) => (
                                    <SelectItem key={year} value={year.toString()} className="text-white">
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={yearRange.end.toString()}
                            onValueChange={(value: string) =>
                                setYearRange((prev) => ({ ...prev, end: parseInt(value) }))
                            }
                        >
                            <SelectTrigger className="w-[100px] bg-transparent border border-gray-600 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: 21 }, (_, i) => 2000 + i).map((year) => (
                                    <SelectItem key={year} value={year.toString()} className="text-white">
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>



                <div className="w-full h-[400px] bg-transparent">
                    <LineChartPro
                        height={400}
                        zoom={zoom ? [zoom] : undefined}
                        onZoomChange={(zoomData) =>
                            setZoom(Array.isArray(zoomData) ? zoomData[0] : undefined)
                        }
                        series={[
                            {
                                data: ratingValues,
                                color: "#191e2e",
                                area: true,
                            },
                        ]}
                        xAxis={[
                            {
                                id: "filmography-x",
                                scaleType: "point",
                                data: chartLabels,
                                tickLabelInterval: "auto",
                            },
                        ]}
                        sx={{
                            backgroundColor: "transparent",
                            "& .MuiChartsAxis-root": {
                                color: "#aaa",
                            },
                            "& .MuiChartsLegend-root": {
                                color: "#aaa",
                            },
                        }}
                    />
                </div>
            </div>

            {/* Фильмы */}
            <div className="w-full text-white space-y-10">
                <h2 className="text-3xl font-bold mb-4">Фильмы</h2>

                {movies.slice(0,10).map((movie) => (
                    <div
                        key={movie.id}
                        className="flex items-center gap-6 border-b border-white/10 pb-10"
                    >
                        <Image
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                            width={90}
                            height={130}
                            className="rounded object-cover w-[202px] h-[288px]"
                        />

                        <div className="flex justify-between w-full">
                            <div>
                                <h3 className="text-white font-medium text-[25px]">
                                    {movie.title || movie.name}({new Date(movie.release_date).getFullYear() || new Date(movie.first_air_date).getFullYear()})
                                </h3>
                                <p className="text-white/50 text-[17px]">{movie.original_title || movie.original_name}</p>
                                <p className="text-[#F2F60F] text-[15px] mt-1">
                                    {movie.genre_ids.map((id: number) => genresMap[id]).filter((genre: string | undefined): genre is string => Boolean(genre)).join(", ")}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-1 bg-green-500 text-black text-sm font-semibold px-2 py-2 rounded">
                                        {movie.vote_average?.toFixed(2) || "—"}
                                    </div>
                                    <span className="text-xs text-white/60">Kinoarea</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-1 bg-green-500 text-black text-sm font-semibold px-2 py-2 rounded ml-4">
                                        {movie.vote_count?.toFixed(2) || "—"}
                                    </div>
                                    <span className="text-xs text-white/60">IMDb</span>
                                </div>

                                <Link href={`/movie/${movie.id}`}>
                                    <Button className="cursor-pointer bg-blue-600 text-white text-sm px-4 h-[71px] rounded ml-4">
                                        Карточка фильма
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PersonContent;
