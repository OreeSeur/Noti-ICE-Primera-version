import { Header } from "../components/layout/Header";
import { StatCard } from "../components/cards/StatCard";
import { NewsSection } from "../components/news/NewsSection";
import { EventsSection } from "../components/events/EventsSection";

import { avisos } from "../data/avisos";
import { eventos } from "../data/eventos";
import { documentos } from "../data/documentos";

import { HeroBanner } from "../components/home/HeroBanner";

import { RecentActivity } from "../components/home/RecentActivity";
import { UpcomingEvents } from "../components/home/UpcomingEvents";

import {
  Megaphone,
  Trophy,
  FileText,
} from "lucide-react";

export const Home = () => {
  return (
    <>
      <Header />

      <HeroBanner />

      {/* Tarjetas estadísticas */}
      <section
        className="
          grid
          gap-6
          md:grid-cols-3
        "
      >
        <StatCard
          title="Avisos"
          value={avisos.length}
          icon={Megaphone}
          path="/avisos"
        />

        <StatCard
          title="Eventos"
          value={eventos.length}
          icon={Trophy}
          path="/eventos"
        />

        <StatCard
          title="Documentos"
          value={documentos.length}
          icon={FileText}
          path="/documentos"
        />
      </section>
      <section
        className="
          grid
          gap-6
          mt-10
          lg:grid-cols-3
        "
      >
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        <UpcomingEvents />
      </section>
      {/* Noticias */}
      <NewsSection />

      {/* Eventos */}
      <EventsSection />
    </>
  );
};