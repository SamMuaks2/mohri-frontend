"use client";

import { Experience } from "./page";

type Props = {
  experience: Experience[];
};

export default function ExperienceClient({ experience }: Props) {
  return (
    <section className="space-y-8">
      {experience.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition bg-white"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
            <div>
              <h2 className="text-xl font-semibold">{item.role}</h2>
              <p className="text-gray-600">{item.company}</p>
            </div>

            <p className="text-sm text-gray-500 mt-2 md:mt-0">
              {item.period}
            </p>
          </div>

          <p className="text-gray-700 whitespace-pre-line mb-4">
            {item.description}
          </p>

          {item.responsibilities && item.responsibilities.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Responsibilities</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {item.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {item.technologies && item.technologies.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
