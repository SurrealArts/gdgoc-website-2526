"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/app/utils/supabase/client";
import { useUser } from "@/app/(main)/components/UserProvider";

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

type EditFormState = {
  name: string;
  description: string;
  price: string;
  type: string;
  visible: "true" | "false";
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

export default function ShopPage() {
  const { isAdmin, loading: userLoading } = useUser();

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [pageError, setPageError] = useState("");

  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const [editForm, setEditForm] = useState<EditFormState>({
    name: "",
    description: "",
    price: "",
    type: "",
    visible: "true",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoadingProducts(true);
    setPageError("");

    const { data, error } = await supabase
      .from("Products")
      .select(
        "product_id, name, description, price, type, is_out_of_stock, created_at, image_path, visible"
      )
      .eq("is_out_of_stock", false)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      setPageError(error.message);
      setProducts([]);
    } else {
      setProducts(data ?? []);
    }

    setLoadingProducts(false);
  }

  function openEditModal(product: Product) {
    setEditingProductId(product.product_id);
    setMenuOpenId(null);
    setPageError("");

    setEditForm({
      name: product.name ?? "",
      description: product.description ?? "",
      price: String(product.price ?? ""),
      type: product.type ?? "",
      visible: product.visible === false ? "false" : "true",
    });
  }

  function closeEditModal() {
    setEditingProductId(null);
    setEditForm({
      name: "",
      description: "",
      price: "",
      type: "",
      visible: "true",
    });
  }

  function toggleMenu(productId: string) {
    setMenuOpenId((prev) => (prev === productId ? null : productId));
  }

  async function saveProductChanges() {
    if (!editingProductId) return;

    const trimmedName = editForm.name.trim();
    const trimmedDescription = editForm.description.trim();
    const trimmedType = editForm.type.trim();
    const parsedPrice = Number(editForm.price);

    if (!trimmedName) {
      setPageError("Product name cannot be empty.");
      return;
    }

    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setPageError("Price must be a valid number.");
      return;
    }

    setSavingId(editingProductId);
    setPageError("");

    const { data, error } = await supabase
      .from("Products")
      .update({
        name: trimmedName,
        description: trimmedDescription || null,
        price: parsedPrice,
        type: trimmedType || null,
        visible: editForm.visible === "true",
      })
      .eq("product_id", editingProductId)
      .select(
        "product_id, name, description, price, type, is_out_of_stock, created_at, image_path, visible"
      )
      .single();

    if (error) {
      console.error("Error updating product:", error);
      setPageError(error.message);
      setSavingId(null);
      return;
    }

    setProducts((prev) =>
      prev.map((product) => (product.product_id === editingProductId ? data : product))
    );

    setSavingId(null);
    closeEditModal();
  }

  const visibleProducts = useMemo(
    () => products.filter((product) => product.visible === true),
    [products]
  );

  const hiddenProducts = useMemo(
    () => products.filter((product) => product.visible === false),
    [products]
  );

  const featuredProduct = useMemo(() => visibleProducts[2] ?? null, [visibleProducts]);
  const checkThisOut = useMemo(() => visibleProducts, [visibleProducts]);

  function AdminProductMenu({ product }: { product: Product }) {
    if (!isAdmin) return null;

    return (
      <div className="relative">
        <button
          type="button"
          aria-label="Open product actions"
          onClick={() => toggleMenu(product.product_id)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black bg-white text-xl font-bold leading-none text-black hover:bg-gray-100"
        >
          &#8942;
        </button>

        {menuOpenId === product.product_id && (
          <div className="absolute right-0 top-11 z-20 min-w-[150px] rounded-xl border-2 border-black bg-white p-1 shadow-lg">
            <button
              type="button"
              onClick={() => openEditModal(product)}
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-bold text-black hover:bg-gray-100"
            >
              Edit product
            </button>
          </div>
        )}
      </div>
    );
  }

  function ProductCard({ product, dimmed = false }: { product: Product; dimmed?: boolean }) {
    const imageUrl = getProductImageUrl(product.image_path);

    return (
      <div
        className={`overflow-hidden rounded-xl border-[2.5px] border-black bg-white ${
          dimmed ? "opacity-90" : ""
        }`}
      >
        <div className="h-[140px] w-full overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <ProductImagePlaceholder />
          )}
        </div>

        <div className="px-3 py-3">
          <div className="mb-2 flex items-start justify-between gap-3">
            <p className="min-w-0 flex-1 text-[20px] font-bold text-black">{product.name}</p>

            <div className="flex shrink-0 items-center gap-2">
              {product.type && (
                <span className="rounded-full border border-[#716F6F] bg-white px-2.5 py-1 text-[10px] font-bold uppercase leading-none text-[#716F6F]">
                  {product.type}
                </span>
              )}

              <AdminProductMenu product={product} />
            </div>
          </div>

          <p className="text-[13px] leading-[1.4] text-gray-500">
            {product.description || "No description available."}
          </p>

          <p className="mt-1 text-[15px] font-extrabold text-blue-600">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen bg-[#efefef]"
      onClick={() => {
        if (menuOpenId) setMenuOpenId(null);
      }}
    >
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
              Show off your developer spirit with official Google Dev merch. High-quality, comfy,
              and made for coders like you.
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

      <section className="mx-auto max-w-[1280px] px-8 pb-16 md:px-12 lg:px-16">
        <div className="mx-auto w-[900px]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[38px] font-extrabold text-black">Our Products</h2>

            {!userLoading && isAdmin && (
              <span className="rounded-full border border-black bg-[#F4B400] px-3 py-1 text-xs font-bold text-black">
                Admin Mode
              </span>
            )}
          </div>

          {pageError && (
            <p className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
              {pageError}
            </p>
          )}

          {loadingProducts && (
            <p className="mb-8 text-[16px] text-gray-600">Loading products...</p>
          )}

          {featuredProduct && (
            <div
              className="mb-16 flex items-center justify-between rounded-2xl border-[3px] border-black bg-white px-8 py-10"
              onClick={(e) => e.stopPropagation()}
            >
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
                <div className="mb-2 flex items-center gap-2">
                  {featuredProduct.type && (
                    <span className="inline-block rounded-full border border-[#716F6F] bg-white px-2.5 py-1 text-[10px] font-bold uppercase leading-none text-[#716F6F]">
                      {featuredProduct.type}
                    </span>
                  )}

                  <AdminProductMenu product={featuredProduct} />
                </div>

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

          {checkThisOut.length > 0 ? (
            <div
              className="grid grid-cols-3 gap-4"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {checkThisOut.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-[16px] text-gray-600">No visible items right now.</p>
          )}

          {isAdmin && (
            <>
              <h2 className="mb-6 mt-14 text-[38px] font-extrabold text-black">Hidden Items</h2>

              {hiddenProducts.length > 0 ? (
                <div
                  className="grid grid-cols-3 gap-4"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {hiddenProducts.map((product) => (
                    <ProductCard key={product.product_id} product={product} dimmed />
                  ))}
                </div>
              ) : (
                <p className="text-[16px] text-gray-600">No hidden items.</p>
              )}
            </>
          )}

          {!loadingProducts && products.length === 0 && (
            <p className="text-[16px] text-gray-600">No products available right now.</p>
          )}
        </div>
      </section>

      {editingProductId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={closeEditModal}
        >
          <div
            className="w-full max-w-[560px] rounded-2xl border-[3px] border-black bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[28px] font-extrabold text-black">Edit Product</h3>
                <p className="text-sm text-gray-500">
                  Update the product details and whether it appears in Check This Out.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black text-lg font-bold text-black hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-black">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border-2 border-black px-4 py-3 text-base text-black outline-none"
                  placeholder="Product name"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-black">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="min-h-[120px] w-full rounded-xl border-2 border-black px-4 py-3 text-base text-black outline-none"
                  placeholder="Product description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-bold text-black">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border-2 border-black px-4 py-3 text-base text-black outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-bold text-black">Type</label>
                  <input
                    type="text"
                    value={editForm.type}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border-2 border-black px-4 py-3 text-base text-black outline-none"
                    placeholder="Shirt, Cap, etc."
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-black">Visibility</label>
                <select
                  value={editForm.visible}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      visible: e.target.value as "true" | "false",
                    }))
                  }
                  className="w-full rounded-xl border-2 border-black px-4 py-3 text-base text-black outline-none"
                >
                  <option value="true">Visible in Check This Out</option>
                  <option value="false">Hidden from Check This Out</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeEditModal}
                disabled={savingId === editingProductId}
                className="rounded-full border border-black px-5 py-2 text-sm font-bold text-black hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveProductChanges}
                disabled={savingId === editingProductId}
                className="rounded-full bg-[#4285F4] px-5 py-2 text-sm font-bold text-white hover:bg-[#3367d6] disabled:opacity-50"
              >
                {savingId === editingProductId ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}