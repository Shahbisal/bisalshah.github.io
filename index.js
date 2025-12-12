// Function to scroll to the 'About Me' section when the button is clicked
function scrollToAbout() {
    const aboutSection = document.getElementById('about-me-section-1');
    if (aboutSection) {
        // Use smooth scrolling behavior
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
}

//==================== SCROLL UP ====================
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


//==================== SCROLL SECTIONS ACTIVE LINK ====================
// UPDATED: This function is simplified to only include the remaining sections (home, about, skills, projects)
const sections = document.querySelectorAll('section[id]') 

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50; // Offset by header height
        const sectionId = current.getAttribute('id')
        
        // This makes sure the nav links work for the updated sections:
        const linkSelector = `.nav a[href*="#${sectionId}"]`;

        // Check if current scroll position is within the section bounds
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            // Add active link class to the corresponding nav item
            const navLink = document.querySelector(linkSelector);
            if (navLink) {
                 navLink.classList.add('active-link');
            }
        } else {
             // Remove active link class
             const navLink = document.querySelector(linkSelector);
             if (navLink) {
                 navLink.classList.remove('active-link');
             }
        }
    })
}
window.addEventListener('scroll', scrollActive)


//==================== CHANGE BACKGROUND HEADER ====================
function scrollHeader(){
    const nav = document.querySelector('.header') // Select the fixed header
    // When the scroll is greater than 80 viewport height, add the scroll-header class
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* --- POPUP LOGIC --- */

/* --- COMPLETE PORTFOLIO LOGIC --- */

// 1. DATA: Your Projects
// You can mix images (.png, .jpg) and videos (.mp4) in the 'images' list.
const projectData = {
    'project1': {
        title: "Harvest Of The Dead",
        description: "A third-person post-apocalyptic survival game where you play as a farmer trying to rebuild humanity.",
        gameLink: "https://yourname.itch.io/harvest-of-the-dead", 
        images: [
            't1.png', // Your Image
            'p1.png', // Your Image
            'p2.png', // Your Image
            'GamePlay.mp4',         // <--- YOUR VIDEO (Make sure file exists!)
            'p3.png' ,                // Another Image
            'p4.png' ,                // Another Image
            'p5.png' ,                // Another Image
            'p6.png' ,                // Another Image
            'p7.png' ,                // Another Image
            'p8.png' ,                // Another Image
            'p9.png' ,                // Another Image
            'p10.png' ,                // Another Image
            'p11.png' ,                // Another Image
            'p12.png' ,                // Another Image
            'p13.png' ,                // Another Image
            'p14.png' ,                // Another Image
            'p15.png' ,                // Another Image
            'p16.png' ,                // Another Image
            'p17.png' ,                // Another Image
            'p18.png' ,                // Another Image
            'p19.png' ,                // Another Image
            'p20.png' ,                // Another Image

        ]
 

    },
    'project2': {
        title: "Cube - Runner",
        description: "High-speed physics and procedural generation.",
        gameLink: "https://yourname.itch.io/cube-runner", 
        images: [
            't2.png',
            'c1.png',
            'c2.png',
            'c3.png',
            'c4.png',
            'c5.png',
            'c6.png',
            'c7.png',
            'c8.png',
            'c9.png',
            'c10.png',
            'c11.png',

        ]
    },
    
    'project3': {
        title: "Hybrid Project",
        description: "An graphic novel adventure game about growing up in monster society.",
        gameLink: "", 
        images: [
            'Project-image 1.svg'
        ]
    },
    // --- PASTE THIS AFTER 'project3' (Don't forget the comma before it!) ---
    
    'art1': {
        title: "Character Design",
        description: "A collection of hero sketches, NPC concepts, and costume designs created in Photoshop and Procreate.",
        gameLink: "", // Empty = No 'Play' button will appear
        images: [
            'p3.png',
            'p4.png', // Add your extra art files here
            'p5.png'
        ]
    },
    'art2': {
        title: "Concept Art",
        description: "Environmental concept art exploring different moods, lighting, and world-building elements.",
        gameLink: "", 
        images: [
            't1.png',
            'p6.png',
            'p7.png'
        ]
    },
    'art3': {
        title: "Level Design",
        description: "Top-down layouts, greyboxing prototypes, and flow maps for game levels.",
        gameLink: "", 
        images: [
            'p2.png',
            'p8.png',
            'p9.png'
        ]
    }
};




const socialLinks = {
    linkedin: "https://www.linkedin.com/in/yourprofile",
    instagram: "https://www.instagram.com/yourprofile",
    twitter: "https://twitter.com/yourprofile"
};

/* =========================================
   2. SCROLL ANIMATION OBSERVER (THE FIX)
   ========================================= */
// This watches for elements with "hidden" class and reveals them
// const scrollObserver = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('show'); // Triggers the CSS fade-in
//         }
//     });
// });

// Find all hidden elements and tell the observer to watch them
// We use a small timeout to ensure HTML is fully loaded
setTimeout(() => {
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => scrollObserver.observe(el));
}, 100);


