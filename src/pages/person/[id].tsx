// pages/person/[id].tsx

import { GetServerSideProps } from "next";
import PersonContent from "@/components/castom/DetailPerson"; // импортируем компонент
import Header from "@/components/castom/Header";

interface Props {
    person: any;
    combinedCredits: any;
    bestMovies: any;
    sorted: any;
    personImg: any;
    genresMap: { [key: number]: string };
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

    const [personRes, creditsRes, bestMoviesRes, personImgRes, genresRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=ru-RU`),
        fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}&language=ru-RU`),
        fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=ru-RU`),
        fetch(`https://api.themoviedb.org/3/person/${id}/images?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ru-RU`),
    ]);

    const person = await personRes.json();
    const combinedCredits = await creditsRes.json();
    const bestMoviesData = await bestMoviesRes.json();
    const personImg = await personImgRes.json();
    const genresData = await genresRes.json();
    const genresMap = genresData.genres.reduce((acc: any, genre: any) => {
        acc[genre.id] = genre.name;
        return acc;
    }, {});


    const bestMovies = bestMoviesData.cast
        .sort((a: any, b: any) => b.vote_average - a.vote_average) // Сортируем по рейтингу
        .slice(0, 15); // Получаем только 4 лучших фильма

    const sorted = (combinedCredits.cast || [])
        .filter((item: any) => item.backdrop_path || item.poster_path)
        .sort((a: any, b: any) => new Date(b.release_date || b.first_air_date).getTime() - new Date(a.release_date || a.first_air_date).getTime())



    return {
        props: {
            person,
            combinedCredits,
            bestMovies,
            sorted,
            personImg,
            genresMap,
        },
    };
};

const PersonPage = ({ person, combinedCredits, bestMovies, sorted, personImg, genresMap }: Props) => {
    return (
        <div
            className="bg-cover bg-center"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${person.poster_path})`,
            }}
        >
            <div className="relative w-full bg-cover bg-center bg-gradient-to-b from-[#1f2535]/300 to-[#1f2535]/500">            <Header />
                <PersonContent
                    person={person}
                    combinedCredits={combinedCredits}
                    bestMovies={bestMovies}
                    movies={sorted}
                    personImg={personImg.profiles}
                    genresMap={genresMap}
                />
            </div>
        </div>
    );
};

export default PersonPage;
