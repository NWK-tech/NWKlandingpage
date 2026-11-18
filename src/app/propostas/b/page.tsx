import type { Metadata } from "next";
import { ProposalBExperience } from "@/features/proposals/ProposalBExperience";

export const metadata: Metadata = {
  title: "Proposta B — Produto Vivo & Ecossistema",
  description:
    "Protótipo visual B da NWK: palco de produtos digitais, zoom coreografado no scroll e bancada interativa de serviços.",
};

export default function ProposalBPage() {
  return <ProposalBExperience />;
}
