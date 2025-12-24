/* --- Snow Effect with Wind --- */
const canvas = document.createElement("canvas");
canvas.className = "snow";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
let w, h;
let flakes = [];
let mouseX = 0;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Track mouse for wind effect
window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / w) * 2 - 1; // Range -1 to 1
});

function createFlakes() {
    flakes = Array.from({ length: 150 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 3 + 1,
        d: Math.random() * 150, // density
        speed: Math.random() * 1 + 0.5,
        sway: Math.random() * 0.05
    }));
}
createFlakes();

function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255,255,255,0.9)";

    flakes.forEach(f => {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();

        // Physics
        f.y += f.speed;
        f.x += Math.sin(f.y * 0.01 + f.sway) * 2 + (mouseX * 0.5); // Add slight wind based on mouse

        // Reset if out of view
        if (f.y > h || f.x > w + 5 || f.x < -5) {
            f.y = -5;
            f.x = Math.random() * w;
        }
    });
    requestAnimationFrame(draw);
}
draw();

/* --- Countdown Timer --- */
function updateCountdown() {
    const timerEl = document.getElementById('countdown');
    if (!timerEl) return;

    const now = new Date();
    const currentYear = now.getFullYear();
    let xmas = new Date(currentYear, 11, 25); // Dec 25 (Month is 0-indexed)

    if (now.getMonth() === 11 && now.getDate() > 25) {
        xmas.setFullYear(currentYear + 1);
    }

    const diff = xmas - now;

    if (diff <= 0 && diff > -86400000) {
        timerEl.textContent = "It's Christmas Day! 🎅";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    timerEl.textContent = `${days}d ${hours}h ${minutes}m until Christmas`;
}

setInterval(updateCountdown, 1000);
updateCountdown();