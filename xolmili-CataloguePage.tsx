"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/constants/index";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RenderIf from "@/lib/RenderIf";
import Image from "next/image";
import Link from "next/link";

const PRODUCTS_PER_PAGE = 3;

export default function CataloguePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setPage(0); // Hər yeni axtarışda səhifəni sıfırla
  }, [searchQuery]);

  const paginatedProducts = useMemo(() => {
    return isMobile
      ? filteredProducts.slice(
          page * PRODUCTS_PER_PAGE,
          (page + 1) * PRODUCTS_PER_PAGE
        )
      : filteredProducts;
  }, [isMobile, filteredProducts, page]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  useEffect(() => {
    if (isMobile && selectedProduct && detailRef.current) {
      const offsetTop =
        detailRef.current.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  }, [selectedProduct, isMobile]);

  return (
    <div className="min-h-[90vh] flex flex-col md:flex-row overflow-hidden ">
      <aside className="w-full md:w-1/3 lg:w-1/4 h-auto md:h-screen overflow-y-auto border-b md:border-b-0 md:border-r border-gray-300 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-secondary">
          Kataloq
        </h2>

        {/* Axtarış sahəsi */}
        <div className="flex items-center gap-2 mb-6">
          <Input
            className="glass-border text-primary"
            placeholder="Axtar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={() => setSearchQuery("")}>Reset</Button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-1 gap-4">
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className={`cursor-pointer glass-border text-primary p-4 rounded-lg border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center space-y-2 text-center ${
                selectedProduct?.id === product.id
                  ? "!bg-black/10 dark:!bg-white/10"
                  : ""
                // : "!bg-white/5 dark:!bg-black/30"
              }`}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
                className=" object-contain"
              />
              <span className="font-bold">{product.name}</span>
            </div>
          ))}
        </div>

        {isMobile && (
          <div className="mt-6 flex justify-between items-center">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
            >
              Əvvəlki
            </Button>
            <span className="text-sm text-gray-500">
              Səhifə {page + 1} / {totalPages}
            </span>
            <Button
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={page >= totalPages - 1}
            >
              Növbəti
            </Button>
          </div>
        )}
      </aside>

      <main ref={detailRef} className="flex-1 p-6 md:p-10">
        <RenderIf condition={!!selectedProduct}>
          <ProductDetail product={selectedProduct} />
        </RenderIf>
        <RenderIf condition={!selectedProduct}>
          <div className="mx-auto h-full flex items-center justify-center text-center text-gray-600 dark:text-gray-300 text-xl font-medium my-10 md:m-0">
            Zəhmət olmasa məhsul seçin.
          </div>
        </RenderIf>
      </main>
    </div>
  );
}

const ProductDetail = ({
  product,
}: {
  product?: Product | undefined | null;
}) => {
  return (
    <div className="glss  max-w-5xl mx-auto rounded-xl  p-6 md:p-8 pb-20 ">
      <h1 className="text-center text-3xl md:text-4xl font-bold text-secondary mb-12 md:mb-20">
        {product?.name}
      </h1>
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="w-full glass dark:!bg-blackk duration-300 relative aspect-video overflow-hidden rounded-lg shadow">
          <RenderIf condition={!!product?.image}>
            <Image
              src={product!.image}
              alt={product!.name}
              className=" object-contain"
              fill
            />
          </RenderIf>
        </div>
        <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>{product?.description}</p>
          <div className="mt-6">
            <Link href={`/catalogue/${product?.id}`}>
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg">
                Ətraflı
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
