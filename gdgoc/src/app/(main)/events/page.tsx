"use client";
import { useState } from "react";
import Image from "next/image";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const previousEvents = [
    {
      id: 0,
      title: "𝗚𝗗𝗚𝗼𝗖 𝗠𝗨'𝘀 𝗚𝗼𝗼𝗴𝗹𝗲 𝗦𝘆𝗻𝗰",
      desc: "Our official Onboarding Session! Welcome to the new batch of developers. Join us as we explore the exciting path ahead for GDGoC Mapúa University, connecting and growing our campus network. We had amazing seminars, team-building exercises, and introduced everyone to the core Google Dev technologies we'll be using this year.",
      image: "/events/sync-2.jpg",
      date: "February 21, 2026"
    },
    {
      id: 1,
      title: "BX AI Tukod",
      desc: "Innovation in Progress: An exploration into AI technologies. Students gathered to witness the power of modern machine learning models, training pipelines, and real-world deployment scenarios. We had an exclusive look at how AI is shaping the future of web development and software engineering overall.",
      image: "/events/tukod-1.jpg",
      date: "Recent Event"
    },
    {
      id: 2,
      title: "BX AI Workshops",
      desc: "Following our Tukod event, we launched deep-dive hands-on workshops where members built their own generative AI integrations to live applications. Huge thanks to everyone who participated and made it a memorable coding weekend!",
      image: "/events/tukod-2.jpg",
      date: "Recent Event"
    }
  ];

  return (
    <main className="min-h-screen bg-white text-black font-sans pb-20">
      <div className="mx-auto max-w-4xl px-8 pt-28 md:pt-32">
        
        {/* --- HERO ILLUSTRATION --- */}
        <div className="w-full flex justify-center mb-16 sm:mb-20 relative z-0">
          <div className="w-full md:w-[90%] aspect-[16/9] relative flex items-center justify-center mt-8">
            {/* The {Events} Title mimicking the top right text of the hero graphic */}
            <h1 className="absolute -top-10 -right-4 md:-top-12 md:-right-4 text-[48px] sm:text-[64px] md:text-[80px] font-bold leading-none z-10 flex items-center">
              <span className="text-[#EA4335]" style={{ WebkitTextStroke: "3.5px black", paddingRight: "4px", marginTop: "-6px" }}>&#123;</span>
              <span className="text-black tracking-tight">Events</span>
              <span className="text-[#EA4335]" style={{ WebkitTextStroke: "3.5px black", paddingLeft: "4px", marginTop: "-6px" }}>&#125;</span>
            </h1>

            <Image src="/events/coverpage.png" alt="Events Hero Graphic" fill className="object-contain" priority />
          </div>
        </div>

        {/* --- WHAT TO EXPECT --- */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-[40px] sm:text-[54px] font-extrabold mb-8 tracking-tight text-black leading-tight">
            What to expect?
          </h2>
          <div className="space-y-6 text-[17px] sm:text-[19px] font-bold leading-[1.6] max-w-3xl text-black">
            <p>
              At Google Developer Groups on Campus Mapua University, students grow 
              to be innovators through technological solutions.
            </p>
            <p>
              GDGoC hosts seminars, hackathons, and other student gatherings that 
              develop the skills of its members with Google technologies and platforms.
            </p>
            <p>
              See you there, Ka-Devs!
            </p>
          </div>
        </section>

        {/* --- CURRENT EVENTS CAED --- */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-[40px] sm:text-[54px] font-extrabold mb-8 tracking-tight text-black leading-tight">
            Current Events
          </h2>
          
          {/* Custom Card Art mimicking Figma strictly */}
          <div className="relative w-full aspect-[1.3/1] sm:aspect-[2/1] border-[3px] border-black rounded-[2rem] bg-[#FAEDC6] overflow-visible shadow-[0px_4px_4px_rgba(0,0,0,0.1)] flex items-center justify-center">
            
            {/* Green circles decoration */}
            <div className="absolute top-5 sm:top-8 left-6 sm:left-8 flex gap-3 sm:gap-4 z-0">
                <div className="w-12 h-12 sm:w-[72px] sm:h-[72px] rounded-full bg-[#67C373] shadow-[inset_-2px_-4px_6px_rgba(0,0,0,0.1),_2px_4px_4px_rgba(0,0,0,0.15)] opacity-95 border-b border-r border-[#53a55e]"></div>
                <div className="w-12 h-12 sm:w-[72px] sm:h-[72px] rounded-full bg-[#67C373] shadow-[inset_-2px_-4px_6px_rgba(0,0,0,0.1),_2px_4px_4px_rgba(0,0,0,0.15)] opacity-95 border-b border-r border-[#53a55e]"></div>
                <div className="w-12 h-12 sm:w-[72px] sm:h-[72px] rounded-full bg-[#67C373] shadow-[inset_-2px_-4px_6px_rgba(0,0,0,0.1),_2px_4px_4px_rgba(0,0,0,0.15)] opacity-95 border-b border-r border-[#53a55e]"></div>
            </div>

            {/* Blue shape decoration (L-shape) */}
            <div className="absolute bottom-0 left-6 sm:left-12 w-20 sm:w-32 h-[120px] sm:h-[180px] bg-[#709DF2] shadow-[3px_3px_5px_rgba(0,0,0,0.2)] rounded-t-2xl z-0 border border-[#5281d6]"></div>
            <div className="absolute bottom-0 left-16 sm:left-32 w-28 sm:w-48 h-14 sm:h-[80px] bg-[#709DF2] shadow-[3px_3px_5px_rgba(0,0,0,0.2)] rounded-tr-3xl z-0 border-t border-r border-[#5281d6]"></div>
            <div className="absolute bottom-16 sm:bottom-28 left-20 sm:left-40 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#709DF2] shadow-[2px_2px_4px_rgba(0,0,0,0.2)] border border-[#5281d6] z-10"></div>

            {/* Yellow shape top right */}
            <div className="absolute top-0 right-16 sm:right-[120px] w-[80px] sm:w-[140px] h-12 sm:h-20 bg-[#EFBD46] shadow-[0_4px_4px_rgba(0,0,0,0.15)] rounded-b-2xl z-0 border-b border-x border-[#co9838]"></div>
            <div className="absolute top-0 right-[120px] sm:right-[240px] w-12 sm:w-24 h-6 sm:h-8 bg-[#EFBD46] shadow-[0_4px_4px_rgba(0,0,0,0.15)] rounded-b-xl z-0 border-b border-x border-[#co9838]"></div>

            {/* Red shapes bottom right */}
            <div className="absolute bottom-[-2px] right-12 sm:right-24 flex gap-4 sm:gap-6 z-0">
                 <div className="w-[50px] h-[80px] sm:w-[70px] sm:h-[120px] bg-[#D27E70] transform skew-x-[-25deg] shadow-[2px_4px_6px_rgba(0,0,0,0.25)] border-l-[1px] border-[#b06a5e] border-t border-r rounded-sm overflow-hidden"></div>
                 <div className="w-[50px] h-[80px] sm:w-[70px] sm:h-[120px] bg-[#D27E70] transform skew-x-[-25deg] shadow-[2px_4px_6px_rgba(0,0,0,0.25)] border-l-[1px] border-[#b06a5e] border-t border-r rounded-sm overflow-hidden"></div>
            </div>

            {/* Title Text */}
            <div className="relative z-10 text-center px-4 w-full h-full flex flex-col items-center justify-center">
               <h3 className="text-[36px] sm:text-[48px] md:text-[56px] font-medium text-black tracking-tight mt-4">
                   Event Title
               </h3>
            </div>
            
            {/* Register button overlapping container edge */}
            <div className="absolute -bottom-5 sm:-bottom-7 left-4 sm:left-12 z-20">
              <button className="bg-[#4285F4] text-white px-8 sm:px-10 py-3 sm:py-3.5 rounded-full border-[3px] border-black font-extrabold text-[18px] sm:text-[22px] shadow-none hover:scale-[1.02] hover:shadow-[3px_4px_0px_rgba(0,0,0,1)] transition-all">
                  Register
              </button>
            </div>
          </div>

          <div className="mt-12 text-[16px] sm:text-[18px] font-bold leading-relaxed max-w-[95%] text-black tracking-tight">
            <p>
              event description event description event descriptions event description 
              event description event descriptions event description event description 
              event descriptions event description event description event descriptions 
            </p>
          </div>
        </section>

        {/* --- PREVIOUS EVENTS --- */}
        <section>
          <h2 className="text-[40px] sm:text-[54px] font-extrabold mb-6 tracking-tight text-black leading-tight">
            Previous Events
          </h2>
          
          {/* Tabs / Pills */}
          <div className="flex gap-3 sm:gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
             {previousEvents.map((event, idx) => (
                <button 
                  key={event.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-5 sm:px-6 py-1.5 sm:py-2 rounded-full text-black font-bold text-[14px] sm:text-[15px] whitespace-nowrap transition-colors
                    ${activeTab === idx ? 'bg-[#CBEBCD] border border-[#a2d8a5]' : 'bg-[#E0E0E0] hover:bg-[#d6d6d6]'}`}
                >
                  Event {idx + 1}
                </button>
             ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-20">
              
              {/* Left Column: Image Box */}
              <div className="relative w-full aspect-square md:aspect-[1/1] rounded-[2rem] border-[3px] border-black overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-white p-3">
                  <div className="relative w-full h-full rounded-[1.4rem] overflow-hidden">
                    <Image 
                      src={previousEvents[activeTab].image} 
                      alt={previousEvents[activeTab].title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
              </div>

              {/* Right Column: Folder Tab Box */}
              <div className="relative w-full flex flex-col pt-8 sm:pt-10 min-h-[350px]">
                 
                 {/* Folder Tab */}
                 <div className="absolute top-0 left-0 w-[55%] sm:w-[50%] h-12 sm:h-[50px] bg-[#FCEEB5] border-[3px] border-black border-b-0 rounded-t-2xl z-20 flex items-center px-6">
                    <h4 className="text-[20px] sm:text-[22px] font-extrabold text-black mt-2">Event {activeTab + 1}</h4>
                 </div>
                 
                 {/* Folder Body */}
                 <div className="flex-1 bg-[#FCEEB5] border-[3px] border-black rounded-[2rem] rounded-tl-none p-6 sm:p-8 z-10 relative shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col justify-start overflow-hidden">
                    
                    {/* Hides the bottom border of the tab to make it a continuous folder shape */}
                    <div className="absolute top-[-3px] left-0 w-[calc(55%-3px)] sm:w-[calc(50%-3px)] h-[6px] bg-[#FCEEB5] z-10"></div>
                    
                    <p className="text-[12.5px] sm:text-[13.5px] text-black font-semibold leading-[1.65] relative z-30 tracking-tight mt-2 text-justify">
                       {/* Hardcoded Lorem Ipsum to perfectly match the Figma screenshot faithfully */}
                       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                       feugiat cursus diam, id convallis ipsum vestibulum vitae. In id
                       tortor hendrerit, blandit ex et, accumsan libero. Fusce
                       fermentum tristique dignissim. Ut volutpat rutrum neque eget
                       vehicula. Quisque sagittis sit amet velit ac dignissim. Fusce
                       eget ex venenatis, fringilla neque feugiat, blandit nisl. Nulla
                       facilisi. Phasellus lobortis mollis mi in tincidunt. Nunc
                       imperdiet convallis ipsum, a malesuada augue fringilla et. Duis
                       tristique tortor vitae euismod mattis. Nam quis lorem vitae
                       urna congue viverra eu a lectus. Fusce aliquet nisi sed gravida
                       viverra. Phasellus accumsan tempus iaculis. Duis mattis lacus
                       vitae commodo mollis. Praesent porttitor velit a mi imperdiet
                       bibendum.
                    </p>
                 </div>

              </div>
          </div>
        </section>

      </div>
    </main>
  );
}
