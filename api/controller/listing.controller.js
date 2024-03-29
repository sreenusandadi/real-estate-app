import Listing from "../models/listin.model.js";
import handleError from "../utils/error.js";

export const createListing = async (req, res, next) => {
  console.log();
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  console.log(listing);
  if (!listing) {
    next(handleError(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    next(handleError(401, "You can delete your listing only"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing deleted successfully!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) next(handleError(404, "Listing not found!"));

  if (req.user.id !== listing.userRef)
    next(handleError(401, "You can update your listings only!"));

  try {
    await Listing.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json("Listing updated successfully");
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) next(handleError(404, "Listing not found"));

  // if (req.user.id !== listing.userRef)
  //   next(handleError(401, "You can access your listings only"));

  try {
    await Listing.findById(req.params.id);
    res.status(200).json(listing);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
