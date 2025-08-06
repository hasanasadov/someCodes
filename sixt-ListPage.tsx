import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { ClipLoader } from "react-spinners";
import { RenderIf } from "@/components/shared/RenderIf";
import { useEffect } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { RentCard } from "@/components/shared/rent-card";
import { Filters } from "./components/Filters";
import { QuickRentCard } from "@/components/shared/rent-card/QuickRentCard";
import { QuickRentCardMD } from "@/components/shared/rent-card/QuickRentCardMD";
import rentService from "@/services/rent";
import { useTranslation } from "react-i18next";

export const RentListPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const dropOffLocation = searchParams.get("dropOffLocation")
    ? searchParams.get("dropOffLocation")
    : localStorage.getItem("dropOffLocationID");
  const pickUpLocation = searchParams.get("pickUpLocation")
    ? searchParams.get("pickUpLocation")
    : localStorage.getItem("pickUpLocationID");
  const pickUpDate = searchParams.get("pickUpDate")
    ? searchParams.get("pickUpDate")
    : localStorage.getItem("pickUpDate");
  const dropOffDate = searchParams.get("dropOffDate")
    ? searchParams.get("dropOffDate")
    : localStorage.getItem("dropOffDate");
  const fromTruckPage = localStorage.getItem("isTruck");
  if (fromTruckPage) {
    searchParams.set("vehicleType", "67d93abf96451aa20e316a5f");
  }
  const categories = searchParams.getAll("vehicleType");
  const sort = searchParams.get("sort");
  const search = searchParams.get("search");
  const passangers = searchParams.get("passanger");
  const gear = searchParams.getAll("gear");
  const minAgeToDrive = searchParams.get("minAgeToDrive");

  const filteredSearchParams = new URLSearchParams();
  filteredSearchParams.set("dropOffLocation", dropOffLocation!);
  filteredSearchParams.set("pickUpLocation", pickUpLocation!);
  filteredSearchParams.set("pickUpDate", pickUpDate!);
  filteredSearchParams.set("dropOffDate", dropOffDate!);
  categories.forEach((category) => {
    filteredSearchParams.append("vehicleType", category);
  });
  filteredSearchParams.set("sort", sort!);
  filteredSearchParams.set("search", search!);
  filteredSearchParams.set("passanger", passangers!);
  gear.forEach((g) => filteredSearchParams.append("gear", g));
  filteredSearchParams.set("minAgeToDrive", minAgeToDrive!);

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.RENT_LIST, filteredSearchParams.toString()],
    queryFn: ({ pageParam }) =>
      rentService.getAll({
        skip: pageParam,
        take: 3,
        dropOffLocation,
        pickUpLocation,
        pickUpDate,
        dropOffDate,
        categories,
        search,
        passangers,
        gear,
        minAgeToDrive,
        sort,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const hasMore =
        lastPage.data.count > lastPage.data.skip + lastPage.data.take;
      if (hasMore) {
        return lastPage.data.skip + lastPage.data.take;
      }
      return undefined;
    },
  });

  const rents =
    data?.pages.reduce(
      (prev, page) => [...prev, ...page.data.items],
      [] as any[]
    ) || [];

  const selecedRentId = searchParams.get("rentId");

  const scrollTo = parseInt(Number(searchParams.get("scrollTo")!).toString());

  useEffect(() => {
    if (scrollTo) {
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
    }
  }, [scrollTo]);

  useEffect(() => {
    localStorage.removeItem("selectedBookingOptions");
    localStorage.removeItem("selectedDeductible");
    localStorage.removeItem("price");
  }, []);

  return (
    <div className="">
      <div className="hidden lg:block bg-gray-50 border-b-2 py-2">
        <div className="containerr font-roboto font-extrabold !text-[35px]">
          {t("Which")} {fromTruckPage ? `${t("truck")}` : `${t("car")}`}{" "}
          {t("do you want to drive?")}
        </div>
      </div>
      <div className="containerr">
        <ScrollToTop />
        <Filters />
        <div className="flex flex-col gap-y-6 lg:gap-y-8   pb-10 ">
          <InfiniteScroll
            dataLength={rents.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={
              <div className="flex flex-col items-center w-60 mx-auto gap-x-3 text-muted-foreground mt-4">
                <p>Scroll to load more items...</p>
              </div>
            }
            endMessage={
              <>
                <RenderIf condition={!isLoading && rents.length === 0}>
                  <p className="mt-4 text-center text-muted-foreground">
                    No items found
                  </p>
                </RenderIf>
                <RenderIf condition={isLoading}>
                  <p className="mt-4 text-center text-muted-foreground flex items-center gap-x-2 justify-center">
                    <ClipLoader />
                    Loading more items...
                  </p>
                </RenderIf>
              </>
            }
          >
            <div className="grid  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 relative   ">
              <RenderIf condition={isLoading}>
                {[...Array(3)].map((_, index) => (
                  <RentCard.Skeleton key={index} />
                ))}
              </RenderIf>

              {rents.map((rent) => (
                <div key={rent._id}>
                  <RentCard rent={rent} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
      <div
        className={`  ${
          selecedRentId ? `lg:block top-[${scrollTo}px] ` : ""
        } absolute hidden  duration-300 w-full left-0 h-[580px]  p-6  bg-gray-200 `}
        style={{ top: `${scrollTo}px` }}
      >
        <div className="bg-white h-full w-full rounded-2xl overflow-hidden  containerr border shadow-2xl">
          <QuickRentCard rentId={selecedRentId ?? ""} />
        </div>
      </div>
      <RenderIf condition={!!selecedRentId}>
        <div className="lg:hidden  bg-white absolute top-0 left-0 w-full  z-[9999]">
          <QuickRentCardMD rentId={selecedRentId ?? ""} />
        </div>
      </RenderIf>
    </div>
  );
};

export default RentListPage;
