import { ReactElement, useState } from "react";
import { BiChevronRight, BiLinkExternal } from "react-icons/bi";

const Modal = ({
  icon,
  title,
  images,
  items,
}: {
  icon: ReactElement;
  title: string;
  images: boolean;
  items: string[];
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <button
        className="col-span-1 flex items-center text-lg p-4 mb-2 border dark:border-slate-400"
        data-modal-toggle="modal"
        onClick={() => setShowModal(true)}
      >
        {icon}
        <span className="text-left w-full">{title}</span>
        <BiChevronRight />
      </button>
      {showModal && (
        <div className="fixed top-0 left-0 right-0 h-full z-10 flex justify-center items-center overflow-x-hidden overflow-y-auto bg-slate-400/50">
          <div
            id="modal"
            className="z-20 rounded-lg max-h-screen w-full max-w-2xl bg-white dark:bg-gray-700"
          >
            <div className="flex justify-between p-5 border-b dark:border-white">
              <h1 className="text-xl">{title}</h1>
              <button
                className="text-xl cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>

            {images ? (
              <div className="flex flex-col p-5 items-center">
                {items?.map((item: string) => (
                  <img src={item} alt="floor-plan" className="w-1/2" />
                ))}{" "}
              </div>
            ) : (
              <div className="flex flex-col p-5 items-start">
                {items?.map((item: string) => (
                  <div className="flex justify-between w-full">
                    <a
                      href={item}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mb-5"
                    >
                      {item}
                    </a>
                    <BiLinkExternal size={`1.5rem`} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
