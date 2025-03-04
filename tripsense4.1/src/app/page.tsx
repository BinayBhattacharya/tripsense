"use client"; // Ensure client-side rendering

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct useRouter import for the App Router
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaArrowRight } from 'react-icons/fa'; // For next button icons

export default function HotelPreferencesForm() {
  const [step, setStep] = useState(1);
  const router = useRouter(); // For navigation
  const [destination, setDestination] = useState('Darjeeling');
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [groupType, setGroupType] = useState('family');
  const [budget, setBudget] = useState(5000);
  const [preferences, setPreferences] = useState({
    touristPlaces: false,
    fourStar: false,
    threeStar: false,
    nearRailway: false,
    nearAirport: false,
    payByCash: false,
    noCancellation: false,
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = () => {
    const formData = {
      destination,
      checkInDate,
      checkOutDate,
      guests,
      groupType,
      budget,
      preferences,
    };
    console.log('Form Data:', JSON.stringify(formData, null, 2));
    
    // Navigate to the hotels page after submission
    router.push('/hotels'); // Use router.push for navigation in the App Router
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black via-gray-800 to-black p-5">
      
      {/* TripSense banner */}
      <div className="w-full max-w-lg bg-black text-white text-center py-3 rounded-lg mb-6 shadow-lg">
        <h1 className="text-3xl font-bold">TripSense</h1>
        <p className="text-lg italic">Feel Like a Local</p>
      </div>

      <div className="w-full max-w-lg bg-white shadow-lg p-8 rounded-lg transition-transform transform hover:scale-105">
        
        {/* Step 1: Destination */}
        {step === 1 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-orange-400">1) Select Your Destination</h2>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="Darjeeling">Darjeeling</option>
            </select>
            <button onClick={handleNextStep} className="mt-4 p-2 bg-orange-500 text-white rounded flex items-center justify-center">
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        )}

        {/* Step 2: Check-in and Check-out */}
        {step === 2 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-orange-400">2) Choose Check-in and Check-out Dates</h2>
            <div className="flex space-x-4">
              <div>
                <label className="text-gray-700">Check-in Date:</label>
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  showTimeSelect
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholderText="Select Check-in"
                />
              </div>
              <div>
                <label className="text-gray-700">Check-out Date:</label>
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  showTimeSelect
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholderText="Select Check-out"
                />
              </div>
            </div>
            <button onClick={handleNextStep} className="mt-4 p-2 bg-orange-500 text-white rounded flex items-center justify-center">
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        )}

        {/* Step 3: Number of Guests */}
        {step === 3 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-orange-400">3) Number of Guests</h2>
            <input
              type="number"
              min="1"
              className="w-full p-2 border border-gray-300 rounded"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
            <button onClick={handleNextStep} className="mt-4 p-2 bg-orange-500 text-white rounded flex items-center justify-center">
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        )}

        {/* Step 4: Type of Group */}
        {step === 4 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-orange-400">4) Type of Group</h2>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={groupType}
              onChange={(e) => setGroupType(e.target.value)}
            >
              <option value="family">Family</option>
              <option value="business">Business</option>
              <option value="friends">Friends</option>
              <option value="couple">Couple</option>
            </select>
            <button onClick={handleNextStep} className="mt-4 p-2 bg-orange-500 text-white rounded flex items-center justify-center">
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        )}

        {/* Step 5: Budget */}
        {step === 5 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-orange-400">5) Budget Per Night (in Rs.)</h2>
            <input
              type="range"
              min="500"
              max="20000"
              step="500"
              className="w-full"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            />
            <div className="text-right text-black">{`₹${budget}`}</div>
            <button onClick={handleNextStep} className="mt-4 p-2 bg-orange-500 text-white rounded flex items-center justify-center">
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        )}

        {/* Step 6: Other Preferences */}
        {step === 6 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-orange-400">6) Other Preferences</h2>
            <div className="space-y-2">
              {Object.keys(preferences).map((pref, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences[pref as keyof typeof preferences]}
                    onChange={() =>
                      setPreferences((prev) => ({
                        ...prev,
                        [pref]: !prev[pref as keyof typeof preferences],
                      }))
                    }
                    className="mr-2"
                  />
                  {pref.split(/(?=[A-Z])/).join(' ')} {/* Split camelCase to words */}
                </label>
              ))}
            </div>
            <button onClick={handleSubmit} className="mt-4 p-2 bg-green-500 text-white rounded">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );

}
