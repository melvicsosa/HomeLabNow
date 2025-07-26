# Home Lab Now v2.0.0

> A modern static site built with Gulp and Tailwind CSS for showcasing home lab projects and technology content.

## 🚀 Features

- **Modern Build System**: Gulp-based workflow with BrowserSync for live development
- **Tailwind CSS**: Utility-first CSS framework with custom configurations
- **Static Site Generation**: Panini templating engine for efficient HTML generation
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Multiple Themes**: Support for different color schemes and layouts
- **Development Server**: Hot reload and automatic browser refresh

## 🛠️ Tech Stack

- **Build Tool**: Gulp.js
- **CSS Framework**: Tailwind CSS 3.2.7
- **Templating**: Panini (Handlebars-based)
- **PostCSS**: For CSS processing and optimization
- **BrowserSync**: Development server with live reload
- **Node.js**: Runtime environment

## 📁 Project Structure

```
HomeLabNow/
├── source/                 # Source files
│   ├── assets/            # Static assets (CSS, JS, images)
│   ├── data/              # JSON data files
│   ├── helpers/           # Handlebars helpers
│   ├── layouts/           # Page layouts
│   ├── pages/             # Individual pages
│   └── partials/          # Reusable components
├── build/                 # Generated output (ignored in git)
├── node_modules/          # Dependencies (ignored in git)
├── gulpfile.js           # Gulp configuration
├── package.json          # Project dependencies
├── tailwind.config.js    # Main Tailwind configuration
├── tailwind.yt1.config.js # Alternative theme configuration
├── postcss.config.js     # PostCSS configuration
└── config.json           # Panini configuration
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:melvicsosa/HomeLabNow.git
   cd HomeLabNow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 📝 Available Scripts

- `npm start` - Start development server with live reload
- `npm run build` - Build for production
- `npm run deploy` - Build and deploy for production

## 🎨 Customization

### Tailwind CSS Configuration

The project includes two Tailwind configurations:

- **`tailwind.config.js`**: Main configuration with custom color palette
  - Primary: `#ff3d54`
  - Secondary: `#654cff`
  - Fonts: Open Sans, Jost

- **`tailwind.yt1.config.js`**: Alternative theme with dark mode support
  - Primary: `#3b3958`
  - Font: Poppins
  - Includes custom animations

### Adding Content

1. **Pages**: Add new `.hbs` files in `source/pages/`
2. **Components**: Create reusable partials in `source/partials/`
3. **Data**: Store JSON data in `source/data/`
4. **Assets**: Add images, fonts, etc. in `source/assets/`

## 🌐 Deployment

The project is configured for easy deployment. The build process generates optimized files in the `build/` directory.

```bash
npm run deploy
```

## 👤 Author

**Melvic Sosa**
- Website: [https://melvicsosa.dev/](https://melvicsosa.dev/)

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by home lab and technology communities
- Thanks to all contributors and the open source community

---

*This is a private project for personal reference and documentation.*