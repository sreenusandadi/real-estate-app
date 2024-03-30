export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:border-b-0">
        <form className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <label className="font-semibold">Search Term:</label>
            <div>
              <input
                type="text"
                id="searchTerm"
                className="border p-2 rounded-lg"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="all" />
              <label htmlFor="all">Rent & Sale</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="rent" />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="sale" />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="offer" />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="parking" />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="furnished" />
              <label htmlFor="furnished">Furnished</label>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label className="font-semibold">Sort:</label>
            <select id="order" className="border p-2 rounded-lg">
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Old</option>
              <option>New</option>
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
