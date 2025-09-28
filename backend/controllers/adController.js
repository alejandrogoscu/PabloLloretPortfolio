import Ad from '../models/Ad.js';

// GET ALL ADS
export const getAds = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ads', error });
  }
};

// GET AD BY ID
export const getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ad', error });
  }
};

// CREATE NEW AD
export const createAd = async (req, res) => {
  try {
    const newAd = new Ad(req.body);
    const savedAd = await newAd.save();
    res.status(201).json(savedAd);
  } catch (error) {
    res.status(400).json({ message: 'Error creating ad', error });
  }
};

// UPDATE AD
export const updateAd = async (req, res) => {
  try {
    const updatedAd = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAd) return res.status(404).json({ message: 'Ad not found' });
    res.json(updatedAd);
  } catch (error) {
    res.status(400).json({ message: 'Error updating ad', error });
  }
};

// DELETE AD
export const deleteAd = async (req, res) => {
  try {
    const deletedAd = await Ad.findByIdAndDelete(req.params.id);
    if (!deletedAd) return res.status(404).json({ message: 'Ad not found' });
    res.json({ message: 'Ad deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ad', error });
  }
};
