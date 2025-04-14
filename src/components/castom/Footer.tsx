import {
    FaVk,
    FaInstagram,
    FaFacebookF,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";
export default function Footer() {
    return (
        <footer className="text-white py-12 px-4">
            <div className="max-w-300 mx-auto">
                <div className=" rounded-lg px-6 py-10 text-center relative overflow-hidden bg-[#1D3AA0E5]">
                    <div className="absolute bg-[#1D3AA0E5] inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url('/fon.png')` }} />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Подпишитесь на E-mail рассылку</h2>
                        <p className="text-sm md:text-base text-gray-300 mb-6 max-w-xl mx-auto">
                            Если хотите быть в курсе последних новостей и новинок кино – заполните форму ниже и оформите бесплатную E-mail рассылку!
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-xl mx-auto mb-3">
                            <input
                                type="email"
                                placeholder="Введите свой E-mail адрес"
                                className="w-full sm:w-auto flex-1 px-4 py-2 rounded-md text-black bg-white"
                            />
                            <button className="bg-[#F2F60F] text-black font-medium px-5 py-2 rounded-md hover:bg-yellow-400 transition">
                                Подписаться
                            </button>
                        </div>
                        <div className="text-xs text-gray-400">
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="mr-2 accent-[#F2F60F]" defaultChecked />
                                Соглашаюсь на условия&nbsp;
                                <a href="#" className="underline hover:text-white">политики конфиденциальности</a>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-6 text-[20px] text-gray-400">
                    <a href="#" className="hover:text-white"><FaVk/></a>
                    <a href="#" className="hover:text-white"><FaInstagram/></a>
                    <a href="#" className="hover:text-white"><FaFacebookF/></a>
                    <a href="#" className="hover:text-white"><FaTwitter/></a>
                    <a href="#" className="hover:text-white"><FaYoutube/></a>
                </div>
                <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                    <a href="#" className="hover:text-white">Афиша</a>
                    <a href="#" className="hover:text-white">Новости</a>
                    <a href="#" className="hover:text-white">Персоны</a>
                    <a href="#" className="hover:text-white">Рейтинги</a>
                    <a href="#" className="hover:text-white">Рецензии</a>
                    <a href="#" className="hover:text-white">Каталог фильмов</a>
                </div>

                <div className="mt-6 flex justify-center gap-5 text-white text-lg">
                    <a href="#"><i className="fab fa-vk" /></a>
                    <a href="#"><i className="fab fa-facebook" /></a>
                    <a href="#"><i className="fab fa-twitter" /></a>
                    <a href="#"><i className="fab fa-telegram" /></a>
                    <a href="#"><i className="fab fa-youtube" /></a>
                </div>

                <div className="mt-6 text-center text-gray-500 text-xs">
                    2020 © Kinoarea. Все права защищены<br /><br /><br />
                    <a href="#" className="underline hover:text-white">Политика конфиденциальности</a>
                </div>
            </div>
        </footer>

    )
}