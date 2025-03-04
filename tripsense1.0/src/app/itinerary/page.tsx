

// "use client";

// import { useEffect, useState } from "react";
// import { Navbar } from "../components/Navbar";

// interface Activity {
//   activity: string;
//   "stop time": string;
//   "reach time": string;
//   spend: string;
//   rating: string;
// }

// interface Itinerary {
//   [day: string]: Activity[];
// }

// export default function Itinerary() {
//   const [formData, setFormData] = useState<any>({});
//   const [itinerary, setItinerary] = useState<Itinerary | null>(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // Replace with the appropriate URL to your API route
//         const response = await fetch('/api/gpt', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ formData }),
//         });

//         if (!response.ok) {
//           console.error('Error fetching itinerary:', await response.text());
//           return;
//         }

//         const data = await response.json();

//         console.log('GPT API response:', data);

//         if (data && data.choices && data.choices[0] && data.choices[0].message) {
//           try {
//             const jsonString = data.choices[0].message.content;
//             console.log('Raw JSON String:', jsonString);
            
//             if (jsonString.trim().startsWith('{') || jsonString.trim().startsWith('[')) {
//               const jsonObject: Itinerary = JSON.parse(jsonString);
//               console.log('Parsed JSON Object:', jsonObject);

//               setItinerary(jsonObject);
//             } else {
//               console.error('JSON string appears to be incomplete.');
//             }
//           } catch (error) {
//             console.error('Error parsing JSON:', error);
//           }
//         } else {
//           console.error('Expected data structure is missing.');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }

//     fetchData();
//   }, [formData]);

//   return (
//     <div>
//       <Navbar/>
//       <h1 className="text-[#774000] font-[700] text-[27px] pb-[25px] lg:text-[30px] ml-[30px] lg:ml-[120px] lg:mt-[60px] mt-[30px]">Here's your Itinerary! Drag & drop items to edit the plan.</h1>
//       {itinerary ? (
//         <div>
//           {Object.entries(itinerary).map(([day, activities]) => (
//             <div key={day}>
//               <h2 className="text-[#656565] bg-[#ededed] ml-[15px] mb-[15px] lg:ml-[120px] font-[600] w-[60px] rounded-[10px] p-[5px]">{day}</h2>
//               {activities.map((activity: Activity, index: number) => (
//                 <div key={index}>
//                     <div className="flex items-center">
//                   <p className="text-[#656565] ml-[15px] lg:ml-[120px] font-[600] pb-[35px] text-[13px]">{activity["reach time"]}</p>
//                   <div className="dragboxes bg-[#FFE6D3] rounded-[10px] w-[300px] mb-[30px]  lg:w-[400px] lg:ml-[100px] ml-[20px] lg:p-[15px] p-[15px]">
//                   <p>{activity.activity}</p> 
//                   <p><strong>Stop Time:</strong> {activity["stop time"]}</p>
//                   <p><strong>Spend:</strong> {activity.spend}</p>
//                   <p><strong>Rating:</strong> {activity.rating}</p>
//                   </div>
//                   </div><br/>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p><div className="flex justify-center mt-[100px] h-screen">
//         <div className="flex flex-row gap-2">
//         <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
//         <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
//         <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
//         </div>
//         </div></p>
//       )}
//     </div>
//   );
// }










"use client";

import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";

interface Activity {
  activity: string;
  "stop time": string;
  "reach time": string;
  spend: string;
  rating: string;
}

interface Itinerary {
  [day: string]: Activity[];
}

export default function Itinerary() {
  const [formData, setFormData] = useState<any>({});
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [draggedActivity, setDraggedActivity] = useState<Activity | null>(null);
  const [draggedDay, setDraggedDay] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ formData }),
        });

        if (!response.ok) {
          console.error("Error fetching itinerary:", await response.text());
          return;
        }

        const data = await response.json();

        if (data && data.choices && data.choices[0] && data.choices[0].message) {
          const jsonString = data.choices[0].message.content;
          if (jsonString.trim().startsWith("{") || jsonString.trim().startsWith("[")) {
            const jsonObject: Itinerary = JSON.parse(jsonString);
            setItinerary(jsonObject);
          } else {
            console.error("JSON string appears to be incomplete.");
          }
        } else {
          console.error("Expected data structure is missing.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [formData]);

  const handleDragStart = (activity: Activity, day: string, index: number) => {
    setDraggedActivity(activity);
    setDraggedDay(day);
    setDraggedIndex(index);
  };

  const handleDrop = (targetDay: string, targetIndex: number) => {
    if (draggedActivity && draggedDay !== null && draggedIndex !== null && itinerary) {
      const updatedItinerary = { ...itinerary };

      // Remove the dragged activity from the original position
      updatedItinerary[draggedDay].splice(draggedIndex, 1);

      // Insert the dragged activity into the target position
      updatedItinerary[targetDay].splice(targetIndex, 0, draggedActivity);

      setItinerary(updatedItinerary);
      setDraggedActivity(null);
      setDraggedDay(null);
      setDraggedIndex(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-[#774000] font-[700] text-[27px] pb-[25px] lg:text-[30px] ml-[30px] lg:ml-[120px] lg:mt-[60px] mt-[30px]">
        Here's your Itinerary! Drag & drop items to edit the plan.
      </h1>
      {itinerary ? (
        <div>
          {Object.entries(itinerary).map(([day, activities]) => (
            <div key={day}>
              <h2 className="text-[#656565] bg-[#ededed] ml-[15px] mb-[15px] lg:ml-[120px] font-[600] w-[60px] rounded-[10px] p-[5px]">
                {day}
              </h2>
              {activities.map((activity: Activity, index: number) => (
                <div
                  key={index}
                  className="flex items-center"
                  draggable
                  onDragStart={() => handleDragStart(activity, day, index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(day, index)}
                >
                  <p className="text-[#656565] ml-[15px] lg:ml-[120px] font-[600] pb-[35px] text-[13px]">
                    {activity["reach time"]}
                  </p>
                  <div className="dragboxes bg-[#FFE6D3] rounded-[10px] w-[300px] mb-[30px] lg:w-[400px] lg:ml-[100px] ml-[20px] lg:p-[15px] p-[15px]">
                    <p>{activity.activity}</p>
                    <p>
                      <strong>Stop Time:</strong> {activity["stop time"]}
                    </p>
                    <p>
                      <strong>Spend:</strong> {activity.spend}
                    </p>
                    <p>
                      <strong>Rating:</strong> {activity.rating}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>
          <div className="flex justify-center mt-[100px] h-screen">
            <div className="flex flex-row gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
            </div>
          </div>
        </p>
      )}
    </div>
  );
}





