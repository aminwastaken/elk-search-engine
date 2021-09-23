const DateRangeSelect = ({
  dateRange,
  setDateRange,
  dateRangeStart,
  dateRangeEnd,
  setDateRangeStart,
  setDateRangeEnd,
}) => {
  return (
    <div>
      <input
        value={dateRangeStart}
        type="date"
        onChange={(event) => {
          setDateRangeStart(event.target.value);
        }}
      />
      <input
        value={dateRangeEnd}
        type="date"
        onChange={(event) => {
          setDateRangeEnd(event.target.value);
        }}
      />
      <input
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
