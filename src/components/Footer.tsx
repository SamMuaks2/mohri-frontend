export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-500">
        © {new Date().getFullYear()} Mohri Muakpo. All rights reserved.
      </div>
    </footer>
  );
}
