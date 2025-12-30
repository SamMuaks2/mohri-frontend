export default function ContactPage() {
  return (
    <section className="max-w-xl">
      <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
      <form className="space-y-4">
        <input
          placeholder="Your name"
          className="w-full bg-gray-900 border border-gray-700 p-3 rounded"
        />
        <input
          placeholder="Your email"
          className="w-full bg-gray-900 border border-gray-700 p-3 rounded"
        />
        <textarea
          placeholder="Message"
          rows={5}
          className="w-full bg-gray-900 border border-gray-700 p-3 rounded"
        />
        <button className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </section>
  );
}
