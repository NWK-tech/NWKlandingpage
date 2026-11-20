import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RollActionLink } from "@/components/ui/RollActionLink";

const meta: Meta<typeof RollActionLink> = {
  title: "Components/RollActionLink",
  component: RollActionLink,
  args: {
    label: "Inspecionar caderno",
    tone: "dark",
  },
};

export default meta;
type Story = StoryObj<typeof RollActionLink>;

export const OnLightSurface: Story = {
  args: {
    label: "Iniciar um projeto",
    href: "#contato",
    tone: "dark",
  },
};

export const OnDarkSurface: Story = {
  args: {
    label: "Iniciar uma conversa",
    href: "#contato",
    tone: "light",
  },
  globals: {
    backgrounds: { value: "carbonBlack" },
  },
};

export const AsButton: Story = {
  args: {
    label: "Inspecionar caderno",
    tone: "light",
    onClick: () => {},
  },
  globals: {
    backgrounds: { value: "carbonBlack" },
  },
};
