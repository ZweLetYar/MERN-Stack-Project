import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function Home() {
  const { data, deleteDocument } = useFetch(
    "http://localhost:8000/api/records"
  );
  const travelers = data?.data || [];
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-8 ">
      <h1 className="text-white font-bold text-2xl text-center bg-yellow-400 w-full py-3 rounded-lg">
        Travelers' Info
      </h1>

      <div className="w-full max-w-6xl flex justify-end">
        <button
          onClick={() => navigate("/create")}
          className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-full shadow"
        >
          Add Traveler
        </button>
      </div>

      <div className="w-full max-w-8xl flex flex-wrap  gap-5 justify-center">
        {travelers?.map((t) => (
          <div
            className="w-full sm:w-[45%] md:w-[30%] lg:w-[23%] bg-white p-4 rounded-xl shadow-md flex flex-col"
            key={t._id}
          >
            <ul className="space-y-2">
              <li className="bg-green-50 flex px-3 py-2 rounded">
                <span className="font-semibold w-1/3">Name</span>
                <span className="flex-1">: {t.traveler}</span>
              </li>
              <li className="bg-green-50 flex px-3 py-2 rounded">
                <span className="font-semibold w-1/3">Destination</span>
                <span className="flex-1">: {t.destination}</span>
              </li>
              <li className="bg-green-50 flex px-3 py-2 rounded">
                <span className="font-semibold w-1/3">Date</span>
                <span className="flex-1">: {t.date}</span>
              </li>
              <li className="bg-green-50 flex px-3 py-2 rounded">
                <span className="font-semibold w-1/3">Duration</span>
                <span className="flex-1">: {t.duration}</span>
              </li>
              <li className="bg-green-50 flex px-3 py-2 rounded">
                <span className="font-semibold w-1/3">Transport</span>
                <span className="flex-1">: {t.transport}</span>
              </li>
            </ul>
            <button
              className="bg-red-500 rounded-xl px-4 py-2 text-white mt-2 ml-auto cursor-pointer text-center"
              onClick={() => {
                deleteDocument(t._id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
