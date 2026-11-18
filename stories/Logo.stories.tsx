import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from "@/components/ui/Logo";

const meta: Meta<typeof Logo> = {
  title: "Brand/Logo",
  component: Logo,
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const HorizontalDark: Story = {
  args: {
    variant: "horizontal",
    tone: "dark",
  },
};

export const HorizontalLight: Story = {
  args: {
    variant: "horizontal",
    tone: "light",
  },
  globals: {
    backgrounds: { value: "carbonBlack" },
  },
};

export const SymbolOnly: Story = {
  args: {
    variant: "symbol",
    tone: "dark",
    className: "h-12 w-12",
  },
};
