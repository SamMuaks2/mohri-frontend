export default function Hero() {
  return (
    <section className="py-24 text-center">
      <h1 className="text-5xl font-extrabold mb-6">
        Product-Focused <span className="text-blue-500">Fullstack</span> &
        <br /> Cloud Engineer
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto text-lg">
        I design and build scalable, API-driven systems with modern cloud
        architectures — blending engineering depth with product thinking.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <a
          href="/projects"
          className="bg-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
        >
          View Projects
        </a>
        <a
          href="/contact"
          className="border border-gray-700 px-6 py-3 rounded-md hover:border-gray-500"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}
