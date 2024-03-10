export default function CreateListing() {
  return (
    <main className="max-w-4xl p-4 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-4">
        Create Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border rounded-lg p-3"
            id="name"
          />
          <textarea
            placeholder="Description"
            className="border rounded-lg p-3"
            id="description"
          ></textarea>
          <input
            type="text"
            placeholder="Address"
            className="border rounded-lg p-3"
            id="address"
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="bathRooms" className="w-5" />
              <span>Bath Rooms</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="bedRooms" className="w-5" />
              <span>Bed Rooms</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-4 items-center">
              <input
                type="number"
                min={1}
                max={10}
                id="bathRooms"
                className="border p-3 border-gray-300 rounded"
              />
              <p>Bath Rooms</p>
            </div>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                min={1}
                max={10}
                id="restRooms"
                className="border p-3 border-gray-300 rounded"
              />
              <p>Rest Rooms</p>
            </div>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                min={1}
                max={10}
                id="regularPrice"
                className="border p-3 border-gray-300 rounded"
              />
              <div>
                <p>Regular Price</p>
                <span className="text-gray-500 text-center">($ / month)</span>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                min={1}
                max={10}
                id="discountPrice"
                className="border p-3 border-gray-300 rounded"
              />
              <div>
                <p>Discount Price</p>
                <span className="text-gray-500 text-center">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:{" "}
            <span className="font-normal text-gray-500">
              we can Upload images (max 6)
            </span>
          </p>
          <div className="flex justify-between gap-3">
            <input
              className="border p-3 rounded border-gray-300 flex-1"
              type="file"
              id="images"
            />
            <button className="text-green-500 border-green-500 rounded-lg border p-3 uppercase">
              Upload
            </button>
          </div>
          <button className="p-3 rounded-lg bg-green-500 text-white uppercase">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
