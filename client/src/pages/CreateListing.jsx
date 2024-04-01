import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firbase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    type: "rent",
    bedRooms: 1,
    bathRooms: 1,
    regularPrice: 50,
    discountPrice: 50,
    offerPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    userRef: "",
    address: "",
  });
  const handleImageUpload = () => {
    if (files.length > 0 && files.length < 7) {
      setUploading(true);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(uploadImage(files[i]));
      }

      Promise.all(promises).then(
        (urls) => {
          setUploading(false);
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
        },
        (error) => {
          setUploading(false);
          console.log(error);
        }
      );
    } else {
      setUploadError("Please select min 1 to max 6");
    }
  };

  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      setUploadError("");
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(Math.round(progress));
        },
        (error) => {
          setUploadError(error.message);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  const handleChange = (e) => {
    setError("");
    if (e.target.type === "text" || e.target.type === "textarea") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
    if (e.target.type === "number") {
      setFormData({
        ...formData,
        [e.target.id]: Number(e.target.value),
      });
    }
    if (
      e.target.id === "offer" ||
      e.target.id === "furnished" ||
      e.target.id === "parking"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (e.target.id === "rent" || e.target.id === "sale") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUploadError("");
    if (formData.regularPrice < formData.discountPrice)
      return setError("Discount Price should not be more then regular price");
    try {
      setLoading(true);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      if (data.success === false) {
        {
          setLoading(false);
          setError(data.message);
          return;
        }
      }
      setLoading(false);
      navigate("/profile");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const deleteImg = (i) => {
    const filteredImages = formData.imageUrls.filter((img, inx) => {
      return inx !== i;
    });
    setFormData({
      ...formData,
      imageUrls: filteredImages,
    });
  };

  return (
    <main className="max-w-4xl p-4 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-4">
        Create Listing
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <input
            required
            type="text"
            placeholder="Name"
            className="border rounded-lg p-3"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          <textarea
            placeholder="Description"
            className="border rounded-lg p-3"
            id="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <input
            required
            type="text"
            placeholder="Address"
            className="border rounded-lg p-3"
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                checked={formData.type === "sale"}
                onChange={handleChange}
              />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                checked={formData.type === "rent"}
                onChange={handleChange}
              />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                value={formData.furnished}
                onChange={handleChange}
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                value={formData.parking}
                onChange={handleChange}
              />
              <label htmlFor="parking">Parking spot</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                value={formData.offer}
                onChange={handleChange}
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-4 items-center">
              <input
                required
                type="number"
                min={1}
                max={10}
                id="bedRooms"
                className="border p-3 border-gray-300 rounded"
                value={formData.bedRooms}
                onChange={handleChange}
              />
              <p>Bed Rooms</p>
            </div>
            <div className="flex gap-4 items-center">
              <input
                required
                type="number"
                min={1}
                max={10}
                id="bathRooms"
                className="border p-3 border-gray-300 rounded"
                value={formData.bathRooms}
                onChange={handleChange}
              />
              <p>Rest Rooms</p>
            </div>
            <div className="flex gap-4 items-center">
              <input
                required
                type="number"
                id="regularPrice"
                className="border p-3 border-gray-300 rounded"
                value={formData.regularPrice}
                onChange={handleChange}
              />
              <div>
                <p>Regular Price</p>
                <span className="text-gray-500 text-center">($ / month)</span>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <input
                required
                type="number"
                id="discountPrice"
                className="border p-3 border-gray-300 rounded"
                value={formData.discountPrice}
                onChange={handleChange}
              />
              <div>
                <p>Discounted Price</p>
                <span className="text-gray-500 text-center">($ / month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex gap-4 items-center">
                <input
                  type="number"
                  id="offerPrice"
                  className="border p-3 border-gray-300 rounded"
                  value={formData.offerPrice}
                  onChange={handleChange}
                />
                <div>
                  <p>Offer Price</p>
                  <span className="text-gray-500 text-center">($ / month)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-500">
              The first images will be the cover (max 6)
            </span>
          </p>
          <div className="flex justify-between gap-3">
            <input
              required
              className="border p-3 rounded border-gray-300 flex-1"
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              className="text-green-500 border-green-500 rounded-lg border p-3"
              type="button"
              onClick={handleImageUpload}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <div>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((img, i) => {
                return (
                  <div key={i} className="flex justify-between px-2">
                    <img
                      className="w-[100px] h-[100px] object-fill py-2"
                      src={img}
                      alt={"Image" + i}
                    />
                    <button
                      type="button"
                      onClick={() => deleteImg(i)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
          </div>
          {uploadError && <p className="text-red-500">{uploadError}</p>}
          <button
            disabled={uploading || loading}
            className="p-3 rounded-lg bg-green-500 text-white uppercase disabled:opacity-80"
          >
            Create Listing
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>
    </main>
  );
}
