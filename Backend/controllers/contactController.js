import asyncHandler from "../middleware/asyncHandler.js";
import Contact from "../models/contactModel.js";


// @desc    Get all contacts
// @route   GET /api/contacts/all
// @access  Private/Admin
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  });

  //@desc fetches a contact
//@route GET/api/contacts/get/:id
//@access Public
const getContactById = asyncHandler( async (req, res) => {
  const contact = await Contact.findById(req.params.id)

  if(contact){
      return res.json(contact)
  } else {
  res.status(404).json({error: true, message: 'Resource not found!'});
}
}) 



//@desc add a new contact
//@route POST/api/contacts/add
//@access Public
  const addContact = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;
  
    const newContact = {
      name: name,
      email: email,
      message: message,
    };
  
  
    const contact = new Contact(newContact);
    const createdContact = await contact.save();
  
    res.status(201).json(createdContact);
  });

  


export { getContacts, getContactById, addContact }