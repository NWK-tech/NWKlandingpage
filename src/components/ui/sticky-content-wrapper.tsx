"use client";

import React, { useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { solutionsStickyChapters } from "@/content/home";
import { ensureGsapRegistered, gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import type { StickyContentItem, StickyContentLink } from "@/types/content";

export type { StickyContentItem, StickyContentLink };

const defaultItems: StickyContentItem[] = solutionsStickyChapters;

const getParagraphs = (item: StickyContentItem): string[] => {
  if (Array.isArray(item.paragraphs)) return item.paragraphs;
  if (Array.isArray(item.paragraph)) return item.paragraph;
  return item.paragraph ? [item.paragraph] : [];
};

const getListItems = (item: StickyContentItem): string[] => {
  if (Array.isArray(item.list)) return item.list;
  if (Array.isArray(item.listItems)) return item.listItems;
  return [];
};

const getLink = (item: StickyContentItem): StickyContentLink | null => {
  if (item.link) return item.link;
  if (item.href) {
    return {
      href: item.href,
      text: item.linkText || item.cta || "Saiba mais",
    };
  }
  return null;
};

const renderStickyContent = (item: StickyContentItem) => {
  const paragraphs = getParagraphs(item);
  const listItems = getListItems(item);
  const link = getLink(item);

  return (
    <div className="flex h-full w-full flex-col justify-center text-[var(--nwk-soft-white)]">
      {item.heading && (
        <h3 className="font-display mb-5 text-[clamp(1.75rem,3.1vw,3.35rem)] leading-[1.06] font-medium tracking-[-0.025em] text-[var(--nwk-soft-white)] max-[1025px]:mb-3 max-md:text-[clamp(1.5rem,6vw,2.1rem)]">
          {item.heading}
        </h3>
      )}

      {paragraphs.map((paragraph, paragraphIndex) => (
        <p
          key={`paragraph-${paragraphIndex}`}
          className="mb-5 max-w-[46ch] text-[clamp(0.95rem,1.08vw,1.125rem)] leading-[1.6] text-[var(--nwk-silver-gray)] max-[1025px]:mb-3 max-md:text-sm"
        >
          {paragraph}
        </p>
      ))}

      {listItems.length > 0 && (
        <ul className="mb-6 flex flex-col gap-2 max-[1025px]:mb-4 max-[1025px]:gap-1.5">
          {listItems.map((listItem, listIndex) => (
            <li
              key={`list-${listIndex}`}
              className="text-[clamp(0.875rem,0.98vw,1.02rem)] leading-[1.45] text-[var(--nwk-neutral-cream)] max-md:text-xs"
            >
              {listItem}
            </li>
          ))}
        </ul>
      )}

      {link?.href && (
        <a
          href={link.href}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            if (link.href === "#") {
              e.preventDefault();
            }
          }}
          className={`group mt-1 inline-flex w-fit items-center gap-2.5 text-[clamp(0.95rem,1.05vw,1.125rem)] leading-[1.2] font-medium text-[var(--nwk-soft-white)] no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--nwk-neutral-cream)] ${link.className || ""}`}
          target={link.target}
          rel={link.rel || (link.target === "_blank" ? "noreferrer" : undefined)}
        >
          <span className="relative inline-block w-fit after:absolute after:bottom-[-4%] after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.62,0.05,0.01,0.99)] after:content-[''] group-hover:after:origin-left group-hover:after:scale-x-100 group-focus-visible:after:origin-left group-focus-visible:after:scale-x-100">
            {link.text || link.label || "Saiba mais"}
          </span>
          <ArrowRight
            className="h-[1em] w-[1em] flex-none transition-transform duration-300 group-hover:-rotate-45 group-focus-visible:-rotate-45"
            aria-hidden="true"
          />
        </a>
      )}
    </div>
  );
};

export interface StickyContentCompProps {
  items?: StickyContentItem[];
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
  contentClassName?: string;
  imageClassName?: string;
  containerHeight?: string;
  bgColor?: string;
  contentEnterYPercent?: number;
  contentExitYPercent?: number;
  contentTransitionDuration?: number;
  contentDelay?: number;
  stepGap?: number;
  enableImageScaleFlow?: boolean;
  enableSnap?: boolean;
  initialImageScale?: number;
  activeImageScale?: number;
  exitImageScale?: number;
}

