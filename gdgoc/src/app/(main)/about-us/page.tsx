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

// UNIQUE SVG BACKGROUNDS FOR CHIEF OFFICERS
const RoleBackgrounds: Record<string, React.ReactNode> = {
  "Chief Executives Officer": (
    <svg className="w-full h-auto drop-shadow-sm" viewBox="0 0 1138 368" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 32.5C2.5 15.9315 15.9315 2.5 32.5 2.5H1105.5C1122.07 2.5 1135.5 15.9315 1135.5 32.5V230.458C1135.5 247.026 1122.07 260.458 1105.5 260.458H809C792.431 260.458 779 273.889 779 290.458V323.432C779 339.811 765.862 353.163 749.485 353.428L32.9848 365.007C16.2288 365.278 2.5 351.769 2.5 335.011V32.5Z" fill="white" stroke="black" strokeWidth="5"/>
    </svg>
  ),
  "Chief Operations Officer": (
    <svg className="w-full h-auto drop-shadow-sm" viewBox="0 0 1130 475" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M796.988 32.5V54.5V85C796.988 101.569 783.556 115 766.988 115H33.9547C17.5958 115 4.25128 128.066 3.99337 144.422C2.60361 232.559 1.27294 366 4.48775 366H286.011C302.579 366 315.988 379.431 315.988 396V442C315.988 458.569 329.419 472 345.988 472H1094.49C1111.06 472 1124.49 458.569 1124.49 442V32.5C1124.49 15.9315 1111.06 2.5 1094.49 2.5H826.988C810.419 2.5 796.988 15.9315 796.988 32.5Z" fill="#C3ECF6"/>
      {/* The stray artifact M1379.49 95L1388.49 104 was deleted from the start of the path below */}
      <path d="M796.988 54.5V32.5C796.988 15.9315 810.419 2.5 826.988 2.5H1094.49C1111.06 2.5 1124.49 15.9315 1124.49 32.5V442C1124.49 458.569 1111.06 472 1094.49 472H345.988C329.419 472 315.988 458.569 315.988 442V396C315.988 379.431 302.579 366 286.011 366C178.224 366 7.76313 366 4.48775 366C1.27294 366 2.60361 232.559 3.99337 144.422C4.25128 128.066 17.5958 115 33.9547 115H766.988C783.556 115 796.988 101.569 796.988 85V54.5Z" stroke="black" strokeWidth="5"/>
    </svg>
  ),
  "Chief Communications Officer": (
    <svg className="w-full h-auto drop-shadow-sm" viewBox="0 0 1129 373" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1096.5 2.5H32.5C15.9315 2.5 2.5 15.9315 2.5 32.5V340.483C2.5 357.252 16.2462 370.765 33.0129 370.478L762.513 358.004C778.879 357.724 792 344.377 792 328.009V304C792 287.431 805.431 274 822 274H1096.5C1113.07 274 1126.5 260.569 1126.5 244V32.5C1126.5 15.9315 1113.07 2.5 1096.5 2.5Z" fill="#FFE7A5" stroke="black" strokeWidth="5"/>
    </svg>
  ),
  "Chief Technology Officer": (
    <svg className="w-full h-auto drop-shadow-sm" viewBox="0 0 1134 444" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1100.66 2.5H829.163C825.02 2.5 821.663 5.85786 821.663 10V66C821.663 82.5685 808.231 96 791.663 96H32.9654C16.4741 96 3.07414 109.287 2.97988 125.778C2.52335 205.652 2.1048 323.5 3.16258 323.5H277.218C285.779 323.5 292.663 330.44 292.663 339C292.663 347.56 285.723 354.5 277.163 354.5H143.163C131.841 354.5 122.663 363.678 122.663 375C122.663 386.322 131.841 395.5 143.163 395.5H314.163C326.865 395.5 337.163 405.797 337.163 418.5C337.163 431.203 347.46 441.5 360.163 441.5H1100.66C1117.23 441.5 1130.66 428.069 1130.66 411.5V32.5C1130.66 15.9315 1117.23 2.5 1100.66 2.5Z" fill="#F8D8D8" stroke="black" strokeWidth="5"/>
    </svg>
  ),
  "Chief Community Development Officer": (
    <svg className="w-full h-auto drop-shadow-sm" viewBox="0 0 1137 446" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 413V32.5C2.5 15.9315 15.9315 2.5 32.5 2.5H69.7408C85.8168 2.5 99.0637 15.1715 99.4731 31.2422C100.011 52.3403 100.105 73.5 98.5 73.5C95.5 73.5 318.5 78 318.5 73.5V87.4931C318.5 104.062 331.931 117.5 348.5 117.5H1104.5C1121.07 117.5 1134.5 130.931 1134.5 147.5V413C1134.5 429.569 1121.07 443 1104.5 443H32.5C15.9315 443 2.5 429.569 2.5 413Z" fill="#CCF6C5" stroke="black" strokeWidth="5"/>
    </svg>
  )
};

