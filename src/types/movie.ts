interface MovieGenre {
  id: number;
  name: string;
}

interface MovieSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface MovieReleaseDate {
  iso_3166_1: string;
  release_dates: {
    certification: string;
    iso_639_1: string | null;
    note: string;
    release_date: string;
    type: number;
  }[];
}

interface MovieIndividualCredits {
  job: string;
  name: string;
}

interface MovieCredits {
  cast: MovieIndividualCredits[];
  crew: MovieIndividualCredits[];
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  origin_country: string[];
  overview: string;
  genres?: MovieGenre[];
  spoken_languages: MovieSpokenLanguage[];
  release_dates: {
    results: MovieReleaseDate[];
  };
  credits: MovieCredits;
  popularity: number;
  poster_path: string | null;
  status: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime: number;
  tagline?: string;
}

export interface MovieListingsResponse {
  page: number;
  total_pages: number;
  results: Movie[];
}

export interface DiscoverMoviesParams {
  sortBy: 'title.asc' | 'primary_release_date.desc' | 'vote_average.desc';
}
