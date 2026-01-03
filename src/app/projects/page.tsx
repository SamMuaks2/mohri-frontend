import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-yellow-500">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.title} className="border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition">
            <h3 className="text-xl font-semibold text-white">{project.title}</h3>
            <p className="text-gray-300 mt-2">{project.description}</p>
            <p className="text-sm text-yellow-500 mt-3">
              {project.tech.join(" • ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}