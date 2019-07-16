// const Venue = require("../models/Venue");

// // Add a new Venue
// const addNewVenue = async (req, res) => {
//   try {
//     const { name, description, image, address } = req.body;
//     const newVenue = await Venue.create({ name, description, image, address });
//     return res.status(201).send(`Successfully create new Venue ${newVenue}`);
//   } catch (error) {
//     return res.status(400).send(`Could not create new Venue ${error.message}`);
//   }
// };

// // Get details of all Venues
// const getAllVenues = async (req, res) => {
//   try {
//     const venues = await Venue.find();
//     return res.status(200).send(venues);
//   } catch (error) {
//     return res.status(400).send(`Could not get Venues ${error.message}`);
//   }
// };

// // Get details of one Venue
// const getOneVenue = async (req, res) => {
//   const { id } = req.params;
//   const venue = await Venue.findOne({ _id: id });
//   console.log(venue._id);
//   return res.status(200).send(venue);
// };

// // Update details of a Venue
// const updateVenue = async (req, res) => {
//   const { id } = req.params;
//   const payload = req.body;

//   try {
//     await Venue.updateOne({ _id: id }, payload);
//     return res.status(200).send(`Successfully updated Venue ${id}`);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send(`Could not update Venue ${error.message}`);
//   }
// };

// // Delete a Venue
// const deleteOneVenue = async (req, res) => {
//   const { id } = req.params;
//   try {
//     let venue = await Venue.findOneAndRemove(
//       { _id: id },
//       { useFindAndModify: false }
//     );
//     if (!venue) {
//       return res.status(404).send(`Cannot find Venue ${venue.id}`);
//     } else {
//       return res.status(200).send(`Venue is successfully deleted`);
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send(`There has been an error: ${error}`);
//   }
// };

// module.exports = {
//   addNewVenue,
//   getAllVenues,
//   updateVenue,
//   getOneVenue,
//   deleteOneVenue
// };
