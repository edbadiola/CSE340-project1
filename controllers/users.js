const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// GET all contacts
const getAll = async (req, res) => {
  //#swagger.tags = ['Contacts']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .find();
    result.toArray().then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts);
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contacts", error });
  }
};

// GET single contact
const getSingle = async (req, res) => {
  //#swagger.tags = ['Contacts']
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .find({ _id: contactId });

    result.toArray().then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts[0]);
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving contact", error: err });
  }
};

// CREATE contact
const createContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({ message: "Contact created successfully" });
    } else {
      res.status(500).json({ message: "Failed to create contact" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating contact", error });
  }
};

// UPDATE contact
const updateContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Contact not found or not modified" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating contact", error });
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  try {
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
