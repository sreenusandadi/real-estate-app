import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";
import ListItem from "../components/ListItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("offer", true);
      urlParams.set("limit", 4);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setOfferListings(data);
      fetchRentListings("rent");
      fetchRentListings("sale");
    };
    fetchOfferListings();
  }, []);

  const fetchRentListings = async (serachWith) => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("type", serachWith);
    urlParams.set("limit", 4);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    serachWith === "rent" ? setRentListings(data) : setSaleListings(data);
  };
  return (
    <div>
      <div className="max-w-5xl mx-auto p-6 flex flex-col gap-5">
        <p className="text-6xl font-semibold text-slate-700">
          Find your next <span className="text-slate-500">perfect</span> <br />
          place with ease
        </p>
        <p className="text-gray-500">
          Sandadi Estate will help you find your home fast, easy and
          comfortable.
          <br /> Our expert support are always available.
        </p>
        <Link
          to="/search"
          className="text-blue-700 font-semibold hover:underline"
        >
          Let&apos;s start now...
        </Link>
      </div>
      {offerListings.length > 0 && <Slider listing={offerListings[0]} />}
      {offerListings.length > 0 && (
        <div
          className={`max-w-5xl mx-auto ${
            rentListings.length > 0 ? "pt-10" : "py-10"
          }`}
        >
          <p className="font-semibold text-xl">Recent Offers</p>
          <Link
            to="/search?offer=true"
            className="text-blue-700 hover:underline text-sm"
          >
            Show more offers
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {offerListings.map((listing) => {
              return <ListItem key={listing._id} listItem={listing} />;
            })}
          </div>
        </div>
      )}
      {rentListings.length > 0 && (
        <div
          className={`max-w-5xl mx-auto ${
            saleListings.length > 0 ? "pt-10" : "py-10"
          }`}
        >
          <p className="font-semibold text-xl">Recent places for rent</p>
          <Link
            to="/search?type=rent"
            className="text-blue-700 hover:underline text-sm"
          >
            Show more more places for rent
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {rentListings.map((listing) => {
              return <ListItem key={listing._id} listItem={listing} />;
            })}
          </div>
        </div>
      )}
      {saleListings.length > 0 && (
        <div className="max-w-5xl mx-auto py-10">
          <p className="font-semibold text-xl">Recent places for sale</p>
          <Link
            to="/search?type=sale"
            className="text-blue-700 hover:underline text-sm"
          >
            Show more more places for sale
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {saleListings.map((listing) => {
              return <ListItem key={listing._id} listItem={listing} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
