import Image from "next/image";
import { useEffect, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


export default function DetailMain() {
    const [movie, setMovie] = useState<any>(null);
    useEffect(() => {
        const storedMovie = localStorage.getItem('selectedMovie');
        if (storedMovie) {
            const movieData = JSON.parse(storedMovie);
            setMovie(movieData);
        }
    }, []);
    return (
        <div className="flex justify-center">
            <div className="flex flex-col justify-center h-screen w-250">
                {movie && (
                    <div className="flex gap-[58px]">
                        <div className=" w-[395px] h-[539px]">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                width={395}
                                height={539}
                                className="object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div className="w-full">
                            <Breadcrumb>
                                <BreadcrumbList className="flex" >
                                    <BreadcrumbItem className="flex">
                                        <BreadcrumbLink href="/" className="text-[#777]">Главная</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem className="flex">
                                        <BreadcrumbLink href="/" className="text-[#777]">Фильмы</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem className="flex">
                                        <BreadcrumbLink className="text-[#ffff]">{movie.title}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <h1 className="font-bold text-[65px] text-[#ffff]">{movie.title}</h1>
                        </div>
                    </div>
                )}
            </div> 
        </div>
    );
}