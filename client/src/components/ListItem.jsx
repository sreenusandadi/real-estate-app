import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function ListItem({ listItem }) {
  return (
    <Link
      to={`/view-listing/${listItem._id}`}
      className="flex flex-col gap-4 w-full mx-auto border rounded-lg p-3 shadow-lg h-[450px]"
    >
      <img
        className="w-full h-[200px] rounded-lg hover:scale-105 transition duration-300"
        src={listItem.imageUrls[0]}
        alt={listItem.name}
      />
      <div className="text-2xl font-semibold truncate hover:underline">
        {listItem.name}
      </div>
      <p className="flex items-center gap-2">
        <FaLocationDot className="text-green-700" />{" "}
        <span className="truncate">{listItem.address}</span>
      </p>
      <div className="line-clamp-2">
        <span className="font-semibold">Description - </span>
        {listItem.description}
      </div>
      <p>
        ${listItem.regularPrice}
        <span> / {listItem.type === "rent" && "month"}</span>
      </p>
      <p className="text-green-700">
        <span>{listItem.bedRooms} Beds </span>
        <span>{listItem.bathRooms} Baths</span>
      </p>
    </Link>
  );
}
