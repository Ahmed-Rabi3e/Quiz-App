import { useGlobalContext } from "./context";

const Modal = () => {
  const { isModalOpen, closeModal, correct, questions } = useGlobalContext();
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-[#000000bf] flex justify-center items-center opacity-0 transition-opacity -z-[1] ${
        isModalOpen && "opacity-[1] z-50"
      }`}
    >
      <div className="bg-white w-[90vh] max-w-xl px-12 py-8 rounded text-center relative">
        <h2 className="text-black mb-6">congrats!</h2>
        <p className="text-xl text-neutral-500">
          You answered{" "}
          <span className="text-black font-bold">
            {((correct / questions.length) * 100).toFixed(0)}%
          </span>{" "}
          of questions correctly
        </p>
        <button
          className="mr-auto bg-blue-500 text-white px-4 py-2 capitalize"
          onClick={closeModal}
        >
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
