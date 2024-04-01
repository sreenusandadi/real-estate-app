import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

export default function Slider({ listing }) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // handleIndex("increment");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [imgIndex]);

  const handleIndex = (number) => {
    if (number === "increment") {
      if (imgIndex === listing.imageUrls.length - 1) {
        setImgIndex(0);
        return;
      }
      setImgIndex(imgIndex + 1);
    }
    if (number === "decrement") {
      if (imgIndex === 0) {
        setImgIndex(listing.imageUrls.length - 1);
        return;
      }
      setImgIndex(imgIndex - 1);
    }
  };
  return (
    <div
      className="max-h-[300px] sm:max-h-[400px] view-listing-img"
      style={{
        background: `url(${listing.imageUrls[imgIndex]})`,
      }}
    >
      <div className="flex items-center justify-between h-[300px] sm:h-[400px]">
        <button
          onClick={() => handleIndex("decrement")}
          className="ps-3 text-6xl text-gray-400 hover:text-black"
        >
          <MdOutlineKeyboardArrowLeft />
        </button>
        <button
          onClick={() => handleIndex("increment")}
          className="right-0 pe-3 text-6xl text-gray-400 hover:text-black"
        >
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
}
