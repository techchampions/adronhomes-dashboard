import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import {
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { GiStreetLight } from "react-icons/gi";
import Button from "../Button";
import { formatPrice } from "../../data/utils";
import apiClient from "../../data/apiClient";
import { useToastStore } from "../../zustand/useToastStore";
import { Property, PropertyType } from "../../data/types/propertiesPageTypes";
import { IoGiftOutline } from "react-icons/io5";
// import { useToggleSaveProperty } from "../../data/hooks";

interface Props {
  // property: {
  //   id: number;
  //   size: number | string;
  //   name: string;
  //   street_address: string;
  //   lga: string;
  //   state: string;
  //   country: string;
  //   price: number;
  //   features: string[];
  //   photos: string[];
  //   type: PropertyType;
  //   is_saved: boolean;
  //   is_bought: boolean;
  //   is_discount: boolean;
  //   discount_percentage: string | number;

  // };
  property: Property;
}

export default function SwiperPropertyCard({ property }: Props) {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const features = property.features;
  const allowedFeatures = ["Gym", "Light"];
  const displayFeatures = features.filter((item) =>
    allowedFeatures.includes(item)
  );
  // const { mutate: toggleSavePropertyHook, isLoading } = useToggleSaveProperty();

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [isSaved, setIsSaved] = useState(property.is_saved);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (swiper && prevRef.current && nextRef.current) {
      if (
        typeof swiper.params.navigation === "object" &&
        swiper.params.navigation !== null
      ) {
        swiper.params.navigation = {
          ...swiper.params.navigation,
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        };
      } else {
        swiper.params.navigation = {
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        };
      }
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  // useEffect(() => {
  //   if (swiper) {
  //     swiper.params.navigation.prevEl = prevRef.current;
  //     swiper.params.navigation.nextEl = nextRef.current;
  //     swiper.navigation.update(); // Ensure the navigation buttons are updated after initialization
  //   }
  // }, [swiper]); // Ensure this effect runs when the swiper instance is available

  const address = `${property.street_address}, ${property.lga}, ${property.state} ${property.country}`;
  // const features = property.features;
  const toggleSaveProperty = async () => {
    try {
      const formData = new FormData();
      formData.append("property_id", String(property.id));
      const res = await apiClient.post("/user/save-property-toggle", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showToast(res.data.message, "success");
      setIsSaved(!isSaved);
    } catch (error) {
      showToast(`${error}`, "error");
    }
  };
  // const toggleSaveProperty = async () => {
  //   toggleSavePropertyHook(property.id, {
  //     onSuccess: () => {
  //       showToast("Property removed successfully", "success");

  //       setIsSaved(!isSaved);
  //     },
  //   });
  // };

  return (
    <div className="rounded-3xl">
      <div className="relative w-full h-[250px] rounded-xl overflow-hidden">
        {/* Swiper Carousel */}
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          onInit={(swiperInstance) => setSwiper(swiperInstance)} // Store swiper instance when it's initialized
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          modules={[Navigation]}
          className="w-full h-full rounded-[40px]"
        >
          {property.photos.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Image ${idx + 1}`}
                className="object-cover rounded-3xl h-full w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 z-10 bg-white/50 bg-opacity-60 rounded-full p-2 shadow hover:bg-opacity-90"
        >
          <FaChevronLeft size={30} />
        </button>
        <button
          ref={nextRef}
          className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 z-10 bg-white/50 bg-opacity-60 rounded-full p-2 shadow hover:bg-opacity-90"
        >
          <FaChevronRight size={30} />
        </button>
        {property.is_discount && (
          <div className="bg-red-600 text-white text-xs px-3 py-1 rounded-full absolute top-2 right-5 z-50">
            {property.discount_percentage}% off
          </div>
        )}
      </div>

      {/* Property Info */}
      <div className="mt-4 space-y-2 bg-white p-6 rounded-3xl">
        <h4 className="text-lg font-adron-text-body font-semibold truncate">
          {property.name}
        </h4>
        <p className="text-xs text-gray-400 flex items-center mt-1 truncate">
          <FaMapMarkerAlt className="mr-1" /> {address}
          {/* {`${property.street_address}, ${property.lga}, ${property.state} ${property.country}`} */}
        </p>

        <div className="text-lg font-black text-adron-black mt-4 flex justify-between">
          <span className="w-[70%] truncate">
            {formatPrice(property.price ?? 0)}
          </span>
          <div className="mr-2" onClick={toggleSaveProperty}>
            {isSaved ? (
              <FaHeart className="text-adron-green" size={20} />
            ) : (
              <FaRegHeart className="text-gray-500" size={20} />
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center text-[10px] font-bold text-gray-500 gap-2">
            <span className="flex items-center gap-1 truncate">
              {/* <TfiRulerAlt2 />  */}
              <img src="/ruler.svg" width={14} height={14} alt="dumbbell" />
              {property.size} Sm q
            </span>
            {displayFeatures.map((feature, index) => (
              <span className="flex items-center gap-1 truncate">
                {feature === "Gym" ? (
                  <img
                    src="/dumbbell.svg"
                    width={14}
                    height={14}
                    alt="dumbbell"
                  />
                ) : feature === "Light" ? (
                  <GiStreetLight />
                ) : (
                  <IoGiftOutline />
                )}{" "}
                {feature}
              </span>
            ))}
            {/* <span className="flex items-center gap-1 truncate">
              <GiStreetLight /> {property.features[1]}
            </span>
            <span className="flex items-center gap-1 truncate">
              <img src="/dumbbell.svg" width={14} height={14} alt="dumbbell" />
              {property.features[2]}
            </span> */}
          </div>
          <div className="text-gray-400 flex items-center gap-1 text-xs">
            {property.type.name}
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <div className="">Payment Duration:</div>
          <div className=" font-bold">
            {property.property_duration_limit} month(s) max
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Button
            label="View Property"
            className="bg-adron-green text-xs py-3"
            onClick={() => navigate(`/properties/${property.id}`)}
          />
          <Button
            // label={
            //   property.is_bought ? `Already bought this` : `Invest in Property`
            // }
            // disabled={property.is_bought}
            label="Invest in Property"
            className="!bg-transparent !text-black border hover:!text-white hover:!bg-black text-xs py-3"
            // onClick={() => navigate(`/invest-property/${property.id}`)}
            onClick={() => navigate(`/invest-property-form/${property.id}`)}
          />
        </div>
      </div>
    </div>
  );
}
