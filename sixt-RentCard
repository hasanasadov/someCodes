import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import favoriteService from "@/services/favorite";
import { getFavAsync, selectAuth } from "@/store/auth";
import { AxiosResponseError, Rent } from "@/types";
import { useMutation } from "@tanstack/react-query";
import HeartFilledImg from "@/assets/icons/heart-filled-red.svg";
import HeartOutlinedImg from "@/assets/icons/heart-outlined.svg";
import { CheckIcon, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export const RentCard = ({ rent }: { rent: Rent }) => {
  const {
    title,
    category,
    gear,
    imageUrls,
    passangers,
    capacityBag,
    price,
    currency,
  } = rent;
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const { favorites } = useAppSelector(selectAuth);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (favorites) {
      setIsLiked(favorites.includes(rent._id!));
    }
  }, [favorites, rent._id]);
  const onError = (error: AxiosResponseError) => {
    toast.error(error.response?.data.message ?? "Something went wrong!");
    setIsLiked(!isLiked);
  };
  const { mutate } = useMutation({
    mutationFn: favoriteService.toggle,
    onSuccess: () => {
      toast.success("Favorite updated successfully.");
      dispatch(getFavAsync());
    },
    onError,
  });
  const isThisRentSelected =
    searchParams.get("rentId") === rent?._id?.toString();

  const isScrollTo = Number(searchParams.get("scrollTo")) || 0;

  const days = Number(localStorage.getItem("days") || 1);

  return (
    <div className="relative z-[1] cursor-pointer">
      <div
        onClick={(event) => {
          localStorage.setItem("pricePerDay", price.toString());
          localStorage.setItem("currency", currency);
          if (isThisRentSelected) {
            searchParams.delete("rentId");
            searchParams.delete("scrollTo");

            setSearchParams(searchParams);
            return;
          }

          const rect = event.currentTarget.getBoundingClientRect();
          searchParams.set("rentId", rent?._id?.toString()!);
          searchParams.set(
            "scrollTo",
            isScrollTo < rect.top + window.scrollY && isScrollTo !== 0
              ? (rect.top + window.scrollY).toString()
              : (rect.top + window.scrollY + 596).toString()
          );
          setSearchParams(searchParams);
        }}
        className={` border-white  border-4 hover:border-gray-600 rounded-[20px] duration-200 
        ${
          isThisRentSelected
            ? "!border-orange-600 lg:mb-[620px]"
            : "border-white"
        }`}
      >
        <div className=" border-white relative  border-4 text-white overflow-hidden lg:h-[550px] h-[400px] p-3 px-4 flex flex-col rounded-2xl justify-between items-start ">
          <button
            onClick={() => {
              mutate({ id: rent._id! });
              setIsLiked(!isLiked);
            }}
            className="h-fit absolute top-4 right-4 z-[999999]"
          >
            <img
              src={isLiked ? HeartFilledImg : HeartOutlinedImg}
              alt="heart"
            />
          </button>
          <img
            className="absolute h-full w-full  top-0 bottom-0 left-0 -z-10 object-cover"
            src="https://img.sixt.com/1600/6f09b0e8-6820-4ac0-bedd-5797e9814c18.jpg"
            alt=""
          />
          <img
            className="absolute w-full  top-[50%] left-0 -z-10 object-cover  translate-y-[-50%]"
            src={imageUrls[0]}
            alt=""
          />
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold">{title}</div>
            <div> or similar | {category.title.toString()}</div>
            <div className="mt-2 flex gap-2">
              <div className="flex gap-1 items-center bg-white  bg-opacity-10 w-fit p-1 px-3 rounded-full">
                <User2 size={16} />
                <div className="text-[12px]">{passangers}</div>
              </div>
              <div className="flex gap-1 items-center bg-white bg-opacity-10  w-fit p-1 px-3 rounded-full">
                <div className="w-4 h-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 17 16"
                  >
                    <path d="M14.608 6.866H13.55a2.116 2.116 0 10-4.233 0H8.258c-.582 0-1.058.476-1.058 1.058v6.35c0 .582.476 1.059 1.058 1.059h6.35c.582 0 1.059-.477 1.059-1.059v-6.35c0-.582-.477-1.058-1.059-1.058zm-4.233 2.117a.53.53 0 01-.53.529.53.53 0 01-.528-.53V7.925h1.058v1.059zm1.058-3.175c.582 0 1.059.476 1.059 1.058h-2.117c0-.582.476-1.058 1.058-1.058zm2.117 3.175a.53.53 0 01-.53.529.53.53 0 01-.528-.53V7.925h1.058v1.059z"></path>
                    <path d="M7.667 3.333H9c.608 0 1.124.412 1.283.971-1.037.43-1.633 1.38-1.633 1.895h-.317v-.866h-1v1.104c-.427.238-.8.686-.8 1.487v5.409H3.667c0 .366-.3.666-.667.666a.669.669 0 01-.667-.666c-.733 0-1.333-.6-1.333-1.334V4.666c0-.733.6-1.333 1.333-1.333h1.334v-2c0-.367.3-.667.666-.667H7c.367 0 .667.3.667.667v2zm-4.667 8h1v-6H3v6zm2.167 0h1v-6h-1v6zm-.5-8h2V1.666h-2v1.667z"></path>
                  </svg>
                </div>
                <div className="text-[12px]">{capacityBag}</div>
              </div>
              <div className="flex gap-1 items-center bg-white bg-opacity-10  w-fit p-1 px-3 rounded-full">
                <div className="w-4 h-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.93 13.5h4.14L12 7.98 9.93 13.5zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.29 15.88l-.9-2.38H9.17l-.89 2.37a.968.968 0 11-1.81-.69l4.25-10.81c.22-.53.72-.87 1.28-.87s1.06.34 1.27.87l4.25 10.81a.968.968 0 01-.9 1.32c-.4 0-.76-.25-.91-.62z"></path>
                  </svg>
                </div>
                <div className="text-[12px]">{gear}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckIcon className="text-green-500 w-5" /> Unlimited miles
            </div>
            <div className="text-xl font-extrabold flex gap-2 justify-center  items-end">
              {" "}
              <div className="flex gap-1 items-end">
                <p className="!font-bold text-[16px]">
                  {currency == "USD" ? "$" : "₼"}
                </p>
                <p className="text-2xl">{price} </p>
                <p className="!font-bold text-[16px]">/day</p>
              </div>
              <div className="flex gap-1 items-end text-gray-500 mb-0.5">
                <p className="text-sm text-[16px] font-normal">
                  {currency === "USD" ? "$" : "₼"}
                </p>
                <p className="leading-[19px] font-normal text-[14px]">
                  {price * days}{" "}
                </p>
                <p className="text-sm text-[16px] font-normal">total</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isThisRentSelected && (
        <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-orange-600"></div>
      )}
    </div>
  );
};

RentCard.Skeleton = () => {
  return (
    <div className="relative z-[1] animate-pulse">
      <div className="border-white flex flex-col gap-3 border-4 rounded-[20px] bg-gray-200 h-[400px] lg:h-[550px] py-4 px-4 justify-between items-start">
        <div className="flex flex-col w-full">
          <div className="w-1/4 h-6 bg-gray-100 rounded-md mt-4"></div>
          <div className="w-1/2 h-6 bg-gray-100 rounded-md mt-4"></div>
          <div className="flex  w-1/2 gap-3 ">
            <div className="w-1/4 h-6 bg-gray-100 rounded-full mt-4"></div>
            <div className="w-1/4 h-6 bg-gray-100 rounded-full mt-4"></div>
            <div className="w-1/4 h-6 bg-gray-100 rounded-full mt-4"></div>
          </div>
        </div>
        <div className="w-full h-full bg-gray-100 rounded-2xl"></div>
        <div className="w-1/2 h-8 bg-gray-100 rounded-md mt-4"></div>
        <div className="w-3/4 h-8 bg-gray-100 rounded-md mt-4"></div>
      </div>
    </div>
  );
};
