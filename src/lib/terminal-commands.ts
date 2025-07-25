import { VirtualFileSystem } from './terminal-filesystem'

export interface CommandResult {
  output: string[]
  success: boolean
}

export class TerminalCommands {
  private fs: VirtualFileSystem
  private commandHistory: string[] = []

  constructor(fs: VirtualFileSystem) {
    this.fs = fs
  }

  async executeCommand(input: string): Promise<CommandResult> {
    const parts = input.split(' ')
    const command = parts[0]
    const args = parts.slice(1)

    this.commandHistory.push(input)

    try {
      switch (command) {
        case 'ls': return this.ls(args)
        case 'll': return this.ls(['-la', ...args])
        case 'la': return this.ls(['-la', ...args])
        case 'cd': return this.cd(args)
        case 'pwd': return this.pwd()
        case 'cat': return this.cat(args)
        case 'tree': return this.tree(args)
        case 'whoami': return this.whoami()
        case 'uname': return this.uname(args)
        case 'help': return this.help()
        case 'tour': return this.tour()
        case 'skills': return this.skills()
        case 'about': return this.cat(['~/about/bio.txt'])
        case 'contact': return this.cat(['~/about/contact.txt'])
        case 'resume': return this.cat(['~/about/resume.txt'])
        case 'projects': return this.ls(['~/projects/'])
        case 'grep': return this.grep(args)
        case 'find': return this.find(args)
        case 'demo': return this.demo(args)
        case 'history': return this.history()
        default:
          return {
            output: [`bash: ${command}: command not found`],
            success: false
          }
      }
    } catch (error) {
      return {
        output: [`Error: ${error instanceof Error ? error.message : 'Unknown error'}`],
        success: false
      }
    }
  }

  private ls(args: string[]): CommandResult {
    let showAll = false
    let longFormat = false
    let target = null
    
    for (const arg of args) {
      if (arg.startsWith('-')) {
        if (arg.includes('a')) showAll = true
        if (arg.includes('l')) longFormat = true
      } else {
        target = arg
      }
    }
    
    try {
      const targetPath = target ? this.fs.resolvePath(target) : this.fs.getCurrentPath()
      
      if (!this.fs.exists(targetPath)) {
        return {
          output: [`ls: cannot access '${target}': No such file or directory`],
          success: false
        }
      }
      
      if (this.fs.isFile(targetPath)) {
        const parts = targetPath.split('/')
        const filename = parts[parts.length - 1]
        return { output: [filename], success: true }
      }
      
      const items = this.fs.listDirectory(targetPath)
      const filteredItems = showAll ? items : items.filter(item => !item.name.startsWith('.'))
      
      if (longFormat) {
        const output = ['total ' + Math.ceil(items.reduce((sum, item) => sum + item.size, 0) / 1024)]
        
        filteredItems.sort((a, b) => {
          if (a.type !== b.type) return a.type === 'directory' ? -1 : 1
          return a.name.localeCompare(b.name)
        })
        
        filteredItems.forEach(item => {
          const size = item.size.toString().padStart(8)
          const date = item.modified.toLocaleDateString('en-US', { 
            month: 'short', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit' 
          })
          const name = item.type === 'directory' ? item.name + '/' : item.name
          output.push(`${item.permissions} 1 ${item.owner.padEnd(8)} ${item.group.padEnd(8)} ${size} ${date} ${name}`)
        })
        
        return { output, success: true }
      } else {
        const names = filteredItems
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(item => item.type === 'directory' ? item.name + '/' : item.name)
        
        // Arrange in columns
        const cols = 4
        const output = []
        for (let i = 0; i < names.length; i += cols) {
          const row = names.slice(i, i + cols)
          output.push(row.join('  '.padEnd(20)))
        }
        
        return { output, success: true }
      }
    } catch (error) {
      return {
        output: [`ls: ${error instanceof Error ? error.message : 'Unknown error'}`],
        success: false
      }
    }
  }

