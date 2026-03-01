"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  placeholder?: string;
  placeholderImage?: string;
  animation?: string;
  href?: string;
  githubUrl?: string;
  onClick?: () => void;
}

export function ProjectCard({
  title,
  description,
  technologies,
  image,
  placeholder,
  placeholderImage,
  animation,
  href,
  githubUrl,
  onClick,
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        shouldReduceMotion
          ? undefined
          : { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }
      }
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      className={clsx(
        "group relative overflow-hidden rounded-2xl border border-white/12 bg-card/60 p-5",
        "shadow-[0_18px_48px_rgba(0,0,0,0.32)] backdrop-blur-sm transition-colors duration-300",
        "hover:border-primary/45 hover:bg-card/80",
        animation,
      )}
    >
      <div className="pointer-events-none absolute -top-24 -right-16 h-44 w-44 rounded-full bg-primary/20 blur-3xl transition-opacity duration-400 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-5 overflow-hidden rounded-xl border border-white/10">
          {image ? (
            <Image
              src={image}
              alt={title}
              width={640}
              height={400}
              className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : placeholderImage ? (
            <Image
              src={placeholderImage}
              alt={placeholder || title}
              width={640}
              height={400}
              className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="from-primary/20 to-primary/5 flex h-52 items-center justify-center bg-gradient-to-br px-6">
              <span className="text-primary text-center text-lg font-semibold">
                {placeholder || title}
              </span>
            </div>
          )}
        </div>

        <h3 className="mb-2 text-xl leading-snug font-semibold">{title}</h3>
        <p className="text-card-foreground/80 mb-5 text-sm leading-relaxed">
          {description}
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span key={tech} className="tech-chip text-xs">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/12 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              <ExternalLink className="h-4 w-4" />
              Ver projeto
            </a>
          ) : null}

          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10"
            >
              <Github className="h-4 w-4" />
              Repositório
            </a>
          ) : null}

          {!href && !githubUrl && onClick ? (
            <button
              onClick={onClick}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10"
            >
              Ver detalhes
            </button>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
