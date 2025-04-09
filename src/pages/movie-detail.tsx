import DetailMain from "@/components/castom/DetailMain";
import Footer from "@/components/castom/Footer";
import Header from "@/components/castom/Header";
import { useEffect, useState } from "react";

export default function Details() {
  const [movie, setMovie] = useState<any>(null);
  useEffect(() => {
    const storedMovie = localStorage.getItem('selectedMovie');
    if (storedMovie) {
      const movieData = JSON.parse(storedMovie);
      setMovie(movieData.backdrop_path);
    }
  }, []);

  return (
    // <div>
    //   style={{
      //     backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie})`,
      //   }}>
      //     <div className="absolute top-0 left-0 w-full h-[250%] bg-[#1f2535]/90 bg-opacity-40"></div>
      /* <div className="absolute top-775 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-10"> */
       <div className="relative w-full bg-cover bg-center bg-[#1f2535]/90 ">
        <Header />
        <DetailMain />
        <Footer />
      </div>
  );
}