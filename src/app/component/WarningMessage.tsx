const WarningMessage = ({
  containerClassName = " ",
  textClassName = " ",
  message,
}) => {
  return (
    <div
      className={`flex items-center gap-4 h-12 mt-2 bg-teal-dark p-4 rounded-md ${containerClassName}`}
    >
      {/* Icon Container */}
      <div className="flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
        >
          <path
            d="M17 8.5C17 13.1955 13.1941 17 8.5 17C3.80591 17 0 13.1955 0 8.5C0 3.80728 3.80591 0 8.5 0C13.1941 0 17 3.80728 17 8.5ZM8.5 10.2137C7.62926 10.2137 6.92339 10.9196 6.92339 11.7903C6.92339 12.6611 7.62926 13.3669 8.5 13.3669C9.37074 13.3669 10.0766 12.6611 10.0766 11.7903C10.0766 10.9196 9.37074 10.2137 8.5 10.2137ZM7.00314 4.54661L7.25739 9.2079C7.26928 9.42602 7.44963 9.59677 7.66806 9.59677H9.33194C9.55037 9.59677 9.73072 9.42602 9.74261 9.2079L9.99686 4.54661C10.0097 4.31101 9.82213 4.1129 9.58618 4.1129H7.41378C7.17784 4.1129 6.99029 4.31101 7.00314 4.54661Z"
            fill="#D9D9D9"
          />
        </svg>
      </div>

      {/* Text Container with More Space */}
      <p className={`text-white text-xs leading-tight w-full ${textClassName}`}>
        {message}
      </p>
    </div>
  );
};

export default WarningMessage;
