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
            <div className="py-4 w-250">
                <NowPlaying />
                <NewTrailers />
                <Popular />
                <PopularPeople />
                <LatestNews />
                <UpcomingMovies />
                <BoxOffice />
                <Footer />
            </div>
        </div>
    );
}
