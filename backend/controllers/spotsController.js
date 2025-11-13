import Spot from '../models/Spot.js';

// GET ALL SPOTS
export const getSpots = async (req, res) => {
  try {
    const spots = await Spot.find();
    res.json(spots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching spots', error });
  }
};

// GET AD BY ID
export const getSpotById = async (req, res) => {
  try {
    const spot = await Spot.findById(req.params.id);
    if (!spot) return res.status(404).json({ message: 'Spot not found' });
    res.json(spot);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching spot', error });
  }
};

// CREATE NEW AD
export const createSpot = async (req, res) => {
  try {
    const lastSpot = await Spot.findOne().sort({ order: -1 });
    const nextOrder = lastSpot?.order ? lastSpot.order + 1 : 1;
    const newSpot = new Spot({ ...req.body, order: nextOrder });
    const savedSpot = await newSpot.save();
    res.status(201).json(savedSpot);
  } catch (error) {
    res.status(400).json({ message: 'Error creating spot', error });
  }
};

// UPDATE AD
export const updateSpot = async (req, res) => {
  try {
    const updatedSpot = await Spot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSpot) return res.status(404).json({ message: 'Spot not found' });
    res.json(updatedSpot);
  } catch (error) {
    res.status(400).json({ message: 'Error updating spot', error });
  }
};

// DELETE AD
export const deleteSpot = async (req, res) => {
  try {
    const spotToDelete = await Spot.findById(req.params.id);
    if (!spotToDeleteToDelete) return res.status(404).json({ message: 'Not found' });

    await Spot.findByIdAndDelete(req.params.id);

    await Spot.updateMany({ order: { $gt: spotToDelete.order } }, { $inc: { order: -1 } });

    await res.json({ message: 'Spot deleted and order updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting spot', error });
  }
};
