import s from "./movieListItem.module.scss";
import { Movies, RootGenres } from "../../../services/movie/movies.types.ts";
import { Icons } from "../../../assets/icons/icons.tsx";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/store.tsx";
import { FormatNumber } from "../../../utils/formatNumber.tsx";
import { ModalWrapper } from "../../ui/modal/modalWrapper.tsx";

type MovieListItemProps = {
  data: Movies;
  genre?: RootGenres;
};

export const MovieListItem = ({ data, genre }: MovieListItemProps) => {
  const rating = useSelector(
    (state: RootState) => state.ratedMovies.movieRatings[data.id],
  );

  const genreArray = genre?.genres
    .filter((el) => data.genre_ids && data.genre_ids.includes(el.id))
    .map((el) => el.name)
    .join(", ");
  const releaseYear = data.release_date ? data.release_date.slice(0, 4) : "";
  const voteAverage = data.vote_average
    ? data.vote_average.toFixed(1)
    : "No vote";

  return (
    <div>
      <div className={s.root}>
        <NavLink to={`/movies/${data.id}`}>
          <div className={s.mainContent}>
            {data.poster_path ? (
              <img
                className={s.img}
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`}
                alt={""}
              />
            ) : (
              <div className={`${s.posterWrap} ${s.centered}`}>
                <Icons
                  iconId={"noPoster"}
                  width="57"
                  height="44"
                  viewBox="0 0 57 44"
                />
              </div>
            )}
            <div className={s.content}>
              <div>
                <div className={s.title}>{data.title}</div>
                <div className={s.release_date}>{releaseYear}</div>
                <div className={s.rating}>
                  <span>
                    <Icons
                      iconId={"star"}
                      width={"26"}
                      height={"25"}
                      viewBox={"0 0 26 25"}
                    />{" "}
                  </span>
                  <span className={s.ratingGrade}>{voteAverage} </span>
                  <span className={s.voteCount}>
                    {" "}
                    ({FormatNumber(data.vote_count)})
                  </span>
                </div>
              </div>
              <div>
                <span className={s.genre}>Genres</span> {genreArray}
              </div>
            </div>
            <ModalWrapper data={data} rating={rating} />
          </div>
        </NavLink>
      </div>
    </div>
  );
};
