export default function Hero() {
  return (
    <section className="py-24 text-center">
      <h1 className="text-5xl font-extrabold mb-6 text-white">
        Product-Focused <span className="text-yellow-500">Fullstack</span> &
        <br /> Cloud Engineer
      </h1>
      <p className="text-gray-300 max-w-2xl mx-auto text-lg">
        I design and build scalable, API-driven systems with modern cloud
        architectures, blending engineering depth with product thinking.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <a
          href="/projects"
          className="bg-yellow-600 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 transition"
        >
          View Projects
        </a>
        <a
          href="/contact"
          className="border border-yellow-600 text-white px-6 py-3 rounded-md hover:bg-yellow-600 hover:text-black transition"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}