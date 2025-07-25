'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Calendar, Award } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

const Experience = () => {
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

  const formatDate = (dateString: string) => {
    if (dateString === 'present') return 'Present'
    const [year, month] = dateString.split('-')
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[parseInt(month) - 1]} ${year}`
  }

  return (
    <section ref={sectionRef} id="experience" className="py-20 section-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="gradient-text">Professional Experience</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-secondary max-w-3xl mx-auto">
              A journey from technical support to DevOps engineering, building expertise in 
              cloud infrastructure, automation, and system reliability
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line - Mobile: left side, Desktop: center */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500" style={{ height: 'calc(100% - 2rem)' }}></div>

            {/* Experience Items */}
            <div className="space-y-8 md:space-y-12">
              {portfolioData.experience.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`relative transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 top-6 w-4 h-4 bg-primary-500 rounded-full border-4 border-dark-300 z-10"></div>

                  {/* Content - Mobile: always right, Desktop: alternating */}
                  <div className={`ml-12 md:ml-0 ${
                    index % 2 === 0 
                      ? 'md:w-5/12 md:pr-8 md:ml-auto' 
                      : 'md:w-5/12 md:pl-8'
                  }`}>
                    <div className="card-bg p-6 rounded-xl border border-primary hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-primary">
                            {exp.title}
                          </h3>
                          {exp.current && (
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium border border-green-500/30">
                              Current
                            </span>
                          )}
                        </div>
                        
                        <div className="text-primary-400 font-semibold mb-2">
                          {exp.company}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-tertiary text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            {exp.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                          </div>
                        </div>
                      </div>

                      {/* Responsibilities */}
                      <div className="space-y-3">
                        {exp.responsibilities.map((responsibility, respIndex) => (
                          <div key={respIndex} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-secondary text-sm leading-relaxed">
                              {responsibility}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold gradient-text mb-4">Education & Certifications</h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Education */}
              <div className="card-bg p-6 rounded-xl border border-primary">
                <h4 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary-400" />
                  Education
                </h4>
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-primary-400">
                    {portfolioData.education.degree}
                  </div>
                  <div className="text-primary">{portfolioData.education.school}</div>
                  <div className="text-tertiary text-sm">
                    {portfolioData.education.location} • {portfolioData.education.startYear} - {portfolioData.education.endYear}
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="card-bg p-6 rounded-xl border border-primary">
                <h4 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent-400" />
                  Recent Certifications
                </h4>
                <div className="space-y-3">
                  {portfolioData.certifications.slice(0, 3).map((cert, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="text-primary font-medium text-sm">
                          {cert.name}
                        </div>
                        <div className="text-tertiary text-xs">
                          {cert.issuer}
                        </div>
                      </div>
                      <div className="text-accent-400 text-sm font-medium">
                        {cert.year}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience