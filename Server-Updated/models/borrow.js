class Borrow {
  constructor(book_id, student_id, retainingdate, borroweddate) {
    this.book_id = book_id;
    this.student_id = student_id;
    this.retainingdate = retainingdate;
    this.borroweddate = borroweddate;
  }
}
module.exports = Borrow;
