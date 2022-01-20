const ErrorAlert = ({
  status,
  message,
  handleClose,
}: {
  status: number;
  message: string;
  handleClose: () => void;
}) => {
  return (
    <div
      className="flex flex-col md:flex-row max-w-full fixed bottom-5 left-0 right-0 md:bottom-10 p-2 md:mx-4 bg-red-800 items-center text-red-100 leading-none lg:rounded-full "
      role="alert"
    >
      <span className="justify-center rounded-full bg-red-500 uppercase px-2 py-1 text-center text-xs font-bold mr-3">
        {`Error ${status}`}
      </span>
      <span className="grow font-semibold mr-2 text-left">{message}</span>
      <span>
        <svg
          className="fill-current h-6 w-6 text-red-100"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={handleClose}
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>
  );
};

export default ErrorAlert;
