import ProductCard from "@/components/shared/ProductCard";
import prisma from "@/lib/prisma";
import { Status } from "@prisma/client";

type Props = {
  searchParams: {
    sort?: string | string[];
    category?: string;
    SubCategory?: string;
    city?: string;
    price?: string;
  };
};

type Where = {
  category?: {
    name: string;
  };
  SubCategory?: {
    name: string;
  };
  city?: {
    name: string;
  };
  price?: {
    gte: number;
    lte: number;
  };
};

async function ProductsPage({ searchParams }: Props) {
  const { sort, category, SubCategory, city, price } = searchParams;

  const orderBy: Record<string, string> = {};
  const where: Where = {};

  if (sort && typeof sort === "string") {
    const [key, value] = sort.split("-");
    orderBy[key] = value;
  }

  if (category) {
    where.category = {
      name: category,
    };
  }
  if (SubCategory) {
    where.SubCategory = {
      name: SubCategory,
    };
  }
  if (city) {
    where.city = {
      name: city,
    };
  }
  if (price) {
    const [min, max] = price.split("-");
    where.price = {
      gte: parseInt(min, 10) || 0,
      lte: parseInt(max, 10) || 1000000,
    };
  }

  let isLoading = true;
  const products = await prisma.product.findMany({
    orderBy,
    where,
    include: {
      category: true,
      city: {
        select: {
          name: true,
        },
      },
    },
  });

  // console.log(products);
  if (products) {
    isLoading = false;
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-lg text-gray-500">
          Bu Filtrə Uyğun Elan TAPILMADI.!
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-10">
      {products.map(
        (product) =>
          product.status === Status.CONFIRMED && (
            <ProductCard key={product.id} product={product} />
          )
      )}
      {isLoading && (
        <div className="border-red-200 border rounded-lg overflow-hidden w-full h-[240px] shadow-md">
          <div className="animate-pulse relative w-full h-[150px] bg-[#f1f1f1]"></div>
          <div className="p-2">
            <div className="animate-pulse h-4 bg-[#f1f1f1] w-1/2 mb-2"></div>
            <div className="animate-pulse h-4 bg-[#f1f1f1] w-1/4 mb-2"></div>
            <div className="animate-pulse h-4 bg-[#f1f1f1] w-1/4 mb-2"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
