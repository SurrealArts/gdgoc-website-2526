"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const carouselImages = [
  "/globe.svg",
  "/window.svg",
  "/file.svg",
];

// --- TEAM DATA ARRAYS --- to check the visuals

const executives = [
  { role: "Chief Executives Officer", name: "AG Shun Clark A. Aparece", img: "/placeholder.jpg", bg: "bg-white" },
  { role: "Chief Operations Officer", name: "JEFFREY C. FLORES JR.", img: "/placeholder.jpg", bg: "bg-[#C3ECF6]" },
  { role: "Chief Technology Officer", name: "CZARINA LILY A. SY", img: "/placeholder.jpg", bg: "bg-[#FFE7A5]" },
  { role: "Chief Communications Officer", name: "PATRICK LAWRENCE S. MOLINA", img: "/placeholder.jpg", bg: "bg-[#F8D8D8]" },
  { role: "Chief Community Development Officer", name: "KLYDE GABRIEL SANTOS", img: "/placeholder.jpg", bg: "bg-[#CCF6C5]" },
];

const teamDepartments = [
  {
    name: "Operations Team",
    bg: "bg-[#C3ECF6]",
    members: [
      { role: "Director of Internal Affairs", name: "Qin Edison Bagang" },
      { role: "Director of External Affairs", name: "Azhel Jane V. Nai" },
      { role: "Secretary of Finance", name: "Frederich Carl S. Cuna" },
      { role: "Secretary of Audit", name: "Matthew Daniel Reyes" },
      { role: "Secretary of Data Management", name: "Santi Gabriel C. De Leon" },
      { role: "Director of Events", name: "John Kenneth P. Alon" },
      { role: "Deputy Director of Events", name: "Naisah Aliah R. Aspiras" },
      { role: "Events Committee", name: "Tristan Kier D. Guiang" },
      { role: "Deputy Director of External Affairs", name: "Arnulfo III Lusanta Sabayo" },
      { role: "Secretary of Research Management", name: "Chloe Andrea T. Bituin" },
      { role: "Externals Committee", name: "Love Alexa M. Lazo" },
      { role: "Externals Committee", name: "Juan Madrid D. Dela Rosa" }
    ]
  },
  {
    name: "Communications Team",
    bg: "bg-[#FFE7A5]",
    members: [
      { role: "Creatives Head", name: "Antonia Rafaela Miel C. Levita" },
      { role: "Creatives Vice-Head", name: "Erin Gail Dames" },
      { role: "Marketing Head", name: "John Benedick B. Bagorio" },
      { role: "Marketing Vice-Head", name: "Ralph Andrei P. Buela" },
      { role: "Documentations Head", name: "Lawrence Isaac Giron" },
      { role: "Documentations Vice-Head", name: "Amador Jan H. Mana" },
      { role: "Creatives Committee", name: "Angela Ysabelle A. Sta Maria" },
      { role: "Creatives Committee", name: "Alexa Jena C. Ruanes" },
      { role: "Creatives Committee", name: "Marcus D. Agustin" },
      { role: "Documentations Committee", name: "Aaron E. Filarca" }
    ]
  },
  {
    name: "Technology Team",
    bg: "bg-[#F8D8D8]",
    members: [
      { role: "Cybersecurity Lead", name: "Juan Martin Juacian" },
      { role: "Data Science Lead", name: "Angelica Mae I. Moraca" },
      { role: "Software Development Lead", name: "John Michael Elaurza" },
      { role: "Cybersecurity Committee", name: "Stiffler Yanic J. Yang" },
      { role: "Cybersecurity Committee", name: "Marian Nicole G. Acosta" },
      { role: "Data Science Committee", name: "David Hyzxent L. Memorando" },
      { role: "Data Science Committee", name: "Jabez Ken N. Garillo" },
      { role: "Data Science Committee", name: "Anthony L. Ocasla" },
      { role: "Data Science Committee", name: "Aaron Gabriel L. Novesteras" },
      { role: "Data Science Committee", name: "Bill Anakin A. Zamora" },
      { role: "Software Development Committee", name: "Justine Lee D. Jimenez" },
      { role: "Software Development Committee", name: "Ramira Grace A. Meija" }
    ]
  },
  {
    name: "Community Development Team",
    bg: "bg-[#CCF6C5]",
    members: [
      { role: "Partnership Affairs Committee", name: "Roy G. Garcia Jr." },
      { role: "Membership Affairs Vice-Head (Intramuros)", name: "Thomas Joaquin L. Navarro" },
      { role: "Membership Affairs Vice-Head (Makati)", name: "Louis Patrick N. Jaso" }
    ]
  }
];

// --- COMPONENTS ---

function GoalCard({ icon, title, description, bgColor }: { icon: string; title: string; description: string; bgColor: string; }) {
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
      description: "Provide a platform for students to deepen their skills in Google technologies and software development.",
    },
    {
      title: "Facilitate ideas and project sharing",
      description: "Facilitate ideas and project sharing on Google technologies to foster collaborative learning.",
    },
    {
      title: "Organize events and activities",
      description: "Organize events and activities that build members' technical skills, support holistic growth, and contribute to community development.",
    },
    {
      title: "Build connections with industry partners",
      description: "Build connections with industry partners to support mentorship, internship, career growth, and socially impactful engagement.",
    },
  ];

  return (
    <div className="bg-white text-black space-y-16 pb-20 overflow-hidden">
      {/* carousel */}
      <div className="relative w-full max-w-4xl mx-auto h-96 overflow-hidden rounded-2xl p-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 mt-10 lg:mt-30">
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          {carouselImages.map((src, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? "opacity-100" : "opacity-0"}`}
            >
              <Image src={src} alt={`carousel-${idx}`} layout="fill" objectFit="cover" priority={idx === 0} />
            </div>
          ))}
        </div>
        <div className="absolute top-4 left-4"><span className="bg-yellow-400 text-black px-3 py-1 rounded-full border border-black text-sm">Google Developer Groups on Campus</span></div>
        <div className="absolute top-4 right-4"><span className="bg-red-400 text-black px-3 py-1 rounded-full border border-black text-sm">Mapua University</span></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-xl font-light border-2 border-black">Let&apos;s Build Greater Things, Together.</span>
        </div>
      </div>

      {/* intro heading */}
      <div className="text-center px-8">
        <h1 className="text-4xl lg:text-6xl font-black mb-6">What is GDGoC – Mapua?</h1>
        <p className="text-gray-700 max-w-4xl mx-auto text-lg leading-relaxed">
          Google Developer Groups on Campus Mapúa University sees itself as a community of innovators who are motivated on using innovation, and Google technologies as a platform to provide solutions and solve challenges for the community and the holistic development of its community.
        </p>
      </div>

      {/* Vision box */}
      <div className="relative max-w-5xl mx-auto px-8">
        <span className="absolute top-0 right-8 transform -translate-y-1/2 z-10">
          <div className="bg-yellow-400 text-black px-10 py-3 rounded-full border-4 border-black font-bold text-2xl">Vision</div>
        </span>
        <div className="bg-[#FFE7A5] border-4 border-black rounded-[50px] p-12 lg:p-16">
          <p className="text-center text-xl lg:text-3xl leading-relaxed font-medium">
            Google Developer Groups on Campus Mapúa University sees itself as a community of innovators who are motivated on using innovation, and Google technologies as a platform to provide solutions and solve challenges for the community and the holistic development of its community.
          </p>
        </div>
      </div>

      {/* Mission section */}
      <div className="relative max-w-5xl mx-auto px-8">
        <span className="absolute top-0 left-8 transform -translate-y-1/2 z-10">
          <div className="bg-blue-500 text-white px-10 py-3 rounded-full border-4 border-black font-bold text-2xl">Mission</div>
        </span>
        <div className="flex flex-col lg:flex-row items-center gap-12 bg-white border-4 border-black rounded-[50px] p-8 lg:p-12">
          <div className="lg:w-1/2 w-full h-80 relative rounded-3xl overflow-hidden border-4 border-black">
            <Image src="/group-photo.jpg" alt="GDG members" layout="fill" objectFit="cover" />
          </div>
          <div className="lg:w-1/2 text-xl font-bold space-y-6">
            <p>Equip individuals through education in technology and programming;</p>
            <p>Promote the holistic development and the well-being of its members;</p>
            <p>Inspire innovation and a problem-solving mindset;</p>
            <p className="font-normal text-lg">Nurture the ability to develop meaningful technological solutions that benefit the society; and Harness technology to uplift communities.</p>
          </div>
        </div>
      </div>

      {/* Goals section */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="text-center mb-12 relative">
          <div className="inline-block bg-gray-200 px-12 py-4 rounded-full border-4 border-black font-bold text-3xl">Goals</div>
        </div>
        <p className="text-center mb-12 max-w-4xl mx-auto text-xl leading-relaxed font-medium">
          The goal of the organization is to foster a collaborative and dynamic community among Mapúa University students who share a keen interest in Google Technologies, software development, innovation, community development, and related fields. The organization aims to:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {goals.map((g, i) => {
            const bgColors = ["bg-[#EA4335]", "bg-[#4285F4]", "bg-[#34A853]", "bg-[#F9AB00]"];
            const icons = ["🧠", "🤝", "🧑‍💻", "⚙️"];
            return <GoalCard key={i} icon={icons[i]} title={g.title} description={g.description} bgColor={bgColors[i]} />;
          })}
        </div>
      </div>

      {/* NEW SECTION: MEET THE TEAM */}
      <div className="max-w-6xl mx-auto px-8 pt-20">
        <h2 className="text-5xl lg:text-6xl font-black mb-16 text-center lg:text-left">Wanna Meet the Team?</h2>

        {/* C-Suite Executives */}
        <div className="space-y-8 mb-24">
          {executives.map((exec, index) => (
            <div 
              key={index} 
              // This alternating flex-row logic creates the zig-zag pattern found in the Figma file
              className={`flex flex-col lg:flex-row items-center gap-8 ${exec.bg} border-[5px] border-black rounded-[30px] p-6 lg:p-8 ${index % 2 !== 0 ? 'lg:flex-row-reverse text-right' : 'text-left'}`}
            >
              <div className="w-64 h-72 relative rounded-[25px] overflow-hidden border-2 border-black flex-shrink-0 bg-gray-200">
                <Image src={exec.img} alt={exec.name} layout="fill" objectFit="cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-4xl lg:text-6xl font-bold mb-4">{exec.role}</h3>
                <p className="text-2xl lg:text-4xl font-bold text-gray-800">{exec.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Team Scrollers */}
        <div className="space-y-16">
          {teamDepartments.map((dept, deptIndex) => (
            <div key={deptIndex} className="w-full">
              <h3 className="text-4xl font-bold mb-8 pl-4">{dept.name}</h3>
              {/* Horizontal scroll container */}
              <div className="flex overflow-x-auto pb-8 gap-6 px-4 snap-x">
                {dept.members.map((member, memberIndex) => (
                  <div 
                    key={memberIndex} 
                    className={`snap-start flex-shrink-0 w-80 lg:w-96 flex flex-col items-center p-6 ${dept.bg} border-4 border-black rounded-[50px]`}
                  >
                    <div className="w-full h-64 relative rounded-[25px] overflow-hidden border-2 border-black mb-6 bg-white">
                      {/* Replace member.name with actual image paths once you have them */}
                      <Image src="/placeholder.jpg" alt={member.name} layout="fill" objectFit="cover" />
                    </div>
                    <div className="text-center h-full flex flex-col justify-between">
                      <p className="text-xl font-bold mb-4">{member.role}</p>
                      <p className="text-2xl">{member.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}