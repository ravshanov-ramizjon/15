 const fetchGenres = async () => {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY; 
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const genresRes = await fetch(`${baseUrl}/genre/movie/list?api_key=${API_KEY}&language=ru-RU`);
    if (!genresRes.ok) {
      throw new Error('Не удалось получить жанры');
    }
    const genresData = await genresRes.json();
    const genresMap = genresData.genres.reduce((acc: { [key: number]: string }, genre: any) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
    return genresMap;
  };
export default fetchGenres;