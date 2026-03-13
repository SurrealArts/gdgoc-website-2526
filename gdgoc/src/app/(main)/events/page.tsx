"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { useUser } from "@/app/(main)/components/UserProvider";

type EventItem = {
  id: number;
  title: string;
  desc: string;
  image: string;
  date: string;
};

type EditScope = "current" | "previous";

const initialPreviousEvents: EventItem[] = [
  {
    id: 0,
    title: "GDGoC MU's Google Sync",
    desc: "Our official Onboarding Session! Welcome to the new batch of developers. Join us as we explore the exciting path ahead for GDGoC Mapúa University, connecting and growing our campus network. We had amazing seminars, team-building exercises, and introduced everyone to the core Google Dev technologies we'll be using this year.",
    image: "/events/sync-2.jpg",
    date: "February 21, 2026",
  },
  {
    id: 1,
    title: "BX AI Tukod",
    desc: "Innovation in Progress: An exploration into AI technologies. Students gathered to witness the power of modern machine learning models, training pipelines, and real-world deployment scenarios. We had an exclusive look at how AI is shaping the future of web development and software engineering overall.",
    image: "/events/tukod-1.jpg",
    date: "Recent Event",
  },
  {
    id: 2,
    title: "BX AI Workshops",
    desc: "Following our Tukod event, we launched deep-dive hands-on workshops where members built their own generative AI integrations to live applications. Huge thanks to everyone who participated and made it a memorable coding weekend!",
    image: "/events/tukod-2.jpg",
    date: "Recent Event",
  },
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const { isAdmin, loading: userLoading } = useUser();
  const [currentEvent, setCurrentEvent] = useState<EventItem>({
    id: 999,
    title: "Event Title",
    desc:
      "event description event description event descriptions event description event description event descriptions event description event description event descriptions event description event description event descriptions",
    image: "/events/coverpage.png",
    date: "TBA",
  });
  const [previousEvents, setPreviousEvents] = useState<EventItem[]>(initialPreviousEvents);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editScope, setEditScope] = useState<EditScope>("current");
  const [editForm, setEditForm] = useState({
    title: "",
    desc: "",
    date: "",
    image: "",
  });

  const activePreviousEvent = useMemo(
    () => previousEvents[activeTab] ?? previousEvents[0],
    [activeTab, previousEvents]
  );

  function openEditor(scope: EditScope) {
    if (!isAdmin) return;
    const source = scope === "current" ? currentEvent : activePreviousEvent;
    if (!source) return;

    setEditScope(scope);
    setEditForm({
      title: source.title,
      desc: source.desc,
      date: source.date,
      image: source.image,
    });
    setIsEditorOpen(true);
  }

  function saveEventChanges() {
    if (editScope === "current") {
      setCurrentEvent((prev) => ({ ...prev, ...editForm }));
    } else {
      setPreviousEvents((prev) =>
        prev.map((event, index) =>
          index === activeTab ? { ...event, ...editForm } : event
        )
      );
    }

    setIsEditorOpen(false);
  }

  return (
    <main className="min-h-screen bg-white text-black pb-20">
      <div className="mx-auto max-w-4xl px-8 pt-28 md:pt-32">
        {!userLoading && isAdmin && (
          <div className="mb-8 flex items-center justify-end">
            <span className="rounded-full border border-black bg-[#FABC04] px-4 py-1 text-xs font-bold uppercase tracking-wide text-black">
              Admin Mode
            </span>
          </div>
        )}
        
        {/* --- HERO ILLUSTRATION --- */}
        <div className="w-full flex justify-center mb-16 sm:mb-20 px-4">
          
          {/* Master relative wrapper based directly on Union.png proportions */}
          <div className="relative w-full max-w-[1091px] mt-12 aspect-[1091/525]">
            
            {/* The Unified Background Image from Figma */}
            <div className="absolute inset-0 z-0">
              <Image 
                src="/events/Union.png" 
                alt="Events Hero Graphic" 
                fill
                className="object-contain" 
                priority 
              />
            </div>

            {/* {Events} text sits directly on the Union top-right white cutout */}
            <h1 className="absolute right-[-10.5%] top-[3.1%] z-20 text-[30px] sm:text-[44px] md:text-[64px] font-black leading-none flex items-center tracking-tight">
              <span className="text-[#EA4335] [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:3px_black] mr-1" style={{ paintOrder: 'stroke fill' }}>&#123;</span>
              <span className="text-black inline-block">Events</span>
              <span className="text-[#EA4335] [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:3px_black] ml-1" style={{ paintOrder: 'stroke fill' }}>&#125;</span>
            </h1>

            {/* Three yellow dots aligned to the bottom-left white cutout */}
            <div className="absolute left-[-8.5%] bottom-[-10%] flex z-10">
              <div className="w-[44px] h-[44px] sm:w-[58px] sm:h-[58px] md:w-[92px] md:h-[92px] bg-[#FABC04] rounded-full border-[3px] border-black"></div>
              <div className="w-[44px] h-[44px] sm:w-[58px] sm:h-[58px] md:w-[92px] md:h-[92px] bg-[#FABC04] rounded-full border-[3px] border-black -ml-[3px]"></div>
              <div className="w-[44px] h-[44px] sm:w-[58px] sm:h-[58px] md:w-[92px] md:h-[92px] bg-[#FABC04] rounded-full border-[3px] border-black -ml-[3px]"></div>
            </div>

          </div>
        </div>

        {/* --- WHAT TO EXPECT --- */}
        <section className="mb-16 sm:mb-20">
          <h2 className="mb-8 text-4xl font-black leading-tight tracking-tight text-black sm:text-[54px]">
            What to expect?
          </h2>
          <div className="max-w-3xl space-y-5 text-lg font-normal leading-relaxed text-gray-700 sm:text-[20px]">
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
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-4xl font-black tracking-tight text-black leading-tight sm:text-[54px]">
              Current Events
            </h2>
            {!userLoading && isAdmin && (
              <button
                type="button"
                onClick={() => openEditor("current")}
                className="rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-100"
              >
                Edit Current
              </button>
            )}
          </div>
          
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
                 <h3 className="mt-4 text-[36px] font-bold tracking-tight text-black sm:text-[48px] md:text-[56px]">
                   {currentEvent.title}
               </h3>
               <p className="mt-3 rounded-full bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-wide">
                 {currentEvent.date}
               </p>
            </div>
            
            {/* Register button overlapping container edge */}
            <div className="absolute -bottom-5 sm:-bottom-7 left-4 sm:left-12 z-20">
              <button className="bg-[#4285F4] text-white px-8 sm:px-10 py-3 sm:py-3.5 rounded-full border-[3px] border-black font-extrabold text-[18px] sm:text-[22px] shadow-none hover:scale-[1.02] hover:shadow-[3px_4px_0px_rgba(0,0,0,1)] transition-all">
                  Register
              </button>
            </div>
          </div>

          <div className="mt-12 max-w-[95%] text-base font-normal leading-relaxed tracking-tight text-gray-700 sm:text-lg">
            <p>
              {currentEvent.desc}
            </p>
          </div>
        </section>

        {/* --- PREVIOUS EVENTS --- */}
        <section>
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-4xl font-black tracking-tight text-black leading-tight sm:text-[54px]">
              Previous Events
            </h2>
            {!userLoading && isAdmin && (
              <button
                type="button"
                onClick={() => openEditor("previous")}
                className="rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-100"
              >
                Edit Selected
              </button>
            )}
          </div>
          
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
                      src={activePreviousEvent?.image || "/events/coverpage.png"} 
                      alt={activePreviousEvent?.title || "Previous Event"} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
              </div>

              {/* Right Column: Folder Tab Box */}
              <div className="relative w-full flex flex-col pt-8 sm:pt-10 min-h-[350px]">
                 
                 {/* Folder Tab */}
                 <div className="absolute top-0 left-0 w-[55%] sm:w-[50%] h-12 sm:h-[50px] bg-[#FCEEB5] border-[3px] border-black border-b-0 rounded-t-2xl z-20 flex items-center px-6">
                        <h4 className="mt-2 text-[16px] font-bold leading-tight text-black sm:text-[18px]">{activePreviousEvent?.title || `Event ${activeTab + 1}`}</h4>
                 </div>
                 
                 {/* Folder Body */}
                 <div className="flex-1 bg-[#FCEEB5] border-[3px] border-black rounded-[2rem] rounded-tl-none p-6 sm:p-8 z-10 relative shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col justify-start overflow-hidden">
                    
                    {/* Hides the bottom border of the tab to make it a continuous folder shape */}
                    <div className="absolute top-[-3px] left-0 w-[calc(55%-3px)] sm:w-[calc(50%-3px)] h-[6px] bg-[#FCEEB5] z-10"></div>
                    
                    <p className="relative z-30 mt-2 text-justify text-[13px] font-normal leading-relaxed tracking-tight text-gray-700 sm:text-[14px]">
                      {activePreviousEvent?.date && (
                        <span className="mb-3 inline-block rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-black">
                          {activePreviousEvent.date}
                        </span>
                      )}
                      <span className="block">{activePreviousEvent?.desc || "No description available."}</span>
                    </p>
                 </div>

              </div>
          </div>
        </section>

      </div>

      {isEditorOpen && isAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-xl rounded-2xl border-4 border-black bg-white p-6 shadow-xl">
            <h3 className="text-2xl font-black text-black">
              Edit {editScope === "current" ? "Current Event" : `Previous Event ${activeTab + 1}`}
            </h3>
            <p className="mt-1 text-sm text-zinc-600">
              Admin-only edit panel for Events content preview.
            </p>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-black">Title</span>
                <input
                  value={editForm.title}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-lg border-2 border-black px-3 py-2 text-sm text-black"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-black">Date</span>
                <input
                  value={editForm.date}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, date: e.target.value }))}
                  className="w-full rounded-lg border-2 border-black px-3 py-2 text-sm text-black"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-black">Image Path</span>
                <input
                  value={editForm.image}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, image: e.target.value }))}
                  className="w-full rounded-lg border-2 border-black px-3 py-2 text-sm text-black"
                  placeholder="/events/your-image.jpg"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-black">Description</span>
                <textarea
                  value={editForm.desc}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, desc: e.target.value }))}
                  className="min-h-32 w-full rounded-lg border-2 border-black px-3 py-2 text-sm text-black"
                />
              </label>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="rounded-full border-2 border-black px-5 py-2 text-sm font-bold hover:bg-zinc-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEventChanges}
                className="rounded-full border-2 border-black bg-[#4285F4] px-5 py-2 text-sm font-bold text-white hover:bg-[#3367d6]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
