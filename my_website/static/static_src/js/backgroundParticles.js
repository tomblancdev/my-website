export default function backgroundParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    );
    const particles = [];
    const numParticles = Math.floor((canvas.width * canvas.height) / 10000);

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
        });
    }

    function drawParticles() {
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-accent');
        particles.forEach((particle) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY *= -1;
            }
        });
    }

    window.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const pushRadius = 100;

        particles.forEach((particle) => {
            const dx = particle.x - mouseX;
            const dy = particle.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < pushRadius) {
                const angle = Math.atan2(dy, dx);
                const pushStrength = (pushRadius - distance) / (75 * pushRadius);
                particle.speedX += Math.cos(angle) * pushStrength;
                particle.speedY += Math.sin(angle) * pushStrength;
            }
        });
    });

    function update() {
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-background');
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawParticles();
        requestAnimationFrame(update);
    }

    update();
}
