const express = require("express");
const router = express.Router();
const db = require("../relational/database");
const Book = require("../models/book");
const Borrow = require("../models/borrow");
/**
 * GET
 * http://localhost:3000/students
 */
router.get("/", (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    res.render("library", {
      books: results
    });
  });
});

router.post("/ax/zz", (req, res) => {
  db.query(
    "UPDATE books SET Status =? WHERE Id=?",
    ["Avalable", req.body.Bid],
    (err, result) => {
      if (err) throw err;
    }
  );
  db.query(
    "DELETE FROM bookbrowing WHERE book_id=?",
    req.body.Bid,
    (err, result) => {
      if (err) throw err;
      res.redirect("/library");
    }
  );
});

router.get("/borrow/abs/all", (req, res) => {
  db.query("SELECT * FROM bookbrowing", (err, results) => {
    res.render("borrowedbooks", {
      Borrow: results
    });
  });
});
/**
 * GET
 * http://localhost:3000/library/new
 */
router.get("/new", (req, res) => {
  res.render("bookaddform");
});
// //http://localhost:3000/library/borrowing
// router.get("/hello", (req, res) => {
//   res.render("/bookaddform");
// });
/**
 * GET
 * http://localhost:3000/library/1
 */
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM books WHERE Id = ?",
    req.params.id,
    (err, results) => {
      if (err) throw err;
      res.render("bookprofile", {
        book: results[0]
      });
    }
  );
});

/**
 * POST
 * http://localhost:3000/library
 */
router.post("/", (req, res) => {
  // Init the library
  let book = new Book(
    req.body.Title,
    req.body.Description,
    req.body.Author,
    req.body.Publisher,
    req.body.Status
  );

  db.query("INSERT INTO books SET ?", book, (err, result) => {
    if (err) throw err;
    req.flash("success", "recode added");
    res.redirect("/library");
  });
});

/**
 * GET
 * http://localhost:3000/library/edit/1
 */
router.get("/edit/:id", (req, res) => {
  db.query(
    "SELECT * FROM books WHERE Id = ?",
    req.params.id,
    (err, results) => {
      if (err) throw err;
      res.render("bookeditform", {
        book: results[0]
      });
    }
  );
});

/**
 * POST
 * http://localhost:3000/library/edit
 */
router.post("/edit", (req, res) => {
  db.query(
    "UPDATE books SET Title=?, Description=?, Author=?, Publisher=?, Status=? WHERE Id=?",
    [
      req.body.Title,
      req.body.Description,
      req.body.Author,
      req.body.Publisher,
      req.body.Status,
      req.body.Id
    ],
    (err, results) => {
      if (err) throw err;
      res.redirect("/library");
    }
  );
});

/**
 * DELETE
 * http://localhost:3000/library/1
 */
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM books WHERE Id = ?", req.params.id, (err, results) => {
    if (err) throw err;
    res.json({ message: "book deleted" });
  });
});
//load borrowing book page
router.get("/borrow/book", (req, res) => {
  res.render("bookborrowing");
});
//add borrowing book
router.post("/abs/add", (req, res) => {
  var result = new Date();
  result.setDate(result.getDate() + 14);
  let borrow = new Borrow(req.body.Bid, req.body.Sid, new Date(), result);
  db.query("SELECT * FROM books WHERE Id=?", req.body.Bid, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      req.flash("error", "book not found ");
      res.render("bookborrowing");
      return;
    }
  });
  db.query(
    "UPDATE books  SET Status = ?  WHERE Id = ? ",
    ["Borrowed", req.body.Bid],
    (err, result) => {
      if (err) throw err;
    }
  );
  db.query("INSERT INTO bookbrowing SET ?", borrow, (err, result) => {
    if (err) throw err;
    req.flash("success", "recode added");
    res.redirect("/library");
  });
});
//check/${id} bookborrowing page
router.get("/check/:id", (req, res) => {
  db.query(
    "SELECT COUNT(student_id) AS Counter FROM bookbrowing WHERE student_id=? ",
    req.params.id,
    (err, results) => {
      if (err) throw err;
      console.log(results[0].Counter);
      res.json({ count: results[0].Counter });
    }
  );
});
//load bookborrowing page
router.get("/editbb/:Id", (req, res) => {
  res.render("bookborrowing", { bid: req.params.Id });
});
//load bookreturning page
router.get("/returing/page", (req, res) => {
  res.render("bookreturning");
});
//loading page notifications
router.get("/load/my", (req, res) => {
  console.log("called");
  date = new Date();
  db.query(
    "SELECT * FROM bookbrowing WHERE borroweddate < ?",
    formatDate(date),
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.json({ msg: result });
    }
  );
});
router.get("/borrowd/viwe/:id", (req, res) => {
  db.query(
    "SELECT * FROM books WHERE Id = ?",
    req.params.id,
    (err, results) => {
      if (err) throw err;
      res.render("bookprofile", {
        book: results[0]
      });
    }
  );
});
//data formating funtion
function formatDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let result = `${year}-${month}-${day}`;
  return result;
}

// Export the router
module.exports = router;
