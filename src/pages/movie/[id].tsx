import { GetServerSideProps } from "next";
import DetailMain from "@/components/castom/DetailMovie";
import Footer from "@/components/castom/Footer";
import Header from "@/components/castom/Header";
import { useEffect, useState } from "react";

interface Props {
  movie: any;
  combinedCredits: any;
  images: any;
  genresMap: { [key: number]: string };
  similarMovies: any;
  rec: any;
  official: any;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URI
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const [movieRes, creditsRes, imagesRes, genresRes, similarRes, recRes, trailersRes] = await Promise.all([
    fetch(`${baseUrl}/movie/${id}?api_key=${API_KEY}&language=ru-RU&append_to_response=credits`),
    fetch(`${baseUrl}/movie/${id}/credits?api_key=${API_KEY}&language=ru-RU`),
    fetch(`${baseUrl}/movie/${id}/images?api_key=${API_KEY}`),
    fetch(`${baseUrl}/genre/movie/list?api_key=${API_KEY}&language=ru-RU`),
    fetch(`${baseUrl}/movie/${id}/similar?api_key=${API_KEY}&language=ru`),
    fetch(`${baseUrl}/movie/${id}/recommendations?api_key=${API_KEY}&language=ru`),
    fetch(`${baseUrl}/movie/${id}/videos?api_key=${API_KEY}&language=ru-RU`),
  ]);

  // if (!movieRes.ok) {
  //   return <div className="flex justify-center items-center h-screen">
  //     <h1 className="text-black text-[65px] ">Loading ...</h1>
  //   </div>
  // }

  
  const movie: { id: number; title: string; backdrop_path: string;[key: string]: any } = await movieRes.json();
  const combinedCredits = await creditsRes.json();
  const images = await imagesRes.json();
  const genresData = await genresRes.json();
  const similarMovies = await similarRes.json();
  const rec = await recRes.json();
  const movieFullData = await trailersRes.json();
  const trailers = movieFullData.results;
  const official = trailers?.filter(
    (video: any) => video.type === "Trailer" && video.site === "YouTube"
  );
  const genresMap = genresData.genres.reduce((acc: any, genre: any) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});

  return {
    props: {
      movie,
      combinedCredits,
      images,
      genresMap,
      similarMovies,
      rec,
      official: official || null,
    },
  };
};

function MovieDetail({ movie, combinedCredits, images, genresMap, similarMovies, rec, official, }: Props) {
  return (
    <div className="relative bg-[#1f2535]/10 w-full">
    <div
      className="relative bg-cover bg-center h-screen w-full bg-no-repeat"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`, // Здесь movie.backdrop_path, если ты работаешь с одиночным объектом movie
      }}
    >
      <div className="absolute bottom-[-120] w-full h-full bg-gradient-to-t from-[#1f2535]/40 via-[#1f2535]/100 to-transform"></div>
    </div>
  
    {/* Контент поверх фона */}
    <div className="absolute top-0 w-full bg-cover bg-center bg-gradient-to-b from-[#1f2535]/90 to-[#1f2535]/100 ">
      <Header />
      <DetailMain
        movie={movie}
        credits={combinedCredits.cast}
        postersPoster={images.posters}
        postersBackdrop={images.backdrops}
        recommendations={rec.results}
        similarMovies={similarMovies.results}
        genresMap={genresMap}
        officialTrailer={official}
      />
      <Footer />
    </div>
  </div>
  
  );
}
export default MovieDetail;