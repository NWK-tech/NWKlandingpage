import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        softWhite: { name: "Soft White", value: "#FAFAF8" },
        pureWhite: { name: "Pure White", value: "#FFFFFF" },
        neutralCream: { name: "Neutral Cream", value: "#F2F0EB" },
        carbonBlack: { name: "Carbon Black", value: "#131315" },
      },
    },
    initialGlobals: {
      backgrounds: { value: "softWhite" },
    },
    a11y: {
      test: "todo",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
