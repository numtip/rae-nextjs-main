import type { StitchLandingContent } from "@/content/stitch-landing";
import { ArrowIcon, getIcon } from "./icons/index";

type Props = { c: StitchLandingContent };

export function StatisticsSection({ c }: Props) {
  return (
    <section className="bg-[#003F2A] py-16 text-white mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-green-800/50">
          {/* Header Column */}
          <div className="w-full lg:w-1/4 px-6 mb-8 lg:mb-0">
            <h3 className="text-2xl font-bold mb-2">{c.statistics.title}</h3>
            <p className="text-green-200 text-sm mb-4">
              {c.statistics.subtitle}
            </p>
            <a
              href={c.statistics.viewAllHref}
              className="text-[#D8A01A] font-medium hover:underline flex items-center gap-1"
            >
              {c.statistics.viewAllLabel}{" "}
              <ArrowIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Stats Grid */}
          <div className="w-full lg:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-6 px-6 pt-8 lg:pt-0">
            {c.statistics.stats.map((stat) => {
              const Icon = getIcon(stat.iconName);
              return (
                <div
                  key={stat.id}
                  className="text-center md:text-left"
                >
                  <p className="text-green-200 text-sm mb-1 flex items-center justify-center md:justify-start gap-2">
                    {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                    {stat.label}
                  </p>
                  <div className="text-4xl font-bold text-[#D8A01A] mb-1">
                    {stat.value.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-100">{stat.unit}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
