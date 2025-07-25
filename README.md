# DevOps Engineer Portfolio

A modern, responsive portfolio website showcasing DevOps and Cloud Engineering expertise with an innovative dual-interface design - featuring both a traditional GUI and a fully functional Linux terminal interface.

🔗 **[Live Demo](https://yourusername.github.io/portfolio)** | 🐧 **Try Terminal Mode!**

## 🚀 Features

- **🖥️ Dual Interface**: Toggle between modern GUI and Linux-style terminal
- **🐧 Interactive Terminal**: Full Linux command simulation with portfolio content
- **📱 Fully Responsive**: Mobile-first design optimized for all devices
- **⚡ Performance Optimized**: Built with Next.js 14 and TypeScript
- **🎨 Modern Design**: Clean, professional aesthetic with smooth animations
- **🔍 SEO Friendly**: Optimized meta tags and structure
- **🧪 Tested**: Comprehensive testing with Jest and React Testing Library

## 🐧 Terminal Portfolio Experience

Experience this portfolio through a fully functional Linux terminal interface - a unique way to explore a DevOps engineer's work!

### **Terminal Features**
- **🖥️ Linux Command Simulation**: `ls`, `cd`, `cat`, `pwd`, `tree`, `grep`, `find`
- **📁 Virtual File System**: Realistic directory structure with portfolio content
- **⌨️ Command History**: Navigate with arrow keys and tab completion
- **📱 Touch Optimized**: Mobile-friendly terminal interface
- **🔍 Content Discovery**: Multiple ways to explore projects and experience

### **Available Commands**
```bash
help        # Show all available commands
tour        # Guided walkthrough of portfolio
ls          # List directory contents
cd          # Change directory
cat         # View file contents
pwd         # Show current directory
tree        # Display directory tree
grep        # Search file contents
find        # Find files by name
demo        # Run automated demo
gui         # Return to graphical interface
```

### **Quick Start**
1. Visit the portfolio website
2. Click the terminal icon (🐧) in the navigation
3. Type `help` to see available commands
4. Try `tour` for a guided experience
5. Use `gui` to return to the graphical interface

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom animations  
- **Icons**: Lucide React
- **Terminal**: Custom virtual filesystem and command engine
- **Testing**: Jest with React Testing Library
- **Deployment**: GitHub Pages with GitHub Actions CI/CD

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js app directory
│   ├── components/             # React components
│   │   ├── TerminalInterface.tsx
│   │   ├── TerminalHint.tsx
│   │   └── ...
│   ├── lib/                    # Terminal system
│   │   ├── terminal-filesystem.ts
│   │   └── terminal-commands.ts
│   ├── data/                   # Portfolio content
│   └── types/                  # TypeScript definitions
├── .github/workflows/          # CI/CD pipelines
├── public/                     # Static assets
└── docs/                       # Documentation
```

## 🎨 Portfolio Sections

1. **🏠 Hero**: Animated introduction with role rotation
2. **👨‍💻 About**: Professional summary and key highlights
3. **🛠️ Skills**: Interactive technology stack visualization
4. **🚀 Projects**: Featured projects with live demos
5. **💼 Experience**: Career timeline and achievements  
6. **📞 Contact**: Multiple ways to connect
7. **🐧 Terminal**: Linux-style portfolio exploration
8. **🎮 Live Demos**: Interactive DevOps command demonstrations

## 📱 Mobile Responsiveness

The portfolio is fully optimized for all devices:

- **📱 Mobile**: < 640px - Stacked layouts, touch-optimized terminal
- **📲 Tablet**: 640px - 1024px - Mixed layouts, enhanced interactions  
- **🖥️ Desktop**: > 1024px - Full feature set, side-by-side layouts

**Mobile Features:**
- Full-screen terminal experience with touch optimization
- Adaptive text sizing and proper touch targets
- Optimized navigation and component layouts

## 🚀 Getting Started

### **Local Development**

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open in browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

5. **Try terminal mode:**
Click the terminal icon or wait for the hint popup

### **Testing**

```bash
npm test              # Run tests once
npm run test:watch    # Development mode with file watching
npm run test:coverage # Generate coverage reports
npm run test:ci       # CI/CD optimized testing
```

### **Build for Production**

```bash
npm run build         # Create production build
npm run start         # Start production server
```

## 🌐 Deployment

### **GitHub Pages (Recommended)**

1. **Fork this repository**

2. **Update configuration in `next.config.js`:**
```javascript
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
}
```

3. **Enable GitHub Pages:**
   - Go to **Settings** → **Pages**
   - Select **GitHub Actions** as source
   - Push to main branch to trigger deployment

4. **Automatic Deployment:**
   - ✅ **Feature Branches**: Run tests and quality checks
   - ✅ **Pull Requests**: Extended validation and security scanning  
   - ✅ **Main Branch**: Full deployment to GitHub Pages

### **Other Platforms**
- **Vercel**: Import GitHub repository
- **Netlify**: Connect repository and deploy
- **AWS S3**: Upload build output to S3 bucket

## 🔧 Customization

### **Portfolio Content**
Edit `src/data/portfolio.json` to update:
- Personal information and contact details
- Skills and technologies
- Projects and work experience
- Certifications and education

### **Terminal Content**
Modify `src/lib/terminal-filesystem.ts` to:
- Update virtual directory structure
- Add new files and content
- Customize command responses

### **Styling**
Update `tailwind.config.ts` for:
- Color schemes and themes
- Fonts and typography
- Animations and effects

### **New Features**
The modular architecture makes it easy to:
- Add new portfolio sections
- Implement additional terminal commands
- Create custom components and interactions

## 🧪 Testing Framework

Comprehensive testing suite includes:

- **🔧 Unit Tests**: Component rendering and functionality
- **🔗 Integration Tests**: User interactions and terminal commands
- **📱 Responsive Tests**: Mobile and desktop layouts
- **♿ Accessibility Tests**: ARIA compliance and semantic HTML

**Test Coverage:**
- Component behavior and rendering
- Terminal filesystem operations
- Command execution and error handling
- User interaction flows

## 🎯 Terminal Discovery System

Multiple ways for users to discover the unique terminal feature:

1. **🔴 Animated Button**: Pulsing terminal icon with notification indicator
2. **💬 Enhanced Tooltips**: Detailed hover explanations
3. **💡 Smart Popup**: Appears for first-time visitors (localStorage managed)
4. **🧠 User-Friendly**: Non-intrusive discovery that respects user preferences

## 📈 Performance Features

- **⚡ Fast Loading**: Optimized bundle size and static generation
- **🔄 Smooth Animations**: CSS-based transitions and effects
- **📱 Touch Optimized**: Responsive touch targets and interactions
- **♿ Accessible**: Screen reader friendly and keyboard navigation
- **🔍 SEO Optimized**: Proper meta tags and semantic structure

## 🤝 Contributing

This portfolio is designed to be easily customizable. To adapt it for your own use:

1. **Fork the repository**
2. **Update portfolio content** in `src/data/portfolio.json`
3. **Customize terminal filesystem** in `src/lib/terminal-filesystem.ts`
4. **Modify styling** and branding to match your preferences
5. **Add your own projects** and experience
6. **Deploy to your preferred platform**

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Features That Make This Portfolio Special

- **🐧 Unique Terminal Interface**: First-of-its-kind portfolio terminal experience
- **⚡ Dual Interface Design**: Choose between GUI and CLI experiences
- **📱 Mobile-First**: Fully responsive across all devices
- **🧪 Production Ready**: Comprehensive testing and CI/CD pipeline
- **♿ Accessible**: Built with accessibility best practices
- **🔧 Customizable**: Easy to adapt for other DevOps professionals

---

**Built with ❤️ by a DevOps Engineer who believes the command line is the best interface** 🐧

*Experience the future of portfolio websites - where GUI meets CLI!*