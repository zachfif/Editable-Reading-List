const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();


let ALL_BOOKS = [
  {
    id: uuidv4(),
    title: 'JavaScript For Dummies',
    start: new Date(2021, 10, 1),
    end: new Date(2021, 10, 5),
  }
];


router.get("/", (req, res) => {
  res.json(ALL_BOOKS);
});


router.get("/:id", (req, res) => {
  const { id } = req.params;

  const book = ALL_BOOKS.find((book) => book.id === id);

  if (!book) {
    res.sendStatus(404);
    return;
  }

  res.json(book);
});


router.post("/", (req, res) => {
  const { body } = req;
  const { title, start, end } = body;

  const newId = uuidv4();
  const newBook = {
    id: newId,
    title,
    start: new Date(start),
    end: new Date(end),
  };


  ALL_BOOKS.push(newBook);

  res.json(newBook);
});


router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const newListOfBooks = ALL_BOOKS.filter(
    (book) => book.id !== id
  );


  if (ALL_BOOKS.length === newListOfBooks.length) {
    res.sendStatus(404);
    return;
  }

  ALL_BOOKS = newListOfBooks;

  res.sendStatus(200);
});


router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { newTitle, newStart, newEnd } = req.body;

  const book = ALL_BOOKS.find((book) => book.id === id);

  if (!book) {
    res.sendStatus(404);
    return;
  }

  book.title    = newTitle;
  book.start    = newStart;
  book.end      = newEnd;

  res.sendStatus(200);
});

module.exports = router;