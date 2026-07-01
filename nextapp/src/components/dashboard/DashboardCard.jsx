"use client";

import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUserShield,
} from "react-icons/fa";

export default function DashboardCard({
  title,
  value,
  type,
}) {

  const cards = {

    total: {
      icon: <FaUsers />,
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-500",
    },

    active: {
      icon: <FaUserCheck />,
      bg: "bg-green-100",
      text: "text-green-600",
      border: "border-green-500",
    },

    inactive: {
      icon: <FaUserTimes />,
      bg: "bg-red-100",
      text: "text-red-600",
      border: "border-red-500",
    },

    admin: {
      icon: <FaUserShield />,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      border: "border-yellow-500",
    },

  };

  const card = cards[type];

  return (

    <div
      className={`
      bg-white
      rounded-2xl
      shadow-md
      hover:shadow-xl
      duration-300
      border-l-4
      ${card.border}
      p-5
    `}
    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500">

            {title}

          </p>

          <h2 className="text-3xl font-bold mt-2">

            {value}

          </h2>

        </div>

        <div
          className={`
          w-14
          h-14
          rounded-full
          flex
          items-center
          justify-center
          text-2xl
          ${card.bg}
          ${card.text}
        `}
        >

          {card.icon}

        </div>

      </div>

    </div>

  );

}