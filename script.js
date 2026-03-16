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

// Generate background floating icons
function createFloatingIcons() {
    const container = document.getElementById("floating-icons");
    const icons = ['fa-star', 'fa-heart', 'fa-gift', 'fa-music', 'fa-crown', 'fa-moon'];

    // Create a new icon every 800ms
    setInterval(() => {
        const icon = document.createElement("i");
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        icon.className = `fa-solid ${randomIcon} floating-icon`;

        // Randomize size, position, and duration
        const size = Math.random() * 1.5 + 0.5; // 0.5rem to 2rem
        const left = Math.random() * 100; // 0% to 100%
        const animationDuration = Math.random() * 5 + 8; // 8s to 13s

        icon.style.fontSize = `${size}rem`;
        icon.style.left = `${left}%`;
        icon.style.animationDuration = `${animationDuration}s`;
        icon.style.opacity = Math.random() * 0.5 + 0.1;

        container.appendChild(icon);

        // Remove icon after animation finishes to prevent DOM bloating
        setTimeout(() => {
            icon.remove();
        }, animationDuration * 1000);
    }, 800);
}
createFloatingIcons();

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
            particleCount: 20,
            spread: 50,
            origin: { x: x, y: y },
            colors: ['#a855f7', '#e879f9', '#c084fc', '#f8fafc'],
            disableForReducedMotion: true,
            zIndex: 100,
            ticks: 50,
            gravity: 0.8,
            scalar: 0.8,
            shapes: ['star', 'circle']
        });
    }
});
