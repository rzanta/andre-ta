import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  platformClass: string;
  platformName: string;
  platformId: string;
  link?:string,
}

const Card: React.FC<CardProps> = ({
  platformClass,
  platformName,
  platformId,
  link
}) => {
  // const shipClass = "Ship Class";
  // const shipName = "Ship Name";
  // const shipId = "Ship ID";

  return (
    <Link to={link ?? '/'}>
      <div className="flex flex-row items-center text-white py-8 px-4 bg-[#3F4640] rounded-xl cursor-pointer hover:bg-[#323833] active:bg-[#1e221f] hover:scale-95 transition-all duration-500">
        <div className="w-[70px] h-[70px] rounded-xl bg-white"></div>
        <div className="flex flex-col flex-grow items-start content-center mx-4">
          <p className="text-[16px]">{platformClass}</p>
          <p className="text-[24px] font-bold">
            ({platformId}) {platformName}
          </p>
        </div>
        <div className="flex-grow"></div>{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </Link>
  );
};

export default Card;

// import React from "react";

// interface CardProps {
//   shipClass: string;
//   shipName: string;
//   shipId: string;
// }

// const Card: React.FC<CardProps> = ({ shipClass, shipName, shipId }) => {
//   return (
//     <div className="flex flex-row items-center text-white py-8 px-4 bg-[#3F4640] rounded-xl cursor-pointer hover:bg-[#323833] active:bg-[#1e221f] hover:scale-95 transition-all duration-500">
//       <div className="w-[70px] h-[70px] rounded-xl bg-white"></div>
//       <div className="flex flex-col flex-grow items-start content-center mx-4">
//         <p className="text-[16px]">{shipClass}</p>
//         <p className="text-[24px] font-bold">
//           ({shipId}) {shipName}
//         </p>
//       </div>
//       <div className="flex-grow"></div>{" "}
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={1.5}
//         stroke="white"
//         className="w-10 h-10"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="6"
//           d="m8.25 4.5 7.5 7.5-7.5 7.5"
//         />
//       </svg>
//     </div>
//   );
// };

// export default Card;
