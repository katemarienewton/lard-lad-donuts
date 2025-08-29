import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGreeting, getDonuts } from "../apiClient";


const Home = () => {
  const [count, setCount] = useState(0);

  // Greeting query
  const {
    data: greeting,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["greeting", count],
    queryFn: getGreeting,
  });

  // Donut menu query
  const {
    data: donuts,
    isLoading: donutsLoading,
    isError: donutsError,
  } = useQuery({
    queryKey: ["donuts"],
    queryFn: getDonuts,
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('../storage/images/lard-lad-store.jpg')" }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-6">🍩 Welcome to Lard Lad Donuts Store</h1>

        {isPending && <p className="text-gray-600">Loading greeting...</p>}
        {isError && (
          <p className="text-red-600 font-semibold">
            Error retrieving the greeting.
          </p>
        )}
        {greeting && <h2 className="text-xl font-semibold mb-4">{greeting}</h2>}

        <div className="flex flex-col items-center gap-4 mb-8">
          <p className="text-lg">You’ve clicked {count} times</p>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl shadow"
          >
            Click
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4">Our Donuts</h2>
        {donutsLoading && <p>Loading donuts...</p>}
        {donutsError && (
          <p className="text-red-600 font-semibold">
            Error loading donuts 😢
          </p>
        )}
        {donuts && (
          <ul className="space-y-4">
            {donuts.map((donut: any) => (
              <li
                key={donut.id}
                className="p-4 bg-pink-100 rounded-xl shadow text-left"
              >
                <h3 className="font-semibold">{donut.name}</h3>
                <p>{donut.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
