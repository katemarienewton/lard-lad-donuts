import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFrostings, getToppings } from "../apiClient";

const Home = () => {
  const [step, setStep] = useState(1);

  // Frostings query
  const {
    data: frostings,
  } = useQuery({
    queryKey: ["frostings"],
    queryFn: getFrostings,
  });

  const [randomFrosting, setRandomFrosting] = useState<string | null>(null);

  // Toppings query
  const {
    data: toppings,
  } = useQuery({
    queryKey: ["toppings"],
    queryFn: getToppings,
  });

  const [randomTopping, setRandomTopping] = useState<string | null>(null);

const resetOrder = () => {
  setRandomFrosting(null);
  setRandomTopping(null);
  setStep(1)
}

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/storage/images/lard-lad-store.jpg')" }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-6" style={{fontFamily: "SimpsonsFont"}}>🍩 Welcome to Lard Lad Donuts Store</h1>

        {/*Talk with Chief Wigum*/}
        {step == 1 && (
          <div className="flex items-center gap-6">
            <img src='../../storage/images/chief-wigum.png' alt='Chief Wiggum' className='w-32 h-auto'></img>
            {/* Speech bubble */}
            <div className="bg-yellow-100 rounded-2xl p-4 shadow text-left">
              <p className='text-lg font-semibold'>
                Okay, so what do you want on your donut today?
              </p>
              <button
              onClick={() => setStep(2)} 
              className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
              Suprise Me
              </button>
            </div>
          </div>
        )}

        {/*Generate Donut*/}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Generate Your Donut</h2>

            {/* pick frosting */}
            <div className="flex flex-col items-center mb-4">
              <button
                onClick={() => {
                  if (frostings && frostings.length > 0) {
                    const f = frostings[Math.floor(Math.random() * frostings.length)];
                    setRandomFrosting(f);
                  }
                } }
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                Pick Frosting
              </button>
              {randomFrosting && (
                <p className="mt-2 px-2 py-1 bg-pink-100 rounded-xl shadow inline-block">
                  {randomFrosting}
                </p>
              )}
            </div>

            {/* pick topping */}
            <div className="flex flex-col items-center mb-4">
            <button
              onClick={() => {
                if (toppings && toppings.length > 0) {
                  const t = toppings[Math.floor(Math.random() * toppings.length)];
                  setRandomTopping(t);
                }
              }}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              Pick Topping
            </button>
            {randomTopping && (
              <p className="mt-2 px-2 py-1 bg-yellow-100 rounded-xl shadow inline-block">
                {randomTopping}
              </p>
            )}
          </div>

          {/*yum button*/}
          <button
            onClick={() => setStep(3)}
            className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
              Yum!
            </button>
          </div>
        )}

        {/*final order*/}
        {step === 3 && (
          <div className="px-6 py-8 bg-pink-500 text-white rounded-lg shadow">
            <h2 className="text-2xl font-bold text-center mb-4">
              Your order is ready! One fresh donut with {""} {randomFrosting || "invisible"} frosting and {""} {randomTopping || "air"} on top! 😊
            </h2>
            <button
            onClick={resetOrder} 
            className="mt-4 px-4 py-2 bg-white text-pink-600 font-bold rounded-lg hover:bg-gray-100 transition"
            >
              Order Again
            </button>
            </div>
          )}
          </div>
          </div>
        );
      };

export default Home;
