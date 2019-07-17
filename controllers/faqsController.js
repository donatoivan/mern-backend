const Faq = require("../models/Faq");

// Create a Faq
const createNewFaq = async (req, res) => {
  try {
    const { question, answer } =  req.body;
    const newFaq = await Faq.create({ question, answer })
    return res.status(201).json(`Succesfully created faq ${newFaq}`);
  } catch (error) {
    console.log(error.message)
    return res.status(400).json(`Could not create new Faq ${error.message}`)
  }
};

// Get all Faqs
const getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    return res.status(200).json(faqs)
  } catch (error) {
    console.log(error.message)
    return res.status(400).json(`Could not get Faqs ${error.message}`)
  }
};

// Get details of one Faq
const getOneFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const oneFaq = await Faq.findOne({ _id: id});
    console.log(oneFaq._id);
    return res.status(200).json(oneFaq)
  } catch (error) {
    console.log(error.message)
    return res.status(404).json(`Could no find Faq ${error.message}`);
  }
}

// Update Faq details
const updateFaq = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    let faq = await Faq.updateOne({ _id: id}, payload);
    return res.status(200).json(`Successfully updated Faq`);
  } catch (error) {
    return res.status(400).json(`Could not update Faq ${error.message}`);
  }
}

// Delete a Faq
const deleteOneFaq = async (req, res) => {
  const { id } = req.params;
  try {
    let oneFaq = await Faq.findByIdAndRemove(
      {_id: id },
      { useFindAndModify: false }
    );
    if (!oneFaq) {
      return res.status(404).json('Cannot find Faq')
    } else {
      return res.status(200).json('Faq is successfully deleted');
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json(`There has been an error: ${error.message}`)
  }
}

module.export = {
  createNewFaq,
  getAllFaqs,
  getOneFaq,
  updateFaq,
  deleteOneFaq
}