// CUSTOM LAYOUT CONFIG FOR EACH SHAPE Ihate this
const roleLayoutConfig: Record<string, { zIndex: string, margin: string, padding: string, isRight: boolean, imageHeight: string }> = {
  "Chief Executives Officer": {
    zIndex: "z-50",
    margin: "mt-0",
    padding: "pl-[8%] pr-[8%] pt-[4%] pb-[4%]",
    isRight: false,
    imageHeight: "h-[65%] sm:h-[75%]", // Standard size
  },
  "Chief Operations Officer": {
    zIndex: "z-40",
    margin: "-mt-[7%]",
    padding: "pl-[8%] pr-[8%] pt-[8%] pb-[%]",
    isRight: true,
    imageHeight: "h-[65%] sm:h-[75%]", // Standard size
  },
  "Chief Communications Officer": {
    zIndex: "z-30",
    margin: "-mt-[0%]", 
    padding: "pl-[9%] pr-[8%] pt-[8%] pb-[10%]",
    isRight: false,
    imageHeight: "h-[115%] sm:h-[125%]", // Scaled down to fit shallower vector
  },
  "Chief Technology Officer": {
    zIndex: "z-20",
    margin: "-mt-[6%]", 
    padding: "pl-[8%] pr-[9%] pt-[10%] pb-[8%]",
    isRight: true,
    imageHeight: "h-[105%] sm:h-[115%]", // Scaled down to fit shallower vector
  },
  "Chief Community Development Officer": {
    zIndex: "z-10",
    margin: "-mt-[7%]", 
    padding: "pl-[9%] pr-[8%] pt-[14%] pb-[6%]",
    isRight: false,
    imageHeight: "h-[115%] sm:h-[125%]", // Smallest size to clear the large green dip
  }
};

