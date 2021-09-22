import Genre from "./Genre";

const GenresList = ({ genres, selectedGenres, setSelectedGenres }) => {
  const handleClick = (clickedGenre) => {
    console.log(genre);
    const test = "";
    if (genres.includes(genre)) {
      setSelectedGenres(
        selectedGenres.filter((genre) => (genre === )
             
        )
      );
    }
  };
  return (
    <div>
      {genres.map((genre, index) => (
        <div onClick={(event) => handleClick(genre.key)}>
          <Genre name={genre.key} count={genre.doc_count} />
        </div>
      ))}
    </div>
  );
};

export default GenresList;
