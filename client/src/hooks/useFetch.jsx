import { useEffect, useState } from "react";

function useFetch(url, method = "GET") {
  let [data, setData] = useState(null);
  let [postData, setPostData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  let deleteDocument = async (id) => {
    try {
      const res = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        window.location.reload(); // or better: re-fetch the data without reload
      } else {
        console.error("Failed to delete document");
      }
    } catch (err) {
      console.error("Error deleting document", err);
    }
  };

  let updateDocument = async (id, updatedData) => {
    try {
      const res = await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        const updated = await res.json();
        // Update the local data without reloading
        setData((prev) => ({
          ...prev,
          data: prev.data.map((item) =>
            item._id === id ? { ...item, ...updated } : item
          ),
        }));
      } else {
        console.error("Failed to patch document");
      }
    } catch (err) {
      console.error("Error patching document", err);
    }
  };

  useEffect(() => {
    let abortController = new AbortController();
    let signal = abortController.signal;

    let options = {
      signal,
      method,
    };
    setLoading(true);
    let fetchData = () => {
      fetch(url, options)
        .then((res) => {
          if (!res.ok) {
            throw Error("something went wrong");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setError(null);
          setLoading(false);
        })
        .catch((e) => {
          setError(e.message);
        });
    };
    if (method === "POST" && postData) {
      options = {
        ...options,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      };
      fetchData();
    }

    if (method === "GET") {
      fetchData();
    }

    //cleanup function
    // return () => {
    //   abortController.abort();
    // };
  }, [url, postData]);
  return { setPostData, deleteDocument, updateDocument, data, loading, error };
}

export default useFetch;