function StickyContentComp({
  items = [],
  className = "",
  leftClassName = "",
  rightClassName = "",
  contentClassName = "",
  imageClassName = "",
  containerHeight,
  bgColor,
  contentEnterYPercent = 12,
  contentExitYPercent = -12,
  contentTransitionDuration = 0.8,
  contentDelay = 0.28,
  stepGap = 2,
  enableImageScaleFlow = true,
  enableSnap = false,
  initialImageScale = 1.5,
  activeImageScale = 1.2,
  exitImageScale = 1,
}: StickyContentCompProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const contentRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    ensureGsapRegistered();

    if (!sectionRef.current || !stickyRef.current || !items.length) {
      return;
    }

    const reducedMotion = prefersReducedMotion();

    const context = gsap.context(() => {
      const contents = contentRefsRef.current;
      const images = imageRefsRef.current;

      contents.forEach((content, index) => {
        if (!content) return;
        gsap.set(content, {
          autoAlpha: index === 0 ? 1 : 0,
          yPercent: index === 0 ? 0 : contentEnterYPercent,
          zIndex: items.length - index,
        });
      });

      images.forEach((image, index) => {
        if (!image) return;
        gsap.set(image, {
          autoAlpha: reducedMotion ? (index === 0 ? 1 : 0) : 1,
          zIndex: items.length - index,
          clipPath: "inset(0% 0% 0% 0%)",
          scale: reducedMotion
            ? 1
            : enableImageScaleFlow
              ? index === 0
                ? activeImageScale
                : initialImageScale
              : 1,
          transformOrigin: "center center",
        });
      });

      const totalTimelineDuration = Math.max(1, (items.length - 1) * stepGap);
      const snapValues =
        items.length > 1
          ? Array.from({ length: items.length }, (_, index) => index / (items.length - 1))
          : [0];

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          snap:
            enableSnap && !reducedMotion && items.length > 1
              ? {
                  snapTo: snapValues,
                  duration: { min: 0.2, max: 0.5 },
                  ease: "power2.inOut",
                  delay: 0,
                  inertia: false,
                }
              : undefined,
        },
      });

      items.forEach((_, index) => {
        if (index === items.length - 1) {
          return;
        }

        const currentContent = contents[index];
        const nextContent = contents[index + 1];
        const currentImage = images[index];
        const nextImage = images[index + 1];
        const stepStart = index * stepGap;
        const nextContentStart = stepStart + contentTransitionDuration + contentDelay;

        if (currentContent) {
          timeline.to(
            currentContent,
            {
              autoAlpha: 0,
              yPercent: contentExitYPercent,
              duration: contentTransitionDuration,
              ease: "power2.inOut",
            },
            stepStart,
          );
        }

        if (nextContent) {
          timeline.fromTo(
            nextContent,
            {
              autoAlpha: 0,
              yPercent: contentEnterYPercent,
            },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: contentTransitionDuration,
              ease: "power2.inOut",
            },
            nextContentStart,
          );
        }

        if (currentImage) {
          timeline.to(
            currentImage,
            reducedMotion
              ? { autoAlpha: 0, duration: stepGap, ease: "none" }
              : {
                  clipPath: "inset(0% 0% 100% 0%)",
                  scale: enableImageScaleFlow ? exitImageScale : 1,
                  duration: stepGap,
                  ease: "none",
                },
            stepStart,
          );
        }

        if (nextImage) {
          if (reducedMotion) {
            timeline.to(
              nextImage,
              { autoAlpha: 1, duration: stepGap, ease: "none" },
              stepStart,
            );
          } else if (enableImageScaleFlow) {
            timeline.to(
              nextImage,
              {
                scale: activeImageScale,
                duration: stepGap,
                ease: "none",
              },
              stepStart,
            );
          }
        }
      });

      timeline.duration(totalTimelineDuration);
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => context.revert();
  }, [
    items,
    contentEnterYPercent,
    contentExitYPercent,
    contentTransitionDuration,
    contentDelay,
    stepGap,
    enableImageScaleFlow,
    enableSnap,
    initialImageScale,
    activeImageScale,
    exitImageScale,
  ]);

  if (!items.length) {
    return null;
  }

  return (
    <div
      ref={sectionRef}
      className={`relative flex w-full justify-between bg-[var(--nwk-carbon-black)] text-[var(--nwk-soft-white)] ${className}`}
      style={{
        height: containerHeight || `${items.length * 100}vh`,
        ...(bgColor ? { backgroundColor: bgColor } : null),
      }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen w-full justify-between overflow-hidden max-[1025px]:flex-col-reverse max-[1025px]:justify-between max-[1025px]:px-[5vw] max-[1025px]:py-8 max-md:px-[6vw] max-md:py-6"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-8 left-[21%] z-30 flex -translate-x-1/2 flex-col items-center justify-center gap-1.5 text-[var(--nwk-silver-gray)] max-[1025px]:hidden"
        >
          <span className="text-sm tracking-wide text-[var(--nwk-silver-gray)]">scroll</span>

          <svg
            width="20"
            height="28"
            className="h-6 w-4"
            viewBox="0 0 20 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <style>{`
              .nwk-chev1 { animation: nwkFadeDown 1.4s ease-in-out infinite; }
              .nwk-chev2 { animation: nwkFadeDown 1.4s ease-in-out 0.22s infinite; }
              .nwk-chev3 { animation: nwkFadeDown 1.4s ease-in-out 0.44s infinite; }
              @keyframes nwkFadeDown {
                0%   { opacity: 0.12; transform: translateY(-3px); }
                50%  { opacity: 0.65; transform: translateY(2px); }
                100% { opacity: 0.12; transform: translateY(-3px); }
              }
            `}</style>
            <polyline
              className="nwk-chev1"
              points="2,2 10,9 18,2"
              stroke="currentColor"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              className="nwk-chev2"
              points="2,10 10,17 18,10"
              stroke="currentColor"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              className="nwk-chev3"
              points="2,18 10,25 18,18"
              stroke="currentColor"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          className={`relative h-full w-[45%] max-[1025px]:h-[58%] max-[1025px]:w-full ${bgColor ? "" : "bg-[var(--nwk-carbon-black)]"} ${leftClassName}`}
          style={bgColor ? { backgroundColor: bgColor } : undefined}
        >
          {items.map((item, index) => (
            <div
              key={`content-${index}`}
              ref={(element) => {
                contentRefsRef.current[index] = element;
              }}
              className={`absolute inset-0 h-full w-full pb-[8vh] pl-[5vw] pr-[2vw] opacity-0 max-[1025px]:px-0 max-[1025px]:pb-0 ${contentClassName}`}
            >
              {renderStickyContent(item)}
            </div>
          ))}
        </div>

        <div
          className={`relative h-full w-1/2 overflow-hidden bg-[var(--nwk-graphite)] max-[1025px]:mt-12 max-[1025px]:h-[36%] max-[1025px]:w-full max-[1025px]:rounded-[var(--nwk-radius-xl)] ${rightClassName}`}
        >
          {items.map((item, index) => (
            <div
              key={`image-${index}`}
              ref={(element) => {
                imageRefsRef.current[index] = element;
              }}
              className={`absolute inset-0 h-full w-full opacity-0 ${imageClassName}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.alt || item.imageAlt || `Ilustração da solução ${index + 1}`}
                className="h-full w-full object-cover"
                width={item.width || 1080}
                height={item.height || 1080}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export interface StickyContentWrapperProps {
  items?: StickyContentItem[];
  bgColor?: string;
  contentEnterYPercent?: number;
  contentTransitionDuration?: number;
  initialImageScale?: number;
  activeImageScale?: number;
  exitImageScale?: number;
  enableSnap?: boolean;
  className?: string;
}

export default function StickyContentWrapper({
  items = defaultItems,
  bgColor,
  contentEnterYPercent = 2,
  contentTransitionDuration = 0.9,
  initialImageScale = 1.5,
  activeImageScale = 1.2,
  exitImageScale = 1,
  enableSnap = false,
  className,
}: StickyContentWrapperProps) {
  return (
    <StickyContentComp
      items={items}
      bgColor={bgColor}
      contentEnterYPercent={contentEnterYPercent}
      contentExitYPercent={-2}
      contentTransitionDuration={contentTransitionDuration}
      contentDelay={0.35}
      initialImageScale={initialImageScale}
      activeImageScale={activeImageScale}
      exitImageScale={exitImageScale}
      enableSnap={enableSnap}
      className={className}
    />
  );
}
