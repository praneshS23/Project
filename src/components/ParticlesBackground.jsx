import React, { useEffect } from 'react';

const ParticlesBackground = () => {
  useEffect(() => {
    // Load particles.js script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.async = true;
    document.body.appendChild(script);

    // Initialize particles once the script is loaded
    script.onload = () => {
      window.particlesJS('particles-js', {
        particles: {
          number: {
            value: 100, // Reduced number for better performance
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#ffffff'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            }
          },
          opacity: {
            value: 0.3, // Reduced opacity to be less intrusive
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 2, // Smaller particles
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#404080', // Slightly blue-tinted lines
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 2, // Slower movement
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.5
              }
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      });
    };

    // Remove stats.js - we don't need this
    
    return () => {
      document.body.removeChild(script);
      // Clean up particles
      if (window.pJSDom && window.pJSDom.length > 0) {
        const canvas = document.querySelector('#particles-js canvas');
        if (canvas) {
          canvas.remove();
        }
      }
    };
  }, []);

  return (
    <>
      <div id="particles-js" style={styles.particlesContainer}></div>
      <style>
        {`
          #particles-js {
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: transparent;
            z-index: 1;
            pointer-events: none;
          }
        `}
      </style>
    </>
  );
};

const styles = {
  particlesContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    pointerEvents: 'none', // Allow interaction with elements behind the particles
  }
};

export default ParticlesBackground;