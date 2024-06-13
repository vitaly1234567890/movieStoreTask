import { MovieListItem } from "./movieListItem/movieListItem.tsx";
import s from "./moviesList.module.scss";
import { Loader, Pagination } from "@mantine/core";
import { CustomSelect } from "../ui/select/select.tsx";
import { Button } from "../ui/button/button.tsx";
import { Icons } from "../../assets/icons/icons.tsx";
import { CustomMultiSelect } from "../ui/multiSelect/multiSelect.tsx";
import { useMoviesFilter } from "../../utils/useMoviesFilter.tsx";

export const MoviesList = () => {
  const {
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
    sortArrayForSelect,
  } = useMoviesFilter();

  const arrayGenre = genre?.genres.map((el) => String(el.name));
  const movieResults = data?.results || [];

  if (isLoading) {
    return (
      <div className={s.loader}>
        <Loader color="blue" size="lg" />;
      </div>
    );
  }

  return (
    <div className={s.container}>
      <div className={s.contentWrapper}>
        <h2 className={s.title}>Movies</h2>
        <div className={s.filters}>
          <CustomMultiSelect
            size={"284px"}
            reset={resetSelect}
            label={"Genres"}
            placeholder={!selectedGenre ? "Select genre" : ""}
            data={arrayGenre}
            onChange={selectGenre}
            iconSelect={iconSelect}
          />
          <CustomSelect
            size={"284px"}
            reset={resetSelect}
            label={"Release year"}
            iconSelect={iconSelect}
            placeholder={"Select release year"}
            data={arrayYear()}
            onChange={selectYear}
          />
          <CustomSelect
            size={"138px"}
            reset={resetSelect}
            label={"Ratings"}
            placeholder={"From"}
            data={rating}
            onChange={selectRatingFrom}
          />
          <CustomSelect
            size={"138px"}
            reset={resetSelect}
            label={" "}
            placeholder={"To"}
            data={rating}
            onChange={selectRatingTo}
          />
          <Button
            className={
              isResetButtonActive ? s.button + " " + s.buttonActive : s.button
            }
            children={"Reset filters"}
            variant={"text"}
            onClick={resetFilter}
            disabled={!isResetButtonActive}
          />
        </div>
        <div className={s.sort}>
          <CustomSelect
            size={"284px"}
            reset={resetSelect}
            defaultValue={"Most Popular"}
            label={"Sort by"}
            placeholder={"Most Popular"}
            data={sortArrayForSelect}
            onChange={sortBy}
            iconSelect={iconSelect}
          />
        </div>
        {movieResults.length === 0 ? (
          <div className={s.noMovie}>
            <Icons
              height={"253"}
              width={"311"}
              viewBox={"0 0 311 253"}
              iconId={"noMovie"}
            />
            <p className={s.noMovieTitle}>
              We don't have such movies, look for another one
            </p>
          </div>
        ) : (
          <div className={s.movieCard}>
            {movieResults.map((el) => {
              return (
                <div key={el.id}>
                  <MovieListItem data={el} genre={genre} />
                </div>
              );
            })}
            <div className={s.paginator}>
              <Pagination
                color={"#9854F6"}
                value={activePage}
                onChange={setPage}
                total={data?.total_pages || 0}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
