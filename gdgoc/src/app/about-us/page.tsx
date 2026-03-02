"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const carouselImages = [
  "/globe.svg",
  "/window.svg",
  "/file.svg",
];

// separate component for individual goal card to isolate state
function GoalCard({
  icon,
  title,
  description,
  bgColor,
}: {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
}) {
  const [open, setOpen] = useState(false);
  const firstWord = title.split(" ")[0];
  const rest = title.split(" ").slice(1).join(" ");

  return (
    <div
      className={`${bgColor} rounded-3xl p-8 cursor-pointer hover:shadow-lg border-3 border-black`}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="flex items-center">
        <span className="text-3xl mr-3">{icon}</span>
        <p className="font-bold text-lg">
          {firstWord} <span className="font-normal">{rest}</span>
        </p>
      </div>
      {open && <p className="mt-4 text-base leading-relaxed">{description}</p>}
    </div>
  );
}

export default function AboutPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const goals = [
    {
      title: "Provide a platform for students",
      description:
        "Provide a platform for students to deepen their skills in Google technologies and software development.",
    },
    {
      title: "Facilitate ideas and project sharing",
      description:
        "Facilitate ideas and project sharing on Google technologies to foster collaborative learning.",
    },
    {
      title: "Organize events and activities",
      description:
        "Organize events and activities that build members' technical skills, support holistic growth, and contribute to community development.",
    },
    {
      title: "Build connections with industry partners",
      description:
        "Build connections with industry partners to support mentorship, internship, career growth, and socially impactful engagement.",
    },
  ];

  return (
    <div className="bg-white text-black space-y-12">
      {/* carousel */}
      <div className="relative w-full max-w-4xl mx-auto h-96 overflow-hidden rounded-2xl p-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 mt-30">
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          {carouselImages.map((src, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 
              ${idx === current ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={src}
                alt={`carousel-${idx}`}
                layout="fill"
                objectFit="cover"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
        {/* overlay pills */}
        <div className="absolute top-4 left-4">
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full border border-black text-sm">
            Google Developer Groups on Campus
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-red-400 text-black px-3 py-1 rounded-full border border-black text-sm">
            Mapua University
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-xl">
            Let&apos;s Build Greater Things, Together.
          </span>
        </div>
      </div>

      {/* intro heading */}
      <div className="text-center px-8 py-8">
        <h1 className="text-5xl font-black mb-6">What is GDGoC – Mapua?</h1>
        <p className="text-gray-700 max-w-4xl mx-auto text-lg leading-relaxed">
          Google Developer Groups on Campus Mapúa University sees itself as a
          community of innovators who are motivated on using innovation, and
          Google technologies as a platform to provide solutions and solve
          challenges for the community and the holistic development of its
          community.
        </p>
      </div>

      {/* Vision box */}
      <div className="relative max-w-5xl mx-auto px-8 py-8">
        <span className="absolute top-0 right-0 transform translate-y-[-50%] mr-8">
          <div className="bg-yellow-400 text-black px-8 py-3 rounded-full border-3 border-black font-bold text-lg">
            Vision
          </div>
        </span>
        <div className="bg-yellow-100 border-3 border-black rounded-3xl p-12">
          <p className="text-center text-xl leading-relaxed">
            Google Developer Groups on Campus Mapúa University sees itself as a
            community of innovators who are motivated on using innovation, and
            Google technologies as a platform to provide solutions and solve
            challenges for the community and the holistic development of its
            community.
          </p>
        </div>
      </div>

      {/* Mission section */}
      <div className="relative max-w-5xl mx-auto px-8 py-8">
        <span className="absolute top-0 left-0 transform translate-y-[-50%] ml-8">
          <div className="bg-blue-500 text-white px-8 py-3 rounded-full border-3 border-black font-bold text-lg">
            Mission
          </div>
        </span>
        <div className="flex flex-col lg:flex-row items-center gap-8 bg-blue-50 border-3 border-black rounded-3xl p-8">
          <div className="lg:w-1/2">
            <Image
              src="/group-photo.jpg"
              alt="GDG members"
              width={600}
              height={400}
              className="rounded-2xl object-cover w-full border-2 border-black"
            />
          </div>
          <div className="lg:w-1/2 text-lg">
            <ul className="space-y-4">
              <li>
                <strong>Equip</strong> individuals through education in
                technology and programming;
              </li>
              <li>
                <strong>Promote</strong> the holistic development and the
                well-being of its members;
              </li>
              <li>
                <strong>Inspire</strong> innovation and a problem-solving
                mindset;
              </li>
              <li>
                <strong>Nurture</strong> the ability to develop meaningful
                technological solutions that benefit the society;
              </li>
              <li>
                <strong>Harness</strong> technology to uplift communities.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Goals section */}
      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="text-center mb-8 relative">
          <div className="inline-block bg-gray-300 px-10 py-4 rounded-full border-3 border-black font-bold text-lg">
            Goals
          </div>
        </div>
        <p className="text-center mb-10 max-w-4xl mx-auto text-xl leading-relaxed">
          The goal of the organization is to foster a collaborative and dynamic
          community among Mapúa University students who share a keen interest
          in Google Technologies, software development, innovation, community
          development, and related fields. The organization aims to:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {goals.map((g, i) => {
            const bgColors = ["bg-red-300", "bg-blue-300", "bg-green-300", "bg-yellow-300"];
            const icons = ["🧠", "🤝", "👥", "⚙️"];
            return (
              <GoalCard
                key={i}
                icon={icons[i]}
                title={g.title}
                description={g.description}
                bgColor={bgColors[i]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
