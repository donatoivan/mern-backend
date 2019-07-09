const Event = require('../models/Event');

const addNewEvent = async(req, res) => {
  try {
    const { name, description, image, date, time , price, venue, past } = req.body

    const newEvent = await Event.create({ name, description, image, date, time , price, venue, past })
  } catch (error) {
    
  }
}
