"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "../../utils/supabase/client";
import OfficerModal, { Officer } from "../../(main)/components/OfficerModal"; // Adjust path if needed

const carouselImages = [
  "/globe.svg",
  "/window.svg",
  "/file.svg",
];

// HELPER FUNCTIONS 
// Cleans up the name string so we don't have weird spacing if lack of middle initial or suffix
const formatName = (o: Officer) => {
  return `${o.first_name} ${o.middle_initial ? o.middle_initial + "." : ""} ${o.last_name} ${o.suffix || ""}`.trim().replace(/\s+/g, ' ');
};

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
  
  // DATABASE & ADMIN STATE 
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null);

  // DATA FETCHING
  const fetchData = async () => {
    // Fetch all officers from the database
    const { data: officersData, error: officersError } = await supabase.from('Officers').select('*');
    if (officersData) setOfficers(officersData);
    if (officersError) console.error("Error fetching officers:", officersError);

    // Check if the currently logged-in user is an admin
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData?.session) {
      const { data: userData } = await supabase
        .from('Users') 
        .select('is_admin')
        .eq('user_id', sessionData.session.user.id)
        .single();
      
      if (userData?.is_admin) {
        setIsAdmin(true);
      }
    }
  };

  useEffect(() => {
    fetchData(); 

    // Carousel timer
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // UI CONFIGURATION FOR TEAMS
  const goals = [
    { title: "Provide a platform for students", description: "Provide a platform for students to deepen their skills in Google technologies and software development." },
    { title: "Facilitate ideas and project sharing", description: "Facilitate ideas and project sharing on Google technologies to foster collaborative learning." },
    { title: "Organize events and activities", description: "Organize events and activities that build members' technical skills, support holistic growth, and contribute to community development." },
    { title: "Build connections with industry partners", description: "Build connections with industry partners to support mentorship, internship, career growth, and socially impactful engagement." },
  ];

  const teamDepartments = [
    { name: "Operations", bg: "bg-[#C3ECF6]" },
    { name: "Communications", bg: "bg-[#FFE7A5]" },
    { name: "Technology", bg: "bg-[#F8D8D8]" },
    { name: "Community Development", bg: "bg-[#CCF6C5]" }
  ];

  const execColors = ["bg-white", "bg-[#C3ECF6]", "bg-[#FFE7A5]", "bg-[#F8D8D8]", "bg-[#CCF6C5]"];

  // Open modal helper
  const openModal = (officer: Officer | null = null) => {
    setEditingOfficer(officer);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white text-black space-y-16 pb-20 overflow-hidden">
      
      {/*CAROUSEL*/}
      <div className="relative w-full max-w-4xl mx-auto h-96 overflow-hidden rounded-2xl p-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 mt-10 lg:mt-30">
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          {carouselImages.map((src, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? "opacity-100" : "opacity-0"}`}>
              <Image src={src} alt={`carousel-${idx}`} layout="fill" objectFit="cover" priority={idx === 0} />
            </div>
          ))}
        </div>
        <div className="absolute top-4 left-4"><span className="bg-yellow-400 text-black px-3 py-1 rounded-full border border-black text-sm font-bold">Google Developer Groups on Campus</span></div>
        <div className="absolute top-4 right-4"><span className="bg-red-400 text-black px-3 py-1 rounded-full border border-black text-sm font-bold">Mapua University</span></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-xl font-light border-2 border-black">Let&apos;s Build Greater Things, Together.</span>
        </div>
      </div>

      {/*INTRO*/}
      <div className="text-center px-8">
        <h1 className="text-4xl lg:text-6xl font-black mb-6">What is GDGoC – Mapua?</h1>
        <p className="text-gray-700 max-w-4xl mx-auto text-lg leading-relaxed">
          Google Developer Groups on Campus Mapúa University sees itself as a community of innovators who are motivated on using innovation, and Google technologies as a platform to provide solutions and solve challenges for the community and the holistic development of its community.
        </p>
      </div>

      {/*VISION*/}
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

      {/*MISSION*/}
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

      {/*GOALS*/}
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

      {/*MEET THE TEAM SECTION*/}
      <div className="max-w-6xl mx-auto px-8 pt-20">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-black text-center lg:text-left">Wanna Meet the Team?</h2>
          
          {isAdmin && (
            <button 
              onClick={() => openModal(null)}
              className="mt-6 lg:mt-0 px-6 py-3 bg-blue-500 text-white font-bold text-xl rounded-xl border-4 border-black hover:bg-blue-600 transition"
            >
              + Add New Team Member
            </button>
          )}
        </div>

        {/*Chief Officers*/}
        <div className="space-y-8 mb-24">
          {[
            "Chief Executives Officer",
            "Chief Operations Officer",
            "Chief Technology Officer",
            "Chief Communications Officer",
            "Chief Community Development Officer"
          ].map((roleName, index) => {
            
            // Look into the database to see if someone holds this static role
            const exec = officers.find(o => o.position === roleName && o.department === "Chief Officers");

            return (
              <div 
                key={roleName} 
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${execColors[index % execColors.length]} border-[5px] border-black rounded-[30px] p-6 lg:p-8 ${index % 2 !== 0 ? 'lg:flex-row-reverse text-right' : 'text-left'}`}
              >
                {/* Admin Ellipsis */}
                {isAdmin && (
                  <button 
                    onClick={() => openModal(exec || { first_name: "", last_name: "", middle_initial: "", suffix: "", position: roleName, department: "Chief Officers", image: "" })}
                    className="absolute top-4 left-4 bg-white border-2 border-black rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold hover:bg-gray-200 z-20"
                  >
                    ⋮
                  </button>
                )}

                <div className="w-64 h-72 relative rounded-[25px] overflow-hidden border-2 border-black flex-shrink-0 bg-white flex items-center justify-center">
                  {exec?.image ? (
                    <Image src={exec.image} alt={exec.first_name} layout="fill" objectFit="cover" />
                  ) : (
                    <span className="text-gray-400 font-bold">No Photo</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-4xl lg:text-5xl font-bold mb-4">{roleName}</h3>
                  {/* Show name if it exists, otherwise show a placeholder */}
                  <p className="text-2xl lg:text-4xl font-bold text-gray-800">
                    {exec ? formatName(exec) : "To Be Announced"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/*Horizontal Team Scrollers (Headers always visible) */}
        <div className="space-y-16">
          {teamDepartments.map((dept, deptIndex) => {
            const deptOfficers = officers.filter(o => o.department === dept.name);
            
            return (
              <div key={deptIndex} className="w-full">
                <h3 className="text-4xl font-bold mb-8 pl-4">{dept.name} Team</h3>
                
                {/* If the team is empty, show a blank state, otherwise show the scroller */}
                {deptOfficers.length === 0 ? (
                  <div className="px-4 py-8 border-4 border-dashed border-gray-300 rounded-[30px] text-center text-gray-500 font-bold text-xl">
                    No members added to the {dept.name} team yet.
                  </div>
                ) : (
                  <div className="flex overflow-x-auto pb-8 gap-6 px-4 snap-x">
                    {deptOfficers.map((member) => (
                      <div 
                        key={member.officer_id} 
                        className={`relative snap-start flex-shrink-0 w-80 lg:w-96 flex flex-col items-center p-6 ${dept.bg} border-4 border-black rounded-[50px]`}
                      >
                        {isAdmin && (
                          <button 
                            onClick={() => openModal(member)}
                            className="absolute top-6 right-6 bg-white border-2 border-black rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold hover:bg-gray-200 z-20"
                          >
                            ⋮
                          </button>
                        )}

                        <div className="w-full h-64 relative rounded-[25px] overflow-hidden border-2 border-black mb-6 bg-white">
                          <Image src={member.image || "/placeholder.jpg"} alt={member.first_name} layout="fill" objectFit="cover" />
                        </div>
                        <div className="text-center h-full flex flex-col justify-between">
                          <p className="text-xl font-bold mb-4">{member.position}</p>
                          <p className="text-2xl">{formatName(member)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/*RENDER THE MODAL*/}
      <OfficerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchData} 
        existingOfficer={editingOfficer} 
      />
    </div>
  );
}