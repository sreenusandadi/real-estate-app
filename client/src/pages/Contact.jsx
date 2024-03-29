import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const res = await fetch(`/api/user/${listing?.userRef}`);
        const data = await res.json();
        setLandlord(data);
      };
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  }, [listing]);

  const changeMessage = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-4">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for <span className="font-semibold">{listing.name}</span>
          </p>
          <textarea
            name="message"
            id="message"
            className="w-full border rounded-lg p-3"
            value={message}
            onChange={changeMessage}
            placeholder="Please enter your message..."
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 p-3 text-white text-center rounded-lg uppercase hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
