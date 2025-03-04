import Image from "next/image";
import demovideo from "../../public/websitebanner.png"

export function Whychooseus() {
    return(
        <>
        <div className="flex flex-wrap-reverse lg:mt-[80px] mt-[30px] justify-center">
            <span className="lg:w-[600px] p-[30px]">
                <h1 className="text-[#774000] font-[700] text-[30px]">Why Choose Us?</h1>
                <h2 className="font-[700] text-[18px] pt-[25px]">Easily Customize the Itinerary through Drag & Drop </h2>
                <h3>Choose your favorite items to be included in your itinerary from unlimited 
                options to explore</h3>
                <hr className="mt-[30px]"/>
                <h2 className="font-[700] text-[18px] pt-[25px]">Include Shopping and Clubbing in your Itinerary</h2>
                <h3>Our itinerary plan includes tourist places, cuisine outlets, shopping and clubs
                with accurate estimations of time and budget</h3>
                <hr className="mt-[30px]"/>
                <h2 className="font-[700] text-[18px] pt-[25px]">Start Live tracking and connect with Other Travel Groups</h2>
                <h3>We are your travel buddy throughout the trip and will connect you with other Travel 
                groups through team games and snap streaks!</h3>
            </span>
            <Image src={demovideo} alt="" className="p-[20px]"/>
        </div>
        </>
    )
}