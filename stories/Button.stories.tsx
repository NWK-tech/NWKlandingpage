import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Iniciar um projeto",
    variant: "primary",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    iconRight: <ArrowUpRight className="h-4 w-4" aria-hidden="true" />,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Conhecer nossas soluções",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Processando",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Indisponível",
  },
};

export const Inverse: Story = {
  args: {
    variant: "inverse",
    children: "Explorar projeto",
  },
  globals: {
    backgrounds: { value: "carbonBlack" },
  },
};
