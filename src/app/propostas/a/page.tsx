import type { Metadata } from "next";
import { ProposalAExperience } from "@/features/proposals/ProposalAExperience";

export const metadata: Metadata = {
  title: "Proposta A — Tipografia Monumental & Portal N!",
  description:
    "Protótipo visual A da NWK: tipografia em escala de pôster, portal clip-path derivado do símbolo N! e galeria horizontal pinada.",
};

export default function ProposalAPage() {
  return <ProposalAExperience />;
}
