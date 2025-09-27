import { Button, Carousel, Modal } from "antd";
import { ZoomInOutlined, LeftOutlined, RightOutlined, ExpandOutlined } from "@ant-design/icons";
import React from "react";

interface CompanyImagesProps {
  images: string[];
}

export default function CompanyImages({ images }: CompanyImagesProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const carouselRef = React.useRef<any>(null);

  const showModal = () => {
    setCurrentImage(images[currentIndex]);
    setIsModalOpen(true);
  };

  const arrowStyle =
    "absolute top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-black text-lg rounded-full bg-white/80 hover:bg-white z-10 shadow border border-gray-200 cursor-pointer";

  const PrevArrow = (props: any) => (
    <div className={`${arrowStyle} left-3`} onClick={props.onClick}>
      <LeftOutlined />
    </div>
  );

  const NextArrow = (props: any) => (
    <div className={`${arrowStyle} right-3`} onClick={props.onClick}>
      <RightOutlined />
    </div>
  );

  return (
    <>
      <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
        <Carousel
          autoplay
          className="rounded-lg overflow-hidden"
          afterChange={setCurrentIndex}
          ref={carouselRef}
          dots={false}
          arrows
          prevArrow={<PrevArrow />}
          nextArrow={<NextArrow />}
        >
          {images.map((image, index) => (
            <div key={index}>
              <div className="relative">
                <img
                  src={image}
                  alt={`Company image ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          ))}
        </Carousel>
        <Button
        type="primary"
        icon={<ExpandOutlined />}
        className="!absolute !bottom-2 !right-2 z-10 bg-transparent! border-none hover:bg-white/90 text-black!"
        onClick={showModal}
      />
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
        centered
      >
        <img
          src={currentImage}
          alt="Enlarged view"
          className="w-full object-contain"
        />
      </Modal>
    </>
  );
} 