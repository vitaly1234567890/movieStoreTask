import {Icons} from "../assets/icons/icons.tsx";
import {useState} from "react";
import {useGetGenresQuery, useGetMoviesQuery} from "../services/movie/movies.services.ts";

const rating = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const sortArrayForHook = ['original_title.asc', 'original_title.desc', 'popularity.asc', 'popularity.desc', 'revenue.asc', 'revenue.desc', 'primary_release_date.asc', 'primary_release_date.desc', 'title.asc', 'title.desc', 'vote_average.asc', 'vote_average.desc', 'vote_count.asc', 'vote_count.desc'];
const sortArrayForSelect = ['Original Title a-z', 'Original Title z-a', 'Least Popular', 'Most Popular', 'Least Revenue', 'Most Revenues', 'Release Date begin', 'Release Date latest', 'Title a-z', 'Title z-a', 'Least Rated', 'Most Rated', 'Least Voted', 'Most Voted'];

export const useMoviesFilter = () => {
    const [activePage, setPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [sortedBy, setSortedBy] = useState("popularity.desc");
    const [year, setYear] = useState(0);
    const [ratingFrom, setRatingFrom] = useState<number>(0);
    const [ratingTo, setRatingTo] = useState(10);
    const [resetSelect, setResetSelect] = useState(false);

    const { data: genre } = useGetGenresQuery({ language: 'en' });

    const { data, isLoading } = useGetMoviesQuery({
        sort_by: sortedBy,
        include_adult: false,
        page: activePage,
        primary_release_year: year,
        with_genres: selectedGenre,
        'vote_average.gte': ratingFrom,
        'vote_average.lte': ratingTo,
    });

    const selectGenre = (genreArr: string[]) => {
        const idGenre = genreArr.map(genreName => {
            const genreObj = genre?.genres.find(el => el.name === genreName);
            return genreObj ? String(genreObj.id) : null;
        }).filter(id => id !== null);
        setSelectedGenre(String(idGenre));
        setResetSelect(false);
        setPage(1);
    };

    const selectYear = (year: string) => {
        setYear(+year);
        setResetSelect(false);
        setPage(1);
    };

    const selectRatingFrom = (rating: string) => {
        setRatingFrom(+rating);
        setResetSelect(false);
        setPage(1);
    };

    const selectRatingTo = (rating: string) => {
        setRatingTo(+rating);
        setResetSelect(false);
        setPage(1);
    };

    const sortBy = (sort: string) => {
        const index = sortArrayForSelect.indexOf(sort);
        setSortedBy(sortArrayForHook[index]);
        setResetSelect(false);
        setPage(1);
    };

    const arrayYear = () => {
        const years = [];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        for (let year = currentYear; year >= 1900; year--) {
            years.push(String(year));
        }
        return years;
    };

    const resetFilter = () => {
        setPage(1);
        setSelectedGenre("");
        setSortedBy("popularity.desc");
        setYear(0);
        setRatingFrom(0);
        setRatingTo(10);
        setResetSelect(true);
    };

    const iconSelect = (opened: boolean) => {
        return opened ? <Icons width={'16'} height={'8'} viewBox={"0 0 16 8"} iconId={'arrowUp'} /> :
            <Icons width={'16'} height={'8'} viewBox={"0 0 16 8"} iconId={'arrowDown'} />;
    };

    const isResetButtonActive = activePage > 1 || selectedGenre || sortedBy !== "popularity.desc"
        || year || ratingFrom > 0 || ratingTo < 10;

    return {
        activePage,
        setPage,
        selectedGenre,
        rating,
        resetSelect,
        isLoading,
        data,
        genre,
        selectGenre,
        selectYear,
        selectRatingFrom,
        selectRatingTo,
        sortBy,
        arrayYear,
        resetFilter,
        iconSelect,
        isResetButtonActive,
        sortArrayForSelect
    };
};