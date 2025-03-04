import Link from "next/link";
import Banner from "../../public/websitebanner.png"
import Image from "next/image";

export function Hero() {
    return(
        <>
                <div className="bg-[linear-gradient(90deg,rgba(255,191,104,1)_0%,rgba(255,197,208,1)_100%)] h-[500px] flex lg:flex-nowrap flex-wrap">
                    <div>
                    <h1 className="lg:text-[50px] lg:pl-[130px] pl-[35px] text-[30px] font-[700] lg:pt-[80px] pt-[30px] leading-[1.2] text-[#774000]">No more Confusion<br/> during your <span className="text-[#517700]">Trips</span></h1>
                    <h2 className="lg:pl-[130px] pl-[35px] pt-[25px] lg:pt-[35px] lg:text-[25px] leading-[1.2] font-[200] lg:pb-[30px] pb-[20px]">Plan tourist places, cuisine & shopping<br/>
                    with time and budget estimation.<br/>
                    Connect with peer groups through<br/>
                    games & snap streaks!<br/></h2>
                    <Link href='/details' className="lg:ml-[130px] ml-[35px] p-[8px] bg-white font-[700] lg:text-[20px] rounded-[7px] text-[15px]">Plan Itinerary</Link>
                    </div>
                    <Image src={Banner} alt="banner" className=" pt-[10px] lg:pt-[60px] ml-[100px]" />
                
        </div>
        </>
    )
}