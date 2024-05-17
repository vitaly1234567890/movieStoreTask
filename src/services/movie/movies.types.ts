export type RootMovies = {
	page: number;
	results: Movies[];
	total_pages: number;
	total_results: number;
}
export type Movies = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export type QueryMovies = {
	include_adult?: boolean
	include_video?: boolean
	language?: string
	page?: number
	sort_by?: string
	with_genres?: string
	primary_release_year?: number
	without_genres?: string
	'vote_average.gte': number,
	'vote_average.lte': number,
}

export type RootGenres = {
	genres: Genres[];
}
export type Genres = {
	id: number;
	name: string;
}

export type BigMovies = {
	movie_id: number
	language: string
	append_to_response?: string
}

export type RootBigMovies = {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection?: null;
	budget: number;
	genres: RootObjectGenres[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: Companies[];
	production_countries: Countries[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: Languages[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
export type RootObjectGenres = {
	id: number;
	name: string;
}
export type Companies = {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}
export type Countries = {
	iso_3166_1: string;
	name: string;
}
export type Languages = {
	english_name: string;
	iso_639_1: string;
	name: string;
}