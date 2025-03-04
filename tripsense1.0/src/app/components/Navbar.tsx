import Image from "next/image";
import Logo from "../../public/TripSense_logo.png";
import Menu from "../../public/Hamburger.svg";
const NavLinks = [
     {name: "About Us"},
     {name: "Blogs"},
     {name: "Contact Us"},
     {name: "FAQ"},
];

export function Navbar() {
    return (
        <nav className="flex w-full  items-center justify-between px-[20px] py-[16px] lg:container lg:mx-auto lg:px-10">
             <div className="flex items-center">
                <Image src={Logo} alt="Logo" height={30}/>
                
             </div>
             <div>
             <div className="hidden lg:flex pl-[74px] gap-x-[56px]">
                    {NavLinks.map((item,index) => (
                        <p className="font-medium" key={index}>{item.name}</p>
                    ))}
                </div>
                <Image src={Menu} alt="Menu" className="lg:hidden"/>
             </div>
        </nav>
    )
}