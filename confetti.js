var myCanvas = document.createElement('canvas');
document.body.appendChild(myCanvas);

var myConfetti = confetti.create(myCanvas, { resize: true });

var end = Date.now() + (3 * 1000);

var colors = ['#bb0000', '#ffffff', '#333333'];

function subfetti() {
    confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
    });
    confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
    });

    if (Date.now() < end) {
        requestAnimationFrame(subfetti);
    }

    setTimeout(() => {
        confetti.reset();
    }, 7000);

};

