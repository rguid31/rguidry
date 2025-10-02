# Ryan Guidry - Personal Portfolio Website

A modern, responsive personal portfolio website showcasing my journey from Chemical Engineering to Data Science. Built with a focus on clean design, performance, and user experience, this project uses a simple Node.js-based static site generator.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works seamlessly across all devices.
- **Modern UI**: Clean, professional design with smooth animations and transitions.
- **Static Site Generation**: Built with a simple, dependency-free Node.js script.
- **Performance Optimized**: Fast loading times and optimized assets.
- **Accessibility**: Built with accessibility best practices in mind.
- **SEO Friendly**: Proper meta tags, semantic HTML, and an auto-generated sitemap.

## 🛠️ Technologies Used

- **HTML5**: Semantic markup for better accessibility and SEO.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **JavaScript (Vanilla)**: For interactive elements and the portfolio carousel.
- **Node.js**: Powers the custom static site generator (`build.js`).
- **Git**: For version control.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and npm installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rguid31/rguidry.git
    cd rguidry
    ```

2.  **Install dependencies:**
    This project has a single build-time dependency for serving the site locally.
    ```bash
    npm install
    ```

3.  **Build the website:**
    The build script compiles the site from the `src` directory into the `dist` directory.
    ```bash
    npm run build
    ```

4.  **Run the development server:**
    This command serves the contents of the `dist` directory on a local server.
    ```bash
    npm run dev
    ```
    The site will be available at `http://localhost:3000`.

5.  **Watch for changes (Optional):**
    To automatically rebuild the site whenever you make changes to the source files, run:
    ```bash
    npm run watch
    ```

## 📁 Project Structure

The project is organized into source files and a distribution directory. The build process compiles files from `src` and other root-level assets into the `dist` folder, which is what gets deployed.

```
rguidry/
├── src/
│   ├── partials/       # Reusable HTML components (e.g., head, header, footer)
│   └── sections/       # Content sections for the main page (e.g., about, portfolio)
├── dist/               # (Generated) The compiled, production-ready website
├── build.js            # The Node.js static site generator script
├── script.js           # Main JavaScript file for interactivity
├── style.css           # Main stylesheet (uses Tailwind CSS)
├── package.json        # Project configuration and scripts
└── README.md           # This file
```

## 🔒 Privacy & Security

- No tracking or analytics.
- No third-party cookies.
- Secure HTTPS connection (on deployed site).
- Clear privacy policy.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contact

For any questions or collaboration opportunities, please reach out:
- Email: [inquireryan@gmail.com](mailto:inquireryan@gmail.com)
- GitHub: [rguid31](https://github.com/rguid31)