// ======================================
// LOADER + CONTENT REVEAL
// ======================================
const mainContent = document.getElementById('main-content')
const loader      = document.getElementById('loader')

document.addEventListener('DOMContentLoaded', () => {
    // Allow the bar animation to finish (~800ms) before hiding
    setTimeout(() => {
        if (loader) loader.classList.add('hidden')
        if (mainContent) mainContent.classList.add('show')
    }, 900)
})

// ======================================
// NAVIGATION
// ======================================
const navLinks = document.querySelectorAll('.nav-pill')

navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href')
        if (href && href.startsWith('#')) {
            e.preventDefault()
            const target = document.querySelector(href)
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
    })
})

// ======================================
// FOOTER YEAR
// ======================================
const yearSpan = document.getElementById('year')
if (yearSpan) yearSpan.textContent = new Date().getFullYear()

// ======================================
// HERO TYPEWRITER EFFECT
// ======================================
const phrases = [
    'Frontend.',
    'Backend.',
    'Design.',
    'API, MongoDB & SQL.',
    'JavaScript.',
    'React & TypeScript.',
    'Server, Node.js.'
]

const typeTarget = document.getElementById('typewriter')
const TYPE_SPEED       = 90
const ERASE_SPEED      = 60
const PAUSE_AFTER_TYPE = 1500
const PAUSE_AFTER_ERASE = 700

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function typeText(text) {
    for (const char of text) {
        typeTarget.textContent += char
        await wait(TYPE_SPEED)
    }
}

async function eraseText() {
    const text = typeTarget.textContent
    for (let i = text.length; i >= 0; i--) {
        typeTarget.textContent = text.slice(0, i)
        await wait(ERASE_SPEED)
    }
}

async function typewriterLoop() {
    if (!typeTarget) return
    let index = 0
    while (true) {
        await typeText(phrases[index])
        await wait(PAUSE_AFTER_TYPE)
        await eraseText()
        await wait(PAUSE_AFTER_ERASE)
        index = (index + 1) % phrases.length
    }
}

document.addEventListener('DOMContentLoaded', () => {
    typewriterLoop()
})

// ======================================
// HERO BLUR ON SCROLL
// ======================================
const heroPanel = document.querySelector('.panel-hero')

function updateHeroBlur() {
    if (!heroPanel) return

    const progress = Math.min(window.scrollY / (window.innerHeight * 0.9), 1)
    heroPanel.style.filter  = `blur(${5 * progress}px)`
    heroPanel.style.opacity = (1 - 0.2 * progress).toString()
}

window.addEventListener('scroll', updateHeroBlur)
updateHeroBlur()

// ======================================
// SCROLL HINT
// ======================================
const scrollHint = document.querySelector('.scroll-hint')
if (scrollHint) {
    const hideHint = () => {
        scrollHint.classList.add('scroll-hint--hidden')
        window.removeEventListener('scroll', onScroll)
    }

    const onScroll = () => {
        if (window.scrollY > 10) hideHint()
    }

    window.addEventListener('scroll', onScroll)

    scrollHint.addEventListener('click', () => {
        const target = document.getElementById('projects')
        if (target) target.scrollIntoView({ behavior: 'smooth' })
        hideHint()
    })
}

// ======================================
// AUTOPLAY VIDEOS ON SCROLL INTO VIEW
// ======================================
const videos = document.querySelectorAll('video')

const videoObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.play()
            } else {
                entry.target.pause()
            }
        })
    },
    { threshold: 0.3 }
)

videos.forEach((video) => videoObserver.observe(video))

// ======================================
// PROJECTS SLIDER
// ======================================
const projectsGrid = document.querySelector('.projects-grid')
const prevBtn      = document.querySelector('.projects-nav-prev')
const nextBtn      = document.querySelector('.projects-nav-next')

if (projectsGrid && prevBtn && nextBtn) {
    const cards = Array.from(projectsGrid.querySelectorAll('.project-card'))
    let currentIndex = 0

    const updateArrows = () => {
        prevBtn.classList.toggle('visible', currentIndex > 0)
    }

    const goToCard = (index) => {
        currentIndex = (index + cards.length) % cards.length
        projectsGrid.scrollTo({ left: cards[currentIndex].offsetLeft, behavior: 'smooth' })
        updateArrows()
    }

    nextBtn.addEventListener('click', () => goToCard(currentIndex + 1))
    prevBtn.addEventListener('click', () => goToCard(currentIndex - 1))

    updateArrows()
}
