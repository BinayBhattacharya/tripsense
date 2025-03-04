"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from "zod" 
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Banner from "../../public/detail-banner.png"
import Image from "next/image";

type Destination = 'Goa' | 'Coorg' | 'Ooty';

export function Detailsform() {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  
  // Watch the destination field
  const destination = watch("destination") as Destination; // Type assertion

  // Define the hotel options per destination
  const hotelOptions: Record<Destination, string[]> = {
    Goa: ["Hotel Goa A", "Hotel Goa B", "Hotel Goa C"],
    Coorg: ["Hotel Coorg A", "Hotel Coorg B", "Hotel Coorg C"],
    Ooty: ["Hotel Ooty A", "Hotel Ooty B", "Hotel Ooty C"]
  };

  const [hotels, setHotels] = useState<string[]>([]);

  // Update hotels when destination changes
  useEffect(() => {
    if (destination) {
      setHotels(hotelOptions[destination]);  // Now TypeScript understands destination is valid
      setValue("hotel", "");  // Reset hotel selection when destination changes
    }
  }, [destination, setValue]);

  const onSubmit = (data: any) => {
    const formData = {
      destination: data.destination,
      startDate: data.startDate,
      endDate: data.endDate,
      hotel: data.hotel,
      checkInTime: data.checkInTime,
      checkOutTime: data.checkOutTime,
      people: data.people,
      age: data.age,
      tripType: data.tripType,
      itineraryItems: data.itineraryItems
    };
  
    localStorage.setItem("formData", JSON.stringify(formData));  // Save formData to localStorage
    router.push("/itinerary");
  };


    return(
        <>
        <div className="flex flex-wrap-reverse items-end justify-center pt-[40px] lg:pt-[60px]">
        <form className="w-[320px] lg:w-[500px]" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-[#774000] font-[700] text-[27px] pb-[25px] lg:text-[30px]">Help us know you better</h1>
      <select  className="mb-[8px] bg-[#ededed] p-[4px] rounded-[5px]" {...register("destination", { required: true })}>
        <option value="">Select your destination&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <option value="Goa">Goa</option>
        <option value="Coorg">Coorg</option>
        <option value="Ooty">Ooty</option>
      </select>
      {errors.destination && <p className="text-[#9f001e] text-[15px] mb-[-4px]">Please select a destination.</p>}<br/>

      <label className="pb-[4px]">Start Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <input type="date" className="mb-[8px] bg-[#ededed] p-[4px] rounded-[5px]" {...register("startDate", { required: true })} />
      {errors.startDate && <p  className="text-[#9f001e] text-[15px] mb-[-4px]">Start date is required.</p>}<br/>

      <label className="pb-[4px]">End Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <input type="date" className="mb-[8px] bg-[#ededed] p-[4px] rounded-[5px]" {...register("endDate", { required: true })} />
      {errors.endDate && <p className="text-[#9f001e] text-[15px] mb-[-4px]">End date is required.</p>}<br/>

      <select className="mb-[8px] bg-[#ededed] p-[4px] rounded-[5px]" {...register("hotel", { required: true })}>
        <option value="">Choose your hotel&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        {hotels.map((hotel, idx) => (
          <option key={idx} value={hotel}>
            {hotel}
          </option>
        ))}
      </select>
      {errors.hotel && <p className="text-[#9f001e] text-[15px] mb-[-4px]">Please select a hotel.</p>}<br/>

      <label className="pb-[4px]">Check-in Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <input type="time" className="mb-[8px] bg-[#ededed] p-[4px] rounded-[5px]" {...register("checkInTime", { required: true })} />
      {errors.checkInTime && <p className="text-[#9f001e] text-[15px] mb-[-4px]">Check-in time is required.</p>}<br/>

      <label className="pb-[4px]">Check-out Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <input type="time" className="mb-[8px] bg-[#ededed] p-[4px] rounded-[5px]" {...register("checkOutTime", { required: true })} />
      {errors.checkOutTime && <p className="text-[#9f001e] text-[15px] mb-[-4px]">Check-out time is required.</p>}<br/>

      <label className="pb-[4px]">Number of People&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <input type="number" className="mb-[8px] bg-[#ededed] p-[4px] rounded-[5px] w-[113px]" {...register("people", { required: true, min: 1 })} />
      {errors.people && <p className="text-[#9f001e] text-[15px] mb-[-4px]">Enter number of people (at least 1).</p>}<br/>

      <label className="pb-[4px]">Your Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <input type="number" className="mb-[8px] bg-[#ededed] p-[4px] rounded-[5px] w-[113px]" {...register("age", { required: true, min: 0 })} />
      {errors.age && <p className="text-[#9f001e] text-[15px] mb-[-4px]">Enter a valid age.</p>}<br/>

      <select className="mb-[8px] bg-[#ededed] p-[4px] rounded-[5px]" {...register("tripType", { required: true })}>
        <option value="">Type of Trip&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <option value="family">Family</option>
        <option value="couple">Couple</option>
        <option value="friends">Friends</option>
        <option value="business">Business</option>
      </select>
      {errors.tripType && <p className="text-[#9f001e] text-[15px] mb-[-4px]">Please select a trip type.</p>}<br/>

      <label className="pb-[4px]">Items to include in Itinerary <br/></label>
      <div>
        <input type="checkbox" className="pb-[10px]" {...register("itineraryItems", { required: true })} value="tourist places" />
        <label className="pb-[10px]">&nbsp;&nbsp;Tourist Places</label>
      </div>
      <div>
        <input type="checkbox" className="pb-[10px]" {...register("itineraryItems", { required: true })} value="shopping" />
        <label className="pb-[10px]">&nbsp;&nbsp;Shopping</label>
      </div>
      <div>
        <input type="checkbox" className="pb-[10px]" {...register("itineraryItems", { required: true })} value="cuisine outlets" />
        <label className="pb-[10px]">&nbsp;&nbsp;Cuisine Outlets</label>
      </div>
      <div>
        <input  type="checkbox" className="pb-[10px]" {...register("itineraryItems", { required: true })} value="clubs & bars" />
        <label className="pb-[10px]">&nbsp;&nbsp;Clubs & Bars</label>
      </div>
      {errors.itineraryItems && <p className="text-[#9f001e] text-[15px] mb-[-4px]">Please select at least one itinerary item.</p>}

      <button className="justify-center mt-[30px] mb-[10px] p-[8px] bg-black text-white font-[700] lg:text-[20px] rounded-[7px] text-[15px]" type="submit">Start Planning</button>
    </form>
    <Image src={Banner} alt="details" className="lg:w-[600px] w-[350px] lg:mt-[0px] lg:h-[600px] pb-[20px]"/>
    </div>
        </>
    )
}