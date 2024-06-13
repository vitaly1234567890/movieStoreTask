import s from "./movieDescription.module.scss";
import { RootBigMovies } from "../../../services/movie/movies.types.ts";
import ReactPlayer from "react-player";

type Props = {
  data: RootBigMovies;
};
export const MovieDescription = ({ data }: Props) => {
  return (
    <div className={s.root}>
      <div className={s.mainContent}>
        <p className={s.heading}>Trailer</p>
        {data.videos.results.length > 0 ? (
          <div className={s.video}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${data.videos.results[0].key}`}
              height={"281px"}
              width={"500px"}
              controls={true}
            />
          </div>
        ) : (
          ""
        )}
        <div className={s.line}></div>
        <p className={s.heading}>Description</p>
        <div className={s.description}>{data?.overview}</div>
        <div className={s.line}></div>
        <p className={s.heading}>Production</p>
        {data?.production_companies.map((el) => {
          return (
            <div key={el.id} className={s.production}>
              <img
                className={s.img}
                src={`https://image.tmdb.org/t/p/original/${el.logo_path}`}
                alt={""}
              />
              <span className={s.title}>{el.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
