// --- CONFIGURATION ---
// Set the birthday person's name here:
const HER_NAME = "Nazma";

// Set the target date/time for the countdown here.
const targetDate = new Date("March 24, 2026 00:00:00").getTime();
// -----------------------

// Set the personalized greeting in the HTML with animated icons
const advNameSpans = HER_NAME.split('').map(char => `<span class="adv-name-letter" style="display:inline-block; opacity:0;">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
document.getElementById("adv-title").innerHTML = `<i class="fa-regular fa-clock pulse-icon"></i> Adv Happy Birthday <span style="display:inline-block; white-space:nowrap">${advNameSpans}</span>!`;

const bdayNameSpans = HER_NAME.split('').map(char => `<span class="bday-name-letter" style="display:inline-block; opacity:0;">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
document.querySelector(".birthday-title").innerHTML = `<i class="fa-solid fa-gift bounce icon-glow"></i> Happy Birthday <span style="display:inline-block; white-space:nowrap">${bdayNameSpans}</span>! <i class="fa-solid fa-cake-candles bounce icon-glow" style="animation-delay: 1s"></i>`;

// Animate the name dropping immediately on page load
if (window.gsap) {
    gsap.fromTo(".adv-name-letter",
        {
            y: () => -window.innerHeight - 100,
            x: () => (Math.random() - 0.5) * window.innerWidth,
            rotation: () => (Math.random() - 0.5) * 360,
            opacity: 0,
            scale: 3
        },
        {
            y: 0,
            x: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 2.0,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.5
        }
    );
}

// Initialize interactive particle background network
if (window.tsParticles) {
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: { enable: true, mode: "grab" },
                resize: true,
            },
            modes: {
                grab: { distance: 160, links: { opacity: 0.6 } },
            },
        },
        particles: {
            color: { value: ["#a855f7", "#ec4899", "#8b5cf6", "#3b82f6"] },
            links: {
                color: "#a855f7",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "bounce" },
            },
            number: {
                density: { enable: true, area: 800 },
                value: 80,
            },
            opacity: { value: 0.4 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2.5 } },
        },
        detectRetina: true,
    });
}

// Elements
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const preBirthdayView = document.getElementById("pre-birthday");
const birthdayView = document.getElementById("birthday-greeting");

// Format time with leading zero
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Update the countdown timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        // Countdown reached zero
        clearInterval(timerInterval);

        // Hide countdown, show birthday greeting
        preBirthdayView.classList.add("hidden");
        birthdayView.classList.remove("hidden");

        // trigger fireworks or extra animations here if you want
        if (window.gsap) {
            gsap.fromTo(".bday-name-letter",
                {
                    y: () => -window.innerHeight - 100,
                    x: () => (Math.random() - 0.5) * window.innerWidth,
                    rotation: () => (Math.random() - 0.5) * 360,
                    opacity: 0,
                    scale: 3
                },
                {
                    y: 0,
                    x: 0,
                    rotation: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 2.0,
                    stagger: 0.2,
                    ease: "power3.out",
                    delay: 0.1
                }
            );
        }
        if (window.confetti) {
            var duration = 15 * 1000;
            var animationEnd = Date.now() + duration;
            var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            var burstInterval = setInterval(function () {
                var timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(burstInterval);
                }

                var particleCount = 50 * (timeLeft / duration);
                confetti({
                    ...defaults, particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confetti({
                    ...defaults, particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 250);
        }

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Render to DOM
    daysEl.innerText = formatTime(days);
    hoursEl.innerText = formatTime(hours);
    minutesEl.innerText = formatTime(minutes);
    secondsEl.innerText = formatTime(seconds);
}

// Initial call to avoid flicker
updateCountdown();

// Update every second
const timerInterval = setInterval(updateCountdown, 1000);

// Interactive touch/click effects
document.addEventListener("click", function(e) {
    if (window.confetti) {
        // Calculate the relative click position
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Shoot a tiny burst of magical stars/confetti
        confetti({
            particleCount: 30,
            spread: 60,
            origin: { x: x, y: y },
            colors: ['#a855f7', '#e879f9', '#c084fc', '#f8fafc'],
            zIndex: 100,
            ticks: 50,
            gravity: 0.8,
            scalar: 0.8
        });
    }
});
