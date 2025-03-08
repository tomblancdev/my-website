export default function background() {
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
        // recenter shapes
        shapes.forEach((shape) => {
            if (shape.x > canvas.width) {
                shape.x = canvas.width;
            }
            if (shape.y > canvas.height) {
                shape.y = canvas.height;
            }
        });
    });

    window.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        for (let i = shapes.length - 1; i >= 0; i--) {
            const shape = shapes[i];
            if (shape.type === 'circle' && Math.hypot(shape.x - x, shape.y - y) < shape.size) {
                shapes.splice(i, 1);
                break;
            } else if (shape.type === 'square' && x > shape.x && x < shape.x + shape.size && y > shape.y && y < shape.y + shape.size) {
                shapes.splice(i, 1);
                break;
            } else if (shape.type === 'triangle') {
                const area = (shape.size * shape.size) / 2;
                const area1 = Math.abs((shape.x * (shape.y - y) + x * (y - shape.y) + shape.x * (shape.y - y)) / 2.0);
                const area2 = Math.abs((shape.x * (shape.y - y) + x * (shape.y - y) + shape.x * (shape.y - y)) / 2.0);
                const area3 = Math.abs((shape.x * (shape.y - y) + x * (shape.y - y) + shape.x * (shape.y - y)) / 2.0);
                if (area === area1 + area2 + area3) {
                    shapes.splice(i, 1);
                    break;
                }
            }
        }
    });

    window.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        shapes.forEach((shape) => {
            const dx = shape.x - mouseX;
            const dy = shape.y - mouseY;
            const distance = Math.hypot(dx, dy);
            const angle = Math.atan2(dy, dx);

            if (distance < 200) {
                if (Math.random() > 0.5) {
                    // Shape tries to escape the pointer
                    shape.x += Math.cos(angle) * 20;
                    shape.y += Math.sin(angle) * 20;
                } else {
                    // Shape tries to follow the pointer
                    shape.x -= Math.cos(angle) * 20;
                    shape.y -= Math.sin(angle) * 20;
                }

                // Ensure shapes stay within canvas bounds
                shape.x = Math.max(0, Math.min(canvas.width, shape.x));
                shape.y = Math.max(0, Math.min(canvas.height, shape.y));
            }
        });
    });

    const colors = ['#FF000020', '#00FF0020', '#0000FF20', '#FFFF0020', '#FF00FF20', '#00FFFF20'];

    const shapes = [];
    const maxShapes = 30;
    const maxShapeSize = (window.innerWidth / 5) < 100 ? 100 : window.innerWidth / 5;

    function drawCircle(x, y, radius, color) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    }

    function drawSquare(x, y, size, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, size, size);
    }

    function drawTriangle(x, y, size, color) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size / 2, y - size);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }

    function createShape() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * maxShapeSize;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shapeType = Math.floor(Math.random() * 3);

        if (shapeType === 0) {
            drawCircle(x, y, size / 2, color);
            shapes.push({ type: 'circle', x, y, size: size / 2, color });
        } else if (shapeType === 1) {
            drawSquare(x, y, size, color);
            shapes.push({ type: 'square', x, y, size, color });
        } else {
            drawTriangle(x, y, size, color);
            shapes.push({ type: 'triangle', x, y, size, color });
        }
    }

    function updateShapes() {
        shapes.forEach((shape) => {
            shape.x += (Math.random() - 0.5) * 2;
            shape.y += (Math.random() - 0.5) * 2;

            if (shape.type === 'circle') {
                drawCircle(shape.x, shape.y, shape.size, shape.color);
            } else if (shape.type === 'square') {
                drawSquare(shape.x, shape.y, shape.size, shape.color);
            } else {
                drawTriangle(shape.x, shape.y, shape.size, shape.color);
            }
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (shapes.length < maxShapes && Math.random() > 0.95) {
            createShape();
        }
        updateShapes();
        requestAnimationFrame(animate);
    }

    animate();

}
