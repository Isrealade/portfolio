'use client'

import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="section-bg-primary border-t border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold gradient-text">IA</span>
              <span className="text-primary font-semibold">{portfolioData.personal.name}</span>
            </div>
            <p className="text-tertiary leading-relaxed">
              DevOps/Cloud Engineer passionate about building resilient, secure, 
              and scalable cloud environments.
            </p>
            <div className="flex space-x-4">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tertiary hover:text-primary transition-colors duration-200 hover:scale-110 transform"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tertiary hover:text-primary transition-colors duration-200 hover:scale-110 transform"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="text-tertiary hover:text-primary transition-colors duration-200 hover:scale-110 transform"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-primary font-semibold">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Projects', href: '#projects' },
                { name: 'Experience', href: '#experience' },
                { name: 'Contact', href: '#contact' },
                { name: 'Resume', href: '/Isreal_Adenekan-Resume.pdf' }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-tertiary hover:text-primary transition-colors duration-200 text-sm"
                  {...(link.href.startsWith('/') ? { download: true } : {})}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-primary font-semibold">Get In Touch</h3>
            <div className="space-y-2 text-sm text-tertiary">
              <p>{portfolioData.personal.location}</p>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="block hover:text-primary transition-colors duration-200"
              >
                {portfolioData.personal.email}
              </a>
              <a
                href={`tel:${portfolioData.personal.phone}`}
                className="block hover:text-primary transition-colors duration-200"
              >
                {portfolioData.personal.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-tertiary text-sm flex items-center">
              <span>© {currentYear} {portfolioData.personal.name}. Made with</span>
              <Heart size={14} className="text-red-500 mx-1" />
              <span>and lots of ☕</span>
            </div>
            <div className="text-tertiary text-sm">
              Crafted with passion & precision
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer