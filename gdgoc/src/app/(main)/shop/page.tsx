export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#efefef]">
      <section className="mx-auto max-w-[1280px] px-8 pt-40 pb-10 md:px-12 lg:px-16">
        <div className="flex justify-center">
          <div className="relative w-[900px]">
            <h1 className="absolute left-[15px] top-[20px] text-[60px] font-extrabold leading-none text-black">
                <span className="text-[#F15A24] [text-stroke:2px_black] [-webkit-text-stroke:2px_black]">
                    &#123;
                </span>
                Shop
                <span className="text-[#F15A24] [text-stroke:2px_black] [-webkit-text-stroke:2px_black]">
                    &#125;
                </span>
            </h1>

            <img
              src="/shop.svg"
              alt="Shop hero"
              className="block h-auto w-full"
            />

            <div className="absolute bottom-[5px] right-[8px] flex gap-5">
              <span className="h-19 w-19 rounded-full border-[4px] border-black bg-[#F4B400]" />
              <span className="h-19 w-19 rounded-full border-[4px] border-black bg-[#F4B400]" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}