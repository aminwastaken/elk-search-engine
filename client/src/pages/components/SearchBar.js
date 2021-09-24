const SearchBar = ({ setSearchQuery }) => {
  const HandleChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="flex justify-center">
      <input onChange={HandleChange} className="py-1 border-2 border-black rounded w-1/2"/>
      {/* <button> Search </button> */}
    </div>
  );
};

export default SearchBar;
