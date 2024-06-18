import { MovieListItem } from "./movieListItem/movieListItem.tsx";
import s from "./moviesList.module.scss";
import { Loader, Pagination } from "@mantine/core";
import { Icons } from "../../assets/icons/icons.tsx";
import { useMoviesFilter } from "../../utils/useMoviesFilter.tsx";
import { Filters } from "./filters/filters.tsx";

export const MoviesList = () => {
  const {
    activePage,
    setPage,
    isLoading,
    data,
    selectedGenre,
    rating,
    resetSelect,
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
        <Filters
          genre={genre}
          arrayYear={arrayYear()}
          rating={rating}
          resetSelect={resetSelect}
          selectedGenre={selectedGenre}
          selectGenre={selectGenre}
          selectYear={selectYear}
          selectRatingFrom={selectRatingFrom}
          selectRatingTo={selectRatingTo}
          resetFilter={resetFilter}
          isResetButtonActive={isResetButtonActive}
          iconSelect={iconSelect}
          sortArrayForSelect={sortArrayForSelect}
          sortBy={sortBy}
        />
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
