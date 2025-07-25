'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Cloud, Database, Server, Shield, Layers, Download, RotateCcw, Zap } from 'lucide-react'

interface Service {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  position: { x: number; y: number }
  category: 'compute' | 'storage' | 'network' | 'security'
}

interface Connection {
  from: string
  to: string
}

const ArchitecturePlayground = () => {
  const [services, setServices] = useState<Service[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [draggedService, setDraggedService] = useState<Service | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const serviceTemplates = [
    { 
      name: 'EC2 Instance', 
      icon: <Server size={20} />, 
      color: 'bg-orange-500', 
      category: 'compute' as const 
    },
    { 
      name: 'Load Balancer', 
      icon: <Layers size={20} />, 
      color: 'bg-blue-500', 
      category: 'network' as const 
    },
    { 
      name: 'RDS Database', 
      icon: <Database size={20} />, 
      color: 'bg-blue-600', 
      category: 'storage' as const 
    },
    { 
      name: 'S3 Bucket', 
      icon: <Cloud size={20} />, 
      color: 'bg-green-500', 
      category: 'storage' as const 
    },
    { 
      name: 'Security Group', 
      icon: <Shield size={20} />, 
      color: 'bg-red-500', 
      category: 'security' as const 
    },
    { 
      name: 'Lambda Function', 
      icon: <Zap size={20} />, 
      color: 'bg-yellow-500', 
      category: 'compute' as const 
    }
  ]

  const prebuiltTemplates = [
    {
      name: '3-Tier Web App',
      description: 'Load Balancer → EC2 → RDS',
      services: [
        { name: 'Load Balancer', position: { x: 100, y: 100 } },
        { name: 'EC2 Instance', position: { x: 300, y: 100 } },
        { name: 'RDS Database', position: { x: 500, y: 100 } }
      ],
      connections: [
        { from: 'Load Balancer', to: 'EC2 Instance' },
        { from: 'EC2 Instance', to: 'RDS Database' }
      ]
    },
    {
      name: 'Serverless Stack',
      description: 'Lambda → S3 → RDS',
      services: [
        { name: 'Lambda Function', position: { x: 150, y: 80 } },
        { name: 'S3 Bucket', position: { x: 100, y: 200 } },
        { name: 'RDS Database', position: { x: 300, y: 200 } }
      ],
      connections: [
        { from: 'Lambda Function', to: 'S3 Bucket' },
        { from: 'Lambda Function', to: 'RDS Database' }
      ]
    }
  ]

  const handleDragStart = (template: typeof serviceTemplates[0]) => {
    const newService: Service = {
      id: `${template.name}-${Date.now()}`,
      name: template.name,
      icon: template.icon,
      color: template.color,
      position: { x: 0, y: 0 },
      category: template.category
    }
    setDraggedService(newService)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!draggedService || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - 50 // Center the service
    const y = e.clientY - rect.top - 25

    const newService = {
      ...draggedService,
      position: { x, y }
    }

    setServices(prev => [...prev, newService])
    setDraggedService(null)
  }, [draggedService])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const connectServices = (fromId: string, toId: string) => {
    setConnections(prev => [
      ...prev.filter(conn => !(conn.from === fromId && conn.to === toId)),
      { from: fromId, to: toId }
    ])
  }

  const loadTemplate = (template: typeof prebuiltTemplates[0]) => {
    const newServices = template.services.map(service => {
      const serviceTemplate = serviceTemplates.find(t => t.name === service.name)!
      return {
        id: `${service.name}-${Date.now()}`,
        name: service.name,
        icon: serviceTemplate.icon,
        color: serviceTemplate.color,
        position: service.position,
        category: serviceTemplate.category
      }
    })

    const newConnections = template.connections.map(conn => ({
      from: newServices.find(s => s.name === conn.from)?.id || '',
      to: newServices.find(s => s.name === conn.to)?.id || ''
    }))

    setServices(newServices)
    setConnections(newConnections)
  }

  const clearCanvas = () => {
    setServices([])
    setConnections([])
    setSelectedService(null)
  }

  const exportDiagram = () => {
    // Simple export functionality - in a real app, you'd use a library like html2canvas
    const data = { services, connections }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'architecture-diagram.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="card-bg rounded-t-lg p-3 sm:p-4 border-b border-primary">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-1 sm:mb-2">Architecture Playground</h3>
            <p className="text-tertiary text-xs sm:text-sm">Drag and drop AWS services to design your infrastructure</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={clearCanvas}
              className="flex items-center gap-1.5 sm:gap-2 bg-red-600 hover:bg-red-700 text-white px-2.5 sm:px-3 py-1.5 rounded text-xs sm:text-sm transition-colors"
            >
              <RotateCcw size={12} className="sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
            <button
              onClick={exportDiagram}
              className="flex items-center gap-1.5 sm:gap-2 bg-primary-600 hover:bg-primary-700 text-white px-2.5 sm:px-3 py-1.5 rounded text-xs sm:text-sm transition-colors"
            >
              <Download size={12} className="sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row card-bg rounded-b-lg overflow-hidden">
        {/* Service Palette */}
        <div className="lg:w-1/4 p-3 sm:p-4 lg:border-r border-b lg:border-b-0 border-primary">
          <h4 className="text-primary font-semibold mb-3 sm:mb-4 text-sm sm:text-base">AWS Services</h4>
          
          {/* Service Templates */}
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            {serviceTemplates.map((template, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(template)}
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 card-bg rounded-lg cursor-move hover:bg-primary-500/20 hover:border-primary-500/50 transition-all duration-200 border border-primary"
              >
                <div className={`p-1.5 sm:p-2 rounded ${template.color} text-white`}>
                  {React.cloneElement(template.icon as React.ReactElement, { 
                    size: 16,
                    className: "sm:w-5 sm:h-5 w-4 h-4"
                  })}
                </div>
                <span className="text-secondary text-xs sm:text-sm font-medium">{template.name}</span>
              </div>
            ))}
          </div>

          {/* Prebuilt Templates */}
          <h4 className="text-primary font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Templates</h4>
          <div className="space-y-1.5 sm:space-y-2">
            {prebuiltTemplates.map((template, index) => (
              <button
                key={index}
                onClick={() => loadTemplate(template)}
                className="w-full text-left p-2 sm:p-3 card-bg hover:bg-primary-500/20 hover:border-primary-500/50 rounded-lg transition-all duration-200 border border-primary"
              >
                <div className="text-primary-400 font-medium text-xs sm:text-sm mb-1">{template.name}</div>
                <div className="text-tertiary text-xs">{template.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="lg:w-3/4 relative">
          <div
            ref={canvasRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="h-64 sm:h-80 lg:h-[500px] section-bg-secondary relative overflow-hidden"
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, rgba(75, 85, 99, 0.3) 1px, transparent 0)
              `,
              backgroundSize: '20px 20px'
            }}
          >
            {/* Connection Lines */}
            <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
              {connections.map((connection, index) => {
                const fromService = services.find(s => s.id === connection.from)
                const toService = services.find(s => s.id === connection.to)
                
                if (!fromService || !toService) return null

                return (
                  <line
                    key={index}
                    x1={fromService.position.x + 50}
                    y1={fromService.position.y + 25}
                    x2={toService.position.x + 50}
                    y2={toService.position.y + 25}
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                )
              })}
            </svg>

            {/* Services */}
            {services.map((service) => (
              <div
                key={service.id}
                className={`absolute flex items-center gap-2 p-3 card-bg border-2 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                  selectedService === service.id 
                    ? 'border-primary-500 shadow-lg shadow-primary-500/25' 
                    : 'border-primary'
                }`}
                style={{
                  left: service.position.x,
                  top: service.position.y,
                  zIndex: 2
                }}
                onClick={() => setSelectedService(
                  selectedService === service.id ? null : service.id
                )}
              >
                <div className={`p-1 sm:p-1.5 rounded ${service.color} text-primary`}>
                  {React.cloneElement(service.icon as React.ReactElement, { 
                    size: 14,
                    className: "sm:w-4 sm:h-4 w-3.5 h-3.5"
                  })}
                </div>
                <span className="text-primary text-xs sm:text-sm font-medium whitespace-nowrap">
                  {service.name}
                </span>
              </div>
            ))}

            {/* Empty State */}
            {services.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center max-w-xs sm:max-w-sm">
                  <Cloud className="w-12 h-12 sm:w-16 sm:h-16 text-tertiary mx-auto mb-3 sm:mb-4" />
                  <p className="text-tertiary mb-2 text-sm sm:text-base">Drag services here to build your architecture</p>
                  <p className="text-tertiary text-xs sm:text-sm">Or try a quick template from the sidebar</p>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="p-3 sm:p-4 card-bg border-t border-primary">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div>
                <h5 className="text-primary font-medium mb-2 text-sm sm:text-base">How to use:</h5>
                <ul className="text-tertiary space-y-1">
                  <li>• Drag services from the left panel</li>
                  <li>• Drop them onto the canvas</li>
                  <li>• Click services to select them</li>
                </ul>
              </div>
              <div>
                <h5 className="text-primary font-medium mb-2 text-sm sm:text-base">Features:</h5>
                <ul className="text-tertiary space-y-1">
                  <li>• Use quick templates for common patterns</li>
                  <li>• Export your diagrams as JSON</li>
                  <li>• Visual connection indicators</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArchitecturePlayground