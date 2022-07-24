const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const uuid = require("../helpers/uuid");

router.get("/notes", (req, res) => {
  const notesData = fs.readFileSync(
    path.join(process.cwd(), "db/db.json"),
    "utf8"
  );
  const parsedData = JSON.parse(notesData);
  res.json(parsedData);
});

router.post("/api/notes", (req, res) => {
  console.log(`${req.method} request recieved to add to notes`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    const readNotes = fs.readFileSync(
      path.join(process.cwd(), "/db/db.json"),
      "utf8"
    );

    const parsedNotes = JSON.parse(readNotes);

    parsedNotes.push(newNote);

    fs.writeFileSync(
      path.join(process.cwd(), "db/db.json"),
      JSON.stringify(parsedNotes)
    );

    const response = {
      status: "Succcess",
      body: newNote,
    };
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in POST");
  }
});

// Bonus
// GET route for ID
router.get("/api/notes/:id", (req, res) => {
  const requestID = req.params.id;
  const readNotes = fs.readFileSync(
    path.join(process.cwd(), "db/db.json"),
    "utf8"
  );
  const parsedNotes = JSON.parse(readNotes);
  console.log("REQUESTED SINGLE NOTE ID IS:", requestID);

  if (requestID) {
    console.info(`${req.method} request received to get a single a review`);
    for (let i = 0; i < parsedNotes.length; i++) {
      const currentID = parsedNotes[i];
      if (currentID.id === requestID) {
        return res.json(currentID);
      }
    }
  }
  return res.json("No term found");
});

// DELETE Route for ID
router.delete("/api/notes/:id", (req, res) => {
  const deleteID = req.params.id;
  const readNotes = fs.readFileSync(
    path.join(process.cwd(), "db/db.json"),
    "utf8"
  );
  const parsedNotes = JSON.parse(readNotes);
  console.log("REQUESTED DELETE ID IS:", deleteID);

  if (deleteID) {
    console.info(`${req.method} request received to get a single a review`);
    for (let i = 0; i < parsedNotes.length; i++) {
      const currentID = parsedNotes[i];
      if (currentID.id === deleteID) {
        const indexID = parsedNotes.indexOf(currentID);
        parsedNotes.splice(indexID, 1);
        fs.writeFileSync(
          path.join(process.cwd(), "db/db.json"),
          JSON.stringify(parsedNotes)
        );
      }
    }
  }
  return res.json("Note Deleted");
});
module.exports = router;
