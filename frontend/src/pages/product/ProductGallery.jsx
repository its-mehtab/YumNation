import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { assets } from "../../assets/assets";

const ProductGallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="product-container clearfix">
      <Swiper
        onSwiper={setThumbsSwiper}
        direction="vertical"
        slidesPerView={4}
        watchSlidesProgress={true} // <-- REQUIRED: This tracks slide positions
        freeMode={true} // <-- Recommended for thumbs
        modules={[FreeMode, Navigation, Thumbs]}
        className="gallery-thumbs"
      >
        <SwiperSlide>
          <img src={assets.product1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.product2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.product3} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.product4} />
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
          <img src={assets.product1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.product2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.product3} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.product4} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductGallery;
