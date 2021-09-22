const formatDate = (date) => {
  return date.getDay() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
};

export default formatDate;
