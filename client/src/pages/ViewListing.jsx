import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaBath,
  FaBed,
  FaChair,
  FaLocationDot,
  FaSquareParking,
} from "react-icons/fa6";
import { useSelector } from "react-redux";
import Contact from "./Contact";
import Slider from "../components/Slider";

export default function ViewListing() {
  const [listing, setListing] = useState(null);
  const [contact, setContact] = useState(false);

  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(`/api/listing/get/${params.listingId}`);
      const data = await res.json();
      setListing(data);
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <div>
      {listing && (
        <div>
          <Slider listing={listing} />
          <div className="max-w-4xl mx-auto p-4">
            <p className="text-4xl font-semibold my-4">
              {listing.name} - $
              {(listing.regularPrice - listing.offerPrice).toLocaleString(
                "en-US"
              )}
              {listing.type === "rent" && " / month"}
            </p>
            <div className="flex flex-col gap-4">
              <p className="flex items-center gap-2">
                <FaLocationDot className="text-lg text-green-500" />
                {listing.address}
              </p>
              <p className="flex items-center gap-2">
                <span className="bg-red-500 px-3 py-1 rounded-md text-center text-white">
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </span>
                {listing.offer && (
                  <span className="bg-green-500 px-3 py-1 rounded-md text-center text-white">
                    $ {listing.offerPrice} discount
                  </span>
                )}
              </p>
              <p>
                <span className="font-semibold">Description - </span>
                {listing.description}
              </p>
              <ul className="flex gap-4">
                <li className="flex items-center gap-2 text-green-500">
                  <FaBed className="text-lg" />
                  <span>
                    {listing.bedRooms} {listing.bedRooms > 1 ? "Beds" : "Bed"}
                  </span>
                </li>
                <li className="flex items-center gap-2 text-green-500">
                  <FaBath className="text-lg" />
                  <span>
                    {listing.bathRooms}
                    {listing.bathRooms > 1 ? "Baths" : "Bath"}
                  </span>
                </li>
                <li className="flex items-center gap-2 text-green-500">
                  <FaSquareParking className="text-lg" />
                  <span>{listing.parking ? "Parking" : "No parking"}</span>
                </li>
                <li className="flex items-center gap-2 text-green-500">
                  <FaChair className="text-lg" />
                  <span>
                    {listing.furnished ? "Furnished" : "Not furnished"}
                  </span>
                </li>
              </ul>
              {currentUser &&
              currentUser._id !== listing.userRef &&
              !contact ? (
                <button
                  onClick={() => {
                    setContact(true);
                  }}
                  className="bg-slate-700 text-white p-3 rounded-lg uppercase"
                >
                  Contact landlord
                </button>
              ) : (
                ""
              )}
              {contact && <Contact listing={listing} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
