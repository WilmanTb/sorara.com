"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { projectCategories, projects } from "@/lib/projects";
import { categoryLabel, interfaceText, localePath, projectCopy, type Locale } from "@/lib/i18n";

export default function ProjectGallery({ locale = "en" }: { locale?: Locale }) {
  const [activeCategory, setActiveCategory] = useState<(typeof projectCategories)[number]>("All");
  const reduceMotion = useReducedMotion();
  const text = interfaceText[locale];
  const visibleProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      <div className="filter-bar" role="group" aria-label={text.filterLabel}>
        {projectCategories.map((category) => (
          <button
            aria-pressed={activeCategory === category}
            className={activeCategory === category ? "filter-button selected" : "filter-button"}
            key={category}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category === "All" ? text.all : categoryLabel(locale, category)}
          </button>
        ))}
      </div>
      {visibleProjects.length > 0 ? (
        <motion.div className="gallery-grid" layout>
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.article
                className={`gallery-project gallery-project-${index + 1}`}
                key={project.slug}
                layout
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.22 }}
              >
                <Link href={localePath(locale, `/work/${project.slug}`)} className="gallery-image-link">
                  <div className="gallery-image" style={{ backgroundColor: project.color }}>
                    <Image src={project.image} alt={projectCopy(locale, project).imageAlt} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 40vw" />
                    <span className="concept-mark">{text.conceptProject}</span>
                    <span className="gallery-arrow"><ArrowUpRight size={20} /></span>
                  </div>
                </Link>
                <div className="gallery-meta"><div><span className="project-category">{categoryLabel(locale, project.category)}</span><h2>{project.title}</h2></div><span className="gallery-index">0{index + 1}</span></div>
                <p>{projectCopy(locale, project).shortDescription}</p>
                <div className="project-tags">{project.technologies.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}</div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="gallery-empty" role="status">
          <span className="empty-mark">S.</span>
          <h2>{text.emptyTitle}</h2>
          <p>{text.emptyCopy}</p>
          <button className="text-link" onClick={() => setActiveCategory("All")} type="button">{text.showAll} <ArrowUpRight size={17} /></button>
        </div>
      )}
    </>
  );
}
