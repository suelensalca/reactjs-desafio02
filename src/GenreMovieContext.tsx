import { createContext, useEffect, useState, ReactNode } from 'react';
import { api } from './services/api';

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}
  
interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreProviderProps {
  children: ReactNode;
}

interface GenreMovieContextData {
  genres: GenreResponseProps[];
  selectedGenre: GenreResponseProps;
  movies: MovieProps[];
  setSelectedGenreId: (id: number) => void;
}

export const GenreMovieContext = createContext<GenreMovieContextData>(
  {} as GenreMovieContextData
  );

export function GenreMovieProvider({ children }: GenreProviderProps) {
  
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <GenreMovieContext.Provider value={{ genres, selectedGenre, movies, setSelectedGenreId}}>
      {children}
    </GenreMovieContext.Provider>
  )
}

