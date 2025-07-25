'use client'

import { useEffect, useRef, useState } from 'react'
import { Code, Server, Shield, Users } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const highlights = [
    {
      icon: <Server className="w-8 h-8" />,
      title: "Cloud Infrastructure",
      description: "Expert in AWS & Azure with hands-on experience in multi-cloud deployments, VPC design, and infrastructure automation."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "DevOps Automation",
      description: "Proficient in CI/CD pipelines, GitOps practices, and Infrastructure as Code using Terraform and GitHub Actions."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Container Orchestration",
      description: "Skilled in Docker, Kubernetes, and Helm for deploying and managing containerized microservices at scale."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Technical Support",
      description: "Strong background in Tier 2 technical support with 95%+ resolution rate and excellent customer satisfaction."
    }
  ]

  return (
    <section ref={sectionRef} id="about" className="py-20 section-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="gradient-text">About Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Text Content */}
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-6 text-center lg:text-left">
                Building Resilient Cloud Infrastructure
              </h3>
              
              <div className="space-y-4 text-secondary text-base sm:text-lg leading-relaxed text-center">
                <p className="text-center">
                  {portfolioData.personal.description}
                </p>
                
                <p className="text-center">
                  With a unique blend of DevOps engineering and technical support experience, 
                  I bring both the technical depth to architect robust solutions and the 
                  customer-focused mindset to ensure systems serve real business needs.
                </p>
                
                <p className="text-center">
                  Currently seeking opportunities to contribute to innovative teams where I can 
                  leverage my expertise in cloud automation, observability, and infrastructure 
                  optimization to drive meaningful impact.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-6">
                <div className="text-center card-bg rounded-lg p-4">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">95%+</div>
                  <div className="text-tertiary text-sm sm:text-base">Support Ticket Resolution</div>
                  <div className="text-xs text-tertiary mt-1">347/365 tickets resolved</div>
                </div>
                <div className="text-center card-bg rounded-lg p-4">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">40%</div>
                  <div className="text-tertiary text-sm sm:text-base">Infrastructure Setup Reduction</div>
                  <div className="text-xs text-tertiary mt-1">From 3 hours to 1.8 hours</div>
                </div>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className={`card-bg p-6 rounded-xl border border-primary hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/10 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="text-primary-400 mb-4">
                    {highlight.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-primary mb-3">
                    {highlight.title}
                  </h4>
                  <p className="text-secondary text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About