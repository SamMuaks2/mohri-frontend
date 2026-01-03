export default function ContactPage() {
  return (
    <section className="max-w-xl">
      <h2 className="text-3xl font-bold mb-6 text-yellow-500">Contact Me</h2>
      <form className="space-y-4">
        <input
          placeholder="Your name"
          className="w-full bg-zinc-950 border border-yellow-600/50 text-white p-3 rounded focus:border-yellow-500 focus:outline-none transition placeholder:text-gray-500"
        />
        <input
          placeholder="Your email"
          className="w-full bg-zinc-950 border border-yellow-600/50 text-white p-3 rounded focus:border-yellow-500 focus:outline-none transition placeholder:text-gray-500"
        />
        <textarea
          placeholder="Message"
          rows={5}
          className="w-full bg-zinc-950 border border-yellow-600/50 text-white p-3 rounded focus:border-yellow-500 focus:outline-none transition placeholder:text-gray-500"
        />
        <button className="bg-yellow-600 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition">
          Send Message
        </button>
      </form>
    </section>
  );
}