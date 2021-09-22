const formatDate = (date) => {
  return (
    date.getDay() + 1 + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};

export default formatDate;
