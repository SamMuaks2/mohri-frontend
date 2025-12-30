import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.title} className="border border-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="text-gray-400 mt-2">{project.description}</p>
            <p className="text-sm text-blue-400 mt-3">
              {project.tech.join(" • ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
