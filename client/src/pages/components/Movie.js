import "../../media/css/movie.css";
import formatDate from "../../utils/formatDate";

const Movie = ({ title, poster, overview, releaseDate, genres }) => {
  const formattedReleaseDate = new Date(0);
  formattedReleaseDate.setUTCSeconds(releaseDate);
  return (
    <div className="movie-container">
      <img src={poster} alt="movie poster" className="movie-poster" />
      <div className="mx-2 px-2 flex flex-col items-start">
        <p className="font-extrabold text-2xl">{title}</p>
        <p className="movie-overview">{overview}</p>
        <p className="movie-rdate">{formatDate(formattedReleaseDate)}</p>
        <div className="flex">
          <p className="underline mr-1">Genres:</p>
          <p>{genres?.map((genre) => (
            <span> {genre} </span>
          ))}</p>
        </div>
        {/* <p>
          Genre:
          {genres?.map((genre) => (
            <span> {genre} </span>
          ))}
        </p> */}
      </div>
    </div>
  );
};

export default Movie;
