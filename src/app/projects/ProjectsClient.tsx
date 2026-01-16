"use client";

import { useState } from "react";
import { Project } from "./page";

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-yellow-500">Projects</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No projects available yet.</p>
        </div>
      )}
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="group border border-yellow-600/40 bg-zinc-950 p-6 rounded-xl cursor-pointer hover:border-yellow-500 transition"
      >
        <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500">
          {project.title}
        </h3>

        <p className="text-gray-400 mt-2 line-clamp-3">
          {project.description}
        </p>

        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {project.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded hover:bg-yellow-500 hover:text-black transition-colors"
              >
                {link.label}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-500">
          {project.createdAt}
        </div>
      </div>

      {isOpen && (
        <ProjectModal project={project} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-950 border border-yellow-500 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-yellow-500">
              {project.title}
            </h2>
            <p className="text-gray-400 mt-2">{project.createdAt}</p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-3xl leading-none"
          >
            ×
          </button>
        </div>

        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
            {project.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                {link.label}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-gray-300 leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="text-xs text-gray-400 pt-4 border-t border-yellow-600/20">
          Created: {project.createdAt} • Last Updated: {project.updatedAt}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="border border-yellow-500 text-yellow-500 px-6 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}