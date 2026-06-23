import ipnLogo from "../assets/images/ipn-seeklogo.png";

import { LoginForm } from "../components/auth/LoginForm";

export const Login = () => {
  return (
    <section
      className="
        min-h-screen
        bg-slate-100
        dark:bg-slate-900
        flex
        items-center
        justify-center
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-md
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
            mb-8
          "
        >
          <img
            src={ipnLogo}
            alt="IPN"
            className="w-24"
          />

          <h1
            className="
              text-3xl
              font-bold
              mt-4
              text-slate-800
              dark:text-white
            "
          >
            Portal NOTI ICE
          </h1>

          <p
            className="
              text-slate-500
              dark:text-slate-400
            "
          >
            Unidad Zacatenco
          </p>
        </div>

        <LoginForm />
      </div>
    </section>
  );
};