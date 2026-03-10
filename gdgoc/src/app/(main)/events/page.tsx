import Image from "next/image";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#efefef] text-black font-sans pb-20">
      <div className="mx-auto max-w-[1280px] px-8 md:px-12 lg:px-16">
        
        {/* Title Section */}
        <header className="mb-20 pt-32 md:pt-40">
          <h1 className="text-[72px] md:text-[96px] font-extrabold leading-none text-black">
            <span className="text-[#34A853]" style={{ WebkitTextStroke: "3px black" }}>&#123;</span>
            Events
            <span className="text-[#34A853]" style={{ WebkitTextStroke: "3px black" }}>&#125;</span>
          </h1>
        </header>

        {/* Featured Upcoming Event */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold mb-8 text-black">Featured Event</h2>
          <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden border-4 border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            
            {/* Image Placeholder */}
            <div className="md:w-1/2 min-h-[300px] md:min-h-auto bg-[#F4B400] flex items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-black relative">
              <Image src="/events/sync-1.jpg" alt="Google Sync Cover" fill className="object-cover" />
            </div>
            
            <div className="md:w-1/2 p-10 flex flex-col justify-center">
              <div className="text-lg font-bold text-[#EA4335] mb-3 tracking-wide uppercase">
                February 21, 2026
              </div>
              <h3 className="text-4xl font-extrabold mb-4 text-black">𝗚𝗗𝗚𝗼𝗖 𝗠𝗨'𝘀 𝗚𝗼𝗼𝗴𝗹𝗲 𝗦𝘆𝗻𝗰</h3>
              <p className="text-black text-lg mb-8 leading-relaxed font-medium">
                Our official Onboarding Session! Welcome to the new batch of developers. Join us as we explore the exciting path ahead for GDGoC Mapúa University.
              </p>
              <button className="self-start px-8 py-3 bg-[#4285F4] text-white border-2 border-black font-extrabold text-lg rounded-full hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">
                View Album
              </button>
            </div>
          </div>
        </section>

        {/* Past/Other Events Grid */}
        <section>
          <h2 className="text-3xl font-extrabold mb-8 text-black">Event Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Event Card 1 */}
            <div className="flex flex-col rounded-2xl overflow-hidden border-4 border-black bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              <div className="w-full aspect-[4/3] bg-[#34A853] border-b-4 border-black flex items-center justify-center p-4 text-center relative">
                <Image src="/events/sync-2.jpg" alt="Google Sync Highlight" fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="text-sm font-bold text-[#4285F4] mb-2 uppercase tracking-wider">February 21, 2026</div>
                <h4 className="text-2xl font-extrabold mb-2 text-black">Google Sync Highlight</h4>
                <p className="text-black font-medium">
                  Connecting and growing our campus network.
                </p>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="flex flex-col rounded-2xl overflow-hidden border-4 border-black bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              <div className="w-full aspect-[4/3] bg-[#EA4335] border-b-4 border-black flex items-center justify-center p-4 text-center relative">
                 <Image src="/events/tukod-1.jpg" alt="BX AI Tukod Highlight" fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="text-sm font-bold text-[#4285F4] mb-2 uppercase tracking-wider">Recent</div>
                <h4 className="text-2xl font-extrabold mb-2 text-black">BX AI Tukod</h4>
                <p className="text-black font-medium">
                   Innovation in Progress: An exploration into AI technologies.
                </p>
              </div>
            </div>

            {/* Event Card 3 */}
            <div className="flex flex-col rounded-2xl overflow-hidden border-4 border-black bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              <div className="w-full aspect-[4/3] bg-[#4285F4] border-b-4 border-black flex items-center justify-center p-4 text-center relative">
                 <Image src="/events/tukod-2.jpg" alt="BX AI Tukod Highlight" fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="text-sm font-bold text-[#4285F4] mb-2 uppercase tracking-wider">Recent</div>
                <h4 className="text-2xl font-extrabold mb-2 text-black">AI Workshops</h4>
                <p className="text-black font-medium">
                  Hands-on learning sessions defining the next era of development.
                </p>
              </div>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}
