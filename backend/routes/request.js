const router = require("express").Router();
let Request = require("../models/request.model.js");
const mongoose = require("mongoose"); //for databasez
const Book = require('../models/books.model.js'); 

router.route("/").get((req, res) => {
    Request.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json("Error: " + err));
});


router.route("/add").post((req, res) => {
  // Log incoming request data
  console.log("Received request data:", req.body);

  // Destructure the incoming request data
  const {
    bookid,
    title,
    subject,
    author,
    user,
    status,
    copies,
    returnstatus,
    date,
    issue_date,
    due_date,
  } = req.body;

  // Look up the book by its `bookid`
  Book.findOne({ bookid: bookid }, (err, book) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching book data", error: err });
    }

    // If the book is not found or no copies are left
    if (!book || book.copies <= 0) {
      return res.status(400).json({ message: "No copies available for this book." });
    }

    // Decrease the available copies by 1
    book.copies -= 1;

    // Save the updated book record
    book.save()
      .then(() => {
        // Assuming you have a `Request` model, create a new request record
        const newRequest = new Request({
          bookid,
          title,
          subject,
          author,
          user,
          status,
          copies: book.copies,  // Updated copies
          returnstatus,
          date: new Date(date),
          issue_date: new Date(issue_date),
          due_date: new Date(due_date),
        });

        // Save the new request
        newRequest
          .save()
          .then(() => res.json({ message: "Request was successful" }))
          .catch((err) => res.status(400).json({ message: "Error creating request", error: err }));
      })
      .catch((err) => res.status(400).json({ message: "Error saving book data", error: err }));
  });
});


// router.route("/add").post((req, res) => {
//   console.log("Received request data:", req.body);
//   const {
//       bookid,
//       title,
//       subject,
//       author,
//       user,
//       status,
//       copies,
//       returnstatus,
//       date,
//       issue_date,
//       due_date,
//   } = req.body;

//   Request.findOne(
//       { bookid: Number(bookid), title, subject, author, user, status, returnstatus, date: Date.parse(date), issue_date: Date.parse(issue_date), due_date: Date.parse(due_date) },
//       (err, bookrecord) => {
//           if (bookrecord) {
//               console.log("This has already been saved");
//               return res.send({ message: "You have already requested this book", bookrecord });
//           }

//           // Create a new request if it doesn't exist
//           const newRequest = new Request({
//               bookid: Number(bookid),
//               title,
//               subject,
//               author,
//               user,
//               status,
//               copies,
//               returnstatus,
//               date: Date.parse(date),
//               issue_date: Date.parse(issue_date),
//               due_date: Date.parse(due_date),
//           });

//           newRequest
//               .save()
//               .then(() => res.send({ message: "Your request is Successful" }))
//               .catch(err => res.status(400).json("Error: " + err));
//       }
//   );
// });


router.route("/:id").get((req, res) => {
    Request.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  Request.findById(req.params.id)
      .then((request) => {
          if (!request) {
              return res.status(404).json("Request not found.");
          }
        const bookId = request.bookid;
// Find the associated book and increment its `copies` count
  Book.findOne({ bookid: bookId })
  .then((book) => {
    if (book) {
    book.copies += 1; // Increase the copies count by 1
     book.save()
                  .then(() => {
      // Delete the request after updating the book
        Request.findByIdAndDelete(req.params.id)
     .then(() => res.json("Request deleted and book copies updated."))
     .catch(err => res.status(400).json("Error deleting request: " + err));
          })
    .catch(err => res.status(400).json("Error updating book copies: " + err));
        } else {
       res.status(404).json("Book not found.");
         }
      })
      .catch(err => res.status(400).json("Error finding book: " + err));
      })
      .catch(err => res.status(400).json("Error finding request: " + err));
});


router.route("/update/:id").post((req, res) => {
  Request.findById(req.params.id)
  .then(request => {
      request.username = req.body.username;
      request.title = req.body.title;
      request.status = req.body.status;
      request.returnstatus = req.body.returnstatus;
      request.subject = req.body.subject;
      request.author = req.body.author;
       request.copies = req.body.copies;
      request.date = Date.parse(req.body.date);
      request.issue_date = Date.parse(req.body.issue_date);
      request.due_date = Date.parse(req.body.due_date);
      // if(request.status === "Accepted") {
      //   request.copies = req.body.copies-1;
      request
      .save()
      .then(() => res.json("request updated!"))
      .catch(err => res.status(400).json("Error: " + err));
      
  // }
})
  .catch(err => res.status(400).json("Error: " + err));
});

router.route("/user/:param").get((req, res) => {
  var param = req.param("param");
  console.log(param);

  var query = {};

  try {
    var id = mongoose.mongo.ObjectID(param);
    
    query = { id: id };
  } catch {
    // query = { title: new RegExp(param, "i") };
    query = { user: param };
  }

  mongoose.model("Request").find(query, function(err, obj) {
    res.send(obj);
    // console.log(obj);
  });
});


router.route("/title/:param").get((req, res) => {
  var param = req.param("param");
  console.log(param);

  var query = {};

  try {
    var id = mongoose.mongo.ObjectID(param);
    
    query = { id: id };
  } catch {
    // query = { title: new RegExp(param, "i") };
    query = { title: param };
  }

  mongoose.model("Request").find(query, function(err, obj) {
    res.send(obj);
    // console.log(obj);
  });
});


router.route("/user/:param").get((req, res) => {
  var param = req.param("param");
  // console.log(param2);

  var query = {};

  try {
    var id = mongoose.mongo.ObjectID(param);
    console.log(id)
    query = { id: id };
  } catch {
    // query = { title: new RegExp(param, "i") };
    query = { user: param };
  }

  mongoose.model("Request").find(query, function(err, obj) {
    res.send(obj);
    // console.log(obj);
  });
});

router.get('/test', (req, res) => {
  console.log('Test endpoint hit');
  res.send('Test endpoint working');
});


router.route("/user/:param/:param2").get((req, res) => {
  var param = req.param("param");
  var param2 = req.param("param2");
  // console.log(param2);

  var query = {};

  try {
    var id = mongoose.mongo.ObjectID(param,param2);
    console.log(id)
    query = { id: id };
  } catch {
    // query = { title: new RegExp(param, "i") };
    query = { user: param, status:param2 };
  }

  mongoose.model("Request").find(query, function(err, obj) {
    res.send(obj);
    // console.log(obj);
  });
});




module.exports = router;