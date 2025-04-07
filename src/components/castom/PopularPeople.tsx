import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type Person = {
  id: number;
  name: string;
  profile_path: string;
  popularity: number;
  known_for_department: string;
  birthday?: string;
};

export default function PopularPeople() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('За год');

  useEffect(() => {
    const API_KEY = localStorage.getItem('API_KEY');
    const fetchPeople = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=ru-RU&page=1`
        );
        const data = await response.json();
        setPeople(data.results);
      } catch (err) {
        setError('Ошибка при загрузке персон');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <div className="flex flex-col mb-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-3xl sm:text-5xl md:text-[65px] font-bold text-white">
          Популярные персоны
        </h2>
        <div className="flex gap-4">
          {['За год', 'За месяц', 'За неделю'].map((label) => (
            <div
              key={label}
              onClick={() => setActiveFilter(label)}
              className={`cursor-pointer transition-colors ${
                activeFilter === label ? 'text-white' : 'text-gray-500 hover:text-white'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-[320px] w-full sm:w-1/2 rounded-lg" />
          <Skeleton className="h-[320px] w-full sm:w-1/2 rounded-lg" />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-2/3">
            {people.slice(0, 2).map((person, index) => (
              <Card
                key={person.id}
                className="w-full sm:w-1/2 overflow-hidden border-none bg-muted"
              >
                <CardHeader className="p-0">
                  <div className="relative w-full h-80">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                      alt={person.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <CardContent className="p-4 absolute bottom-0 left-0">
                      <CardTitle className="text-[22px] md:text-[27px] text-white">
                        {person.name}
                      </CardTitle>
                      <p className="text-sm text-[#F2F60F]">{index + 35} лет</p>
                      <p className="text-sm text-[#F2F60F]">{person.birthday}</p>
                    </CardContent>
                    <div className="absolute top-2 left-2 text-[#F2F60F] text-xs md:text-sm font-bold px-2 py-1">
                      {index + 1}-е место
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="w-full lg:w-1/3 bg-muted rounded-lg p-4">
            {people.slice(2, 8).map((person, index) => (
              <div
                key={person.id}
                className="flex justify-between items-center py-2 border-b border-white/10 last:border-none"
              >
                <div>
                  <p className="text-white text-sm font-medium">{person.name}</p>
                  <p className="text-[#F2F60F] text-xs">{index + 35} лет</p>
                </div>
                <span className="text-[#F2F60F] text-sm font-semibold">
                  {index + 3}-е место
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
