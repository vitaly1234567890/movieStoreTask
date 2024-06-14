import s from "./filters.module.scss";
import { CustomMultiSelect } from "../../ui/multiSelect/multiSelect.tsx";
import { CustomSelect } from "../../ui/select/select.tsx";
import { Button } from "../../ui/button/button.tsx";
import React from "react";
import { RootGenres } from "../../../services/movie/movies.types.ts";

type Props = {
  genre: RootGenres | undefined;
  arrayYear: string[];
  rating: string[];
  resetSelect: boolean;
  selectedGenre: string;
  selectGenre: (genreArr: string[]) => void;
  selectYear: (year: string) => void;
  selectRatingFrom: (rating: string) => void;
  selectRatingTo: (rating: string) => void;
  resetFilter: () => void;
  isResetButtonActive: string | number | boolean;
  iconSelect: (opened: boolean) => React.ReactElement;
  sortArrayForSelect: string[];
  sortBy: (sort: string) => void;
};

export const Filters = ({
  genre,
  arrayYear,
  rating,
  resetSelect,
  selectedGenre,
  selectGenre,
  selectYear,
  selectRatingFrom,
  selectRatingTo,
  resetFilter,
  isResetButtonActive,
  iconSelect,
  sortArrayForSelect,
  sortBy,
}: Props) => {
  const arrayGenre = genre && genre.genres.map((el) => String(el.name));

  return (
    <div>
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
          data={arrayYear}
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
    </div>
  );
};
