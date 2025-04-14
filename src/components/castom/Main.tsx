import NowPlaying from './NowPlaying';
import NewTrailers from './NewTrailers';
import Popular from './Popular';
import PopularPeople from './PopularPeople';
import LatestNews from './LatestNews';
import BoxOffice from './BoxOffice';
import UpcomingMovies from './UpcomingMovies';
import Footer from './Footer';

export default function MovieCategoryViewer() {
    return (
        <div className='flex justify-center'>
            <div className="py-4 w-full sm:w-1/2 md:w-1/1 lg:w-1/1 xl:w-300">
                <NowPlaying />
                <NewTrailers />
                <Popular />
                <PopularPeople />
                <LatestNews />
                <UpcomingMovies />
                <BoxOffice />
            </div>
        </div>
    );
}
