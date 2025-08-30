import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGreeting, getFrostings, getToppings } from "../apiClient";

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

  // Frostings query
  const {
    data: frostings,
    isLoading: frostingsLoading,
    isError: frostingsError,
  } = useQuery({
    queryKey: ["frostings"],
    queryFn: getFrostings,
  });

  const [randomFrosting, setRandomFrosting] = useState<string | null>(null);

const handleRandomFrosting = () => {
  if (frostings && frostings.length > 0) {
    const idx = Math.floor(Math.random() * frostings.length);
    setRandomFrosting(frostings[idx]);
  }
};

  // Toppings query
  const {
    data: toppings,
    isLoading: toppingsLoading,
    isError: toppingsError,
  } = useQuery({
    queryKey: ["toppings"],
    queryFn: getToppings,
  });

  const [randomTopping, setRandomTopping] = useState<string | null>(null);

  const handleRandomTopping = () => {
    if (toppings && toppings.length > 0) {
      const idx = Math.floor(Math.random() * toppings.length);
      setRandomTopping(toppings[idx]);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/storage/images/lard-lad-store.jpg')" }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-6">🍩 Welcome to Lard Lad Donuts Store</h1>

        {/* Greeting */}
        {isPending && <p className="text-gray-600">Loading greeting...</p>}
        {isError && <p className="text-red-600 font-semibold">Error retrieving the greeting.</p>}
        {greeting && <h2 className="text-xl font-semibold mb-4">{greeting}</h2>}

        {/* Counter */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <p className="text-lg">You’ve clicked {count} times</p>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl shadow"
          >
            Click
          </button>
        </div>

        {/* Frostings */}
        <h2 className="text-2xl font-bold mb-4">Frostings</h2>
        {frostingsLoading && <p>Loading frostings...</p>}
        {frostingsError && <p className="text-red-600">Error loading frostings 😢</p>}
        {frostings && (
          <>
            <button
              onClick={handleRandomFrosting}
              className="px-4 py-2 mb-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              Pick a Random Frosting
            </button>

            {randomFrosting && (
              <p className="p-2 bg-pink-100 rounded-xl shadow mb-4">
                {randomFrosting}
              </p>
            )}

            {/* <ul className="space-y-2">
              {frostings.map((frosting: string, idx: number) => (
                <li key={idx} className="p-2 bg-pink-100 rounded-xl shadow">
                  {frosting}
                </li>
              ))}
            </ul> */}
          </>
        )}
        {/* Toppings */}
        <h2 className="text-2xl font-bold mt-8 mb-4">Toppings</h2>
        {toppingsLoading && <p>Loading toppings...</p>}
        {toppingsError && <p className="text-red-600">Error loading toppings 😢</p>}
        {toppings && (
          <>
          <button onClick={handleRandomTopping}
            className="px-4 py-2 mb-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
            Pick a Random Frosting
          </button>
          
          {randomTopping && (
            <p className="p-2 bg-pink-100 rounded-xl shadow mb-4">
              {randomTopping}
            </p>
          )}
          
          {/* <ul className="space-y-2">
            {toppings.map((topping: string, idx: number) => (
              <li key={idx} className="p-2 bg-yellow-100 rounded-xl shadow">
                {topping}
              </li>
            ))}
          </ul> */}
        </>
        )}
      </div>
    </div>
  );
};

export default Home;
