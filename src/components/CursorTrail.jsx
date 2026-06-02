import React, { useEffect, useRef } from "react";

const CursorTrail = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, isHovering: false });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Handle high DPI screens
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse position
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // Check if hovering over clickable items to boost the effect
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        mouseRef.current.isHovering = true;
      } else {
        mouseRef.current.isHovering = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Particle class helper
    class Particle {
      constructor(x, y, isHovering) {
        this.x = x;
        this.y = y;
        
        // Random velocity for natural drift
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (isHovering ? 2.5 : 1.2) + 0.3;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        // Size and life
        this.size = Math.random() * (isHovering ? 5 : 3.5) + 1.5;
        this.maxLife = Math.random() * 40 + (isHovering ? 50 : 35);
        this.life = this.maxLife;
        
        // Gorgeous gradient colors matching portfolio vibe
        // Purple theme (#915EFF) to Cyan/Blue theme
        const colorScheme = Math.random();
        if (colorScheme < 0.4) {
          this.color = { r: 145, g: 94, b: 255 }; // Purple #915EFF
        } else if (colorScheme < 0.7) {
          this.color = { r: 0, g: 210, b: 255 }; // Cyan
        } else {
          this.color = { r: 168, g: 85, b: 247 }; // Violet
        }
      }

      update(mouseX, mouseY) {
        // Subtle magnetic pull toward mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 10) {
          this.vx += (dx / dist) * 0.04;
          this.vy += (dy / dist) * 0.04;
        }

        // Apply friction
        this.vx *= 0.96;
        this.vy *= 0.96;

        this.x += this.vx;
        this.y += this.vy;
        this.life--;
      }

      draw() {
        const progress = this.life / this.maxLife;
        const alpha = progress * 0.8;
        const currentSize = this.size * progress;

        ctx.beginPath();
        // Create glowing radial gradient for each particle
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, currentSize * 2.5
        );
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`);
        gradient.addColorStop(0.4, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, currentSize * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const { x, y, lastX, lastY, isHovering } = mouseRef.current;

      // Spawn particles when mouse moves or is hovering
      const moved = Math.abs(x - lastX) > 0.5 || Math.abs(y - lastY) > 0.5;
      if (moved) {
        // Spawn more particles if hovering over a button
        const spawnCount = isHovering ? 3 : 1;
        for (let i = 0; i < spawnCount; i++) {
          // Add small offset to spawn positions for organic spread
          const offsetX = (Math.random() - 0.5) * 8;
          const offsetY = (Math.random() - 0.5) * 8;
          particlesRef.current.push(new Particle(x + offsetX, y + offsetY, isHovering));
        }
        
        // Damping last mouse position to prevent instant gaps
        mouseRef.current.lastX += (x - lastX) * 0.35;
        mouseRef.current.lastY += (y - lastY) * 0.35;
      } else {
        mouseRef.current.lastX = x;
        mouseRef.current.lastY = y;
        
        // Subtle ambient idle particles when hovering interactive elements
        if (isHovering && Math.random() < 0.15) {
          particlesRef.current.push(new Particle(x + (Math.random() - 0.5) * 15, y + (Math.random() - 0.5) * 15, isHovering));
        }
      }

      // Keep particles list small (performance limit)
      if (particlesRef.current.length > 120) {
        particlesRef.current.shift();
      }

      // Update and draw particles
      const activeParticles = [];
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        p.update(x, y);
        if (p.life > 0) {
          p.draw();
          activeParticles.push(p);
        }
      }
      particlesRef.current = activeParticles;

      // Draw constellation-style connecting lines (Premium WOW effect!)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect particles within a threshold distance
          const maxDist = isHovering ? 60 : 45;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18 * Math.min(p1.life / p1.maxLife, p2.life / p2.maxLife);
            
            ctx.beginPath();
            // Gradient line matching both points
            const lineGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            lineGrad.addColorStop(0, `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${alpha})`);
            lineGrad.addColorStop(1, `rgba(${p2.color.r}, ${p2.color.g}, ${p2.color.b}, ${alpha})`);
            
            ctx.strokeStyle = lineGrad;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] opacity-90"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default CursorTrail;
