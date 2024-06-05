import {MovieListItem} from "./movieListItem/movieListItem.tsx";
import {useGetGenresQuery, useGetMoviesQuery} from "../../services/movie/movies.services.ts";
import s from './moviesList.module.scss'
import {useState} from "react";
import {Loader, Pagination} from "@mantine/core";
import {CustomSelect} from "../ui/select/select.tsx";
import {Button} from "../ui/button/button.tsx";
import {Icons} from "../../assets/icons/icons.tsx";
import {CustomMultiSelect} from "../ui/multiSelect/multiSelect.tsx";

const rating = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const sortArrayForHook = ['original_title.asc', 'original_title.desc', 'popularity.asc', 'popularity.desc',
    'revenue.asc', 'revenue.desc', 'primary_release_date.asc', 'primary_release_date.desc', 'title.asc', 'title.desc',
    'vote_average.asc', 'vote_average.desc', 'vote_count.asc', 'vote_count.desc']
const sortArrayForSelect = ['Original Title a-z', 'Original Title z-a', 'Least Popular', 'Most Popular',
    'Least Revenue', 'Most Revenues', 'Release Date begin', 'Release Date latest', 'Title a-z', 'Title z-a',
    'Least Rated', 'Most Rated', 'Least Voted', 'Most Voted']

export const MoviesList = () => {
    const [activePage, setPage] = useState(1)
    const [selectedGenre, setSelectedGenre] = useState("")
    const [sortedBy, setSortedBy] = useState("popularity.desc")
    const [year, setYear] = useState(0)
    const [ratingFrom, setRatingFrom] = useState<number>(0)
    const [ratingTo, setRatingTo] = useState(10)
    const [resetSelect, setResetSelect] = useState(false)

    const {data, isLoading} = useGetMoviesQuery({
        sort_by: sortedBy,
        include_adult: false,
        page: activePage,
        primary_release_year: year,
        with_genres: selectedGenre,
        'vote_average.gte': ratingFrom,
        'vote_average.lte': ratingTo,
    })
    const {data: genre} = useGetGenresQuery({language: 'en'})

    const arrayGenre = genre?.genres.map(el => String(el.name))
    const selectGenre = (genreArr: string[]) => {
        const idGenre = genreArr.map(genreName => {
            const genreObj = genre?.genres.find(el => el.name === genreName);
            return genreObj ? String(genreObj.id) : null;
        }).filter(id => id !== null);
            setSelectedGenre(String(idGenre));
        setResetSelect(false);
    };

    const selectYear = (year: string) => {
        setYear(+year)
        setResetSelect(false)
    }

    const selectRatingFrom = (rating: string) => {
        setRatingFrom(+rating)
        setResetSelect(false)
    }

    const selectRatingTo = (rating: string) => {
        setRatingTo(+rating)
        setResetSelect(false)
    }

    const sortBy = (sort: string) => {
        const index = sortArrayForSelect.indexOf(sort)
        setSortedBy(sortArrayForHook[index])
        setResetSelect(false)
    }

    const arrayYear = () => {
        const years = [];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        for (let year = currentYear; year >= 1900; year--) {
            years.push(String(year));
        }
        return years
    }

    const resetFilter = () => {
        setPage(1)
        setSelectedGenre("")
        setSortedBy("popularity.desc")
        setYear(0)
        setRatingFrom(0)
        setRatingTo(10)
        setResetSelect(true)
    }

    const iconSelect = (opened: boolean) => {
        return opened ? <Icons width={'16'} height={'8'} viewBox={"0 0 16 8"} iconId={'arrowUp'}/> :
            <Icons width={'16'} height={'8'} viewBox={"0 0 16 8"} iconId={'arrowDown'}/>
    }

    const isResetButtonActive = activePage > 1 || selectedGenre || sortedBy !== "popularity.desc"
        || year || ratingFrom > 0 || ratingTo < 10

    const movieResults = data?.results || [];

    if (isLoading) {
        return (
            <div className={s.loader}>
                <Loader color="blue" size="lg"/>;
            </div>
        )
    }

    return (
        <div className={s.container}>
            <div className={s.contentWrapper}>
                <h2 className={s.title}>Movies</h2>
                <div className={s.filters}>
                    <CustomMultiSelect size={'284px'} reset={resetSelect} label={'Genres'} placeholder={!selectedGenre ? 'Select genre' : ""}
                                  data={arrayGenre} onChange={selectGenre} iconSelect={iconSelect}/>
                    <CustomSelect size={'284px'} reset={resetSelect} label={'Release year'} iconSelect={iconSelect}
                                  placeholder={'Select release year'} data={arrayYear()} onChange={selectYear}/>
                    <CustomSelect size={'138px'} reset={resetSelect} label={'Ratings'} placeholder={'From'}
                                  data={rating} onChange={selectRatingFrom}/>
                    <CustomSelect size={'138px'} reset={resetSelect} label={' '} placeholder={'To'} data={rating}
                                  onChange={selectRatingTo}/>
                    <Button className={isResetButtonActive ? s.button + " " + s.buttonActive : s.button}
                            children={'Reset filters'} variant={'text'} onClick={resetFilter} disabled={!isResetButtonActive}/>
                </div>
                <div className={s.sort}>
                    <CustomSelect size={'284px'} reset={resetSelect} defaultValue={'Most Popular'} label={'Sort by'}
                                  placeholder={'Most Popular'} data={sortArrayForSelect} onChange={sortBy}
                                  iconSelect={iconSelect}/>
                </div>
                {movieResults.length === 0 ? <div className={s.noMovie}>
                        <Icons height={'253'} width={'311'} viewBox={"0 0 311 253"} iconId={'noMovie'}/>
                        <p className={s.noMovieTitle}>We don't have such movies, look for another one</p>
                    </div>
                    :
                    <div className={s.movieCard}>
                        {movieResults.map(el => {
                            return (
                                <div key={el.id}>
                                    <MovieListItem data={el} genre={genre}/>
                                </div>
                            )
                        })}
                        <div className={s.paginator}>
                            <Pagination
                                color={'#9854F6'}
                                value={activePage}
                                onChange={setPage}
                                total={data?.total_pages || 0}
                            />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};
