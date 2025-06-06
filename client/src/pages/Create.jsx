import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function Create() {
  let { setPostData } = useFetch("http://localhost:8000/api/records", "POST");

  let [traveler, setTraveler] = useState("");
  let [destination, setDestionation] = useState("");
  let [date, setDate] = useState("");
  let [duration, setDuration] = useState("");
  let [transport, setTransport] = useState("");

  let navigate = useNavigate();

  let AddTraveler = (e) => {
    e.preventDefault();
    let travelerData = {
      traveler,
      destination,
      date,
      duration,
      transport,
    };
    setPostData(travelerData);
    setTraveler("");
    setDestionation("");
    setDate("");
    setDuration("");
    setTransport("");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={AddTraveler}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Add Traveler</h2>

        <input
          type="text"
          placeholder="Traveler Name"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setTraveler(e.target.value)}
          value={traveler}
        />

        <input
          type="text"
          placeholder="Destination"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setDestionation(e.target.value)}
          value={destination}
        />

        <input
          type="date"
          placeholder="Date"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />

        <input
          type="text"
          placeholder="Duration"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
        />

        <input
          type="text"
          placeholder="Transport Type"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setTransport(e.target.value)}
          value={transport}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
        >
          Add Traveler
        </button>
      </form>
    </div>
  );
}
