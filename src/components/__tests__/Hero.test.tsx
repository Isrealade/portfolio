import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

// Mock the portfolio data module completely
jest.mock('@/data/portfolio.json', () => ({
  personal: {
    name: 'Isreal Adenekan',
    tagline: 'Building resilient cloud infrastructure and automation solutions',
    github: 'https://github.com/test',
    linkedin: 'https://linkedin.com/in/test',
    email: 'test@example.com'
  }
}), { virtual: true })

describe('Hero Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the hero section', () => {
    render(<Hero />)
    
    // Check if main elements are present
    expect(screen.getByText('Hi, I\'m')).toBeInTheDocument()
    expect(screen.getByText('Isreal Adenekan')).toBeInTheDocument()
  })

  it('contains call-to-action buttons', () => {
    render(<Hero />)
    
    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
    expect(screen.getByText('Download Resume')).toBeInTheDocument()
  })

  it('includes scroll indicator', () => {
    render(<Hero />)
    
    const scrollButton = screen.getByLabelText('Scroll to about section')
    expect(scrollButton).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(<Hero />)
    
    // Check for section element
    const heroSection = document.querySelector('section#home')
    expect(heroSection).toBeInTheDocument()
  })

  it('displays download resume link', () => {
    render(<Hero />)
    
    const resumeLink = screen.getByText('Download Resume').closest('a')
    expect(resumeLink).toHaveAttribute('href', '/Isreal_Adenekan-Resume.pdf')
    expect(resumeLink).toHaveAttribute('download')
  })
})