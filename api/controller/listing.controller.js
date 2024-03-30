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

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = req.query.startIndex || 0;
    let offer = req.query.offer;
    if (offer === undefined || offer === false) offer = { $in: [false, true] };
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === false)
      furnished = { $in: [false, true] };
    let parking = req.query.parking;
    if (parking === undefined || parking === false)
      parking = { $in: [false, true] };
    let type = req.query.type;
    if (type === undefined || type === "all") type = { $in: ["sale", "rent"] };

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};