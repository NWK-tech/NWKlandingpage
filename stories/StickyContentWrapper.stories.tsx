import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import StickyContentWrapper from "@/components/ui/sticky-content-wrapper";
import { solutionsStickyChapters } from "@/content/home";

const meta: Meta<typeof StickyContentWrapper> = {
  title: "Components/StickyContentWrapper",
  component: StickyContentWrapper,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof StickyContentWrapper>;

export const DefaultSolutions: Story = {
  args: {
    items: solutionsStickyChapters,
  },
};
