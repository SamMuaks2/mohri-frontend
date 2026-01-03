export default function Footer() {
  return (
    <footer className="border-t border-yellow-600/50 mt-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-400">
        © {new Date().getFullYear()} Mohri Muakpo. All rights reserved.
      </div>
    </footer>
  );
}