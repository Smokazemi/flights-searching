'use client'
import Image from "next/image";
import headerBg from '@/assets/images/header-bg.svg';
import SearchBox from "@/components/home/SearchBox";
import { useState } from "react";
import Flights from "@/components/home/Flights";
import { IFlight } from "@/types/IFlight";

export default  function Home() {
  const [flights, setFlights] = useState<IFlight | undefined>()
  return (
    <>
      <main className="container mx-auto">
        <div className="relative w-full">

          <Image
            className="dark:invert w-full"
            src={headerBg}
            alt="Next.js logo"
            priority
          />
          <h1 className="absolute bottom-0 text-center w-full  text-6xl font-roboto">
            Flights
          </h1>
        </div>
        <SearchBox setFlights={setFlights} />
        <Flights flights={flights} />
      </main>
    </>
  );
}
