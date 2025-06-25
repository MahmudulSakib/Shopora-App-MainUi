"use client";

import React, { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CarouselImage = {
  id: string;
  imageUrl: string;
  publicId: string;
};

function HeroCarousel() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  useEffect(() => {
    axios
      .get<CarouselImage[]>(
        "https://shopora-backend-deploy.onrender.com/carousel-images",
        {
          withCredentials: true,
        }
      )
      .then((res) => setImages(res.data))
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  return (
    <div className="max-w-[2200px] mx-auto pt-15 relative">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="relative"
      >
        <CarouselContent>
          {images.map(({ id, imageUrl }) => (
            <CarouselItem key={id} className="basis-full">
              <Card className="overflow-hidden rounded-lg h-[220px] sm:h-[280px] md:h-[360px] relative">
                <CardContent className="p-0 w-full h-full">
                  <img
                    src={imageUrl}
                    alt="carousel"
                    className="w-full h-[220px] sm:h-[280px] md:h-[360px] object-cover mt-[-25px]"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black border border-gray-300 rounded-full p-2 shadow transition" />
        <CarouselNext className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black border border-gray-300 rounded-full p-2 shadow transition" />
      </Carousel>
    </div>
  );
}

export default HeroCarousel;
