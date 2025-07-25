export interface FileNode {
  type: 'file' | 'directory'
  permissions: string
  owner: string
  group: string
  size: number
  modified: Date
  content?: string
  children?: { [key: string]: FileNode }
}

export class VirtualFileSystem {
  private currentPath = '/home/isreal'
  private filesystem: { [key: string]: FileNode }

  constructor() {
    this.filesystem = this.createFilesystem()
  }

  private createFilesystem(): { [key: string]: FileNode } {
    return {
      '/': {
        type: 'directory',
        permissions: 'drwxr-xr-x',
        owner: 'root',
        group: 'root',
        size: 4096,
        modified: new Date('2025-01-20T09:15:00'),
        children: {
          'home': {
            type: 'directory',
            permissions: 'drwxr-xr-x',
            owner: 'root',
            group: 'root',
            size: 4096,
            modified: new Date('2025-01-20T09:15:00'),
            children: {
              'isreal': {
                type: 'directory',
                permissions: 'drwxr-xr-x',
                owner: 'isreal',
                group: 'isreal',
                size: 4096,
                modified: new Date('2025-01-25T10:30:00'),
                children: {
                  '.bashrc': {
                    type: 'file',
                    permissions: '-rw-r--r--',
                    owner: 'isreal',
                    group: 'isreal',
                    size: 3526,
                    modified: new Date('2025-01-20T09:15:00'),
                    content: `# ~/.bashrc: executed by bash(1) for non-login shells.

# Prompt customization
PS1='\\[\\033[01;32m\\]isreal@devops-portfolio\\[\\033[00m\\]:\\[\\033[01;34m\\]\\w\\[\\033[00m\\]\\$ '

# Portfolio aliases
alias skills='cat ~/skills/overview.txt'
alias projects='ls -la ~/projects/'
alias about='cat ~/about/bio.txt'
alias contact='cat ~/about/contact.txt'
alias resume='cat ~/about/resume.txt'
alias gui='echo "Switching to GUI mode..."'

# DevOps aliases
alias k='kubectl'
alias tf='terraform'
alias d='docker'

export PATH="$PATH:/home/isreal/bin"`
                  },
                  'about': {
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'isreal',
                    group: 'isreal',
                    size: 4096,
                    modified: new Date('2025-01-25T10:30:00'),
                    children: {
                      'bio.txt': {
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'isreal',
                        group: 'isreal',
                        size: 1245,
                        modified: new Date('2025-01-25T10:30:00'),
                        content: `===========================================
           ISREAL ADENEKAN
    DevOps Engineer | Cloud Architect
===========================================

ABOUT ME:
---------
Passionate DevOps Engineer with expertise in cloud infrastructure, 
automation, and system reliability. I specialize in building resilient, 
scalable, and secure cloud environments using modern DevOps practices.

EXPERIENCE LEVEL:
-----------------
• Junior DevOps Engineer (< 1 year in DevOps)
• Strong background in Technical Support
• Hands-on experience with cloud platforms and containerization

CORE COMPETENCIES:
------------------
• Cloud Platforms: AWS, Azure, GCP
• Containers: Docker, Kubernetes
• Infrastructure as Code: Terraform, CloudFormation
• CI/CD: GitHub Actions, Jenkins
• Monitoring: Prometheus, Grafana
• Linux System Administration

ACHIEVEMENTS:
-------------
• 95%+ support ticket resolution rate (347/365 tickets)
• Reduced infrastructure setup time by 40% (3h → 1.8h)
• Implemented automated deployment pipelines
• Managed containerized microservices architecture

CURRENT FOCUS:
--------------
Seeking opportunities to contribute to innovative DevOps teams where 
I can leverage my automation expertise and customer-focused mindset 
to drive meaningful infrastructure improvements.

Run 'contact' for my contact information.
Run 'cat resume.txt' to view my complete resume.`
                      },
                      'contact.txt': {
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'isreal',
                        group: 'isreal',
                        size: 486,
                        modified: new Date('2025-01-25T10:30:00'),
                        content: `===========================================
            CONTACT INFORMATION
===========================================

📧 Email:    iscooladenekan@gmail.com
📱 Phone:    +234 813 845 7339
📍 Location: Lagos, Nigeria
🌐 LinkedIn: https://linkedin.com/in/isreal-adenekan
🐙 GitHub:   https://github.com/IsrealAdenekan

PROFESSIONAL PROFILES:
----------------------
• LinkedIn: Connect for professional networking
• GitHub: View my open-source contributions and projects
• Portfolio: You're currently exploring it! 🚀

AVAILABILITY:
-------------
• Open to DevOps and Cloud Engineering roles
• Available for technical discussions and collaborations
• Remote work friendly, Nigeria timezone (GMT+1)

Feel free to reach out for opportunities, collaborations, 
or just to connect with a fellow DevOps enthusiast!`
                      },
                      'resume.txt': {
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'isreal',
                        group: 'isreal',
                        size: 2156,
                        modified: new Date('2025-01-25T10:30:00'),
                        content: `===========================================
         ISREAL ADENEKAN - RESUME
    DevOps Engineer | Cloud Architect
===========================================

CONTACT:
--------
Email: iscooladenekan@gmail.com
Phone: +234 813 845 7339
Location: Lagos, Nigeria
LinkedIn: linkedin.com/in/isreal-adenekan
GitHub: github.com/IsrealAdenekan

PROFESSIONAL SUMMARY:
---------------------
Junior DevOps Engineer with strong foundation in cloud infrastructure, 
automation, and system reliability. Proven track record in technical 
support with 95%+ resolution rate. Passionate about building scalable, 
secure cloud environments using modern DevOps practices.

TECHNICAL SKILLS:
-----------------
Cloud Platforms:
• AWS: EC2, S3, Lambda, EKS, CloudFormation
• Azure: VMs, AKS, Functions, ARM Templates  
• GCP: GCE, GKE, Cloud Run, Deployment Manager

DevOps & Automation:
• Containers: Docker, Kubernetes, Helm
• CI/CD: GitHub Actions, Jenkins, GitLab CI
• Infrastructure as Code: Terraform, Ansible
• Monitoring: Prometheus, Grafana, ELK Stack
• Version Control: Git, GitHub, GitLab

Programming & Scripting:
• Languages: Python, Bash, YAML, JSON
• Databases: MySQL, PostgreSQL, MongoDB
• Operating Systems: Linux (Ubuntu, CentOS), Windows

KEY ACHIEVEMENTS:
-----------------
• Automated deployment processes reducing manual work by 50%
• Designed and implemented container orchestration for 4 microservices
• Built comprehensive monitoring dashboards for system health tracking
• Successfully managed multi-cloud infrastructure deployments

Download GUI Version: Click the GUI button to return to the web interface`
                      }
                    }
                  },
                  'skills': {
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'isreal',
                    group: 'isreal',
                    size: 4096,
                    modified: new Date('2025-01-25T10:30:00'),
                    children: {
                      'overview.txt': {
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'isreal',
                        group: 'isreal',
                        size: 2048,
                        modified: new Date('2025-01-25T10:30:00'),
                        content: `╔══════════════════════════════════════════════════════════════════════╗
║                           TECHNICAL SKILLS                          ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  Cloud Platforms:                                                   ║
║  ├─ AWS          ████████████████░░░░  85% | EC2, S3, Lambda, EKS   ║
║  ├─ Azure        ██████████████░░░░░░  70% | VMs, AKS, Functions    ║
║  └─ GCP          ████████████░░░░░░░░  60% | GCE, GKE, Cloud Run    ║
║                                                                      ║
║  DevOps Tools:                                                      ║
║  ├─ Docker       ████████████████████  90% | Containers, Multi-stage║
║  ├─ Kubernetes   ██████████████████░░  85% | Deployments, Services  ║
║  ├─ Terraform    ██████████████████░░  85% | Infrastructure as Code ║
║  └─ GitHub Actions███████████████░░░░  75% | CI/CD Pipelines        ║
║                                                                      ║
║  Monitoring:                                                        ║
║  ├─ Prometheus   ██████████████████░░  80% | Metrics Collection     ║
║  ├─ Grafana      ████████████████░░░░  75% | Dashboards, Alerting   ║
║  └─ ELK Stack    ██████████████░░░░░░  70% | Logging, Analysis      ║
║                                                                      ║
║  Programming:                                                       ║
║  ├─ Python       ██████████████████░░  80% | Automation, Scripting  ║
║  ├─ Bash         ████████████████████  90% | Shell Scripting        ║
║  └─ YAML/JSON    ████████████████████  95% | Configuration Files    ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝

Use 'ls skills/' to explore detailed skill breakdowns by category.
Use 'cat skills/cloud/' for specific technology information.`
                      },
                      'cloud': {
                        type: 'directory',
                        permissions: 'drwxr-xr-x',
                        owner: 'isreal',
                        group: 'isreal',
                        size: 4096,
                        modified: new Date('2025-01-25T10:30:00'),
                        children: {
                          'aws.txt': {
                            type: 'file',
                            permissions: '-rw-r--r--',
                            owner: 'isreal',
                            group: 'isreal',
                            size: 856,
                            modified: new Date('2025-01-25T10:30:00'),
                            content: `AWS (Amazon Web Services) - 85% Proficiency
==========================================

CORE SERVICES:
--------------
✓ EC2 (Elastic Compute Cloud)
  - Instance management and scaling
  - Security groups and key pairs
  - Load balancers (ALB, NLB)

✓ S3 (Simple Storage Service)
  - Bucket policies and lifecycle management
  - Static website hosting
  - Cross-region replication

✓ Lambda (Serverless Functions)
  - Event-driven architecture
  - API Gateway integration
  - Python and Node.js functions

✓ EKS (Elastic Kubernetes Service)
  - Cluster management and node groups
  - kubectl and eksctl proficiency
  - Helm chart deployments

✓ CloudFormation
  - Infrastructure as Code templates
  - Stack management and updates
  - Parameter and output handling

PRACTICAL EXPERIENCE:
--------------------
• Deployed multi-tier applications on EC2
• Implemented S3-based backup solutions
• Created Lambda functions for automation
• Managed EKS clusters for containerized workloads
• Built CloudFormation templates for repeatable deployments

CERTIFICATIONS:
---------------
🔜 AWS Cloud Practitioner (In Progress)
🎯 AWS Solutions Architect Associate (Planned)`
                          }
                        }
                      }
                    }
                  },
                  'projects': {
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'isreal',
                    group: 'isreal',
                    size: 4096,
                    modified: new Date('2025-01-25T10:30:00'),
                    children: {
                      'README.md': {
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'isreal',
                        group: 'isreal',
                        size: 1024,
                        modified: new Date('2025-01-25T10:30:00'),
                        content: `# DevOps Projects Portfolio

Welcome to my project showcase! Here you'll find real-world DevOps implementations
and cloud infrastructure projects that demonstrate my technical skills.

## Featured Projects:

### 1. DevOps Automation Pipeline
- **Tech Stack**: GitHub Actions, Docker, Kubernetes
- **Description**: Automated CI/CD pipeline with testing, building, and deployment
- **Status**: Production-ready
- **Directory**: ./devops-pipeline/

### 2. Multi-Cloud Infrastructure
- **Tech Stack**: Terraform, AWS, Azure
- **Description**: Infrastructure as Code for multi-cloud deployment
- **Status**: Active development
- **Directory**: ./cloud-infrastructure/

### 3. Monitoring Stack
- **Tech Stack**: Prometheus, Grafana, ELK
- **Description**: Comprehensive monitoring and logging solution
- **Status**: Production-ready
- **Directory**: ./monitoring-stack/

## Getting Started

Each project directory contains:
- README.md with detailed setup instructions
- Source code and configuration files
- Documentation and architecture diagrams

Use 'ls' to explore directories and 'cat' to view files.
Type 'gui' to return to the graphical interface for a visual project showcase.`
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  getCurrentPath(): string {
    return this.currentPath
  }

  setCurrentPath(newPath: string): boolean {
    const resolvedPath = this.resolvePath(newPath)
    if (this.exists(resolvedPath) && this.isDirectory(resolvedPath)) {
      this.currentPath = resolvedPath
      return true
    }
    return false
  }

  resolvePath(inputPath: string): string {
    if (inputPath.startsWith('/')) {
      return inputPath
    }
    
    if (inputPath === '..') {
      const parts = this.currentPath.split('/').filter(p => p)
      parts.pop()
      return '/' + parts.join('/')
    }
    
    if (inputPath === '.') {
      return this.currentPath
    }
    
    if (inputPath.startsWith('./')) {
      inputPath = inputPath.substring(2)
    }
    
    if (this.currentPath === '/') {
      return '/' + inputPath
    }
    
    return this.currentPath + '/' + inputPath
  }

  exists(filePath: string): boolean {
    try {
      this.getNode(filePath)
      return true
    } catch {
      return false
    }
  }

  isDirectory(filePath: string): boolean {
    try {
      const node = this.getNode(filePath)
      return node.type === 'directory'
    } catch {
      return false
    }
  }

  isFile(filePath: string): boolean {
    try {
      const node = this.getNode(filePath)
      return node.type === 'file'
    } catch {
      return false
    }
  }

  getNode(filePath: string): FileNode {
    const parts = filePath.split('/').filter(p => p)
    let current = this.filesystem['/']
    
    for (const part of parts) {
      if (!current.children || !current.children[part]) {
        throw new Error('Path not found')
      }
      current = current.children[part]
    }
    
    return current
  }

  readFile(filePath: string): string {
    const node = this.getNode(filePath)
    if (node.type !== 'file') {
      throw new Error('Not a file')
    }
    return node.content || ''
  }

  listDirectory(dirPath: string = this.currentPath): Array<{
    name: string
    type: string
    permissions: string
    owner: string
    group: string
    size: number
    modified: Date
  }> {
    const node = this.getNode(dirPath)
    
    if (node.type !== 'directory') {
      throw new Error('Not a directory')
    }
    
    return Object.entries(node.children || {}).map(([name, child]) => ({
      name,
      type: child.type,
      permissions: child.permissions,
      owner: child.owner,
      group: child.group,
      size: child.size,
      modified: child.modified
    }))
  }
}