import React, { useEffect, useRef } from 'react';

const HexagonBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    // Initialize mouse far off-screen so no highlight appears initially
    let mouseX = -1000;
    let mouseY = -1000;

    const handleResize = () => {
      if (canvas.parentElement) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial resize to set dimensions
    handleResize();

    // Hexagon Grid Configuration
    const hexRadius = 25; 
    const hexWidth = Math.sqrt(3) * hexRadius;
    const hexHeight = 2 * hexRadius;
    const vertDist = hexHeight * 0.75; 

    const drawHexagon = (x: number, y: number, opacity: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        // Pointy topped hexagons
        const angle = Math.PI / 6 + (Math.PI / 3) * i;
        const hx = x + hexRadius * Math.cos(angle);
        const hy = y + hexRadius * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();

      // Color: Gold #D4AF37 (RGB: 212, 175, 55)
      
      // Calculate opacities based on proximity
      const baseStrokeAlpha = 0.04; // Very faint when inactive
      const maxStrokeAlpha = 0.6;
      const strokeAlpha = baseStrokeAlpha + (maxStrokeAlpha - baseStrokeAlpha) * opacity;
      
      ctx.strokeStyle = `rgba(212, 175, 55, ${strokeAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Fill only appears when hovering near
      if (opacity > 0.05) {
        const fillAlpha = opacity * 0.15; // Subtle fill
        ctx.fillStyle = `rgba(212, 175, 55, ${fillAlpha})`;
        ctx.fill();
      }
    };

    const animate = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate grid dimensions with some padding
      const cols = Math.ceil(canvas.width / hexWidth) + 2;
      const rows = Math.ceil(canvas.height / vertDist) + 2;

      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          let x = c * hexWidth;
          const y = r * vertDist;
          
          // Offset odd rows for honeycomb pattern
          if (r % 2 !== 0) {
            x += hexWidth / 2;
          }

          // Calculate distance to mouse
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Interaction radius
          const interactionRadius = 350;
          let opacity = 0;

          if (dist < interactionRadius) {
            // Smooth falloff
            opacity = 1 - (dist / interactionRadius);
            opacity = Math.pow(opacity, 2); // Non-linear for nicer glow center
          }

          drawHexagon(x, y, opacity);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default HexagonBackground;