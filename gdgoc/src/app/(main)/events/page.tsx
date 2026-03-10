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
          <h2 className="text-3xl font-extrabold mb-8 text-black">Upcoming Event</h2>
          <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden border-4 border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            
            {/* Image Placeholder */}
            <div className="md:w-1/2 min-h-[300px] md:min-h-auto bg-[#F4B400] flex items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-black relative">
              <span className="text-black font-extrabold justify-center text-xl text-center px-4">
                [Featured Event Image Placeholder]
              </span>
            </div>
            
            <div className="md:w-1/2 p-10 flex flex-col justify-center">
              <div className="text-lg font-bold text-[#EA4335] mb-3 tracking-wide uppercase">
                March 25, 2026 • 2:00 PM
              </div>
              <h3 className="text-4xl font-extrabold mb-4 text-black">DevFest On Campus 2026</h3>
              <p className="text-black text-lg mb-8 leading-relaxed font-medium">
                Our biggest annual tech conference featuring talks on Web Development, AI, and Cloud Architecture. 
                Don't miss out on hands-on codelabs and networking opportunities with industry experts.
              </p>
              <button className="self-start px-8 py-3 bg-[#4285F4] text-white border-2 border-black font-extrabold text-lg rounded-full hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">
                Register Now
              </button>
            </div>
          </div>
        </section>

        {/* Past/Other Events Grid */}
        <section>
          <h2 className="text-3xl font-extrabold mb-8 text-black">Recent Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Event Card 1 */}
            <div className="flex flex-col rounded-2xl overflow-hidden border-4 border-black bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              <div className="w-full aspect-[4/3] bg-[#34A853] border-b-4 border-black flex items-center justify-center p-4 text-center">
                <span className="text-black font-extrabold text-xl">
                  [Event Image 1]
                </span>
              </div>
              <div className="p-6">
                <div className="text-sm font-bold text-[#4285F4] mb-2 uppercase tracking-wider">February 10, 2026</div>
                <h4 className="text-2xl font-extrabold mb-2 text-black">Supabase Study Jam</h4>
                <p className="text-black font-medium">
                  A deep dive into building full-stack applications using Next.js and Supabase features.
                </p>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="flex flex-col rounded-2xl overflow-hidden border-4 border-black bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              <div className="w-full aspect-[4/3] bg-[#EA4335] border-b-4 border-black flex items-center justify-center p-4 text-center">
                <span className="text-black font-extrabold text-xl">
                  [Event Image 2]
                </span>
              </div>
              <div className="p-6">
                <div className="text-sm font-bold text-[#4285F4] mb-2 uppercase tracking-wider">January 15, 2026</div>
                <h4 className="text-2xl font-extrabold mb-2 text-black">Info Session 2026</h4>
                <p className="text-black font-medium">
                  Welcoming new members to the GDGoC Mapúa community with games, setups, and an orientation.
                </p>
              </div>
            </div>

            {/* Event Card 3 */}
            <div className="flex flex-col rounded-2xl overflow-hidden border-4 border-black bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              <div className="w-full aspect-[4/3] bg-[#4285F4] border-b-4 border-black flex items-center justify-center p-4 text-center">
                <span className="text-black font-extrabold text-xl">
                  [Event Image 3]
                </span>
              </div>
              <div className="p-6">
                <div className="text-sm font-bold text-[#4285F4] mb-2 uppercase tracking-wider">December 5, 2025</div>
                <h4 className="text-2xl font-extrabold mb-2 text-black">AI / ML Workshop</h4>
                <p className="text-black font-medium">
                  Getting started with building machine learning models using TensorFlow.
                </p>
              </div>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}
