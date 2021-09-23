const Pagination = ({ currentPage, setCurrentPage, pageCount }) => {
  return (
    <div>
      <button
        style={{ padding: 5 }}
        onClick={() => {
          currentPage > 0 && setCurrentPage(currentPage - 1);
        }}
      >
        {"<"}
      </button>
      <span style={{ margin: 20 }}>{currentPage + 1}</span>
      <button
        style={{ padding: 5 }}
        onClick={() => {
          currentPage < pageCount - 1 && setCurrentPage(currentPage + 1);
        }}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
