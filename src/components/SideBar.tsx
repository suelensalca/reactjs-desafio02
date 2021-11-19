import { useContext } from "react";
import { GenreMovieContext } from "../GenreMovieContext";
import { Button } from "./Button";


export function SideBar() {
  // Complete aqui
  const {genres, selectedGenre, setSelectedGenreId} = useContext(GenreMovieContext);
 
  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => setSelectedGenreId(genre.id)}
              selected={genre.id === selectedGenre.id}
            />
          ))}
        </div>
    </nav>
  )
}