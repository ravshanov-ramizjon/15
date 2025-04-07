import Header from "@/components/castom/Header";
import MovieCategoryViewer from "@/components/castom/Main";
import { useEffect } from "react";

const token = process.env.NEXT_PUBLIC_TOKEN;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;


export default function Home() {
  useEffect(() => {
    if (token && API_KEY) {
      console.log("Token:", token); 
      console.log("API_KEY:", API_KEY); 
  
      if (token) {
        localStorage.setItem("token", token);
      } else {
        console.log("Token не найден");
      }
  
      if (API_KEY) {
        localStorage.setItem("API_KEY", API_KEY);
      } else {
        console.log("API_KEY не найден");
      }
    }
  }, [token, API_KEY]); 
  
  return (
    <div className="bg-[#1f2535] bg-center bg-cover" style={{ backgroundImage: "url('/A1.png')" }}>
      <Header />
      <MovieCategoryViewer />
    </div>
  );
}

