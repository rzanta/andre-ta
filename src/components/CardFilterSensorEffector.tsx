import React from "react";

const CardFilterSensorEffector: React.FC = () => {
  return (
    <div className="my-4 flex flex-row py-8 px-4 bg-[#3F4640] rounded-xl cursor-pointer hover:bg-[#6E6F6E] mr-2 hover:scale-95 transition-all duration-500">
      <div className="w-[70px] h-[70px] bg-white rounded-xl"></div>
      <div className="mx-4 text-white flex-grow content-center items-center ">
        <p className="font-semibold">shipClass</p>
        <p className="font-bold text-2xl">shipName</p>
        <div className="flex flex-row gap-4 font-semibold mt-4">
          <div className="flex flex-row border rounded-full border-white gap-2 px-2 py-2">
            <p>Amount</p>
            <p className="px-2 bg-white text-[#3F4640] rounded-full">amount</p>
          </div>
          <div className="flex flex-row border rounded-full border-white gap-2 px-2 py-2">
            <p>Position</p>
            <p className="px-2 bg-white text-[#3F4640] rounded-full">
              position
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        {" "}
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
    </div>
  );
};

export default CardFilterSensorEffector;

// import React from "react";

// interface CardProps {
//   shipClass: string;
//   shipName: string;
//   amount: number;
//   position: string;
//   type?: string;
// }

// const CardFilterSensorEffector: React.FC<CardProps> = ({
//   shipClass,
//   shipName,
//   amount,
//   position,
//   type,
// }) => {
//   return (
//     <div className="my-4 flex flex-row py-8 px-4 bg-[#3F4640] rounded-xl cursor-pointer hover:bg-[#6E6F6E] mr-2 hover:scale-95 transition-all duration-500">
//       <div className="w-[70px] h-[70px] bg-white rounded-xl"></div>
//       <div className="mx-4 text-white flex-grow content-center items-center ">
//         <p className="font-semibold">{shipClass}</p>
//         <p className="font-bold text-2xl">{shipName}</p>
//         <div className="flex flex-row gap-4 font-semibold mt-4">
//           <div className="flex flex-row border rounded-full border-white gap-2 px-2 py-2">
//             <p>Amount</p>
//             <p className="px-2 bg-white text-[#3F4640] rounded-full">
//               {amount}
//             </p>
//           </div>
//           <div className="flex flex-row border rounded-full border-white gap-2 px-2 py-2">
//             <p>Position</p>
//             <p className="px-2 bg-white text-[#3F4640] rounded-full">
//               {position}
//             </p>
//           </div>
//           {type && (
//             <div className="flex flex-row border rounded-full border-white gap-2 px-2 py-2">
//               <p>Type</p>
//               <p className="px-2 bg-white text-[#3F4640] rounded-full">
//                 {type}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="flex items-center">
//         {" "}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="white"
//           className="w-10 h-10"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="6"
//             d="m8.25 4.5 7.5 7.5-7.5 7.5"
//           />
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default CardFilterSensorEffector;
