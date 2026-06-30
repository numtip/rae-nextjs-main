import type { StitchLandingContent } from "@/content/stitch-landing";
import { getIcon } from "./icons/index";

type Props = { c: StitchLandingContent };

export function KnowledgeResources({ c }: Props) {
  return (
    <section className="bg-gray-100 py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-end gap-4">
          <h3 className="text-2xl font-bold text-gray-800">
            {c.knowledgeResources.title}
          </h3>
          <p className="text-gray-500 text-sm pb-1">
            {c.knowledgeResources.description}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {c.knowledgeResources.resources.map((resource) => {
            const Icon = getIcon(resource.iconName);
            return (
              <a
                key={resource.id}
                href={resource.href}
                className="bg-white p-6 text-center rounded-lg border border-gray-200 hover:border-brand-primary hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors mb-4">
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
                <h4 className="font-bold text-gray-800 text-sm mb-1">
                  {resource.title}
                </h4>
                <p className="text-xs text-gray-500">{resource.description}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
