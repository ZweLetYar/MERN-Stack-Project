import useFetch from "../hooks/useFetch";

export default function Home() {
  let { setPostData, data, loading, error } = useFetch(
    "http://localhost:8000/api/records"
  );

  const travelers = data?.data || [];

  return (
    <div className="flex flex-col item-center justify-center h-screen">
      <div className="flex items-center justify-center gap-5 w-full">
        {travelers?.map((t) => {
          return (
            <div className="w-100 h-70 bg-red-500" key={t._id}>
              <ul>
                <li>{t.traveler}</li>
                <li>{t.destination}</li>
                <li>{t.date}</li>
                <li>{t.duration}</li>
                <li>{t.transport}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
