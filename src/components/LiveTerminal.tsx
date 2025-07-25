'use client'

import { useState, useEffect, useRef } from 'react'
import { Terminal, Play, RotateCcw } from 'lucide-react'

interface Command {
  command: string
  output: string[]
  delay?: number
}

const LiveTerminal = () => {
  const [currentLine, setCurrentLine] = useState(0)
  const [currentCommand, setCurrentCommand] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [executedCommands, setExecutedCommands] = useState<{command: string, output: string[]}[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands: Command[] = [
    {
      command: 'docker --version',
      output: ['Docker version 24.0.5, build ced0996'],
      delay: 800
    },
    {
      command: 'kubectl get pods -n default',
      output: [
        'NAME                          READY   STATUS    RESTARTS   AGE',
        'nginx-deployment-7d8d9f8b4-2xmqr   1/1     Running   0          2d',
        'nginx-deployment-7d8d9f8b4-5k8pl   1/1     Running   0          2d',
        'nginx-deployment-7d8d9f8b4-7j9wn   1/1     Running   0          2d'
      ],
      delay: 1200
    },
    {
      command: 'git status',
      output: [
        'On branch main',
        'Your branch is up to date with \'origin/main\'.',
        '',
        'Changes to be committed:',
        '  (use "git reset HEAD <file>..." to unstage)',
        '',
        '        modified:   terraform/main.tf',
        '        new file:   docker/Dockerfile'
      ],
      delay: 600
    },
    {
      command: 'terraform plan',
      output: [
        'Refreshing Terraform state in-memory prior to plan...',
        '',
        'An execution plan has been generated and is shown below.',
        'Resource actions are indicated with the following symbols:',
        '  + create',
        '  ~ modify',
        '',
        'Terraform will perform the following actions:',
        '',
        '  # aws_instance.web will be created',
        '  + resource "aws_instance" "web" {',
        '      + ami           = "ami-0c02fb55956c7d316"',
        '      + instance_type = "t3.micro"',
        '    }',
        '',
        'Plan: 1 to add, 0 to change, 0 to destroy.'
      ],
      delay: 2000
    },
    {
      command: 'docker ps',
      output: [
        'CONTAINER ID   IMAGE          COMMAND                  CREATED       STATUS       PORTS                    NAMES',
        '8d3c7b8a9f12   nginx:latest   "/docker-entrypoint.…"   2 hours ago   Up 2 hours   0.0.0.0:8080->80/tcp    web-server',
        '5f2a8c1d4e67   redis:alpine   "docker-entrypoint.s…"   3 hours ago   Up 3 hours   6379/tcp                 redis-cache'
      ],
      delay: 900
    },
    {
      command: 'aws s3 ls',
      output: [
        '2024-01-15 10:30:45 my-app-backups',
        '2024-01-10 14:22:33 terraform-state-bucket',
        '2024-01-05 09:15:22 web-assets-prod'
      ],
      delay: 1100
    }
  ]

  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [executedCommands, currentCommand])

  const typeCommand = async (command: string, index: number) => {
    setIsTyping(true)
    setCurrentCommand('')
    
    // Type command character by character
    for (let i = 0; i <= command.length; i++) {
      setCurrentCommand(command.slice(0, i))
      await new Promise(resolve => setTimeout(resolve, 50))
    }
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Show output
    const cmd = commands[index]
    setExecutedCommands(prev => [...prev, { command, output: cmd.output }])
    setCurrentCommand('')
    setIsTyping(false)
    
    await new Promise(resolve => setTimeout(resolve, cmd.delay || 1000))
  }

  const runDemo = async () => {
    if (isRunning) return
    
    setIsRunning(true)
    setExecutedCommands([])
    setCurrentCommand('')
    setCurrentLine(0)
    
    for (let i = 0; i < commands.length; i++) {
      await typeCommand(commands[i].command, i)
      setCurrentLine(i + 1)
    }
    
    setIsRunning(false)
  }

  const resetTerminal = () => {
    setExecutedCommands([])
    setCurrentCommand('')
    setCurrentLine(0)
    setIsRunning(false)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Terminal Header */}
      <div className="card-bg rounded-t-lg px-2 sm:px-4 py-3 flex items-center justify-between border-b border-primary">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
          <span className="text-secondary font-medium text-sm sm:text-base">DevOps Terminal Demo</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={runDemo}
            disabled={isRunning}
            className="flex items-center gap-1 sm:gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:opacity-50 text-white px-2 sm:px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors"
          >
            <Play size={14} />
            {isRunning ? 'Running...' : 'Run Demo'}
          </button>
          <button
            onClick={resetTerminal}
            disabled={isRunning}
            className="flex items-center gap-1 sm:gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:opacity-50 text-white px-2 sm:px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={terminalRef}
        className="section-bg-secondary rounded-b-lg p-2 sm:p-4 h-64 sm:h-80 lg:h-96 overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed"
      >
        {/* Welcome message */}
        {executedCommands.length === 0 && !currentCommand && (
          <div className="text-green-400 mb-4">
            <div>Welcome to Isreal's DevOps Environment!</div>
            <div className="text-tertiary text-xs mt-1">Click "Run Demo" to see live DevOps commands in action</div>
          </div>
        )}

        {/* Executed commands */}
        {executedCommands.map((cmd, index) => (
          <div key={index} className="mb-4">
            {/* Command line */}
            <div className="flex items-center text-green-400">
              <span className="text-blue-400 mr-2">isreal@devops:~$</span>
              <span>{cmd.command}</span>
            </div>
            
            {/* Command output */}
            <div className="mt-1 text-secondary whitespace-pre-line">
              {cmd.output.map((line, lineIndex) => (
                <div key={lineIndex} className="leading-relaxed">
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Current typing command */}
        {isTyping && (
          <div className="flex items-center text-green-400">
            <span className="text-blue-400 mr-2">isreal@devops:~$</span>
            <span>{currentCommand}</span>
            <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
          </div>
        )}

        {/* Idle cursor */}
        {!isRunning && executedCommands.length > 0 && !isTyping && (
          <div className="flex items-center text-green-400">
            <span className="text-blue-400 mr-2">isreal@devops:~$</span>
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
          </div>
        )}
      </div>

      {/* Command descriptions */}
      <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="text-primary font-semibold mb-2">Commands Demonstrated:</h4>
          <ul className="space-y-1 text-tertiary">
            <li>• <code className="text-green-400">docker --version</code> - Check Docker installation</li>
            <li>• <code className="text-green-400">kubectl get pods</code> - List Kubernetes pods</li>
            <li>• <code className="text-green-400">git status</code> - Check Git repository status</li>
          </ul>
        </div>
        <div>
          <h4 className="text-primary font-semibold mb-2">Technologies Showcased:</h4>
          <ul className="space-y-1 text-tertiary">
            <li>• <code className="text-blue-400">terraform plan</code> - Infrastructure as Code</li>
            <li>• <code className="text-blue-400">docker ps</code> - Container management</li>
            <li>• <code className="text-blue-400">aws s3 ls</code> - Cloud storage operations</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LiveTerminal