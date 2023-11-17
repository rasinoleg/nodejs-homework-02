const Contact = require("../models/contacts");

async function getContacts(req, res, next) {
  console.log({ user: req.user });

  
  try {
    const contact = await Contact.find({ userId: req.user.id }).exec();
    if (contact === null) return res.status(404).send("Contact not Found:(*)");
    res.send(contact);
  } catch (err) {
    next(err);
  }
}

async function getContact(req, res, next) {
  const { id } = req.params;
  try {
    const contact = await Contact.find(id).exec();
    if (contact === null) {
      return res.status(404).send("Contact not found:(*)");
    }
    res.send(contact);
  } catch (err) {
    next(err);
  }
}

async function createContact(req, res, next) {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    userid: req.user.id,
  };

  try {
    const result = await Contact.create(contact);
    res.status(201).send(result);
  } catch (err) {
    next(err);
  }
}

async function updateContact(req, res, next) {
  const { id } = req.params;
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  try {
    const result = await Contact.findByIdAndUpdate(id, contact, { new: true });

    if (result === null) {
      return res.status(404).send("Contact not found");
    }

    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function deleteContact(req, res, next) {
  const { id } = req.params;

  try {
    const result = await Contact.findByIdAndDelete(id);

    if (result === null) {
      return res.status(404).send("Contact not found");
    }
    res.send({ id });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
