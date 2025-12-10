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