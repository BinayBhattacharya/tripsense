import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Whychooseus } from "./components/Whychooseus";
import { Tagline } from "./components/Tagline";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Whychooseus/>
    <Tagline/>
    </>
  );
}
