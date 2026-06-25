import { Link } from "react-router-dom";

import { useAuth } from "../../context/auth/useAuth";
import { getRoleHomeCopy } from "../../constants/roleExperience";

export const HeroBanner = () => {
  const { user } = useAuth();
  const copy = getRoleHomeCopy(user);

  return (
    <section className="institutional-surface rounded-2xl bg-gradient-to-br from-[#6F1D46] via-[#750946] to-[#636569] p-8 text-white shadow-lg sm:p-10">
      <div className="relative z-10">
        <span className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-white/90 ring-1 ring-white/20">
          {copy.eyebrow}
        </span>

        <h2 className="mb-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {copy.title}
        </h2>

        <p className="max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
          {copy.description}
        </p>

        <Link
          to={copy.ctaPath}
          className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-[#6F1D46] shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100"
        >
          {copy.ctaLabel}
        </Link>
      </div>
    </section>
  );
};
