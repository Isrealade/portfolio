'use client'

import { useEffect, useRef, useState } from 'react'
import { Github, ExternalLink, Star } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import ArchitecturePlayground from '@/components/ArchitecturePlayground'

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const featuredProjects = portfolioData.projects.filter(project => project.featured)

  return (
    <section ref={sectionRef} id="projects" className="py-20 section-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="gradient-text">Featured Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-secondary max-w-3xl mx-auto">
              Real-world DevOps and cloud engineering projects showcasing infrastructure automation, 
              CI/CD pipelines, and observability implementations
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group card-bg rounded-xl overflow-hidden border border-primary hover:border-primary-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-500/10 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Project Header */}
                <div className="p-4 sm:p-6 border-b border-primary">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-2" />
                      <span className="text-xs sm:text-sm text-yellow-400 font-medium">Featured Project</span>
                    </div>
                    <div className="flex space-x-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-tertiary hover:text-primary transition-colors duration-200 hover:scale-110 transform"
                        aria-label="View on GitHub"
                      >
                        <Github size={18} className="sm:w-5 sm:h-5" />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-tertiary hover:text-primary transition-colors duration-200 hover:scale-110 transform"
                          aria-label="View live demo"
                        >
                          <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 group-hover:text-primary-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-secondary leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="p-4 sm:p-6">
                  <h4 className="text-xs sm:text-sm font-semibold text-tertiary mb-3 uppercase tracking-wide">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 sm:px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-xs sm:text-sm font-medium border border-primary-500/20 hover:bg-primary-500/20 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Architecture Playground */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold gradient-text mb-4">Infrastructure Designer</h3>
              <p className="text-secondary max-w-2xl mx-auto">
                Interactive tool to design and visualize AWS cloud architectures. Try building your own infrastructure!
              </p>
            </div>
            <ArchitecturePlayground />
          </div>

          {/* View All Projects CTA */}
          <div className="text-center mt-12">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
            >
              <Github size={20} />
              View All Projects on GitHub
            </a>
          </div>

          {/* Skills Highlight */}
          <div className="mt-12 sm:mt-16">
            <div className="card-bg rounded-xl p-6 sm:p-8 border border-primary">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-6 text-center">Project Impact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">50%</div>
                  <div className="text-tertiary text-sm sm:text-base">CI/CD Deployment Speed</div>
                  <div className="text-xs text-tertiary mt-1">From 20min to 10min builds</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">30+</div>
                  <div className="text-tertiary text-sm sm:text-base">Containers Orchestrated</div>
                  <div className="text-xs text-tertiary mt-1">Across 4 microservices</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">3</div>
                  <div className="text-tertiary text-sm sm:text-base">Cloud Platforms Used</div>
                  <div className="text-xs text-tertiary mt-1">AWS, Azure, GCP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects