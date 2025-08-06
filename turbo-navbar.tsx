import { ProductDialog } from "@/app/(business)/dashboard/_components/Product/ProductDialog";
import prisma from "@/lib/prisma";
import { EModalType } from "@/types";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import MobileMenu from "@/components/shared/MobileMenu";
import { auth } from "@clerk/nextjs/server";
import getCurrentUser from "@/lib/current-user";
import { checkUserAdmin } from "@/actions/user";

export const Navbar = async () => {
  let { userId } = await auth();
  let isAdmin = false;

  if (userId) {
    const user = await getCurrentUser();
    userId = user!.id;
    isAdmin = await checkUserAdmin(userId);
  }

  const links = [
    { href: "/product-list", label: "Elanlar" },
    { href: `/user/${userId}`, label: "Elanlarim" },
    { href: `/favorites/${userId}`, label: "Favoritler" },
    { href: `/cart/${userId}`, label: "Səbət" },
    { href: `/order/${userId}`, label: "Sifarişlər" },
    { href: "/dashboard", label: "ADMIN" },
  ];

  const filteredLinks = userId
    ? links
    : links.filter((_, index) => index === 0);

  const categories = await prisma.category.findMany({
    include: {
      subCategories: true,
    },
  });

  const subCategories =
    (await prisma.subCategory.findMany({
      include: {
        category: true,
      },
    })) || [];

  const cities = await prisma.city.findMany();

  return (
    <section className="sticky top-0  z-50">
      <nav className="flex justify-between items-center bg-red-700 text-white px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center">
          <Link className="text-xl md:text-3xl font-bold font-heading" href="/">
            TURBO.AZ
          </Link>
        </div>

        {/* Menu Links for Medium and Up */}
        <ul className="hidden md:flex items-center px-4 font-semibold lg:space-x-6 space-x-3">
          {filteredLinks.map(({ href, label }) => (
            <li
              key={href}
              className="hover:text-gray-200 text-[13px] lg:text-[16px]"
            >
              {label === "ADMIN" && !isAdmin ? null : (
                <Link href={href}>{label}</Link>
              )}
            </li>
          ))}
          {/* <SignInButton /> */}
        </ul>

        {/* Action Buttons and User Avatar */}
        <div className="flex items-center space-x-4 md:space-x-5">
          <ProductDialog
            type={EModalType.CREATE}
            categories={categories}
            subCategories={subCategories}
            cities={cities}
          />
          <div className="h-[36px] flex items-center">
            <UserButton />
          </div>
          {!userId && (
            <div className="h-[36px] flex items-center bg-red-900 p-3 rounded-full">
              <Link href="/sign-in">Daxil ol</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
      </nav>
      <MobileMenu links={filteredLinks} isAdmin={isAdmin} />
    </section>
  );
};
