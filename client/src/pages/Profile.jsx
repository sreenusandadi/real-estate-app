import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="font-semibold text-center my-4 text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="rounded-full w-16 h-16 object-cover self-center mt-2 cursor-pointer"
          src={currentUser.avatar}
          alt="profile"
        />
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button className="p-3 bg-slate-700 rounded-lg uppercase text-white hover:opacity-95">
          Update
        </button>
      </form>
      <div className="text-red-500 flex justify-between mt-2 cursor-pointer">
        <span>Delete account</span>
        <span>Sign out</span>
      </div>
    </div>
  );
}
