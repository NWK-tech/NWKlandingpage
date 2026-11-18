import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeviceMockup } from "@/features/home/components/DeviceMockup";
import { projectsContent } from "@/content/home";

const meta: Meta<typeof DeviceMockup> = {
  title: "Showcase/DeviceMockup",
  component: DeviceMockup,
};

export default meta;
type Story = StoryObj<typeof DeviceMockup>;

export const HybridStage: Story = {
  args: {
    project: projectsContent.items[0]!,
  },
};

export const DesktopStage: Story = {
  args: {
    project: projectsContent.items[1]!,
  },
};

export const MobileStage: Story = {
  args: {
    project: projectsContent.items[3]!,
  },
};
