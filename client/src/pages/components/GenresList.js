import Genre from "./Genre";

const GenresList = ({ genres, setGenres, updateQuery }) => {
  const handleClick = (selectedGenre) => {
    setGenres(
      genres.map((genre) => {
        return genre.key === selectedGenre
          ? {
              key: genre.key,
              doc_count: genre.doc_count,
              selected: !genre.selected,
            }
          : genre;
      })
    );
  };

  return (
    <div>
      {genres.map((genre, index) => (
        <div
          onClick={(event) => handleClick(genre.key)}
          style={genre.selected ? { backgroundColor: "green" } : {}}
          className="py-1"
        >
          <Genre name={genre.key} count={genre.doc_count} />
        </div>
      ))}
    </div>
  );
};

export default GenresList;
