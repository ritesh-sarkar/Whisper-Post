'use client';

import { useEffect, useRef } from 'react';

const PALETTE = [
  [124, 58, 237],
  [124, 58, 237],
  [6, 182, 212],
  [6, 182, 212],
  [236, 72, 153],
  [160, 100, 255],
];

function rand(a, b) {
  return a + Math.random() * (b - a);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

class Particle {
  constructor(anywhere, W, H) {
    this.W = W;
    this.H = H;
    this.init(anywhere);
  }

  init(anywhere) {
    this.x = rand(0, this.W);

    // Start slightly below screen for smooth rise
    this.y = anywhere ? rand(0, this.H) : this.H + rand(20, 100);

    this.r = rand(0.6, 2.2);

    this.vx = rand(-0.1, 0.1);

    // 🔥 Stronger upward movement
    this.vy = rand(-0.6, -0.25);

    this.c = pick(PALETTE);

    this.baseA = rand(0.25, 0.75);
    this.a = this.baseA;

    this.ph = rand(0, Math.PI * 2);
    this.ps = rand(0.006, 0.02);

    this.wobble = rand(0.0003, 0.0007);
    this.wobbleOff = rand(0, Math.PI * 2);

    this.life = anywhere ? rand(0, 800) : 0;

    // 🔥 Longer lifespan
    this.maxLife = rand(900, 1600);
  }

  update(t, W, H) {
    this.W = W;
    this.H = H;

    this.x += this.vx + Math.sin(t * this.wobble + this.wobbleOff) * 0.18;
    this.y += this.vy;

    this.ph += this.ps;
    this.a = this.baseA * (0.7 + 0.3 * Math.sin(this.ph));

    this.life++;

    // 🔥 Allow particles to go much higher before reset
    if (this.life > this.maxLife || this.y < -H * 0.25) {
      this.init(false);
    }
  }

  draw(ctx) {
    const [r, g, b] = this.c;

    const glow = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.r * 5
    );

    glow.addColorStop(0, `rgba(${r},${g},${b},${this.a})`);
    glow.addColorStop(0.3, `rgba(${r},${g},${b},${this.a * 0.4})`);
    glow.addColorStop(1, `rgba(${r},${g},${b},0)`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * 5, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, this.a * 2)})`;
    ctx.fill();
  }
}

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W;
    let H;
    let animationFrameId;

    function resize() {
      W = canvas.width = container.clientWidth;
      H = canvas.height = container.clientHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    const COUNT = 90;
    const particles = Array.from(
      { length: COUNT },
      () => new Particle(true, W, H)
    );

    function drawConnections() {
      const D = 75;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < D) {
            const [r, g, bl] = a.c;
            const alpha = (1 - d / D) * 0.07;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha})`;
            ctx.lineWidth = (1 - d / D) * 0.7;
            ctx.stroke();
          }
        }
      }
    }

    function drawFog() {
      const fogPoints = [
        { x: 0.2, y: 0.3, c: [124, 58, 237], a: 0.04 },
        { x: 0.75, y: 0.6, c: [6, 182, 212], a: 0.035 },
        { x: 0.5, y: 0.85, c: [236, 72, 153], a: 0.025 },
      ];

      for (const f of fogPoints) {
        const g = ctx.createRadialGradient(
          f.x * W,
          f.y * H,
          0,
          f.x * W,
          f.y * H,
          W * 0.35
        );

        const [r, gv, b] = f.c;

        g.addColorStop(0, `rgba(${r},${gv},${b},${f.a})`);
        g.addColorStop(1, `rgba(${r},${gv},${b},0)`);

        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }
    }

    let t = 0;

    function loop() {
      t++;

      ctx.fillStyle = '#030308';
      ctx.fillRect(0, 0, W, H);

      drawFog();
      drawConnections();

      for (const p of particles) {
        p.update(t, W, H);
        p.draw(ctx);
      }

      const vg = ctx.createRadialGradient(
        W / 2,
        H / 2,
        H * 0.1,
        W / 2,
        H / 2,
        H * 0.9
      );

      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(0,0,0,0.55)');

      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      animationFrameId = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden flex-1 pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-none"
      />
    </div>
  );
}