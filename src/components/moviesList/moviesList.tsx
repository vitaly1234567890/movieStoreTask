import {MovieCardSmall} from "./movieCardSmall/movieCardSmall.tsx";
import {useGetGenresQuery, useGetMoviesQuery} from "../../services/movie/movies.services.ts";
import s from './movieList.module.scss'
import {useState} from "react";
import {Pagination} from "@mantine/core";
import {CustomSelect} from "../ui/select/select.tsx";
import {Button} from "../button/button.tsx";

export const rating = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

export const MoviesList = () => {
    const [activePage, setPage] = useState(1)
    const [selectedGenre, setSelectedGenre] = useState("")
    const [year,setYear] = useState(0)
    const [ratingFrom,setRatingFrom] = useState<number>(0)
    const [ratingTo,setRatingTo] = useState(10)
    const {data} = useGetMoviesQuery({
        include_adult: false,
        page: activePage,
        sort_by: 'popularity.desc',
        primary_release_year: year,
        with_genres: selectedGenre,
        'vote_average.gte': ratingFrom,
        'vote_average.lte': ratingTo,
    })
    const {data: genre} = useGetGenresQuery({language: 'en'})

    const arrayGenre = genre?.genres.map(el => el.name)
    const selectGenre = (genre: string) => {
        setSelectedGenre(genre)
    }

    const selectYear = (year: string) => {
        setYear(+year)
    }

    const selectRatingFrom = (rating: string) => {
        setRatingFrom(+rating)
    }

    const selectRatingTo = (rating: string) => {
        setRatingTo(+rating)
    }

    const arrayYear = ()=> {
        const years = [];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        for (let year = currentYear; year >= 1900; year--) {
            years.push(String(year));
        }
        return years
    }
    console.log(data)
    console.log(selectedGenre)

    return (
        <div className={s.root}>
            <div className={s.container}>
                <h2 className={s.title}>Movies</h2>
                <div className={s.filters}>
                    <CustomSelect label={'Genres'} placeholder={'Select genre'} data={arrayGenre} onChange={selectGenre} />
                    <CustomSelect label={'Release year'} placeholder={'Select release year'} data={arrayYear()} onChange={selectYear} />
                        <CustomSelect label={'Ratings'} placeholder={'From'} data={rating} onChange={selectRatingFrom} />
                        <CustomSelect label={' '} placeholder={'To'} data={rating} onChange={selectRatingTo} />
                    <Button children={'Reset filters'} variant={'text'}/>
                </div>
                <div className={s.movieCard}>
                    {data?.results.map(el => {
                        return (
                            <div key={el.id}>
                                <MovieCardSmall data={el} genre={genre}/>
                            </div>
                        )
                    })}
                </div>

            </div>
            <div className={s.paginator}>
                <Pagination value={activePage} onChange={setPage} total={data?.total_pages || 0}/>
            </div>
        </div>
    );
};
