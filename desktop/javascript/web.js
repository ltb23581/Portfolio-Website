const tabs = document.querySelectorAll("[data-tab-target]"); // Select all tabs

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);

    // Remove active class from all tab contents and tabs
    document.querySelectorAll("[data-tab-content]").forEach((content) => {
      content.classList.remove("active");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    // Add active class to the target content and clicked tab
    tab.classList.add("active");
    target.classList.add("active");
  });
});

// Storing project information using Vue
const app = Vue.createApp({
  data() {
    return {
      activeTab: "about", // Set initial active tab
      tabs: [
        { id: "about", label: "About Me" },
        { id: "featured", label: "Featured Projects" },
        { id: "contact", label: "Contact" },
      ],
      aboutData: [
        {
          image2: './images/web/img3.JPG',
          subTitle1: 'About Me',
          title1: 'I’m a Computer Science student',

          content1: 'Welcome to my portfolio! My name is Lindsay Bui, and I am a third-year computer science student concentrating in software design at the University of Georgia. Alongside my major, I am pursuing the New Media Certificate (Development track) and am a member of the UGA CyberArch Academy.',
          subTitle1: 'About Me',
          content2: 'In addition to my passion for technology, I also have a love for learning about different cultures. Through high school to now, I studied Spanish for one year and Japanese and Korean for two. I am of Vietnamese descent; however, I wasnt fully taught the language growing up, so I only know basic vocabulary and conversation. Currently, my strongest language, aside from English (which is my native language), is Korean. During the Spring 2025 term, I plan to study at Korea University to strengthen my cultural and language skills while also continuing my studies in computer science.',
          content3: 'Growing up in a household of six, I was always known as the "creative child." When it came time to choose a major, I found myself torn between two options: architecture and computer science. I loved art and design but also dreamed of pursuing coding. Ultimately, I chose computer science, a field that allows me to blend my creative passion with my technical skills in web, app, and game development.'
        },
      ],
      featuredProjectsData: [
        {
          image: "./images/web/lifeOfMe1.png",
          title: "Life of Me",
          description:
            "Explore a pixelated world inspried by the early Pokemon gameboy games. Interact with NPCs, uncover personal stories, and navigate through areas of the map to learn more about the creator.",
          /* Whole project details below */
          image1: "./images/web/LOM1.png",
          image2: "./images/web/LOM2.png",
          image3: "./images/web/LOM3.png",
          image4: "./images/web/LOM4.png",
          image5: "./images/web/LOM5.png",
          overview:
            "Life of Me is an interactive world created combining HTML, CSS, and JavaScript to create a Pokémon-style gameplay experience. Developed as a final project for my Advanced Web Development course, the game allows players to navigate a pixelated world, interact with NPCs, and learn about my life. Built using online tutorials and pre-made assets, it focuses on player movement, NPC interactions, and environment design. The project showcases my interests in web development, game design, and storytelling while highlighting areas for future growth, including pixel art and unique gameplay.",
          stack: "HTML, CSS, JavaScript",
          dev: "The game allows players to explore different areas, walk around, and engage with NPCs. Although the game references tutorials, I added my own customizations, such as player movement, NPC interactions, and world-building. Future developments will include more personalized pixel art and unique gameplay mechanics.",
          functionalities:
            "Player movement, NPC interactions, world exploration, dialogue system. Features an interactive world with different areas to explore, where NPCs share information about the creator’s life.",
          ui: "The UI features simple, retro-style pixel art, with easy navigation through keyboard controls for movement and interaction with NPCs. The design is inspired by early Gameboy games, creating a nostalgic experience.",
          future:
            'In the future, I aim to complete the original "Boba Battle" concept, where players engage in battles using boba drinks as weapons. The project will also include more personalized pixel art, improved gameplay mechanics, and side quests to further showcase aspects of my life. This game is a stepping stone for future interactive projects combining my passions for game development, art, and storytelling.',
          medium:
            "https://medium.com/@lindsaytbuiwork/advanced-web-development-final-project-life-of-me-93c86ce6b7fe",
        },
        {
          image: "./images/web/listApp.png",
          title: "Roommate Shopping List",
          description:
            "Designed for an efficient shopping experience, this app is designed to enhance the shopping experience for roommates by simplifying planning and purchasing. It ensures that you never buy duplicate items or forget what’s needed, making it easier to track and manage shared shopping lists.",
          /* whole project details below */
          overview:
            "Roommate Shopping is an app designed to simplify shopping and expense tracking for roommates. Developed as a final project for my Mobile Software Development course, the app allows users to create and manage shared shopping lists, track purchases, and calculate expenses. With Firebase integration for real-time data synchronization, it ensures smooth collaboration and easy expense management among roommates.",
          stack: "HTML, CSS, JavaScript, Firebase",
          dev: "The app enables user registration, shared shopping lists, and the ability to mark and settle purchases. Users can track individual expenses and get a summary of costs per roommate. Built using Firebase for real-time data syncing, the app also includes secure login and responsive design for optimal usability across devices.",
          functionalities:
            "User registration, shared shopping lists, purchase tracking, expense calculation, real-time data synchronization. Users can add, mark, and settle purchases, with a summary of costs per roommate.",
          ui: "The UI is designed for ease of use with simple navigation, clear list management, and real-time updates. It adapts to various screen sizes with a responsive layout, providing a user-friendly experience for managing shared expenses.",
          future:
            "In the future, ...",
          medium: "",
        },
      ],
      currentImageIndex: 0, // Index of the currently selected image
    };
  },
  computed: {
    currentImage() {
      return this.featuredProjectsData[this.currentImageIndex];
    },
  },
  methods: {
    switchTab(tabId) {
      this.activeTab = tabId; // Set active tab when clicked
    },
    nextImage() {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.featuredProjectsData.length;
    },
    prevImage() {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.featuredProjectsData.length) %
        this.featuredProjectsData.length;
    },
    selectImage(index) {
      this.currentImageIndex = index;
    },
    scrollToSection() {
      const targetId =
        this.currentImage.title === "Life of Me"
          ? "lifeOfMe"
          : "roommateShopping";
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    getProject1() {
      return this.featuredProjectsData[0];
    },
    getProject2() {
      return this.featuredProjectsData[1];
    },
  },
});

app.mount("#app");
