'use client';
import Header from "@/components/castom/Header";
import MovieCategoryViewer from "@/components/castom/Main";
import Footer from "@/components/castom/Footer";
import { useEffect, useState } from 'react';

export default function Home() {

  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1f2535]">
    <div
      className="fixed inset-0 z-0 bg-center bg-cover transition-transform duration-300"
      style={{
        backgroundImage: "url('/A1.png')",
        transform: `translateY(-${offsetY * 0.3}px)`, // плавный параллакс
      }}
    ></div>

    {/* Затемнение поверх фона */}
    <div className="fixed inset-0 z-10 " />

    {/* Контент со скроллом */}
    <div className="relative z-20 h-screen overflow-y-auto scroll-smooth">
      <Header />
      <MovieCategoryViewer />
      <Footer />
    </div>
  </div>
  );
}

