function getRequestedDate(days = 0, months = 0, operationDay = 0, operationMonth = 0) {
  const today = new Date();
  if (operationDay === "-") 
    today.setDate(today.getDate() - days);
  else today.setDate(today.getDate() + days);

  if (operationMonth === "-")
   today.setMonth((today.getMonth() + 1) - months);
  else today.setMonth((today.getMonth() +1 ) + months);

  let dd = today.getDate();
  let mm = today.getMonth();
  const y = today.getFullYear();

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;

  return `${y  }-${ mm  }-${ dd}`;
}

module.exports = {
  getRequestedDate
};
