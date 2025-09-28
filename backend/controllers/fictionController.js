import Fiction from '../models/Fiction.js';

// GET ALL
export const getFictions = async (req, res) => {
  try {
    const fictions = await Fiction.find();
    res.json(fictions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fiction projects', error });
  }
};

// GET FICTION BY ID
export const getFictionById = async (req, res) => {
  try {
    const fiction = await Fiction.findById(req.params.id);
    if (!fiction) return res.status(404).json({ message: 'Fiction project not found' });
    res.json(fiction);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fiction project', error });
  }
};

// CREATE FICTION
export const createFiction = async (req, res) => {
  try {
    const newFiction = new Fiction(req.body);
    const savedFiction = await newFiction.save();
    res.status(201).json(savedFiction);
  } catch (error) {
    res.status(400).json({ message: 'Error creating fiction project', error });
  }
};

// UPDATE FICTION
export const updateFiction = async (req, res) => {
  try {
    const updatedFiction = await Fiction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFiction) return res.status(404).json({ message: 'Fiction project not found' });
    res.json(updatedFiction);
  } catch (error) {
    res.status(400).json({ message: 'Error updating fiction project', error });
  }
};

// DELETE FICTION
export const deleteFiction = async (req, res) => {
  try {
    const deletedFiction = await Fiction.findByIdAndDelete(req.params.id);
    if (!deletedFiction) return res.status(404).json({ message: 'Fiction project not found' });
    res.json({ message: 'Fiction project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting fiction project', error });
  }
};
