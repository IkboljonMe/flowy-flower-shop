"use client";
import { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    const year = new Date().getFullYear();
    setCurrentYear(year);
  }, []);

  return (
    <footer id="Footer" className="border-t mt-20 px-2 bg-transparent py-6">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center text-gray-700 mt-8">
          <p className="text-sm">
            &copy; {currentYear} Altug Can Altun . Educational purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
