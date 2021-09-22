const SearchBar = ({ setSearchQuery }) => {
  const HandleChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div>
      <input onChange={HandleChange} />
      {/* <button> Search </button> */}
    </div>
  );
};

export default SearchBar;
