import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
    FaVk,
    FaInstagram,
    FaFacebookF,
    FaTwitter,
    FaSearch,
    FaBars,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const navItems = [
    "Афиша",
    "Медиа",
    "Фильмы",
    "Актеры",
    "Новости",
    "Подборки",
    "Категории",
];

export default function Header() {
    return (
        <header className="w-full text-white px-4 py-4 pb-10  ">
            <div className="flex justify-center items-center">
                <div className="max-w-300 w-full flex justify-between items-center sm:relative">
                    <div className="absolute right-5 top-3 sm:top-0 sm:left-75 lg:left-105 xl:static xl:left-auto xl:top-auto flex flex-col gap-2">
                        <div className="flex items-center text-xl font-bold">
                            <div>
                                <Link href={"/"} className="flex items-center">
                                    <Image
                                        src="/XMLID.svg"
                                        alt="Logo"
                                        width={40}
                                        height={40}
                                        className="mr-2"
                                    />
                                    <span className="text-white">Kino</span>
                                    <span className="text-blue-500">area</span>
                                </Link>
                            </div>
                        </div>
                        <div className="flex gap-5.5 text-gray-400 text-sm pl-2">
                            <a href="#"><FaVk className="hover:text-white transition" /></a>
                            <a href="#"><FaInstagram className="hover:text-white transition" /></a>
                            <a href="#"><FaFacebookF className="hover:text-white transition" /></a>
                            <a href="#"><FaTwitter className="hover:text-white transition" /></a>
                        </div>
                    </div>
                    <nav className="hidden sm:flex sm:absolute xl:static sm:top-21 sm:left-30 lg:left-65 gap-6 text-sm">
                        {navItems.map((item) => (
                            <Link key={item} href="#">
                                <span className="hover:text-blue-400 transition cursor-pointer">{item}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="absolute left-15 sm:static bg-white hover:bg-white/90 text-[#3657CB]">
                            <FaSearch size={14} />
                        </Button>

                        <Button className="hidden sm:block sm:absolute xl:static sm:top-2 sm:right-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg shadow-[#3657CB]">
                            Войти
                        </Button>

                        <div className="sm:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="p-0 text-[#3657CB] bg-white ">
                                        <FaBars/>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="top" className="bg-[#1b1e2b] text-white  p-5">
                                    <div className="flex flex-col gap-4">
                                        {navItems.map((item) => (
                                            <SheetClose asChild key={item}>
                                                <Link href="#" className="text-sm hover:text-blue-400 transition">
                                                    {item}
                                                </Link>
                                            </SheetClose>
                                        ))}
                                        <div className="flex gap-4 mt-4 text-gray-400">
                                            <a href="#"><FaVk /></a>
                                            <a href="#"><FaInstagram /></a>
                                            <a href="#"><FaFacebookF /></a>
                                            <a href="#"><FaTwitter /></a>
                                        </div>
                                        <SheetClose asChild>
                                            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white w-full">
                                                Войти
                                            </Button>
                                        </SheetClose>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>


            </div>
        </header>
    );
}
