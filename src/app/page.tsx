import Navbar from "@/components/Navbar";
import CinematicIntro from "@/components/CinematicIntro";
import Marquee from "@/components/Marquee";
import StackOperacional from "@/components/StackOperacional";
import Servicos from "@/components/Servicos";
import Clientes from "@/components/Clientes";
import FunilVendas from "@/components/FunilVendas";
import ComoFunciona from "@/components/ComoFunciona";
import ParaQuem from "@/components/ParaQuem";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <CinematicIntro />
        <Marquee />
        <StackOperacional />
        <Servicos />
        <Clientes />
        <FunilVendas />
        <ComoFunciona />
        <ParaQuem />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
