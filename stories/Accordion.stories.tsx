import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Accordion } from "@/components/ui/Accordion";
import { solutionsContent } from "@/content/home";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const SolutionsAccordion: Story = {
  args: {
    defaultOpenId: solutionsContent.items[0]?.id,
    items: solutionsContent.items.slice(0, 3).map((item) => ({
      id: item.id,
      title: item.title,
      content: <p className="text-sm text-[var(--nwk-text-secondary)]">{item.whatWeBuild}</p>,
    })),
  },
};
