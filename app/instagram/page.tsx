"use client";

import Link from "next/link";
import { X } from "lucide-react";
import data from "../../data.json";
import style from "../../style.json";

const lang = "es";

// Add your Instagram post URLs here
const instagramPosts = [
  "https://www.instagram.com/p/EXAMPLE1/",
  "https://www.instagram.com/p/EXAMPLE2/",
  "https://www.instagram.com/p/EXAMPLE3/",
  "https://www.instagram.com/p/EXAMPLE4/",
  "https://www.instagram.com/p/EXAMPLE5/",
  "https://www.instagram.com/p/EXAMPLE6/",
];

export default function InstagramPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200">
        <div className="flex justify-between items-center px-8 py-6">
          <h1 className="text-2xl font-light">{data.footer.instagram}</h1>
          <Link
            href="/"
            className="text-neutral-600 hover:opacity-70 transition-opacity">
            <X size={32} strokeWidth={1} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="pt-32 px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-8">Nuestro Instagram</h2>
            <p className="text-lg font-light mb-8 max-w-2xl mx-auto">
              Síguenos en Instagram para ver nuestras últimas creaciones
            </p>
            <a
              href={data.footer.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 text-sm tracking-widest transition-all hover:opacity-90"
              style={{
                backgroundColor: style.colors.primary,
                color: "white",
              }}>
              SEGUIR EN INSTAGRAM
            </a>
          </div>

          {/* Instructions */}
          <div className="text-center mb-12 p-8 bg-neutral-100 rounded">
            <p className="text-sm font-light text-neutral-600">
              Para mostrar posts de Instagram aquí, reemplaza las URLs de
              ejemplo en{" "}
              <code className="bg-white px-2 py-1">app/instagram/page.tsx</code>{" "}
              con URLs reales de tus posts de Instagram.
            </p>
            <p className="text-xs font-light text-neutral-500 mt-2">
              Ejemplo: https://www.instagram.com/p/ABC123/
            </p>
          </div>

          {/* Instagram Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {instagramPosts.map((postUrl, index) => (
              <div
                key={index}
                className="w-full"
                style={{ minHeight: "500px" }}>
                <iframe
                  src={`${postUrl}embed/`}
                  className="w-full border-0"
                  style={{ height: "600px" }}
                  scrolling="no"
                  allowTransparency={true}
                  allow="encrypted-media"
                />
              </div>
            ))}
          </div>

          {/* View More */}
          <div className="text-center mt-16">
            <a
              href={data.footer.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-light hover:opacity-70 transition-opacity"
              style={{ color: style.colors.primary }}>
              Ver más en Instagram →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
