'use client'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

const Logo = ({ size = 'md', showText = true, className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-16 h-16'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Custom Logo Icon */}
      <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          fill="none"
        >
          {/* Outer hexagon with gradient */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background hexagon */}
          <polygon 
            points="50,10 80,30 80,70 50,90 20,70 20,30" 
            fill="url(#logoGradient)" 
            className="opacity-90"
            filter="url(#glow)"
          />
          
          {/* Inner container */}
          <circle 
            cx="50" 
            cy="50" 
            r="25" 
            fill="rgba(15, 23, 42, 0.8)"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
          />
          
          {/* I Letter */}
          <text 
            x="42" 
            y="58" 
            fontSize="28" 
            fontWeight="bold" 
            fill="white"
            fontFamily="Inter, sans-serif"
          >
            I
          </text>
          
          {/* A Letter */}
          <text 
            x="52" 
            y="58" 
            fontSize="28" 
            fontWeight="bold" 
            fill="white"
            fontFamily="Inter, sans-serif"
          >
            A
          </text>
          
          {/* DevOps connecting lines */}
          <g stroke="url(#logoGradient)" strokeWidth="2" opacity="0.6">
            <line x1="30" y1="35" x2="70" y2="35" />
            <line x1="30" y1="65" x2="70" y2="65" />
            <line x1="35" y1="25" x2="35" y2="75" />
            <line x1="65" y1="25" x2="65" y2="75" />
          </g>
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold gradient-text leading-none`}>
            Isreal Adenekan
          </span>
          {size !== 'sm' && (
            <span className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-500 font-medium tracking-wide">
              DevOps Engineer
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default Logo