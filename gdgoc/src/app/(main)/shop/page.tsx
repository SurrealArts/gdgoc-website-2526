import { supabase } from "@/app/utils/supabase/client";

type Product = {
  product_id: string;
  name: string;
  description: string | null;
  price: number;
  type: string | null;
  is_out_of_stock: boolean | null;
  created_at: string;
  image_path?: string | null;
  visible: boolean | null;
};

const ProductImagePlaceholder = () => (
  <div className="flex h-full w-full items-center justify-center rounded bg-[#1a1a1a]">
    <svg viewBox="0 0 60 60" className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="14" stroke="#4285F4" strokeWidth="3" fill="none" />
      <path d="M30 16 L30 44" stroke="#EA4335" strokeWidth="2.5" />
      <path d="M16 30 L44 30" stroke="#FBBC05" strokeWidth="2.5" />
      <circle cx="30" cy="30" r="4" fill="#34A853" />
    </svg>
  </div>
);

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(price);
}

function getProductImageUrl(imagePath?: string | null) {
  if (!imagePath) return null;

  const cleanPath = imagePath.replace(/^\/+/, "");
  const { data } = supabase.storage.from("Shop Photos").getPublicUrl(cleanPath);
  return data.publicUrl;
}

export default async function ShopPage() {
  const { data, error } = await supabase
    .from("Products")
    .select("product_id, name, description, price, type, is_out_of_stock, created_at, image_path, visible")
    .eq("is_out_of_stock", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
  }

  const products: Product[] = data ?? [];
  const featuredProduct = products[2] ?? null;
  const checkThisOut = products.filter((product) => product.visible === true);

  return (
    <main className="min-h-screen bg-[#efefef]">
      {/* ── Hero section ── */}
      <section className="mx-auto max-w-[1280px] px-8 pt-40 pb-10 md:px-12 lg:px-16">
        <div className="flex justify-center">
          <div className="relative w-[900px]">
            <h1 className="absolute left-[20px] top-[20px] text-[60px] font-extrabold leading-none text-black">
              <span className="text-[#F15A24]" style={{ WebkitTextStroke: "2px black" }}>
                &#123;
              </span>
              Shop
              <span className="text-[#F15A24]" style={{ WebkitTextStroke: "2px black" }}>
                &#125;
              </span>
            </h1>

            <img src="/shop.svg" alt="Shop hero" className="block h-auto w-full" />

            <div className="absolute bottom-[5px] right-[8px] flex gap-5">
              <span className="h-[76px] w-[76px] rounded-full border-[4px] border-black bg-[#F4B400]" />
              <span className="h-[76px] w-[76px] rounded-full border-[4px] border-black bg-[#F4B400]" />
            </div>
          </div>
        </div>

        {/* ── Gear Up section ── */}
        <div className="mx-auto mt-14 flex w-[900px] items-start justify-between">
          <div className="ml-[10px] max-w-[430px]">
            <h2 className="text-[54px] font-extrabold leading-[1.02] text-black">
              <span className="block">Gear Up Like a</span>
              <span className="block">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
                <span className="text-[#4285F4]">r</span>
              </span>
            </h2>

            <p className="mt-6 text-[18px] leading-[1.35] text-black">
              Show off your developer spirit with official Google Dev merch.
              High-quality, comfy, and made for coders like you.
            </p>
          </div>

          <div className="w-[300px]">
            <svg
              viewBox="0 0 515 684"
              className="h-auto w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="shop-box-mask" fill="white">
                <path d="M465 0C492.614 0 515 22.3858 515 50V634C515 661.614 492.614 684 465 684H308C280.386 684 258 661.614 258 634V605.385C258 577.771 235.614 555.385 208 555.385H50C22.3858 555.385 0 532.999 0 505.385V50C0 22.3858 22.3858 0 50 0H465Z" />
              </mask>
              <path
                d="M465 0C492.614 0 515 22.3858 515 50V634C515 661.614 492.614 684 465 684H308C280.386 684 258 661.614 258 634V605.385C258 577.771 235.614 555.385 208 555.385H50C22.3858 555.385 0 532.999 0 505.385V50C0 22.3858 22.3858 0 50 0H465Z"
                fill="#D9D9D9"
              />
              <path
                d="M515 50H511V634H515H519V50H515ZM465 684V680H308V684V688H465V684ZM258 634H262V605.385H258H254V634H258ZM208 555.385V551.385H50V555.385V559.385H208V555.385ZM0 505.385H4V50H0H-4V505.385H0ZM50 0V4H465V0V-4H50V0ZM0 50H4C4 24.5949 24.5949 4 50 4V0V-4C20.1766 -4 -4 20.1766 -4 50H0ZM50 555.385V551.385C24.5949 551.385 4 530.79 4 505.385H0H-4C-4 535.208 20.1766 559.385 50 559.385V555.385ZM258 605.385H262C262 575.561 237.823 551.385 208 551.385V555.385V559.385C233.405 559.385 254 579.98 254 605.385H258ZM308 684V680C282.595 680 262 659.405 262 634H258H254C254 663.823 278.177 688 308 688V684ZM515 634H511C511 659.405 490.405 680 465 680V684V688C494.823 688 519 663.823 519 634H515ZM515 50H519C519 20.1766 494.823 -4 465 -4V0V4C490.405 4 511 24.5949 511 50H515Z"
                fill="black"
                mask="url(#shop-box-mask)"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="mx-auto max-w-[1280px] px-8 pb-16 md:px-12 lg:px-16">
        <div className="mx-auto w-[900px]">
          <h2 className="mb-8 text-[38px] font-extrabold text-black">Our Products</h2>

          {featuredProduct && (
            <div className="mb-16 flex items-center justify-between rounded-2xl border-[3px] border-black bg-white px-8 py-10">
              <div className="h-[200px] w-[200px] flex-shrink-0 overflow-hidden rounded-lg">
                {getProductImageUrl(featuredProduct.image_path) ? (
                  <img
                    src={getProductImageUrl(featuredProduct.image_path)!}
                    alt={featuredProduct.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ProductImagePlaceholder />
                )}
              </div>

              <div className="flex max-w-[340px] flex-col items-end text-right">
                <h3 className="text-[35px] font-extrabold leading-tight text-black">
                  {featuredProduct.name}
                </h3>

                <p className="mt-2 text-[13px] leading-[1.4] text-gray-500">
                  {featuredProduct.description || "No description available."}
                </p>

                <p className="mt-3 text-[18px] font-bold text-black">
                  {formatPrice(featuredProduct.price)}
                </p>

                <button className="mt-5 rounded-full bg-[#4285F4] px-7 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-[#3367d6]">
                  Shop Now!
                </button>
              </div>
            </div>
          )}

          <h2 className="mb-6 text-[38px] font-extrabold text-black">Check This Out!</h2>

          <div className="grid grid-cols-3 gap-4">
            {checkThisOut.map((product) => (
              <div
                key={product.product_id}
                className="overflow-hidden rounded-xl border-[2.5px] border-black bg-white"
              >
                <div className="h-[140px] w-full overflow-hidden">
                  {getProductImageUrl(product.image_path) ? (
                    <img
                      src={getProductImageUrl(product.image_path)!}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ProductImagePlaceholder />
                  )}
                </div>

                <div className="px-3 py-2">
                {product.type && (
                    <span className="mb-2 inline-block rounded-full border border-[#716F6F] bg-white px-2.5 py-1 text-[10px] font-bold uppercase leading-none text-[#716F6F]">
                      {product.type}
                    </span>
                )}

                <p className="text-[20px] font-bold text-black">{product.name}</p>
                <p className="mt-0 text-[13px] leading-[1.4] text-gray-500">
                  {product.description || "No description available."}
                </p>
                <p className="mt-0.5 text-[15px] font-extrabold text-blue-600">
                  {formatPrice(product.price)}
                </p>
              </div>

              </div>
            ))}
          </div>

          {!featuredProduct && products.length === 0 && (
            <p className="text-[16px] text-gray-600">No products available right now.</p>
          )}
        </div>
      </section>
    </main>
  );
}