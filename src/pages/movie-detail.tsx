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
      setMovie(movieData);
    }
  }, []);

  return (
    <div className="bg-[#1f2535] bg-center bg-cover" style={{ backgroundImage: "url('/A1.png')" }}>
      <Header />
      <DetailMain/>
      <Footer />
    </div>
  );
}