  private cd(args: string[]): CommandResult {
    let target = args[0]
    
    if (!target) {
      target = '/home/isreal'
    }
    
    if (target === '~') {
      target = '/home/isreal'
    }
    
    try {
      const targetPath = this.fs.resolvePath(target)
      
      if (!this.fs.exists(targetPath)) {
        return {
          output: [`cd: ${target}: No such file or directory`],
          success: false
        }
      }
      
      if (!this.fs.isDirectory(targetPath)) {
        return {
          output: [`cd: ${target}: Not a directory`],
          success: false
        }
      }
      
      if (!this.fs.setCurrentPath(targetPath)) {
        return {
          output: [`cd: ${target}: Permission denied`],
          success: false
        }
      }
      
      return { output: [], success: true }
    } catch (error) {
      return {
        output: [`cd: ${error instanceof Error ? error.message : 'Unknown error'}`],
        success: false
      }
    }
  }

  private pwd(): CommandResult {
    return {
      output: [this.fs.getCurrentPath()],
      success: true
    }
  }

  private cat(args: string[]): CommandResult {
    if (args.length === 0) {
      return {
        output: ['cat: missing file operand', 'Try \'cat --help\' for more information.'],
        success: false
      }
    }
    
    const output: string[] = []
    
    for (const filename of args) {
      try {
        let filePath = filename
        if (filename.startsWith('~/')) {
          filePath = filename.replace('~', '/home/isreal')
        } else {
          filePath = this.fs.resolvePath(filename)
        }
        
        if (!this.fs.exists(filePath)) {
          output.push(`cat: ${filename}: No such file or directory`)
          continue
        }
        
        if (!this.fs.isFile(filePath)) {
          output.push(`cat: ${filename}: Is a directory`)
          continue
        }
        
        const content = this.fs.readFile(filePath)
        output.push(...content.split('\n'))
        
        if (args.length > 1 && filename !== args[args.length - 1]) {
          output.push('')
        }
        
      } catch (error) {
        output.push(`cat: ${filename}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
    
    return { output, success: true }
  }

  private tree(args: string[]): CommandResult {
    const targetPath = args[0] ? this.fs.resolvePath(args[0]) : this.fs.getCurrentPath()
    
    if (!this.fs.exists(targetPath)) {
      return {
        output: [`tree: ${args[0]}: No such file or directory`],
        success: false
      }
    }
    
    if (!this.fs.isDirectory(targetPath)) {
      return {
        output: [`tree: ${args[0]}: Not a directory`],
        success: false
      }
    }
    
    const output = [targetPath]
    const treeLines = this.buildTree(targetPath)
    output.push(...treeLines)
    
    // Count directories and files
    let dirCount = 0
    let fileCount = 0
    this.countItems(targetPath, (isDir) => {
      if (isDir) dirCount++
      else fileCount++
    })
    
    output.push('')
    output.push(`${dirCount} directories, ${fileCount} files`)
    
    return { output, success: true }
  }

  private buildTree(path: string, prefix = '', isLast = true): string[] {
    try {
      const items = this.fs.listDirectory(path)
      const result: string[] = []
      
      items.sort((a, b) => {
        if (a.type !== b.type) return a.type === 'directory' ? -1 : 1
        return a.name.localeCompare(b.name)
      })
      
      items.forEach((item, index) => {
        const isLastItem = index === items.length - 1
        const currentPrefix = prefix + (isLastItem ? '└── ' : '├── ')
        const nextPrefix = prefix + (isLastItem ? '    ' : '│   ')
        
        const name = item.type === 'directory' ? item.name + '/' : item.name
        result.push(currentPrefix + name)
        
        if (item.type === 'directory') {
          const childPath = path === '/' ? '/' + item.name : path + '/' + item.name
          const childTree = this.buildTree(childPath, nextPrefix, isLastItem)
          result.push(...childTree)
        }
      })
      
      return result
    } catch (error) {
      return [prefix + 'Error: ' + (error instanceof Error ? error.message : 'Unknown error')]
    }
  }

  private countItems(path: string, callback: (isDir: boolean) => void) {
    try {
      const items = this.fs.listDirectory(path)
      items.forEach(item => {
        callback(item.type === 'directory')
        if (item.type === 'directory') {
          const childPath = path === '/' ? '/' + item.name : path + '/' + item.name
          this.countItems(childPath, callback)
        }
      })
    } catch (error) {
      // Ignore errors in counting
    }
  }

  private whoami(): CommandResult {
    return { output: ['isreal'], success: true }
  }

  private uname(args: string[]): CommandResult {
    if (args.includes('-a') || args.includes('--all')) {
      return {
        output: ['Linux devops-portfolio-01 5.15.0-91-generic #101-Ubuntu SMP Tue Nov 14 13:30:08 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux'],
        success: true
      }
    } else {
      return { output: ['Linux'], success: true }
    }
  }

  private help(): CommandResult {
    const output = [
      '======================================================================',
      '                    PORTFOLIO TERMINAL HELP',
      '======================================================================',
      '',
      'NAVIGATION COMMANDS:',
      '  ls              List directory contents',
      '  ls -la          List all files with details',
      '  cd [dir]        Change directory',
      '  pwd             Print working directory',
      '  tree            Display directory tree',
      '',
      'FILE OPERATIONS:',
      '  cat [file]      Display file contents',
      '  grep [pattern]  Search text in files',
      '  find [name]     Find files and directories',
      '',
      'SYSTEM INFORMATION:',
      '  whoami          Show current user',
      '  uname -a        System information',
      '',
      'PORTFOLIO COMMANDS:',
      '  tour            Guided portfolio walkthrough',
      '  skills          Display technical skills matrix',
      '  demo [name]     Run interactive demonstrations',
      '',
      'QUICK ACCESS:',
      '  about           View personal information',
      '  contact         Contact information',
      '  resume          View resume',
      '  projects        Browse projects',
      '',
      'UTILITY:',
      '  clear           Clear terminal screen',
      '  history         Show command history',
      '  gui             Return to graphical interface',
      '  exit            Close terminal',
      '',
      'TIPS:',
      '  • Use ↑/↓ arrow keys for command history',
      '  • Use ~ as shortcut for home directory',
      '  • Use .. to go up one directory',
      '',
      'Start your exploration with: tour'
    ]
    
    return { output, success: true }
  }

  private tour(): CommandResult {
    const output = [
      '🎯 Welcome to Isreal Adenekan DevOps Portfolio Tour!',
      '',
      'This is a quick overview of what you can explore:',
      '',
      '📋 PERSONAL INFORMATION:',
      '  cat about/bio.txt     - My background and experience',
      '  cat about/contact.txt - How to reach me',
      '  cat about/resume.txt  - Complete resume',
      '',
      '🛠️  TECHNICAL SKILLS:',
      '  skills               - Visual skills matrix',
      '  cat skills/cloud/aws.txt - AWS expertise details',
      '',
      '🚀 PROJECTS:',
      '  ls projects/         - Browse project portfolio',
      '  cat projects/README.md - Project overview',
      '',
      '🎮 INTERACTIVE DEMOS:',
      '  demo docker          - Docker workflow simulation',
      '  demo kubernetes      - Kubernetes management',
      '  demo terraform       - Infrastructure as Code',
      '',
      '💡 NAVIGATION TIPS:',
      '  tree                 - See complete directory structure',
      '  find -name "aws"     - Search for AWS-related content',
      '  gui                  - Return to graphical interface',
      '',
      'Try these commands to explore my portfolio!'
    ]
    
    return { output, success: true }
  }

  private skills(): CommandResult {
    try {
      const content = this.fs.readFile('/home/isreal/skills/overview.txt')
      return { output: content.split('\n'), success: true }
    } catch (error) {
      return {
        output: ['Error reading skills overview'],
        success: false
      }
    }
  }

  private grep(args: string[]): CommandResult {
    if (args.length < 1) {
      return {
        output: ['grep: missing search pattern', 'Usage: grep [pattern] [file...]'],
        success: false
      }
    }
    
    const pattern = args[0]
    const files = args.slice(1)
    
    if (files.length === 0) {
      files.push('.')
    }
    
    const output: string[] = []
    const regex = new RegExp(pattern, 'i')
    
    for (const file of files) {
      const filePath = this.fs.resolvePath(file)
      
      if (!this.fs.exists(filePath)) {
        output.push(`grep: ${file}: No such file or directory`)
        continue
      }
      
      if (this.fs.isDirectory(filePath)) {
        const items = this.fs.listDirectory(filePath)
        for (const item of items) {
          if (item.type === 'file') {
            const itemPath = filePath === '/' ? '/' + item.name : filePath + '/' + item.name
            this.searchInFile(itemPath, regex, item.name, files.length > 1, output)
          }
        }
      } else {
        this.searchInFile(filePath, regex, file, files.length > 1, output)
      }
    }
    
    return { output, success: true }
  }

  private searchInFile(filePath: string, regex: RegExp, displayName: string, showFilename: boolean, output: string[]) {
    try {
      const content = this.fs.readFile(filePath)
      const lines = content.split('\n')
      
      lines.forEach((line, index) => {
        if (regex.test(line)) {
          const prefix = showFilename ? `${displayName}:` : ''
          const lineNumber = `${index + 1}:`
          const highlightedLine = line.replace(regex, (match) => `**${match}**`)
          output.push(`${prefix}${lineNumber}${highlightedLine}`)
        }
      })
    } catch (error) {
      // Skip files that can't be read
    }
  }

  private find(args: string[]): CommandResult {
    let searchPath = this.fs.getCurrentPath()
    let criteria: { name?: string; type?: string } = {}
    
    for (let i = 0; i < args.length; i++) {
      const arg = args[i]
      
      if (arg === '-name' && i + 1 < args.length) {
        criteria.name = args[i + 1]
        i++
      } else if (arg === '-type' && i + 1 < args.length) {
        const typeArg = args[i + 1]
        criteria.type = typeArg === 'd' ? 'directory' : 'file'
        i++
      } else if (!arg.startsWith('-')) {
        searchPath = this.fs.resolvePath(arg)
      }
    }
    
    if (Object.keys(criteria).length === 0) {
      return {
        output: [
          'find: missing search criteria',
          'Usage: find [path] -name [pattern] [-type d|f]',
          'Examples:',
          '  find . -name "*.txt"     Find all .txt files',
          '  find ~ -type d           Find all directories',
          '  find . -name "aws"       Find items containing "aws"'
        ],
        success: false
      }
    }
    
    if (!this.fs.exists(searchPath)) {
      return {
        output: [`find: '${searchPath}': No such file or directory`],
        success: false
      }
    }
    
    const results = this.findInDirectory(searchPath, criteria)
    
    if (results.length === 0) {
      return { output: ['No matches found.'], success: true }
    }
    
    const output = results.map(result => result.path)
    output.push('')
    output.push(`Found ${results.length} match${results.length !== 1 ? 'es' : ''}.`)
    
    return { output, success: true }
  }

  private findInDirectory(dirPath: string, criteria: { name?: string; type?: string }, results: Array<{ path: string; type: string; name: string }> = []) {
    try {
      const items = this.fs.listDirectory(dirPath)
      
      for (const item of items) {
        const itemPath = dirPath === '/' ? '/' + item.name : dirPath + '/' + item.name
        
        if (criteria.name && item.name.includes(criteria.name)) {
          results.push({ path: itemPath, type: item.type, name: item.name })
        }
        
        if (criteria.type && item.type === criteria.type) {
          if (!criteria.name || item.name.includes(criteria.name)) {
            results.push({ path: itemPath, type: item.type, name: item.name })
          }
        }
        
        if (item.type === 'directory') {
          this.findInDirectory(itemPath, criteria, results)
        }
      }
    } catch (error) {
      // Skip directories we can't access
    }
    
    return results
  }

  private demo(args: string[]): CommandResult {
    if (args.length === 0) {
      return {
        output: [
          'Available Demos:',
          '  demo docker      - Docker containerization workflow',
          '  demo kubernetes  - Kubernetes pod management',
          '  demo terraform   - Infrastructure as Code deployment',
          '',
          'Usage: demo [name]'
        ],
        success: true
      }
    }
    
    const demoName = args[0].toLowerCase()
    
    switch (demoName) {
      case 'docker':
        return {
          output: [
            '🐳 Docker Deployment Demo',
            'Simulating a real Docker deployment workflow...',
            '',
            'isreal@devops-portfolio:~/demos$ docker build -t myapp:latest .',
            '[+] Building 45.2s (12/12) FINISHED',
            ' => [internal] load build definition from Dockerfile         0.1s',
            ' => [builder 1/4] FROM node:18-alpine                      12.3s',
            ' => [builder 4/4] RUN npm ci --only=production             23.4s',
            ' => exporting to image                                      3.2s',
            ' => => naming to docker.io/library/myapp:latest            0.1s',
            '',
            'isreal@devops-portfolio:~/demos$ docker run -d -p 3000:3000 myapp:latest',
            '8d7f9e2a1b5c',
            '',
            'isreal@devops-portfolio:~/demos$ docker ps',
            'CONTAINER ID   IMAGE          COMMAND                  CREATED       STATUS       PORTS',
            '8d7f9e2a1b5c   myapp:latest   "docker-entrypoint.s…"   2 mins ago    Up 2 mins    0.0.0.0:3000->3000/tcp',
            '',
            '✅ Container deployed successfully! Application running on port 3000'
          ],
          success: true
        }
      
      case 'kubernetes':
      case 'k8s':
        return {
          output: [
            '☸️  Kubernetes Deployment Demo',
            'Managing containerized applications with Kubernetes...',
            '',
            'isreal@devops-portfolio:~/demos$ kubectl get pods -n production',
            'NAME                              READY   STATUS    RESTARTS   AGE',
            'nginx-deployment-7d8d9f8b4-2xmqr  1/1     Running   0          2d',
            'nginx-deployment-7d8d9f8b4-5k8pl  1/1     Running   0          2d',
            'nginx-deployment-7d8d9f8b4-7j9wn  1/1     Running   0          2d',
            'redis-master-6dd5d4c5f-8w2nz     1/1     Running   0          1d',
            '',
            'isreal@devops-portfolio:~/demos$ kubectl describe pod nginx-deployment-7d8d9f8b4-2xmqr',
            'Name:         nginx-deployment-7d8d9f8b4-2xmqr',
            'Namespace:    production',
            'Status:       Running',
            'IP:           10.244.1.15',
            'Containers:',
            '  nginx:',
            '    Image:          nginx:1.21',
            '    Port:           80/TCP',
            '    State:          Running',
            '',
            '✅ Kubernetes cluster healthy with 4 running pods'
          ],
          success: true
        }
      
      case 'terraform':
      case 'tf':
        return {
          output: [
            '🏗️  Terraform Infrastructure Demo',
            'Infrastructure as Code deployment simulation...',
            '',
            'isreal@devops-portfolio:~/demos$ terraform plan',
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
            '      + key_name      = "mykey"',
            '    }',
            '',
            'Plan: 1 to add, 0 to change, 0 to destroy.',
            '',
            '✅ Infrastructure plan validated successfully'
          ],
          success: true
        }
      
      default:
        return {
          output: [
            `Demo '${demoName}' not found.`,
            'Available demos: docker, kubernetes, terraform'
          ],
          success: false
        }
    }
  }

  private history(): CommandResult {
    if (this.commandHistory.length === 0) {
      return { output: ['No commands in history'], success: true }
    }
    
    const output = this.commandHistory.map((cmd, index) => `${index + 1}  ${cmd}`)
    return { output, success: true }
  }
}