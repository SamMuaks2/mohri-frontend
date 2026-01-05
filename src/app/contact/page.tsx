// export default function ContactPage() {
//   return (
//     <section className="max-w-xl">
//       <h2 className="text-3xl font-bold mb-6 text-yellow-500">Contact Me</h2>
//       <form className="space-y-4">
//         <input
//           placeholder="Your name"
//           className="w-full bg-zinc-950 border border-yellow-600/50 text-white p-3 rounded focus:border-yellow-500 focus:outline-none transition placeholder:text-gray-500"
//         />
//         <input
//           placeholder="Your email"
//           className="w-full bg-zinc-950 border border-yellow-600/50 text-white p-3 rounded focus:border-yellow-500 focus:outline-none transition placeholder:text-gray-500"
//         />
//         <textarea
//           placeholder="Message"
//           rows={5}
//           className="w-full bg-zinc-950 border border-yellow-600/50 text-white p-3 rounded focus:border-yellow-500 focus:outline-none transition placeholder:text-gray-500"
//         />
//         <button className="bg-yellow-600 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition">
//           Send Message
//         </button>
//       </form>
//     </section>
//   );
// }


"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl">
      <h2 className="text-3xl font-bold mb-6 text-yellow-500">
        Contact Me
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className="w-full bg-zinc-950 border border-yellow-600/50 text-white p-3 rounded focus:border-yellow-500 focus:outline-none transition placeholder:text-gray-500"
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your email"
          required
          className="w-full bg-zinc-950 border border-yellow-600/50 text-white p-3 rounded focus:border-yellow-500 focus:outline-none transition placeholder:text-gray-500"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          rows={5}
          required
          className="w-full bg-zinc-950 border border-yellow-600/50 text-white p-3 rounded focus:border-yellow-500 focus:outline-none transition placeholder:text-gray-500"
        />

        <button
          disabled={loading}
          className="bg-yellow-600 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {success && (
          <p className="text-green-500 text-sm">
            Message sent successfully!
          </p>
        )}

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}
      </form>
    </section>
  );
}
