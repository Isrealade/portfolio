import { render, screen } from '@testing-library/react'
import About from '../About'

// Mock the portfolio data module completely
jest.mock('@/data/portfolio.json', () => ({
  personal: {
    description: 'Passionate DevOps Engineer specializing in cloud infrastructure automation and CI/CD pipeline optimization.'
  }
}), { virtual: true })

describe('About Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the about section', () => {
    render(<About />)
    
    expect(screen.getByText('About Me')).toBeInTheDocument()
    expect(screen.getByText('Building Resilient Cloud Infrastructure')).toBeInTheDocument()
  })

  it('shows statistics cards', () => {
    render(<About />)
    
    expect(screen.getByText('95%+')).toBeInTheDocument()
    expect(screen.getByText('Support Ticket Resolution')).toBeInTheDocument()
    expect(screen.getByText('40%')).toBeInTheDocument()
    expect(screen.getByText('Infrastructure Setup Reduction')).toBeInTheDocument()
  })

  it('displays highlight cards', () => {
    render(<About />)
    
    expect(screen.getByText('Cloud Infrastructure')).toBeInTheDocument()
    expect(screen.getByText('DevOps Automation')).toBeInTheDocument()
    expect(screen.getByText('Container Orchestration')).toBeInTheDocument()
    expect(screen.getByText('Technical Support')).toBeInTheDocument()
  })

  it('has proper section structure', () => {
    render(<About />)
    
    const aboutSection = document.querySelector('section#about')
    expect(aboutSection).toBeInTheDocument()
  })

  it('displays professional experience text', () => {
    render(<About />)
    
    expect(screen.getByText(/With a unique blend of DevOps engineering/)).toBeInTheDocument()
    expect(screen.getByText(/Currently seeking opportunities/)).toBeInTheDocument()
  })

  it('displays statistics with proper formatting', () => {
    render(<About />)
    
    // Check that statistics are formatted as expected
    expect(screen.getByText('347/365 tickets resolved')).toBeInTheDocument()
    expect(screen.getByText('From 3 hours to 1.8 hours')).toBeInTheDocument()
  })
})