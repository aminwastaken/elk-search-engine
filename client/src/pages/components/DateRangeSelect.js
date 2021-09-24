const DateRangeSelect = ({
  dateRange,
  setDateRange,
  dateRangeStart,
  dateRangeEnd,
  setDateRangeStart,
  setDateRangeEnd,
}) => {
  return (
    <div className="mt-4">
      <input
        className="border border-black mx-2 p-1"
        value={dateRangeStart}
        type="date"
        onChange={(event) => {
          setDateRangeStart(event.target.value);
        }}
      />
      <input
        className="border border-black mx-2 p-1"
        value={dateRangeEnd}
        type="date"
        onChange={(event) => {
          setDateRangeEnd(event.target.value);
        }}
      />
      <input
        className="border border-black mx-2 p-1"
        type="checkbox"
        checked={dateRange}
        onChange={() => {
          setDateRange(!dateRange);
        }}
      />{" "}
      filter date
    </div>
  );
};

export default DateRangeSelect;
