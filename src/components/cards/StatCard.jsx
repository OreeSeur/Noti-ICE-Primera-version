import { Link } from "react-router-dom";

export const StatCard = ({
  title,
  value,
  icon,
  path,
}) => {
  const Icon = icon;

  return (
    <Link to={path}>
      <article
        className="
          bg-white
          dark:bg-slate-800
          rounded-xl
          shadow-md
          p-6
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-lg
          cursor-pointer
          flex
          justify-between
          items-center
        "
      >
        <div>
          <h3
            className="
              text-slate-500
              dark:text-slate-400
            "
          >
            {title}
          </h3>

          <p
            className="
              text-3xl
              font-bold
              mt-2
              text-slate-800
              dark:text-white
            "
          >
            {value}
          </p>
        </div>

        <Icon
          size={40}
          className="text-[#6A0032]"
        />
      </article>
    </Link>
  );
};