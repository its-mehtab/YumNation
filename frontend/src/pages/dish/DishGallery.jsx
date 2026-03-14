import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { assets } from "../../assets/assets";

const DishGallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="dish-container clearfix">
      <Swiper
        onSwiper={setThumbsSwiper}
        direction="vertical"
        slidesPerView={4}
        watchSlidesProgress={true}
        freeMode={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="gallery-thumbs"
      >
        <SwiperSlide>
          <img src={assets.dish2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.dish2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.dish2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.dish2} />
        </SwiperSlide>
      </Swiper>

      <Swiper
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="gallery-top"
      >
        <SwiperSlide>
          <img src={assets.dish2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.dish2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.dish2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.dish2} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default DishGallery;
