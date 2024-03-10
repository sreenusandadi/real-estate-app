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
  signInStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fielUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const imgRef = useRef(null);

  const dispatch = useDispatch();

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
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(UpdateUserFailure(error));
    }
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
      </form>
      <div className="text-red-500 flex justify-between mt-2 cursor-pointer">
        <span>Delete account</span>
        <span>Sign out</span>
      </div>
      <p>
        {error ? (
          <span className="text-red-500">{error}</span>
        ) : (
          <span className="text-green-500">User Updated Successfully!</span>
        )}
      </p>
    </div>
  );
}
