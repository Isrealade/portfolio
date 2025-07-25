'use client'

import { useEffect, useRef, useState } from 'react'
import { Cloud, Container, Settings, Activity, Shield, Database, Code, GitBranch } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import LiveTerminal from '@/components/LiveTerminal'

const Skills = () => {
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

  const skillCategories = [
    {
      title: "Cloud Platforms",
      icon: <Cloud className="w-6 h-6" />,
      skills: portfolioData.skills.cloud,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Containers & Orchestration",
      icon: <Container className="w-6 h-6" />,
      skills: portfolioData.skills.containers,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Infrastructure as Code",
      icon: <Settings className="w-6 h-6" />,
      skills: portfolioData.skills.infrastructure,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "CI/CD & Automation",
      icon: <GitBranch className="w-6 h-6" />,
      skills: portfolioData.skills.cicd,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Monitoring & Logging",
      icon: <Activity className="w-6 h-6" />,
      skills: portfolioData.skills.monitoring,
      color: "from-teal-500 to-blue-500"
    },
    {
      title: "Networking & Security",
      icon: <Shield className="w-6 h-6" />,
      skills: portfolioData.skills.networking,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Databases",
      icon: <Database className="w-6 h-6" />,
      skills: portfolioData.skills.databases,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Scripting & Tools",
      icon: <Code className="w-6 h-6" />,
      skills: [...portfolioData.skills.scripting, ...portfolioData.skills.tools],
      color: "from-pink-500 to-rose-500"
    }
  ]

  return (
    <section ref={sectionRef} id="skills" className="py-20 section-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="gradient-text">Technical Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-secondary max-w-3xl mx-auto">
              Comprehensive expertise across the modern DevOps and cloud engineering stack
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className={`card-bg rounded-xl p-6 border border-primary hover:border-primary-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/10 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${categoryIndex * 100}ms` }}
              >
                {/* Category Header */}
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} mr-3`}>
                    <div className="text-primary">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-primary">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className={`flex items-center group transition-all duration-300 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}
                      style={{ transitionDelay: `${(categoryIndex * 100) + (skillIndex * 50)}ms` }}
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} mr-3 group-hover:scale-125 transition-transform duration-200`}></div>
                      <span className="text-secondary dark:text-secondary group-hover:text-primary transition-colors duration-200 text-sm">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Live Terminal Demo */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold gradient-text mb-4">DevOps in Action</h3>
              <p className="text-secondary max-w-2xl mx-auto">
                Watch real DevOps commands and workflows in this interactive terminal demonstration
              </p>
            </div>
            <LiveTerminal />
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="card-bg rounded-xl p-8 border border-primary">
              <h3 className="text-2xl font-bold text-primary mb-4">Growing DevOps Expertise</h3>
              <p className="text-secondary leading-relaxed max-w-4xl mx-auto">
                As a passionate Junior DevOps Engineer, I'm building hands-on experience with cloud-native technologies 
                and modern automation practices. I focus on learning containerization with Docker, infrastructure 
                automation with Terraform, and CI/CD pipeline implementation to support reliable software delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills