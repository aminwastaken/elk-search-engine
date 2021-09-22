import "../../media/css/movie.css";
import formatDate from "../../utils/formatDate";

const Movie = ({ title, poster, overview, releaseDate }) => {
  const formattedReleaseDate = new Date(0);
  formattedReleaseDate.setUTCSeconds(releaseDate);
  return (
    <div className="movie-container">
      <img src={poster} alt="movie poster" className="movie-poster" />
      <div className="movie-details">
        <h2 className="movie-title">{title}</h2>
        <p className="movie-overview">{overview}</p>
        <p className="movie-rdate">{formatDate(formattedReleaseDate)}</p>
      </div>
    </div>
  );
};

export default Movie;
