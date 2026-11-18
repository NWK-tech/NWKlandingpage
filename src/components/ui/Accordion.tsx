"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import { motionTokens } from "@/tokens/foundations";

export interface AccordionEntry {
  id: string;
  index?: string;
  title: string;
  subtitle?: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionEntry[];
  defaultOpenId?: string;
  onActiveChange?: (id: string) => void;
  className?: string;
}

export function Accordion({
  items,
  defaultOpenId,
  onActiveChange,
  className,
}: AccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? items[0]?.id ?? null);

  function handleToggle(id: string) {
    const next = openId === id ? null : id;
    setOpenId(next);
    if (next && onActiveChange) {
      onActiveChange(next);
    }
  }

  return (
    <div className={cn("divide-y divide-[var(--nwk-border-subtle)] border-y border-[var(--nwk-border-subtle)]", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div key={item.id} className="group">
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(item.id)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left transition-colors duration-200 hover:text-[var(--nwk-carbon-black)]"
              >
                <span className="flex items-baseline gap-4 sm:gap-6">
                  {item.index ? (
                    <span className="font-display text-xs font-medium tracking-[0.12em] text-[var(--nwk-text-muted)]">
                      {item.index}
                    </span>
                  ) : null}
                  <span className="font-display text-xl font-medium tracking-tight text-[var(--nwk-text-primary)] sm:text-2xl">
                    {item.title}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
                    isOpen
                      ? "border-[var(--nwk-carbon-black)] bg-[var(--nwk-carbon-black)] text-[var(--nwk-soft-white)]"
                      : "border-[var(--nwk-border-subtle)] bg-transparent text-[var(--nwk-text-primary)] group-hover:border-[var(--nwk-carbon-black)]",
                  )}
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: motionTokens.durations.normal,
                    ease: motionTokens.easings.precision,
                  }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pl-0 sm:pl-10">{item.content}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
