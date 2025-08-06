import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { CarIcon, Plus, TruckIcon } from "lucide-react";

import { DialogTypeEnum, useDialog } from "@/hooks/useDialog";
import { useQuery } from "@tanstack/react-query";
import SelectReact from "@/components/ui/selectReact";

import { DateRangePicker } from "@/components/ui/date-picker";
import locationService from "@/services/location";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Location } from "@/types";
import { Button } from "@/components/ui/button";
import { paths } from "@/constants/paths";
import { useTranslation } from "react-i18next";
import { RenderIf } from "../RenderIf";

export const AvailabilityFilter = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();
  const { openDialog } = useDialog();
  const [searchParams, setSearchParams] = useSearchParams();

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(
      !localStorage.getItem("pickUpDate") ||
        !localStorage.getItem("dropOffDate") ||
        !localStorage.getItem("pickUpLocation")
    );
  }, [searchParams, localStorage]);
  const showAvailabilityFilter = searchParams.get("showAvailabilityFilter");
  const isListPage = location.pathname === paths.LIST;
  const isResetPage = location.pathname.includes("/reset-password");
  const isHomePage = location.pathname === paths.HOME;
  const isTruckPage = location.pathname === paths.TRUCKS;
  const isDiscountPage = location.pathname === paths.DISCOUNTS;
  const [dropOffSectionClicked, setDropOffSectionClicked] = useState(
    searchParams.get("dropOffLocation") ? true : false
  );

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.LOCATIONS],
    queryFn: locationService.getAll,
  });

  const locations =
    data?.data.items.map((item: Location) => ({
      label: item.title,
      value: item._id,
    })) || [];

  const handleSubmit = () => {
    if (searchParams.get("pickUpDate") && searchParams.get("dropOffDate")) {
      localStorage.setItem("pickUpDate", searchParams.get("pickUpDate")!);
      localStorage.setItem("dropOffDate", searchParams.get("dropOffDate")!);
    }
    const pickUpLocation = localStorage.getItem("pickUpLocation");
    const dropOffLocation = localStorage.getItem("dropOffLocation");
    const hasDropOffLocation = dropOffLocation !== undefined;
    localStorage.setItem(
      "dropOffLocation",
      hasDropOffLocation ? dropOffLocation! : pickUpLocation!
    );

    searchParams.delete("showAvailabilityFilter");
    setSearchParams(searchParams);
    if (!isListPage) {
      navigate(`/list?${searchParams.toString()}`);
    }
  };

  useEffect(() => {
    if (searchParams.get("showAvailabilityFilter")) {
      setDropOffSectionClicked(
        searchParams.get("dropOffLocation") ? true : false
      );
    }
  }, [searchParams.get("showAvailabilityFilter")]);

  return (
    <RenderIf
      condition={
        isHomePage ||
        isResetPage ||
        isTruckPage ||
        isDiscountPage ||
        (isListPage && !!showAvailabilityFilter)
      }
    >
      <div
        className={`sticky left-0 z-[2]
        ${
          isListPage ? "top-[70px] -translate-y-[70px]" : "top-2"
        } duration-500 `}
      >
        <RenderIf condition={!!showAvailabilityFilter}>
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 duration-500 z-[-1] "
            onClick={() => {
              searchParams.delete("showAvailabilityFilter");
              setSearchParams(searchParams);
            }}
          ></div>
        </RenderIf>
        <div className="availability -z-40"></div>
        <div
          className={`${
            showAvailabilityFilter ? " " : "containerr rounded-2xl "
          } lg:!p-6 !py-4   bg-white     shadow-xl  `}
        >
          <div className="flex flex-col gap-4 containerr">
            <div className="flex gap-2 ">
              <Button
                onClick={() => {
                  localStorage.removeItem("isTruck");
                  navigate(paths.HOME);
                }}
                className={`rounded-full ${
                  !localStorage.getItem("isTruck")
                    ? "bg-black hover:bg-black hover:text-white text-white text-[14px]"
                    : ""
                } `}
                variant={"ghost"}
              >
                <CarIcon />
                {t("Cars")}
              </Button>
              <Button
                className={`rounded-full ${
                  localStorage.getItem("isTruck")
                    ? "bg-black hover:bg-black hover:text-white text-white text-[14px]"
                    : ""
                } `}
                onClick={() => {
                  localStorage.setItem("isTruck", "true");
                  navigate(paths.TRUCKS);
                }}
                variant={"ghost"}
              >
                <TruckIcon /> {t("Trucks")}
              </Button>
            </div>
            <div className="hidden sm:grid lg:grid-cols-2 gap-10 items-center">
              <div className="flex flex-col sm:flex-row justify-between h-fit sm:gap-10">
                <div className="flex flex-col gap-2  md:w-1/2">
                  <p className="font-helvetica text-[12px] ml-0.5 font-bold">
                    {!dropOffSectionClicked
                      ? `${t("Pickup & return")}`
                      : `${t("Pickup")}`}
                  </p>

                  <SelectReact
                    locationOptions={locations}
                    isLoading={isLoading}
                    isDropOff={false}
                  />
                </div>
                <div className="flex flex-col gap-2 md:w-1/2 items-start justify-end">
                  <RenderIf condition={dropOffSectionClicked}>
                    <p className="font-helvetica hidden sm:inline-block text-[12px] ml-0.5 font-bold ">
                      {t("Return")}
                    </p>
                  </RenderIf>
                  <RenderIf condition={!dropOffSectionClicked}>
                    <Button
                      className="border-none bg-transparent text-gray-400  hidden sm:flex rounded-xl  hover:bg-transparent !px-0"
                      variant={"ghost"}
                      onClick={() => {
                        setDropOffSectionClicked(!dropOffSectionClicked);
                      }}
                    >
                      <Plus /> {t("Different return location")}
                    </Button>
                  </RenderIf>
                  <div className="relative w-full">
                    <RenderIf condition={dropOffSectionClicked}>
                      <div className="md:block">
                        <SelectReact
                          locationOptions={locations}
                          isLoading={isLoading}
                          isDropOff={true}
                        />
                      </div>
                    </RenderIf>
                  </div>
                </div>
              </div>

              <div className="-mt-1    flex flex-col  flex-wrap sm:flex-row justify-between h-fit gap-10">
                <div className="h-fit  hidden sm:flex">
                  <DateRangePicker
                    onChange={(range) => console.log("Selected range:", range)}
                  />
                </div>
                <div className="flex w-full sm:w-fit items-end ">
                  <Button
                    className={` rounded-xl !font-extrabold !text-[14.5px]  h-[55px] sm:w-[200px] !md:w-fit w-full bg-orange-600 text-white  hover:bg-orange-700 hover:text-white`}
                    variant={"outline"}
                    disabled={disabled}
                    onClick={handleSubmit}
                  >
                    <RenderIf condition={!!localStorage.getItem("isTruck")}>
                      {t("Show Trucks")}
                    </RenderIf>
                    <RenderIf condition={!localStorage.getItem("isTruck")}>
                      {t("Show Cars")}
                    </RenderIf>
                  </Button>
                </div>
              </div>
            </div>
            <Button
              variant={"outline"}
              className="rounded-xl sm:hidden !font-bold  h-[55px] sm:w-[200px] w-full bg-orange-600 text-white "
              onClick={() => {
                openDialog(DialogTypeEnum.AVAILABILITY);
              }}
            >
              {t("Select PickUp")}
            </Button>
            <div className="hoverUnderlineAnti hidden md:block  text-[12px] font-helvetica font-bold w-fit border-b-2 ">
              {t("Apply corporate rate")}
            </div>
          </div>
        </div>
      </div>
    </RenderIf>
  );
};
