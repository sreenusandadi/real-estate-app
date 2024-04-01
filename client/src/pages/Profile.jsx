import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firbase";
import {
  UpdateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
  signInStart,
  signInSuccess,
  signoutUserFailure,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fielUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [userUpdate, setUserUpadte] = useState(false);
  const [listingError, setListingError] = useState("");
  const [listings, setListings] = useState([]);
  const imgRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadProgress(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const result = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await result.json();

      if (data.success == false) {
        dispatch(UpdateUserFailure(data));
        setUserUpadte(false);
        return;
      }
      dispatch(updateUserSuccess(data));
      setUserUpadte(true);
    } catch (error) {
      dispatch(UpdateUserFailure(error));
      setUserUpadte(false);
    }
  };

  const handledelete = async () => {
    try {
      dispatch(signInStart());
      const result = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await result.json();
      console.log(data);
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signInStart());
      const result = await fetch("/api/auth/signout");
      const data = await result.json();
      if (data.success === false) dispatch(signoutUserFailure(data));
      dispatch(signInSuccess());
    } catch (error) {
      dispatch(signoutUserFailure(error));
    }
  };

  const handleShowListing = async () => {
    try {
      const results = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await results.json();
      if (data.success === false) {
        setListingError(data.error);
      }
      setListings(data);
    } catch (error) {
      setListingError(error.message);
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const result = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await result.json();
      if (data.success == false) {
        setListingError(data.error);
        return;
      }
      setListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      setListingError(error.message);
    }
  };

  const hadleUpdate = (id) => {
    navigate(`/update-listing/${id}`);
  };

  const moveToListing = (id) => {
    navigate(`/view-listing/${id}`);
  };

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="font-semibold text-center my-4 text-3xl">Profile</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <input
          type="file"
          ref={imgRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          className="rounded-full w-16 h-16 object-cover self-center mt-2 cursor-pointer disabled:opacity-80"
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          onClick={() => imgRef.current.click()}
        />
        <p className="text-center">
          {fileUploadProgress > 0 && fileUploadProgress < 100 ? (
            <span className="text-slate-700">
              File uploading {fileUploadProgress}% is done...
            </span>
          ) : fielUploadError ? (
            <span className="text-red-500">
              File upload error (size should be lethan 2MB)
            </span>
          ) : fileUploadProgress === 100 ? (
            <span className="text-green-500">File Uplaoded Sussefully</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={changeHandler}
        />
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={changeHandler}
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={changeHandler}
        />
        <button className="p-3 bg-slate-700 rounded-lg uppercase text-white hover:opacity-95">
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          to="/create-listing"
          className="p-3 bg-green-700 rounded-lg uppercase text-white hover:opacity-95 text-center"
        >
          Create Listing
        </Link>
      </form>
      <div className="text-red-500 flex justify-between mt-2 cursor-pointer">
        <span onClick={handledelete}>Delete account</span>
        <span onClick={handleSignout}>Sign out</span>
      </div>
      <p>
        {error ? (
          <span className="text-red-500">{error}</span>
        ) : userUpdate ? (
          <span className="text-green-500">User Updated Successfully!</span>
        ) : (
          ""
        )}
      </p>
      <div className="text-center">
        <button
          className="text-green-700 my-4"
          type="button"
          onClick={handleShowListing}
        >
          Show Listings
        </button>
        {listingError && <p className="text-red-500">{listingError}</p>}
        {listings.length > 0 && (
          <div>
            <h1 className="text-2xl font-semibold my-4">Your Listings</h1>
            {listings.map((listing) => {
              return (
                <div
                  key={listing._id}
                  className="flex gap-4 border-2 rounded-lg my-4 p-4 items-center"
                >
                  <img
                    src={listing.imageUrls[0]}
                    alt="Listing Images"
                    className="w-16 object-contain"
                  />
                  <h2
                    className="me-auto text-lg font-semibold truncate hover:underline"
                    title={listing.name}
                    onClick={() => moveToListing(listing._id)}
                  >
                    {listing.name}
                  </h2>
                  <div className="flex flex-col gap-2">
                    <button
                      className="text-red-700"
                      type="button"
                      onClick={() => handleDeleteListing(listing._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="text-green-700"
                      onClick={() => hadleUpdate(listing._id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
