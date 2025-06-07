import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState(
    "http://localhost:8000/api/records?sort[date]=-1&page=1"
  );

  useEffect(() => {
    setUrl(`http://localhost:8000/api/records?sort[date]=-1&page=${page}`);
  }, [page]);

  const { data, deleteDocument } = useFetch(url);

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
            <div className="ml-auto flex gap-2">
              <button
                className="bg-blue-500 rounded-xl w-20 py-2 text-white mt-2  cursor-pointer text-center"
                onClick={() => navigate(`/edit/${t._id}`)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 rounded-xl w-20 py-2 text-white mt-2  cursor-pointer text-center"
                onClick={() => {
                  deleteDocument(t._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-white font-bold underline ">Page:{page}</div>
      <div className="flex ">
        <button
          className=" text-white w-10 h-10 flex items-center justify-center cursor-pointer bg-blue-600 rounded-lg border border-white"
          onClick={() => {
            setPage(data?.links.prev);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </button>
        {Array.from(
          { length: Math.ceil(data?.meta.totalDocuments / data?.meta.limit) },
          (_, i) => (
            <button
              key={i}
              className=" text-white w-10 h-10 cursor-pointer bg-blue-600 rounded-full border border-white"
              onClick={() => {
                setPage(i + 1);
              }}
            >
              {i + 1}
            </button>
          )
        )}
        <button
          className=" text-white w-10 h-10 flex items-center justify-center cursor-pointer bg-blue-600 rounded-lg border border-white"
          onClick={() => {
            setPage(data?.links.next);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
