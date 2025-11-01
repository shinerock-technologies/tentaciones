"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import data from "../data.json";
import style from "../style.json";

const DEFAULT_LANG = "es";

type Lang = "en" | "es";

function GallerySkeleton() {
  return (
    <div
      style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
      className="flex justify-center mb-20">
      <div
        className="grid grid-cols-2 w-full"
        style={{ maxWidth: "1100px", gap: "1rem" }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden bg-neutral-200 aspect-square">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG as Lang);
  const [selectedCategory, setSelectedCategory] = useState(
    data.categories[DEFAULT_LANG][0]
  );
  const [selectedPastry, setSelectedPastry] = useState<number | null>(null);
  const [imagesLoading, setImagesLoading] = useState(true);

  const languageOptions: { code: Lang; display: string; label: string }[] = [
    { code: "es", display: "ES", label: "Español" },
    { code: "en", display: "EN", label: "English" },
  ];

  const filteredPastries =
    selectedCategory === data.categories[lang][0]
      ? data.pastries
      : data.pastries.filter((p) => p.category[lang] === selectedCategory);

  useEffect(() => {
    setImagesLoading(true);
    const timer = setTimeout(() => setImagesLoading(false), 800);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  useEffect(() => {
    const categorySlug = searchParams.get("category");
    if (categorySlug) {
      const categoryIndex = data.categories.slugs.indexOf(categorySlug);
      if (categoryIndex !== -1) {
        setSelectedCategory(data.categories[lang][categoryIndex]);
      }
    }

    const productSlug = searchParams.get("product");
    if (productSlug) {
      const index = filteredPastries.findIndex((p) => p.slug === productSlug);
      if (index !== -1) {
        setSelectedPastry(index);
      }
    } else {
      setSelectedPastry(null);
    }
  }, [searchParams, lang, selectedCategory]);

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Vertical Shop Name - Desktop Only */}
      <div className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
        <div
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(-180deg)",
            color: "#000000",
          }}
          className="text-sm tracking-wide font-normal">
          {data.shopName[lang]}
        </div>
      </div>

      {/* Top Menu Button */}
      <div
        style={{
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
        className="flex justify-between items-center xl:justify-center">
        <div className="xl:hidden">
          <span className="text-sm font-semibold" style={{ color: "#000000" }}>
            {data.shopName[lang]}
          </span>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-3 transition-colors hover:opacity-70"
          style={{ color: style.colors.primary }}>
          <span className="text-xs font-semibold tracking-wider xl:text-base xl:font-light">
            Menu
          </span>
        </button>
      </div>

      {/* Full Screen Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center"
          style={{ backgroundColor: style.colors.primary }}>
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-8 right-8 text-white hover:opacity-70 transition-opacity">
            <X size={32} strokeWidth={1} />
          </button>
          <div className="flex flex-col items-center">
            <nav
              className="text-center space-y-4"
              style={{ marginBottom: "4rem" }}>
              <a
                href="/"
                onClick={() => setMenuOpen(false)}
                className="block text-xl xs:text-3xl md:text-4xl font-light text-white hover:opacity-70 transition-opacity">
                {data.ui.home[lang]}
              </a>
              {data.categories[lang].map((item, index) => (
                <a
                  key={item}
                  href={`/?category=${data.categories.slugs[index]}`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-xl xs:text-3xl md:text-4xl font-light text-white hover:opacity-70 transition-opacity">
                  {item}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="block text-xl xs:text-3xl md:text-4xl font-light text-white hover:opacity-70 transition-opacity">
                {data.ui.contact[lang]}
              </a>
            </nav>

            {/* Language Picker in Menu */}
            <div className="flex gap-4 mb-6">
              {languageOptions.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setLang(option.code);
                    setSelectedCategory(data.categories[option.code][0]);
                    setMenuOpen(false);
                  }}
                  className={`text-lg font-light transition-opacity ${
                    lang === option.code
                      ? "text-white opacity-100"
                      : "text-white opacity-40 hover:opacity-70"
                  }`}>
                  {option.display}
                </button>
              ))}
            </div>
            <div className="text-center space-y-3 text-white">
              <p className="text-base xs:text-xl md:text-2xl font-light">
                <a
                  href={data.footer.addressLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity">
                  {data.footer.address[lang]}
                </a>
              </p>
              <p className="text-base xs:text-xl md:text-2xl font-light">
                <a
                  href={`tel:${data.footer.phone}`}
                  className="hover:opacity-70 transition-opacity">
                  {data.footer.phone}
                </a>
              </p>
              <p className="text-base xs:text-xl md:text-2xl font-light">
                <a
                  href={`mailto:${data.footer.email}`}
                  className="hover:opacity-70 transition-opacity">
                  {data.footer.email}
                </a>
              </p>
              <p
                className="text-sm xs:text-base md:text-xl font-light italic"
                style={{ marginTop: "1.5rem" }}>
                <a
                  href={data.footer.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity">
                  {data.ui.seeMoreInstagram[lang]} {data.footer.instagram}{" "}
                  {data.ui.onInstagram[lang]}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 sm:px-12 md:px-20 lg:px-32 pb-20">
        {/* Hero Title */}
        <div
          id="top"
          style={{
            paddingTop: "0",
            paddingBottom: "1.5rem",
            marginBottom: "2.5rem",
          }}
          className="flex flex-col items-center">
          <div className="mb-8 md:mb-12">
            <div className="w-80 md:w-96">
              <Image
                src="/logo.webp"
                alt={data.shopName[lang]}
                width={520}
                height={320}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          <div
            className="text-center mb-40 md:mb-48 max-w-5xl mx-auto"
            style={{ marginTop: "2rem" }}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight mb-12 leading-tight px-4">
              {data.hero.title[lang]}
            </h1>
            <p className="text-lg md:text-3xl lg:text-4xl font-light leading-tight mb-4 px-4">
              <span className="italic" style={{ color: style.colors.primary }}>
                {data.hero.subtitle1[lang].split(" ")[0]}
              </span>{" "}
              {data.hero.subtitle1[lang].split(" ").slice(1).join(" ")}
            </p>
            <p className="text-lg md:text-3xl lg:text-4xl font-light leading-tight mb-16 px-4">
              {data.hero.subtitle2[lang]}
            </p>
            <p className="text-xs md:text-sm tracking-[0.2em] text-neutral-500 uppercase">
              {data.hero.authors[lang]}
            </p>
          </div>
          {/* Filter */}
          <div
            className="text-center mb-24 md:mb-32 px-4"
            style={{ marginTop: "2rem" }}>
            <p
              className="text-sm md:text-base italic"
              style={{ marginBottom: "1.5rem" }}>
              {data.filter.label[lang]}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {data.categories[lang].map((cat: string, index: number) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    router.push(`?category=${data.categories.slugs[index]}`, {
                      scroll: false,
                    });
                  }}
                  className="px-5 py-2 text-sm tracking-wider transition-all"
                  style={{
                    color:
                      selectedCategory === cat
                        ? style.colors.primary
                        : "#525252",
                    borderBottom:
                      selectedCategory === cat
                        ? `1px solid ${style.colors.primary}`
                        : "none",
                  }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery - Strict 2 columns */}
        {imagesLoading ? (
          <GallerySkeleton />
        ) : (
          <div
            style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
            className="flex justify-center mb-20 animate-fadeIn">
            <div
              className="grid grid-cols-2 w-full"
              style={{ maxWidth: "1100px", gap: "1rem" }}>
              {filteredPastries.map((pastry, index) => (
                <div
                  key={pastry.id}
                  onClick={() => {
                    const categoryIndex =
                      data.categories[lang].indexOf(selectedCategory);
                    const categorySlug = data.categories.slugs[categoryIndex];
                    router.push(
                      `?category=${categorySlug}&product=${pastry.slug}`,
                      { scroll: false }
                    );
                  }}
                  className="group cursor-pointer relative">
                  <div className="bg-neutral-200 overflow-hidden aspect-square relative">
                    <Image
                      src={pastry.image}
                      alt={pastry.title[lang]}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index < 2}
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                      <h3 className="text-lg font-light">
                        {pastry.title[lang]}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPastry !== null && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <button
            onClick={() => router.push("/", { scroll: false })}
            className="fixed top-8 right-8 text-neutral-600 hover:text-orange-600 transition-colors z-10">
            <X size={32} strokeWidth={1} />
          </button>

          <div className="h-full md:h-auto">
            <div className="flex flex-col md:grid md:grid-cols-2 h-full md:h-screen md:max-h-screen">
              <div className="w-full h-1/2 md:h-full bg-neutral-200 flex items-center justify-center overflow-hidden">
                <Image
                  src={filteredPastries[selectedPastry].image}
                  alt={filteredPastries[selectedPastry].title[lang]}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex-1 overflow-y-auto md:flex md:flex-col md:justify-center">
                <div
                  style={{ padding: "3rem 2rem" }}
                  className="md:px-20 lg:px-24 max-w-2xl md:mx-auto">
                  <p
                    className="text-xs tracking-widest uppercase mb-4"
                    style={{ color: style.colors.primary }}>
                    {filteredPastries[selectedPastry].category[lang]}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-light mb-6">
                    {filteredPastries[selectedPastry].title[lang]}
                  </h2>
                  <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                    {filteredPastries[selectedPastry].description[lang]}
                  </p>

                  <div style={{ marginTop: "3rem", paddingTop: "3rem" }}>
                    <h3 className="text-xl font-light mb-6">
                      {data.ui.orderOrInquiry[lang]}
                    </h3>
                    <div className="space-y-3">
                      <p className="text-base font-light">
                        <a
                          href={data.footer.addressLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-70 transition-opacity">
                          {data.footer.address[lang]}
                        </a>
                      </p>
                      <p className="text-base font-light">
                        <a
                          href={`tel:${data.footer.phone}`}
                          className="hover:opacity-70 transition-opacity">
                          {data.footer.phone}
                        </a>
                      </p>
                      <p className="text-base font-light">
                        <a
                          href={`mailto:${data.footer.email}`}
                          className="hover:opacity-70 transition-opacity">
                          {data.footer.email}
                        </a>
                      </p>
                      <p
                        className="text-sm font-light italic mt-4"
                        style={{ color: style.colors.primary }}>
                        <a
                          href={data.footer.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-70 transition-opacity">
                          {data.ui.seeMoreInstagram[lang]}{" "}
                          {data.footer.instagram} {data.ui.onInstagram[lang]}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        style={{
          marginTop: "8rem",
          paddingTop: "5rem",
          paddingBottom: "5rem",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
        className="bg-neutral-50">
        <div
          style={{ maxWidth: "48rem", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{ marginBottom: "0.25rem" }}
            className="text-base font-light leading-relaxed">
            <a
              href={data.footer.addressLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity">
              {data.footer.address[lang]}
            </a>
          </p>
          <p
            style={{ marginBottom: "0.25rem" }}
            className="text-base font-light">
            <a
              href={`tel:${data.footer.phone}`}
              className="hover:opacity-70 transition-opacity">
              {data.footer.phone}
            </a>
            {" - "}
            <a
              href={`mailto:${data.footer.email}`}
              className="hover:opacity-70 transition-opacity">
              {data.footer.email}
            </a>
          </p>
          <p
            style={{
              marginBottom: "2rem",
              maxWidth: "28rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            className="text-sm font-light text-neutral-600 italic leading-relaxed">
            {data.footer.hours[lang]}
          </p>

          <div style={{ marginBottom: "2rem" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1.5rem",
              }}>
              {data.categories[lang].slice(1).map((category, index) => (
                <a
                  key={category}
                  href={`/?category=${data.categories.slugs[index + 1]}`}
                  className="text-sm font-light tracking-wide transition-opacity hover:opacity-70"
                  style={{
                    color: index === 0 ? style.colors.primary : "#404040",
                  }}>
                  {category}
                </a>
              ))}
            </div>
          </div>

          <p
            className="text-sm font-light italic"
            style={{ marginBottom: "1rem", color: style.colors.primary }}>
            <a
              href={data.footer.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity">
              {data.ui.seeMoreInstagram[lang]} {data.footer.instagram}{" "}
              {data.ui.onInstagram[lang]}
            </a>
          </p>

          <p className="text-xs font-light text-neutral-400">
            {data.footer.credit[lang]}
          </p>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <HomeContent />
    </Suspense>
  );
}
