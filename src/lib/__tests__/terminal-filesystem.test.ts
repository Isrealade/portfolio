import { VirtualFileSystem } from '../terminal-filesystem'

describe('VirtualFileSystem', () => {
  let fs: VirtualFileSystem

  beforeEach(() => {
    fs = new VirtualFileSystem()
  })

  describe('getCurrentPath', () => {
    it('returns initial path', () => {
      expect(fs.getCurrentPath()).toBe('/home/isreal')
    })
  })

  describe('listDirectory', () => {
    it('lists home directory contents', () => {
      const contents = fs.listDirectory('/home/isreal')
      expect(contents).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'projects', type: 'directory' }),
          expect.objectContaining({ name: 'skills', type: 'directory' }),
          expect.objectContaining({ name: 'about', type: 'directory' }),
          expect.objectContaining({ name: '.bashrc', type: 'file' })
        ])
      )
    })

    it('returns empty array for non-existent directory', () => {
      const contents = fs.listDirectory('/nonexistent')
      expect(contents).toEqual([])
    })

    it('lists root directory', () => {
      const contents = fs.listDirectory('/')
      expect(contents).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'home', type: 'directory' })
        ])
      )
    })
  })

  describe('changeDirectory', () => {
    it('changes to valid directory', () => {
      const result = fs.changeDirectory('projects')
      expect(result.success).toBe(true)
      expect(fs.getCurrentPath()).toBe('/home/isreal/projects')
    })

    it('changes to parent directory with ..', () => {
      fs.changeDirectory('projects')
      const result = fs.changeDirectory('..')
      expect(result.success).toBe(true)
      expect(fs.getCurrentPath()).toBe('/home/isreal')
    })

    it('changes to root directory', () => {
      const result = fs.changeDirectory('/')
      expect(result.success).toBe(true)
      expect(fs.getCurrentPath()).toBe('/')
    })

    it('changes to home directory with ~', () => {
      fs.changeDirectory('/')
      const result = fs.changeDirectory('~')
      expect(result.success).toBe(true)
      expect(fs.getCurrentPath()).toBe('/home/isreal')
    })

    it('fails for non-existent directory', () => {
      const result = fs.changeDirectory('nonexistent')
      expect(result.success).toBe(false)
      expect(result.error).toContain('No such file or directory')
    })

    it('handles absolute paths', () => {
      const result = fs.changeDirectory('/home/isreal/projects')
      expect(result.success).toBe(true)
      expect(fs.getCurrentPath()).toBe('/home/isreal/projects')
    })
  })

  describe('readFile', () => {
    it('reads existing file', () => {
      const content = fs.readFile('/home/isreal/.bashrc')
      expect(content).toContain('bashrc')
      expect(content).toContain('isreal')
    })

    it('reads file in about directory', () => {
      const content = fs.readFile('/home/isreal/about/bio.txt')
      expect(content).toContain('DevOps Engineer')
    })

    it('returns null for non-existent file', () => {
      const content = fs.readFile('/nonexistent.txt')
      expect(content).toBeNull()
    })

    it('returns null for directory', () => {
      const content = fs.readFile('/home/isreal/projects')
      expect(content).toBeNull()
    })
  })

  describe('findFiles', () => {
    it('finds files by exact name', () => {
      const results = fs.findFiles('bio.txt')
      expect(results).toContain('/home/isreal/about/bio.txt')
    })

    it('finds files by pattern', () => {
      const results = fs.findFiles('*.txt')
      expect(results.length).toBeGreaterThan(0)
      expect(results.every(path => path.endsWith('.txt'))).toBe(true)
    })

    it('finds files with wildcard', () => {
      const results = fs.findFiles('*resume*')
      expect(results.some(path => path.includes('resume'))).toBe(true)
    })

    it('returns empty array for non-matching pattern', () => {
      const results = fs.findFiles('*.nonexistent')
      expect(results).toEqual([])
    })
  })

  describe('getDirectoryTree', () => {
    it('generates tree for current directory', () => {
      const tree = fs.getDirectoryTree()
      expect(tree).toContain('projects/')
      expect(tree).toContain('skills/')
      expect(tree).toContain('about/')
    })

    it('generates tree for specific directory', () => {
      const tree = fs.getDirectoryTree('/home/isreal/projects')
      expect(tree).toContain('terraform-infrastructure/')
      expect(tree).toContain('ci-cd-pipeline/')
    })

    it('handles empty or non-existent directory gracefully', () => {
      const tree = fs.getDirectoryTree('/some/empty/path')
      expect(typeof tree).toBe('string')
      expect(tree).toContain('No such file or directory')
    })
  })

  describe('fileExists', () => {
    it('returns true for existing file', () => {
      expect(fs.fileExists('/home/isreal/.bashrc')).toBe(true)
    })

    it('returns true for existing directory', () => {
      expect(fs.fileExists('/home/isreal/projects')).toBe(true)
    })

    it('returns false for non-existent path', () => {
      expect(fs.fileExists('/nonexistent')).toBe(false)
    })
  })

  describe('isDirectory', () => {
    it('returns true for directory', () => {
      expect(fs.isDirectory('/home/isreal/projects')).toBe(true)
    })

    it('returns false for file', () => {
      expect(fs.isDirectory('/home/isreal/.bashrc')).toBe(false)
    })

    it('returns false for non-existent path', () => {
      expect(fs.isDirectory('/nonexistent')).toBe(false)
    })
  })

  describe('path navigation', () => {
    it('maintains current path through multiple operations', () => {
      expect(fs.getCurrentPath()).toBe('/home/isreal')
      
      fs.changeDirectory('projects')
      expect(fs.getCurrentPath()).toBe('/home/isreal/projects')
      
      fs.changeDirectory('terraform-infrastructure')
      expect(fs.getCurrentPath()).toBe('/home/isreal/projects/terraform-infrastructure')
      
      fs.changeDirectory('../..')
      expect(fs.getCurrentPath()).toBe('/home/isreal')
    })

    it('handles complex path navigation', () => {
      fs.changeDirectory('./projects/../skills')
      expect(fs.getCurrentPath()).toBe('/home/isreal/skills')
    })
  })
})