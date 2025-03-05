import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ParticlesBackground from "./components/ParticlesBackground";

function Home() {
  // Your existing state and refs remain the same
  const canvasRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const particles = useRef([]);
  const animationFrameId = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false);
  const textBounds = useRef({ x1: 0, y1: 0, x2: 0, y2: 0 });

  // Your Particle class remains the same
  class Particle {
    constructor(x, y) {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.dest = { x, y };
      this.origDest = { x, y }; // Store original destination for reference
      this.r = Math.random() * 2 + 1;
      this.vx = (Math.random() - 0.5) * 20;
      this.vy = (Math.random() - 0.5) * 20;
      this.accX = 0;
      this.accY = 0;
      this.friction = Math.random() * 0.05 + 0.85;
      this.wigglePhase = Math.random() * Math.PI * 2; // Random starting phase for wiggle
      this.wiggleSpeed = 0.1 + Math.random() * 0.05; // Randomize wiggle speed
      this.color = `rgba(${220 + Math.random() * 35}, ${
        220 + Math.random() * 35
      }, 255, ${0.8 + Math.random() * 0.2})`;
      this.interactRadius = 100;
    }

    render(ctx, mousePos, isHovering) {
      // Update wiggle phase
      this.wigglePhase += this.wiggleSpeed;

      // If hovering text, apply wiggle to destination
      if (isHovering) {
        const wiggleAmplitude = 8; // How far particles wiggle from original position
        const wiggleX = Math.sin(this.wigglePhase) * wiggleAmplitude;
        const wiggleY = Math.cos(this.wigglePhase * 1.5) * wiggleAmplitude;

        // Update destination with wiggle
        this.dest.x = this.origDest.x + wiggleX;
        this.dest.y = this.origDest.y + wiggleY;
      } else {
        // Reset to original destination when not hovering
        this.dest.x = this.origDest.x;
        this.dest.y = this.origDest.y;
      }

      // Apply acceleration toward destination
      this.accX = (this.dest.x - this.x) / 100;
      this.accY = (this.dest.y - this.y) / 100;

      // Mouse interaction - particles move away from cursor
      const dx = this.x - mousePos.x;
      const dy = this.y - mousePos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.interactRadius) {
        const angle = Math.atan2(dy, dx);
        const force =
          ((this.interactRadius - dist) / this.interactRadius) * 0.5;
        this.accX += Math.cos(angle) * force;
        this.accY += Math.sin(angle) * force;
      }

      // Apply physics
      this.vx += this.accX;
      this.vy += this.accY;
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.x += this.vx;
      this.y += this.vy;

      // Draw particle
      ctx.fillStyle = isHovering
        ? `rgba(${220 + Math.random() * 35}, ${
            220 + Math.random() * 35
          }, 255, ${0.9 + Math.random() * 0.1})`
        : this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
      ctx.fill();
    }
  }

  // First useEffect for canvas and particle animation remains the same
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let ww = (canvas.width = window.innerWidth);
    let wh = (canvas.height = window.innerHeight);

    // Calculate font size based on screen dimensions
    const fontSize = Math.min(ww / 15, wh / 8);
    const lineHeight = fontSize * 1.2;

    // Split text into three lines
    const lines = ["AI-POWERED", "DUAL ENERGY", "SMART AC"];

    // Set font and text parameters
    ctx.font = `bold ${fontSize}px 'Arial Black', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
    ctx.shadowBlur = 2;

    // Clear and draw text to get particle positions
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate text bounds for hover detection
    const textTop = wh / 2 - lineHeight;
    const textBottom = wh / 2 + lineHeight;
    const textWidth = Math.max(
      ...lines.map((line) => ctx.measureText(line).width)
    );
    const textLeft = ww / 2 - textWidth / 2;
    const textRight = ww / 2 + textWidth / 2;

    // Store text bounds with some padding
    textBounds.current = {
      x1: textLeft - fontSize * 0.5,
      y1: textTop - fontSize * 0.5,
      x2: textRight + fontSize * 0.5,
      y2: textBottom + fontSize * 0.5,
    };

    // Draw text
    lines.forEach((line, index) => {
      ctx.fillText(line, ww / 2, wh / 2 - lineHeight + index * lineHeight);
    });

    // Reset shadow for particles
    ctx.shadowBlur = 0;

    // Create particles from text pixels
    const data = ctx.getImageData(0, 0, ww, wh).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current = [];
    for (let i = 0; i < ww; i += Math.round(ww / 300)) {
      for (let j = 0; j < wh; j += Math.round(wh / 300)) {
        if (data[(i + j * ww) * 4 + 3] > 128) {
          particles.current.push(new Particle(i, j));
        }
      }
    }

    // Check if mouse is hovering over text area
    const checkHover = (mouseX, mouseY) => {
      const bounds = textBounds.current;
      const isHovering =
        mouseX >= bounds.x1 &&
        mouseX <= bounds.x2 &&
        mouseY >= bounds.y1 &&
        mouseY <= bounds.y2;

      setIsHoveringText(isHovering);
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, ww, wh);

      // Add subtle glow to particles
      ctx.shadowColor = "rgba(200, 220, 255, 0.3)";
      ctx.shadowBlur = isHoveringText ? 5 : 3; // More glow when hovering

      // Render particles with wiggle when hovering
      particles.current.forEach((particle) =>
        particle.render(ctx, mouse, isHoveringText)
      );

      animationFrameId.current = requestAnimationFrame(animate);
      ctx.shadowBlur = 0;
    };

    animate();
    setTimeout(() => setIsLoaded(true), 500);

    // Event listeners
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
      checkHover(e.clientX, e.clientY);
    };

    const handleResize = () => {
      ww = canvas.width = window.innerWidth;
      wh = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  // Second useEffect for button hover effects
  // Fixed the event handler cleanup issue
  useEffect(() => {
    if (isLoaded) {
      const buttons = document.querySelectorAll("button");
      const eventHandlers = new Map(); // Store references to event handlers

      buttons.forEach((button) => {
        // Create named functions for event handlers so we can remove them later
        const handleMouseOver = () => {
          button.style.backgroundColor = "rgba(60, 60, 80, 0.8)";
          button.style.transform = "translateY(-3px)";
          button.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.3)";
          const iconSpan = button.querySelector("span:last-child");
          if (iconSpan) iconSpan.style.transform = "translateX(3px)";
        };

        const handleMouseOut = () => {
          button.style.backgroundColor = "rgba(45, 45, 55, 0.7)";
          button.style.transform = "translateY(0)";
          button.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
          const iconSpan = button.querySelector("span:last-child");
          if (iconSpan) iconSpan.style.transform = "translateX(0)";
        };

        const handleMouseDown = () => {
          button.style.transform = "translateY(-1px)";
        };

        const handleMouseUp = () => {
          button.style.transform = "translateY(-3px)";
        };

        // Store handlers for cleanup
        eventHandlers.set(button, {
          over: handleMouseOver,
          out: handleMouseOut,
          down: handleMouseDown,
          up: handleMouseUp,
        });

        // Add event listeners
        button.addEventListener("mouseover", handleMouseOver);
        button.addEventListener("mouseout", handleMouseOut);
        button.addEventListener("mousedown", handleMouseDown);
        button.addEventListener("mouseup", handleMouseUp);
      });

      // Clean up function
      return () => {
        buttons.forEach((button) => {
          const handlers = eventHandlers.get(button);
          if (handlers) {
            button.removeEventListener("mouseover", handlers.over);
            button.removeEventListener("mouseout", handlers.out);
            button.removeEventListener("mousedown", handlers.down);
            button.removeEventListener("mouseup", handlers.up);
          }
        });
      };
    }
  }, [isLoaded]);

  return (
    <div style={styles.container}>
      {/* Add the particles.js background */}
      <ParticlesBackground />

      {/* Keep your existing canvas for text particles */}
      <canvas ref={canvasRef} style={styles.canvas} />

      {/* Logo and tagline */}
      <div style={styles.logoWrapper}>
        <div style={styles.logo}>
          SMART<span style={styles.logoBold}>AC</span>
        </div>
      </div>

      <div style={styles.taglineContainer}>
        <p style={styles.tagline}>Next-generation energy efficiency</p>
      </div>

      {/* Buttons */}
      <div
        style={{
          ...styles.buttonContainer,
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translate(-50%, 0)" : "translate(-50%, 20px)",
        }}
      >
        <Link to="/formulas" style={styles.link}>
          <button style={styles.button}>
            <span>Formulas</span>
            <span style={styles.buttonIcon}>→</span>
          </button>
        </Link>
        <Link to="/flowchart" style={styles.link}>
          <button style={styles.button}>
            <span>Workflow</span>
            <span style={styles.buttonIcon}>→</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    background: "linear-gradient(135deg, #0F0F1A 0%, #000000 100%)", // Darker gradient that fades to black
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10, // Set higher than particles-js to ensure text particles appear on top
  },
  // Rest of your styles remain the same
  logoWrapper: {
    position: "absolute",
    top: "30px",
    left: "40px",
    zIndex: 20, // Ensure logo is above both particle effects
  },
  // Other styles remain the same but ensure proper z-index values
  // to maintain the correct layering of elements
  logo: {
    fontSize: "1.5rem",
    fontWeight: 300,
    color: "#FFFFFF",
    letterSpacing: "2px",
  },
  logoBold: {
    fontWeight: 700,
    background: "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  taglineContainer: {
    position: "absolute",
    top: "30px",
    right: "40px",
    zIndex: 3,
  },
  tagline: {
    fontSize: "1.1rem",
    color: "#AAAAAA",
    fontWeight: 300,
    fontStyle: "italic",
    margin: 0,
  },
  buttonContainer: {
    position: "absolute",
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 20,
    display: "flex",
    gap: "20px",
    transition: "all 0.8s ease",
  },
  link: {
    textDecoration: "none",
  },
  button: {
    padding: "12px 25px",
    fontSize: "1.1rem",
    backgroundColor: "rgba(45, 45, 55, 0.7)",
    color: "#FFFFFF",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(5px)",
    overflow: "hidden",
    position: "relative",
    "&:hover": {
      backgroundColor: "rgba(60, 60, 80, 0.8)",
      transform: "translateY(-3px)",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
    },
    "&:active": {
      transform: "translateY(-1px)",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
      transform: "translateX(-100%)",
      transition: "transform 0.6s ease",
    },
    "&:hover::before": {
      transform: "translateX(100%)",
    },
  },
  buttonIcon: {
    fontSize: "1.2rem",
    transition: "transform 0.3s ease",
  },
};

export default Home;
