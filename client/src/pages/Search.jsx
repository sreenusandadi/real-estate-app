import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermUrl = urlParams.get("searchTerm");
    const typeUrl = urlParams.get("type");
    const parkingUrl = urlParams.get("parking");
    const furnishedUrl = urlParams.get("furnished");
    const offerUrl = urlParams.get("offer");
    const sortUrl = urlParams.get("sort");
    const orderUrl = urlParams.get("order");
    if (
      searchTermUrl ||
      typeUrl ||
      parkingUrl ||
      furnishedUrl ||
      offerUrl ||
      sortUrl ||
      orderUrl
    ) {
      setSidebarData({
        searchTerm: searchTermUrl || "",
        type: typeUrl || "all",
        parking: parkingUrl === "true" ? true : false,
        furnished: furnishedUrl === "true" ? true : false,
        offer: offerUrl === "true" ? true : false,
        sort: sortUrl || "createdAt",
        order: orderUrl || "desc",
      });
    }

    const fetchListings = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        console.log(data);
        setListings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0];
      const order = e.target.value.split("_")[1];
      setSidebarData({ ...sidebarData, sort, order });
    }
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <label className="font-semibold text-nowrap">Search Term:</label>
            <div className="w-full">
              <input
                type="text"
                onChange={handleChange}
                id="searchTerm"
                className="border p-2 rounded-lg w-full"
                placeholder="Search..."
                value={sidebarData.searchTerm}
              />
            </div>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="all"
                onChange={handleChange}
                checked={sidebarData.type === "all"}
              />
              <label htmlFor="all">Rent & Sale</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="rent"
                onChange={handleChange}
                checked={sidebarData.type === "rent"}
              />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="sale"
                onChange={handleChange}
                checked={sidebarData.type === "sale"}
              />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="offer"
                checked={sidebarData.offer}
                onChange={handleChange}
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="parking"
                checked={sidebarData.parking}
                onChange={handleChange}
              />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="furnished"
                checked={sidebarData.furnished}
                onChange={handleChange}
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              className="border p-2 rounded-lg"
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 rounded-lg p-2 text-white uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="p-7">
        <p className="text-3xl font-semibold">Listing Results</p>
      </div>
    </div>
  );
}
