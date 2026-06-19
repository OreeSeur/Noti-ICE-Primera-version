export const InfoCard = ({
  title,
  subtitle,
  description,
}) => {
  return (
    <article
      className="
        bg-white
        p-6
        rounded-xl
        shadow-md
        transition
        hover:shadow-lg
        hover:-translate-y-1
      "
    >
      <h2
        className="
          text-xl
          font-semibold
        "
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="
            text-slate-500
            mt-2
          "
        >
          {subtitle}
        </p>
      )}

      {description && (
        <p
          className="
            mt-4
            text-slate-700
          "
        >
          {description}
        </p>
      )}
    </article>
  );
};