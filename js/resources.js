document.addEventListener("DOMContentLoaded", () => {
    // Data for the resource cards
    const resources = [
      {
        id: 1,
        title: "Data Science & Artificial Intelligence",
        icon: "Brain",
        description: "From zero to hero in data science and AI",
        content: [
          "Curated list of free/paid courses for beginners to advanced",
          "Essential tools and libraries (Python, SQL, Tableau)",
          "AI/ML resources for practical applications",
          "Data visualization best practices",
          "Personal project examples and lessons learned",
        ],
        color: "color-blue",
        iconColor: "icon-color-blue",
        path: "data-science-artificial-intelligence.html",
      },
      {
        id: 2,
        title: "Engineering & Design Resources",
        icon: "FlaskConical",
        description: "Industry insights and practical tools",
        content: [
          "Process simulation software tutorials",
          "Safety and compliance guidelines",
          "Industry-specific tools and calculators",
          "Case studies from real experience",
          "Technical documentation templates",
        ],
        color: "color-green",
        iconColor: "icon-color-green",
        path: "engineering-and-design-resources.html",
      },
      {
        id: 3,
        title: "Web Development Toolkit",
        icon: "Code",
        description: "Modern web development essentials",
        content: [
          "Modern web development stack recommendations",
          "UI/UX design principles",
          "Performance optimization techniques",
          "Accessibility guidelines",
          "Code snippets and templates",
        ],
        color: "color-purple",
        iconColor: "icon-color-purple",
        path: "web-development-toolkit.html",
      },
      {
        id: 4,
        title: "Career Development",
        icon: "TrendingUp",
        description: "Level up your professional journey",
        content: [
          "Resume building tips",
          "Interview preparation guides",
          "Industry-specific certifications",
          "Professional networking strategies",
          "Portfolio development advice",
        ],
        color: "color-orange",
        iconColor: "icon-color-orange",
        path: "career-development.html",
      },
      {
        id: 5,
        title: "Technical Writing & Documentation",
        icon: "FileText",
        description: "Crafting clear and effective technical content",
        content: [
          "Best practices for technical documentation",
          "Tools for creating professional documentation",
          "Templates for different types of technical content",
          "Your Medium articles and insights",
        ],
        color: "color-cyan",
        iconColor: "icon-color-cyan",
        path: "technical-writing-documentation.html",
      },
      {
        id: 6,
        title: "Project Management & Tools",
        icon: "Settings",
        description: "Streamline your workflow and productivity",
        content: [
          "Agile/Scrum methodologies",
          "Project management software comparisons",
          "Collaboration tools",
          "Version control best practices",
          "Real-world tool experiences",
        ],
        color: "color-teal",
        iconColor: "icon-color-teal",
        path: "project-management-tools.html",
      },
      {
        id: 7,
        title: "Industry-Specific Resources",
        icon: "Factory",
        description: "Deep dive into specialized knowledge",
        content: [
          "Chemical manufacturing insights",
          "Data analytics in process industries",
          "Safety protocols and best practices",
          "Regulatory compliance resources",
          "Industry trends and innovations",
        ],
        color: "color-red",
        iconColor: "icon-color-red",
        path: "industry-specific-resources.html",
      },
      {
        id: 8,
        title: "Learning & Development",
        icon: "GraduationCap",
        description: "Continuous growth and skill building",
        content: [
          "Online learning platforms comparison",
          "Certification programs",
          "Professional development resources",
          "Industry conferences and events",
          "Curated reading recommendations",
        ],
        color: "color-yellow",
        iconColor: "icon-color-yellow",
        path: "learning-development.html",
      },
      {
        id: 9,
        title: "BONUS: Coolest Sites on the Interweb",
        icon: "Sparkles",
        description: "Hidden gems discovered in the digital wilderness",
        content: [
          "Mind-blowing interactive websites",
          "Useful tools you never knew existed",
          "Creative portfolios and showcases",
          "Educational platforms with a twist",
          "Fun and quirky discoveries",
        ],
        color: "color-pink",
        iconColor: "icon-color-pink",
        path: "coolest-sites-on-the-interweb.html",
      },
    ];
  
    // SVG strings for icons
    const icons = {
      Brain: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.97-3.44 2.5 2.5 0 0 1-2.03-3.01 2.5 2.5 0 0 1 2.02-3.01 2.5 2.5 0 0 1 2.98-3.44A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.97-3.44 2.5 2.5 0 0 0 2.03-3.01 2.5 2.5 0 0 0-2.02-3.01 2.5 2.5 0 0 0-2.98-3.44A2.5 2.5 0 0 0 14.5 2Z"/></svg>`,
      FlaskConical: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 2h7"/><path d="M14 2v7.5L20.5 22h-17L10 9.5V2"/><path d="M8.5 2h7M10 9.5L20.5 22"/></svg>`,
      Code: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      TrendingUp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
      FileText: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`,
      Settings: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l-.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
      Factory: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>`,
      GraduationCap: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
      Sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.93 2.57a1.5 1.5 0 0 0-1.86 0L6.6 4A1.5 1.5 0 0 0 6 5.2V7.4a1.5 1.5 0 0 0 1.5 1.5h2.2a1.5 1.5 0 0 0 1.5-1.5V5.2A1.5 1.5 0 0 0 10.4 4l-1.47-1.43zM14 15.07a1.5 1.5 0 0 0-1.4-1.43h-2.2a1.5 1.5 0 0 0-1.5 1.5v2.2a1.5 1.5 0 0 0 1.5 1.5h2.2a1.5 1.5 0 0 0 1.4-1.43L14 15.07zM18.07 9.93a1.5 1.5 0 0 0 0-1.86L16.6 6.6A1.5 1.5 0 0 0 15.4 6H13.2a1.5 1.5 0 0 0-1.5 1.5v2.2a1.5 1.5 0 0 0 1.5 1.5h2.2a1.5 1.5 0 0 0 1.2-1.5l1.47-1.47zM4.93 18.07a1.5 1.5 0 0 0 1.86 0L8.2 16.6A1.5 1.5 0 0 0 8.6 15.4V13.2a1.5 1.5 0 0 0-1.5-1.5H4.9a1.5 1.5 0 0 0-1.5 1.5v2.2a1.5 1.5 0 0 0 1.5 1.5h0z"/></svg>`,
      ExternalLink: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
      ArrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    };
  
    const grid = document.querySelector(".resources-grid");
  
    if (grid) {
        // Create all cards HTML at once
        const cardsHTML = resources.map(resource => {
            // Create a list of content items
            const contentList = resource.content
                .map(item => `
                    <li>
                        <span>${item}</span>
                    </li>
                `)
                .join("");
    
            // Create the card HTML
            return `
                <div class="card ${resource.color}">
                    <div class="card-header">
                        <div class="card-header-top flex items-center gap-4">
                            <div class="card-icon-title flex items-center gap-4">
                                <div class="card-icon-wrapper ${resource.iconColor}">
                                    ${icons[resource.icon]}
                                </div>
                                <div>
                                    <h3 class="card-title mb-0">${resource.title}</h3>
                                </div>
                            </div>
                        </div>
                        <p class="card-description">${resource.description}</p>
                    </div>
                    <div class="card-content">
                        <ul>${contentList}</ul>
                        <button class="card-button" onclick="location.href='resources/${resource.path}'">
                            Explore Resources
                            <span class="card-button-icon">•</span>
                        </button>
                    </div>
                </div>
            `;
        }).join("");

        // Add all cards to the grid at once
        grid.innerHTML = cardsHTML;
    }
  });