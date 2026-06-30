"use client";
/* eslint-disable @next/next/no-img-element */
import type { StitchLandingContent } from "@/content/stitch-landing";
import { ArrowIcon } from "./icons/index";

type Props = { c: StitchLandingContent };

export function ContentSection({ c }: Props) {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Research List */}
        <div>
          <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
            <h3 className="text-2xl font-bold text-gray-800">
              {c.researchList.title}
            </h3>
            <a
              href={c.researchList.viewAllHref}
              className="text-brand-primary font-medium hover:underline flex items-center gap-1 text-sm"
            >
              {c.researchList.viewAllLabel}{" "}
              <ArrowIcon className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Featured Large */}
            <div className="md:row-span-3">
              <img
                alt={c.researchList.featuredImageAlt}
                src={c.researchList.featuredImage}
                className="w-full h-full object-cover rounded-lg shadow-sm min-h-[300px]"
              />
            </div>

            {/* Small Items */}
            {c.researchList.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-start bg-white p-3 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
              >
                <img
                  alt={item.thumbnailAlt}
                  src={item.thumbnail}
                  className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-brand-primary font-semibold mb-1 block">
                    {item.tag}
                  </span>
                  <h4 className="font-bold text-gray-800 text-sm line-clamp-2 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500">{item.researcher}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News List */}
        <div>
          <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
            <h3 className="text-2xl font-bold text-gray-800">
              {c.newsList.title}
            </h3>
            <a
              href={c.newsList.viewAllHref}
              className="text-brand-primary font-medium hover:underline flex items-center gap-1 text-sm"
            >
              {c.newsList.viewAllLabel}{" "}
              <ArrowIcon className="w-4 h-4" />
            </a>
          </div>
          <div className="flex flex-col gap-4">
            {/* Featured News */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <img
                alt={c.newsList.featured.imageAlt}
                src={c.newsList.featured.image}
                className="w-full md:w-48 h-32 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <h4 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                  {c.newsList.featured.title}
                </h4>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  {c.newsList.featured.date}
                </p>
              </div>
            </div>

            {/* Small News */}
            {c.newsList.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center bg-white p-3 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow"
              >
                <img
                  alt={item.thumbnailAlt}
                  src={item.thumbnail}
                  className="w-24 h-20 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
