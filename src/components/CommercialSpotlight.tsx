"use client";

import Link from "next/link";
import {
  useCallback,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  commercialClusters,
  clusterCategoryLabel,
  DEFAULT_CLUSTER_ID,
  getClusterById,
  getClusterProducts,
  type CommercialClusterId,
} from "@/data/commercial-clusters";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const STAGE_MS = 280;
const STAGGER_MS = 50;
const HOVER_MS = 150;

const COMMERCIAL_GOLD = "#D0AD26";
const COMMERCIAL_CHARCOAL = "#202728";

export default function CommercialSpotlight() {
  const reduceMotion = usePrefersReducedMotion();
  const baseId = useId();
  const clusterRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeClusterId, setActiveClusterId] =
    useState<CommercialClusterId>(DEFAULT_CLUSTER_ID);
  const [hoveredClusterId, setHoveredClusterId] =
    useState<CommercialClusterId | null>(null);
  const [stageVisible, setStageVisible] = useState(true);

  const activeCluster = getClusterById(activeClusterId);
  const activeProducts = getClusterProducts(activeClusterId);
  const ClusterIcon = activeCluster.icon;

  const selectCluster = useCallback(
    (id: CommercialClusterId) => {
      if (id === activeClusterId) return;
      setHoveredClusterId(null);

      if (reduceMotion) {
        setActiveClusterId(id);
        setStageVisible(true);
        return;
      }

      setStageVisible(false);
      window.setTimeout(() => {
        setActiveClusterId(id);
        setStageVisible(true);
      }, STAGE_MS * 0.45);
    },
    [activeClusterId, reduceMotion],
  );

  const onClusterKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      next = (index + 1) % commercialClusters.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      next =
        (index - 1 + commercialClusters.length) % commercialClusters.length;
    } else if (event.key === "Home") {
      event.preventDefault();
      next = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      next = commercialClusters.length - 1;
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectCluster(commercialClusters[index].id);
      return;
    } else {
      return;
    }
    clusterRefs.current[next]?.focus();
  };

  const stageTransition: CSSProperties = reduceMotion
    ? { transition: "none" }
    : {
        transition: `opacity ${STAGE_MS}ms ease-out, transform ${STAGE_MS}ms ${SPRING}`,
      };

  return (
    <section
      className="bg-charcoal py-16 sm:py-20 lg:py-24"
      aria-labelledby="commercial-spotlight-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="commercial-spotlight-heading"
              className="text-[1.75rem] font-medium tracking-[-0.02em] text-white sm:text-3xl lg:text-4xl"
            >
              Commercial insurance, built for your industry
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/65 sm:text-base">
              Windsor-Essex runs on manufacturing, trucking, and trades. Explore
              coverage by cluster — then dive into the industry that fits.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 sm:mt-12 lg:mt-14">
          <div
            className="spotlight-cluster-scroll -mx-1 flex gap-3 overflow-x-auto px-1 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:px-0 lg:gap-4"
            role="tablist"
            aria-label="Commercial industry clusters"
          >
            {commercialClusters.map((cluster, index) => {
              const Icon = cluster.icon;
              const isActive = cluster.id === activeClusterId;
              const isHovered =
                hoveredClusterId === cluster.id && !isActive;
              const count = cluster.productLabels.length;

              return (
                <button
                  key={cluster.id}
                  ref={(el) => {
                    clusterRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-cluster-${cluster.id}`}
                  aria-selected={isActive}
                  aria-controls={`${baseId}-stage`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectCluster(cluster.id)}
                  onKeyDown={(event) => onClusterKeyDown(event, index)}
                  onMouseEnter={() => setHoveredClusterId(cluster.id)}
                  onMouseLeave={() => setHoveredClusterId(null)}
                  onFocus={() => setHoveredClusterId(cluster.id)}
                  onBlur={() => setHoveredClusterId(null)}
                  className={`spotlight-cluster-card group flex min-h-[108px] min-w-[148px] shrink-0 snap-start flex-col items-center justify-center gap-2.5 rounded-[14px] border px-3 py-4 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:min-h-[120px] sm:min-w-0 sm:px-4 sm:py-5 ${
                    isActive
                      ? "spotlight-cluster-active border-gold bg-[#2a3132] shadow-[0_14px_32px_rgba(0,0,0,0.35)]"
                      : "border-white/10 bg-[#252b2c] hover:border-gold/55"
                  } ${isHovered && !isActive ? "spotlight-cluster-hover -translate-y-1 border-gold/45 shadow-[0_10px_24px_rgba(0,0,0,0.28)]" : ""}`}
                  style={
                    {
                      transition: reduceMotion
                        ? "none"
                        : `transform ${HOVER_MS}ms ease-out, border-color ${HOVER_MS}ms ease-out, box-shadow ${HOVER_MS}ms ease-out, background-color 200ms ease-out`,
                    } as CSSProperties
                  }
                >
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-md sm:h-11 sm:w-11 ${
                      isActive
                        ? "hero-icon-tile-active border border-gold/35"
                        : "border border-white/10 bg-white/[0.04]"
                    }`}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{
                        color: isActive ? COMMERCIAL_GOLD : "rgba(255,255,255,0.55)",
                      }}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </span>
                  <span className="block">
                    <span
                      className={`block text-[13px] font-medium leading-tight sm:text-sm ${
                        isActive ? "text-white" : "text-white/75"
                      }`}
                    >
                      {cluster.name}
                    </span>
                    <span
                      className={`mt-0.5 block text-[11px] font-medium ${
                        isActive ? "text-gold" : "text-white/40"
                      }`}
                    >
                      {clusterCategoryLabel(count)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-6 sm:mt-8">
          <div
            id={`${baseId}-stage`}
            role="tabpanel"
            aria-labelledby={`${baseId}-cluster-${activeClusterId}`}
            aria-live="polite"
            className="spotlight-stage overflow-hidden rounded-[18px] border border-white/10 bg-[#2a3132] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.32)] sm:p-6 lg:p-8"
          >
            <div
              className={`${
                stageVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-3 opacity-0"
              }`}
              style={stageTransition}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="hero-icon-tile-active inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-gold/35 sm:h-12 sm:w-12">
                  <ClusterIcon
                    className="h-5 w-5 text-gold"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </span>
                <div className="min-w-0">
                  <h3 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                    {activeCluster.name}
                  </h3>
                  <p className="mt-1 text-[14px] text-white/55 sm:text-[15px]">
                    {clusterCategoryLabel(activeProducts.length)} in this
                    cluster
                  </p>
                </div>
              </div>

              <ul className="mt-6 grid grid-cols-1 gap-3 sm:mt-7 sm:grid-cols-2 sm:gap-4 lg:gap-5">
                {activeProducts.map((product, index) => {
                  const ProductIcon = product.icon;
                  return (
                    <li
                      key={`${activeClusterId}-${product.label}`}
                      className={
                        reduceMotion ? "" : "spotlight-product-enter"
                      }
                      style={
                        reduceMotion
                          ? undefined
                          : ({
                              animationDelay: `${index * STAGGER_MS}ms`,
                            } as CSSProperties)
                      }
                    >
                      <Link
                        href={product.href}
                        className="spotlight-product-card group flex h-full flex-col rounded-xl border border-white/10 bg-charcoal p-4 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-gold/45 hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)] sm:p-5"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md"
                            style={{
                              backgroundColor:
                                "color-mix(in srgb, #5A8A73 16%, #202728)",
                            }}
                          >
                            <ProductIcon
                              className="h-5 w-5 text-[#5A8A73]"
                              strokeWidth={1.5}
                              aria-hidden
                            />
                          </span>
                          <div className="min-w-0 flex-1">
                            <span className="block text-[15px] font-medium text-white sm:text-base">
                              {product.label}
                            </span>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-white/60 sm:text-[14px]">
                              {product.description}
                            </p>
                          </div>
                        </div>
                        <span className="mt-4 inline-flex items-center text-[13px] font-medium text-gold transition-colors group-hover:text-white">
                          Learn more
                          <span
                            aria-hidden
                            className="ml-1.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                          >
                            →
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-7 flex flex-col items-start gap-3 border-t border-white/10 pt-6 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-[14px] leading-relaxed text-white/55">
                  Not sure which product fits? A broker can map your operation
                  to the right coverage.
                </p>
                <Link
                  href={activeCluster.quoteHref}
                  className="btn-primary btn-primary-gradient group inline-flex h-[48px] w-full min-w-[44px] shrink-0 items-center justify-center rounded-md px-6 text-[14px] font-medium text-charcoal sm:w-auto sm:min-w-[240px] sm:text-[15px]"
                >
                  {activeCluster.quoteLabel}
                  <span
                    aria-hidden
                    className="ml-2 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
