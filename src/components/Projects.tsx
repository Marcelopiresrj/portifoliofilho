import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FolderGit2, ArrowUpRight, Monitor, Smartphone, Globe, Loader2, AlertCircle } from "lucide-react";
import { fetchProjects, type ProjectRow } from "../lib/supabase";

function getYouTubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
  return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function Projects() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar projetos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  return (
    <section 
      id="projects" 
      className="relative w-full mb-8"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-400 flex items-center gap-2">
              <FolderGit2 className="w-3.5 h-3.5" /> SELECTED WORKS
            </span>
            <h2 className="text-4xl sm:text-5xl font-georama font-bold mt-2 text-white italic">
              Projects
            </h2>
          </div>
          <p className="text-xs font-mono text-gray-600 self-start md:self-end">
            /02 INTERACTIVE SHOWCASE
          </p>
        </div>

        {/* States */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p className="text-sm font-mono tracking-widest uppercase">Loading projects...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-red-950/20 border border-red-900/50 text-red-400 text-sm font-mono max-w-2xl mx-auto">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-20 border border-gray-900 rounded-3xl bg-gray-950/30">
            <p className="text-gray-500 font-mono text-sm">No projects to display.</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="projects-grid">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`p-6 sm:p-8 rounded-3xl border border-gray-900 bg-gray-950/40 hover:bg-gray-950/90 hover:border-gray-800 transition-all duration-300 flex flex-col justify-between relative group ${
                  project.featured ? "md:col-span-2 md:grid md:grid-cols-5 md:gap-8 md:items-center" : ""
                }`}
                id={`project-card-${project.id}`}
              >
                {/* Project Icon */}
                <div className={`hidden sm:flex items-center justify-center text-4xl w-14 h-14 rounded-2xl bg-gray-900/60 border border-gray-800 group-hover:border-gray-700/80 mb-6 sm:mb-0 ${
                  project.featured ? "md:col-span-1" : "mb-6"
                }`}>
                  {project.icon}
                </div>

                {/* Core Content */}
                <div className={project.featured ? "md:col-span-4 space-y-4" : "space-y-4 h-full flex flex-col justify-between"}>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-gray-500">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Monitor className="w-3 h-3" />
                        <Smartphone className="w-3 h-3" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-georama font-semibold text-white flex items-center gap-2 group-hover:text-white transition-colors">
                      {project.title}
                      <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </h3>

                    {project.youtube_url && getYouTubeEmbedUrl(project.youtube_url) ? (
                      <div className="w-full aspect-video rounded-xl overflow-hidden mt-4 border border-gray-800 shadow-xl">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={getYouTubeEmbedUrl(project.youtube_url) || ''} 
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : null}

                    <p className="text-sm sm:text-base text-gray-400 font-light mt-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-900/60 mt-auto">
                    {/* Technology Tags Wrap */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag, tagIdx) => (
                        <span 
                          key={tagIdx} 
                          className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-gray-900/80 text-gray-400 border border-gray-800/60 hover:border-gray-700 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions Links */}
                    <div className="flex items-center gap-4 text-xs font-mono mt-3">
                      {project.demo_link && (
                        <a 
                          href={project.demo_link} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Globe className="w-3.5 h-3.5" /> LIVE DEMO
                        </a>
                      )}
                      {project.github_link && (
                        <a 
                          href={project.github_link} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-white hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          SOURCE CODE
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
