import s from "./ratedMovies.module.scss";
import { Icons } from "../../assets/icons/icons.tsx";
import { Button } from "../ui/button/button.tsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MovieListItem } from "../moviesList/movieListItem/movieListItem.tsx";
import { Pagination } from "@mantine/core";
import { useGetGenresQuery } from "../../services/movie/movies.services.ts";
import { RootState } from "../../services/store.tsx";
import React, { useEffect, useState } from "react";
import { InputWithButton } from "../ui/searchInput/searchInput.tsx";
import { Movies } from "../../services/movie/movies.types.ts";
import {Path} from "../../routes/pathRoute.tsx";

export const RatedMovies = () => {
  const [activePage, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: genre } = useGetGenresQuery({ language: "en" });
  const ratedMovies = useSelector(
    (state: RootState) => state.ratedMovies.ratedMovies,
  );
  const [filteredRatedMovies, setFilteredRatedMovies] =
    useState<Movies[]>(ratedMovies);
  const navigate = useNavigate();

  const itemsPerPage = 4;
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = filteredRatedMovies.slice(startIndex, endIndex);

  useEffect(() => {
    setFilteredRatedMovies(ratedMovies);
  }, [ratedMovies]);

  const onClickGoHome = () => {
    navigate(Path.Movies);
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleSearch = () => {
    const filteredMovies = ratedMovies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredRatedMovies(filteredMovies);
    setPage(1);
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={s.root}>
      {ratedMovies.length === 0 ? (
        <div className={s.noMovie}>
          <Icons
            width={"400"}
            height={"300"}
            viewBox={"0 0 400 300"}
            iconId={"ratedMovies"}
          />
          <p className={s.noMovieTitle}>You haven't rated any films yet</p>
          <Button children={"Find movies"} onClick={onClickGoHome} />
        </div>
      ) : (
        <div>
          <div className={s.titleInput}>
            <h2 className={s.title}>Rated movies</h2>
            <InputWithButton
              onSearch={handleSearch}
              value={search}
              onChange={onChangeSearch}
              onEnterPress={onEnterPress}
            />
          </div>
          <div className={s.movieCard}>
            {itemsToShow.map((el) => {
              return (
                <div key={el.id}>
                  <MovieListItem data={el} genre={genre} />
                </div>
              );
            })}
          </div>
          <div className={s.paginationWrapper}>
            <div className={s.paginator}>
              <Pagination
                color={"#9854F6"}
                value={activePage}
                onChange={setPage}
                total={
                  Math.ceil(filteredRatedMovies.length / itemsPerPage) || 0
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
