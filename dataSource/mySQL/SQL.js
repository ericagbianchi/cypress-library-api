function getBook(id) {
  return `SELECT * from book where id = '${id}'`;
}
module.exports = { getBook };
