import Listing from "../models/listin.model.js";

export const createListing = async (req, res, next) => {
  console.log();
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