/* =========================================
   3. POPUP & VIDEO LOGIC
   ========================================= */

// Watch popup videos to auto-play/pause
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
            video.play().catch(e => console.log("Autoplay blocked:", e));
        } else {
            video.pause();
        }
    });
}, { threshold: 0.5 });

function openProject(projectId) {
    const modal = document.getElementById('modal');
    const slideStack = document.getElementById('slideStack');

    if (!modal || !slideStack || !projectData[projectId]) return;

    // Clear previous content
    slideStack.innerHTML = ''; 
    const project = projectData[projectId]; 

    // --- A. TEXT SECTION ---
    const infoDiv = document.createElement('div');
    infoDiv.className = 'project-info-modal';
    
    const title = document.createElement('h2');
    title.className = 'project-title-modal';
    title.innerText = project.title;

    const desc = document.createElement('p');
    desc.className = 'project-desc-modal';
    desc.innerText = project.description;

    infoDiv.appendChild(title);
    infoDiv.appendChild(desc);
    slideStack.appendChild(infoDiv);

    // --- B. MEDIA SECTION ---
    if (project.images) {
        project.images.forEach(filename => {
            const isVideo = filename.toLowerCase().match(/\.(mp4|webm|mov)$/);

            if (isVideo) {
                const vid = document.createElement('video');
                vid.src = filename;
                vid.controls = true;
                vid.muted = false;
                vid.playsInline = true; 
                slideStack.appendChild(vid);
                videoObserver.observe(vid);
            } else {
                const img = document.createElement('img');
                img.src = filename;
                img.onerror = function() { console.log("Image not found:", filename); };
                slideStack.appendChild(img);
            }
        });
    }

    // --- C. FOOTER SECTION ---
    const footer = document.createElement('div');
    footer.className = 'modal-footer';

    if (project.gameLink && project.gameLink !== "") {
        const btn = document.createElement('a');
        btn.href = project.gameLink;
        btn.target = "_blank"; 
        btn.className = 'btn-itch';
        btn.innerText = "PLAY THIS GAME ON ITCH.IO"; 
        footer.appendChild(btn);
    }

    const socialDiv = document.createElement('div');
    socialDiv.className = 'social-links-container';
    socialDiv.innerHTML = `
        <p>FOLLOW ME</p>
        <a href="${socialLinks.linkedin}" target="_blank">LinkedIn</a>
        <a href="${socialLinks.instagram}" target="_blank">Instagram</a>
        <a href="${socialLinks.twitter}" target="_blank">Twitter/X</a>
    `;
    footer.appendChild(socialDiv);
    slideStack.appendChild(footer);

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    const modal = document.getElementById('modal');
    const slideStack = document.getElementById('slideStack');
    if(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
        const allVideos = slideStack.querySelectorAll('video');
        allVideos.forEach(vid => vid.pause());
    }
}

function closeModalOutside(event) {
    if (event.target === document.getElementById('modal')) closeModal();
}

/* =========================================
   2. SCROLL ANIMATION OBSERVER
   ========================================= */
// const scrollObserver = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('show'); 
//         }
//     });
// });

// Wait for page to load, then find elements with the new class name
setTimeout(() => {
    // UPDATED: Looking for '.on-scroll' instead of '.hidden'
    const hiddenElements = document.querySelectorAll('.on-scroll');
    hiddenElements.forEach((el) => scrollObserver.observe(el));
}, 100);
/* --- SCROLL ANIMATION LOGIC --- */
const observerOptions = {
    threshold: 0.1 // Trigger when 10% of the item is visible
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active'); // Add the CSS class that makes it visible
        }
    });
}, observerOptions);

// Wait a tiny bit to ensure HTML is ready, then find the elements
setTimeout(() => {
    const animatedElements = document.querySelectorAll('.reveal-on-scroll');
    animatedElements.forEach((el) => scrollObserver.observe(el));
}, 100);

