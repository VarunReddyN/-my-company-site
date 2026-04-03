export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#3d4446] py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <span>
          &copy; {new Date().getFullYear()} Creative AI Works. All rights reserved.
        </span>
        <span>Building the future with AI solutions.</span>
      </div>
    </footer>
  );
}
