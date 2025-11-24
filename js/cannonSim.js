let angleDeg = Math.min(Math.max(Number(angleInput.value), 0), 90);
let speed = Math.min(Math.max(Number(speedInput.value), 0), 20);

const canvas = document.getElementById("cannonCanvas");
const ctx = canvas.getContext("2d");

const launchBtn = document.getElementById("launchBtn");
const angleInput = document.getElementById("angleInput");
const speedInput = document.getElementById("speedInput");
const output = document.getElementById("output");

let x, y, vx, vy, time;
const g = 9.8;  // gravity

function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw cannon
    ctx.fillStyle = "black";
    ctx.fillRect(20, canvas.height - 40, 40, 40);
}

function launch() {
    resetCanvas();

    const angleDeg = Number(angleInput.value);
    const speed = Number(speedInput.value);

    const angleRad = angleDeg * Math.PI / 180;

    x = 40;
    y = canvas.height - 40;
    time = 0;

    vx = speed * Math.cos(angleRad);
    vy = -speed * Math.sin(angleRad);  // negative because canvas y increases downward

    output.innerHTML = `
        <p><strong>Initial vx:</strong> ${vx.toFixed(2)} m/s</p>
        <p><strong>Initial vy:</strong> ${(-vy).toFixed(2)} m/s</p>
    `;

    requestAnimationFrame(update);
}

function update() {
    time += 0.03;

    // Physics
    x += vx * 0.03;
    vy += g * 0.03;
    y += vy * 0.03;

    // Stop when it hits the ground
    if (y >= canvas.height - 10) {
        y = canvas.height - 10;

        const distance = x - 40;

        output.innerHTML += `<p><strong>Total Distance:</strong> ${distance.toFixed(2)} meters</p>`;
        return;
    }

    resetCanvas();

    // Draw projectile
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    requestAnimationFrame(update);
}

launchBtn.onclick = launch;
resetCanvas();
