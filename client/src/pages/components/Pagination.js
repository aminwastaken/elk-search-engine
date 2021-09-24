const Pagination = ({ currentPage, setCurrentPage, pageCount }) => {
  return (
    <div>
      <button
        className="mx-1 text-blue-500 underline"
        onClick={() => {
          setCurrentPage(0);
        }}
      >
        Page 1
      </button>

      <button
      className="mx-2"
        onClick={() => {
          currentPage > 0 && setCurrentPage(currentPage - 1);
        }}
      >
        {"<"}
      </button>

      <span className="mx-2">{currentPage + 1}</span>

      <button
      className="mx-2"
        onClick={() => {
          currentPage < pageCount - 1 && setCurrentPage(currentPage + 1);
        }}
      >
        {">"}
      </button>

      <button
        className="mx-1 text-blue-500 underline"
        onClick={() => {
          setCurrentPage(pageCount - 1);
        }}
      >
        Page {pageCount}
      </button>
    </div>
  );
};

export default Pagination;
