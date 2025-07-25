import { TerminalCommands } from '../terminal-commands'
import { VirtualFileSystem } from '../terminal-filesystem'

describe('TerminalCommands', () => {
  let fs: VirtualFileSystem
  let commands: TerminalCommands

  beforeEach(() => {
    fs = new VirtualFileSystem()
    commands = new TerminalCommands(fs)
  })

  describe('help command', () => {
    it('returns list of available commands', async () => {
      const result = await commands.executeCommand('help')
      
      expect(result.output).toEqual(
        expect.arrayContaining([
          expect.stringContaining('Available commands:'),
          expect.stringContaining('ls'),
          expect.stringContaining('cd'),
          expect.stringContaining('cat'),
          expect.stringContaining('pwd'),
          expect.stringContaining('help')
        ])
      )
    })
  })

  describe('ls command', () => {
    it('lists current directory contents', async () => {
      const result = await commands.executeCommand('ls')
      
      expect(result.output).toEqual(
        expect.arrayContaining([
          expect.stringContaining('projects'),
          expect.stringContaining('skills'),
          expect.stringContaining('about')
        ])
      )
    })

    it('lists specific directory contents', async () => {
      const result = await commands.executeCommand('ls projects')
      
      expect(result.output).toEqual(
        expect.arrayContaining([
          expect.stringContaining('terraform-infrastructure'),
          expect.stringContaining('ci-cd-pipeline')
        ])
      )
    })

    it('shows error for non-existent directory', async () => {
      const result = await commands.executeCommand('ls nonexistent')
      
      expect(result.output[0]).toContain('No such file or directory')
    })
  })

  describe('cd command', () => {
    it('changes directory successfully', async () => {
      const result = await commands.executeCommand('cd projects')
      
      expect(result.output).toEqual([])
      expect(fs.getCurrentPath()).toBe('/home/isreal/projects')
    })

    it('shows error for non-existent directory', async () => {
      const result = await commands.executeCommand('cd nonexistent')
      
      expect(result.output[0]).toContain('No such file or directory')
    })

    it('changes to home directory with no arguments', async () => {
      await commands.executeCommand('cd projects')
      const result = await commands.executeCommand('cd')
      
      expect(result.output).toEqual([])
      expect(fs.getCurrentPath()).toBe('/home/isreal')
    })
  })

  describe('pwd command', () => {
    it('returns current working directory', async () => {
      const result = await commands.executeCommand('pwd')
      
      expect(result.output).toEqual(['/home/isreal'])
    })

    it('returns updated path after cd', async () => {
      await commands.executeCommand('cd projects')
      const result = await commands.executeCommand('pwd')
      
      expect(result.output).toEqual(['/home/isreal/projects'])
    })
  })

  describe('cat command', () => {
    it('displays file contents', async () => {
      const result = await commands.executeCommand('cat about/bio.txt')
      
      expect(result.output.join(' ')).toContain('DevOps Engineer')
    })

    it('shows error for non-existent file', async () => {
      const result = await commands.executeCommand('cat nonexistent.txt')
      
      expect(result.output[0]).toContain('No such file or directory')
    })

    it('shows error for directory', async () => {
      const result = await commands.executeCommand('cat projects')
      
      expect(result.output[0]).toContain('Is a directory')
    })
  })

  describe('tree command', () => {
    it('displays directory tree', async () => {
      const result = await commands.executeCommand('tree')
      
      expect(result.output.join('')).toContain('projects')
      expect(result.output.join('')).toContain('skills')
    })

    it('displays tree for specific directory', async () => {
      const result = await commands.executeCommand('tree projects')
      
      expect(result.output.join('')).toContain('terraform-infrastructure')
    })
  })

  describe('find command', () => {
    it('finds files by name', async () => {
      const result = await commands.executeCommand('find bio.txt')
      
      expect(result.output).toEqual(
        expect.arrayContaining([
          expect.stringContaining('/home/isreal/about/bio.txt')
        ])
      )
    })

    it('finds files by pattern', async () => {
      const result = await commands.executeCommand('find *.txt')
      
      expect(result.output.some(line => line.includes('.txt'))).toBe(true)
    })

    it('shows message for no matches', async () => {
      const result = await commands.executeCommand('find nonexistent.file')
      
      expect(result.output[0]).toContain('No files found')
    })
  })

  describe('grep command', () => {
    it('searches file contents', async () => {
      const result = await commands.executeCommand('grep DevOps about/bio.txt')
      
      expect(result.output.some(line => line.includes('DevOps'))).toBe(true)
    })

    it('shows error for non-existent file', async () => {
      const result = await commands.executeCommand('grep test nonexistent.txt')
      
      expect(result.output[0]).toContain('No such file or directory')
    })

    it('shows no matches message', async () => {
      const result = await commands.executeCommand('grep nonexistentpattern about/bio.txt')
      
      expect(result.output[0]).toContain('No matches found')
    })
  })

  describe('clear command', () => {
    it('returns clear command', async () => {
      const result = await commands.executeCommand('clear')
      
      expect(result.clear).toBe(true)
      expect(result.output).toEqual([])
    })
  })

  describe('gui command', () => {
    it('returns close command', async () => {
      const result = await commands.executeCommand('gui')
      
      expect(result.close).toBe(true)
      expect(result.output).toEqual(
        expect.arrayContaining([
          expect.stringContaining('Returning to graphical interface')
        ])
      )
    })
  })

  describe('unknown command', () => {
    it('shows command not found error', async () => {
      const result = await commands.executeCommand('unknowncommand')
      
      expect(result.output[0]).toContain('Command not found')
      expect(result.output[0]).toContain('unknowncommand')
    })
  })

  describe('complex command scenarios', () => {
    it('handles command with multiple arguments', async () => {
      const result = await commands.executeCommand('ls -la')
      
      // Should still work even with flags (our implementation ignores flags)
      expect(result.output.length).toBeGreaterThan(0)
    })

    it('handles empty command', async () => {
      const result = await commands.executeCommand('')
      
      expect(result.output).toEqual([])
    })

    it('handles command with extra spaces', async () => {
      const result = await commands.executeCommand('  pwd  ')
      
      expect(result.output).toEqual(['/home/isreal'])
    })
  })

  describe('tour command', () => {
    it('starts guided tour', async () => {
      const result = await commands.executeCommand('tour')
      
      expect(result.output).toEqual(
        expect.arrayContaining([
          expect.stringContaining('Welcome to the portfolio tour')
        ])
      )
    })
  })

  describe('demo command', () => {
    it('runs demonstration', async () => {
      const result = await commands.executeCommand('demo')
      
      expect(result.output).toEqual(
        expect.arrayContaining([
          expect.stringContaining('DevOps Portfolio Demonstration')
        ])
      )
    })
  })
})