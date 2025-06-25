// import React from "react";
// import { AuroraText } from "./magicui/aurora-text";
// import { NumberTicker } from "./magicui/number-ticker";
// import { Marquee } from "./magicui/marquee";
// import { cn } from "@/lib/utils";

// const reviews = [
//   {
//     name: "Jack",
//     username: "@jack",
//     body: "I've never seen anything like this before. It's amazing. I love it.",
//     img: "https://avatar.vercel.sh/jack",
//   },
//   {
//     name: "Jill",
//     username: "@jill",
//     body: "I don't know what to say. I'm speechless. This is amazing.",
//     img: "https://avatar.vercel.sh/jill",
//   },
//   {
//     name: "John",
//     username: "@john",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/john",
//   },
//   {
//     name: "Jane",
//     username: "@jane",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/jane",
//   },
//   {
//     name: "Jenny",
//     username: "@jenny",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/jenny",
//   },
//   {
//     name: "James",
//     username: "@james",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/james",
//   },
// ];

// const firstRow = reviews.slice(0, reviews.length / 2);
// const secondRow = reviews.slice(reviews.length / 2);

// const ReviewCard = ({
//   img,
//   name,
//   username,
//   body,
// }: {
//   img: string;
//   name: string;
//   username: string;
//   body: string;
// }) => {
//   return (
//     <figure
//       className={cn(
//         "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",

//         "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",

//         "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
//       )}
//     >
//       <div className="flex flex-row items-center gap-2">
//         <img className="rounded-full" width="32" height="32" alt="" src={img} />
//         <div className="flex flex-col">
//           <figcaption className="text-sm font-medium dark:text-white">
//             {name}
//           </figcaption>
//           <p className="text-xs font-medium dark:text-white/40">{username}</p>
//         </div>
//       </div>
//       <blockquote className="mt-2 text-sm">{body}</blockquote>
//     </figure>
//   );
// };

// const HeroDescription = () => {
//   return (
//     <div className="relative flex h-[300px] flex-col justify-center items-center mt-20 overflow-hidden">
//       <div className="relative z-10 flex justify-between w-full px-10 gap-10">
//         <div className="flex flex-col-reverse justify-center items-start">
//           <span className="text-2xl sm:text-4xl font-bold">
//             Overseas{" "}
//             <AuroraText className="text-4xl sm:text-6xl font-bold">
//               Branch
//             </AuroraText>
//           </span>

//           <NumberTicker
//             value={123}
//             className="whitespace-pre-wrap text-orange-500 text-5xl sm:text-7xl font-medium tracking-tighter dark:text-white"
//           />
//         </div>
//         <div>
//           <div className="relative flex flex-col items-center justify-center overflow-hidden">
//             <div className="w-[900px] bg-slate-100 rounded-xl p-2 shadow-md">
//               <Marquee pauseOnHover className="[--duration:20s]">
//                 {firstRow.map((review) => (
//                   <ReviewCard key={review.username} {...review} />
//                 ))}
//               </Marquee>
//               <Marquee reverse pauseOnHover className="[--duration:20s] mt-2">
//                 {secondRow.map((review) => (
//                   <ReviewCard key={review.username} {...review} />
//                 ))}
//               </Marquee>
//             </div>

//             <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-slate-100"></div>
//             <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-slate-100"></div>
//           </div>
//         </div>
//         <div className="flex flex-col-reverse justify-center items-start">
//           <span className="text-2xl sm:text-4xl font-bold">
//             Successful{" "}
//             <AuroraText className="text-4xl sm:text-6xl font-bold">
//               Shipment
//             </AuroraText>
//           </span>
//           <span>
//             <NumberTicker
//               value={25000}
//               className="whitespace-pre-wrap text-orange-500 text-5xl sm:text-7xl font-medium tracking-tighter dark:text-white"
//             />{" "}
//             <span className="text-orange-500 font-extrabold text-5xl sm:text-7xl">
//               +
//             </span>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroDescription;

"use client";

import React from "react";
import { AuroraText } from "./magicui/aurora-text";
import { NumberTicker } from "./magicui/number-ticker";
import { Marquee } from "./magicui/marquee";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. Amazing.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "This is incredible.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "Wow. Just wow.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "Best experience ever.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => (
  <figure
    className={cn(
      "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
      "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
      "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
    )}
  >
    <div className="flex items-center gap-2">
      <img
        className="rounded-full"
        width="32"
        height="32"
        alt={name}
        src={img}
      />
      <div>
        <figcaption className="text-sm font-medium dark:text-white">
          {name}
        </figcaption>
        <p className="text-xs font-medium dark:text-white/40">{username}</p>
      </div>
    </div>
    <blockquote className="mt-2 text-sm">{body}</blockquote>
  </figure>
);

const HeroDescription = () => {
  return (
    <div className="w-full px-4 pt-16">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-10 xl:flex-row xl:justify-between items-center justify-between xl:ml-[75px]">
        <div className="text-center lg:text-left space-y-2">
          <h2 className="text-2xl sm:text-4xl font-bold">
            Overseas{" "}
            <AuroraText className="text-4xl sm:text-6xl font-bold">
              Branch
            </AuroraText>
          </h2>
          <NumberTicker
            value={123}
            className="text-orange-500 text-5xl sm:text-7xl font-semibold dark:text-white"
          />
        </div>

        <div className="relative w-full max-w-3xl">
          <div className="bg-slate-100 rounded-xl p-3 overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s] mt-2">
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-slate-100" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-slate-100" />
        </div>

        <div className="text-center lg:text-left space-y-2">
          <h2 className="text-2xl sm:text-4xl font-bold">
            Successful{" "}
            <AuroraText className="text-4xl sm:text-6xl font-bold">
              Shipment
            </AuroraText>
          </h2>
          <div className="flex items-center justify-center lg:justify-start">
            <NumberTicker
              value={25000}
              className="text-orange-500 text-5xl sm:text-7xl font-semibold dark:text-white"
            />
            <span className="text-orange-500 font-extrabold text-5xl sm:text-7xl pl-1">
              +
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDescription;