export default function AboutPage() {
  const [current, setCurrent] = useState(0);
  
  // DATABASE & ADMIN STATE 
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null);
  
  // DRAG AND DROP STATE
  const [draggedId, setDraggedId] = useState<number | null>(null);

  // DRAG AND DROP HANDLERS
  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedId(id);
  };

  const handleDrop = async (e: React.DragEvent, targetId: number, deptName: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const deptMembers = officers
      .filter((o) => o.department === deptName)
      .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

    const draggedIdx = deptMembers.findIndex((o) => o.officer_id === draggedId);
    const targetIdx = deptMembers.findIndex((o) => o.officer_id === targetId);

    if (draggedIdx === -1 || targetIdx === -1) return;

    const newDeptMembers = [...deptMembers];
    const [draggedItem] = newDeptMembers.splice(draggedIdx, 1);
    newDeptMembers.splice(targetIdx, 0, draggedItem);

    const updatedMembers = newDeptMembers.map((member, index) => ({
      ...member,
      order_index: index,
    }));

    setOfficers((prev) =>
      prev.map((o) => {
        const updated = updatedMembers.find((u) => u.officer_id === o.officer_id);
        return updated ? updated : o;
      })
    );

    await Promise.all(
      updatedMembers.map((m) =>
        supabase
          .from("Officers")
          .update({ order_index: m.order_index })
          .eq("officer_id", m.officer_id)
      )
    );

    setDraggedId(null);
  };

  // DATA FETCHING
  const fetchData = async () => {
    const { data: officersData, error: officersError } = await supabase.from('Officers').select('*');
    if (officersData) setOfficers(officersData);
    if (officersError) console.error("Error fetching officers:", officersError);

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
              <Image src={src} alt={`carousel-${idx}`} fill className="object-cover" priority={idx === 0} />
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
            <Image src="/group-photo.jpg" alt="GDG members" fill className="object-cover" />
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
        <div className="flex flex-col mb-24 max-w-5xl mx-auto w-full">
          {[
            "Chief Executives Officer",
            "Chief Operations Officer",
            "Chief Communications Officer", 
            "Chief Technology Officer",     
            "Chief Community Development Officer"
          ].map((roleName) => {
            
            const exec = officers.find(o => o.position === roleName && o.department === "Chief Officers");
            const config = roleLayoutConfig[roleName];

            return (
              <div 
                key={roleName} 
                className={`relative w-full flex items-center justify-center ${config.zIndex} ${config.margin}`}
              >
                {/* SVG directly sizes the wrapper */}
                {RoleBackgrounds[roleName]}
        
                {/* Admin Ellipsis */}
                {isAdmin && (
                  <button 
                    onClick={() => openModal(exec || { first_name: "", last_name: "", middle_initial: "", suffix: "", position: roleName, department: "Chief Officers", image: "" })}
                    className="absolute top-[15%] left-[8%] bg-white border-2 border-black rounded-full w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center text-xl lg:text-2xl font-bold hover:bg-gray-200 z-50 shadow-sm"
                  >
                    ⋮
                  </button>
                )}

                {/* Content bounded perfectly over the SVG using percentage paddings */}
                <div className={`absolute inset-0 flex items-center justify-between w-full h-full z-20 pointer-events-none ${config.padding} gap-4 lg:gap-8`}>
                  
                  {/* ... inside the Chief Officers map ... */}

                  {config.isRight ? (
                    <>
                      <div className="flex-1 text-right pointer-events-auto">
                        <h3 className="text-lg md:text-3xl lg:text-4xl leading-tight font-extrabold mb-1 lg:mb-2 text-black">{roleName}</h3>
                        <p className="text-xs md:text-lg lg:text-2xl font-bold text-[#2A2B3A] uppercase">
                          {exec ? formatName(exec) : "To Be Announced"}
                        </p>
                      </div>
                      
                      <div className={`${config.imageHeight} aspect-[4/5] relative rounded-[15px] lg:rounded-[25px] overflow-hidden border-2 lg:border-[3px] border-black flex-shrink-0 bg-white flex items-center justify-center shadow-sm pointer-events-auto`}>
                        {exec?.image ? (
                          <Image src={exec.image} alt={exec.first_name} fill className="object-cover" />
                        ) : (
                          <span className="text-gray-400 font-bold text-xs lg:text-base">No Photo</span>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={`${config.imageHeight} aspect-[4/5] relative rounded-[15px] lg:rounded-[25px] overflow-hidden border-2 lg:border-[3px] border-black flex-shrink-0 bg-white flex items-center justify-center shadow-sm pointer-events-auto`}>
                        {exec?.image ? (
                          <Image src={exec.image} alt={exec.first_name} fill className="object-cover" />
                        ) : (
                          <span className="text-gray-400 font-bold text-xs lg:text-base">No Photo</span>
                        )}
                      </div>

                      <div className="flex-1 text-left pointer-events-auto">
                        <h3 className="text-lg md:text-3xl lg:text-4xl leading-tight font-extrabold mb-1 lg:mb-2 text-black">{roleName}</h3>
                        <p className="text-xs md:text-lg lg:text-2xl font-bold text-[#2A2B3A] uppercase">
                          {exec ? formatName(exec) : "To Be Announced"}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/*Horizontal Team Scrollers (Headers always visible) */}
        <div className="space-y-16">
          {teamDepartments.map((dept, deptIndex) => {
            const deptOfficers = officers
              .filter(o => o.department === dept.name)
              .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
            
            return (
              <div key={deptIndex} className="w-full">
                <h3 className="text-4xl font-bold mb-8 pl-4">{dept.name} Team</h3>
                
                {deptOfficers.length === 0 ? (
                  <div className="px-4 py-8 border-4 border-dashed border-gray-300 rounded-[30px] text-center text-gray-500 font-bold text-xl">
                    No members added to the {dept.name} team yet.
                  </div>
                ) : (
                  <div className="flex overflow-x-auto pb-8 gap-6 px-4 snap-x items-center">
                    {deptOfficers.map((member) => (
                      <div 
                        key={member.officer_id} 
                        draggable={isAdmin}
                        onDragStart={(e) => member.officer_id && handleDragStart(e, member.officer_id)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => member.officer_id && handleDrop(e, member.officer_id, dept.name)}
                        className={`relative snap-start flex-shrink-0 w-80 lg:w-96 h-[550px] flex flex-col p-6 ${dept.bg} border-4 border-black rounded-[50px] ${isAdmin ? 'cursor-grab active:cursor-grabbing' : ''}`}
                      >
                        {isAdmin && (
                          <button 
                            onClick={() => openModal(member)}
                            className="absolute top-6 right-6 bg-white border-2 border-black rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold hover:bg-gray-200 z-20"
                          >
                            ⋮
                          </button>
                        )}

                        <div className="w-full h-[75%] relative rounded-[25px] overflow-hidden border-2 border-black bg-white flex items-center justify-center pointer-events-none">
                          {member.image ? (
                            <Image src={member.image} alt={member.first_name} fill className="object-cover" />
                          ) : (
                            <span className="text-gray-400 font-bold">No Photo</span>
                          )}
                        </div>
                        
                        <div className="w-full h-[25%] flex flex-col items-center justify-center text-center px-2 pointer-events-none">
                          <p className="text-lg lg:text-xl font-bold mb-1 line-clamp-2 leading-tight text-gray-800">{member.position}</p>
                          <p className="text-xl lg:text-2xl line-clamp-2 leading-tight px-1">{formatName(member)}</p>
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

      <OfficerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchData} 
        existingOfficer={editingOfficer} 
      />
    </div>
  );
}