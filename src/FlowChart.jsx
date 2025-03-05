import React from "react";
import { useNavigate } from "react-router-dom";
import ParticlesBackground from "./components/ParticlesBackground"; // No import needed for files in public directory

function FlowChart() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <ParticlesBackground />
      <button onClick={goBack} style={styles.backButton}>
        <span style={styles.backArrow}>&#8592;</span> Back
      </button>

      <div style={styles.header}>
        <h1 style={styles.title}>AC MODEL</h1>
        <p style={styles.subtitle}>Flow Chart Visualization</p>
      </div>

      <div style={styles.chartWrapper}>
        <div style={styles.chartContainer}>
          <div style={styles.chartHeader}>
            <div style={styles.badge}>Flowchart</div>
          </div>

          <div style={styles.imageContainer}>
            <img
              src="/Project/assets/flowchart.png"
              alt="Flow Chart"
              style={styles.chartImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #121212 0%, #1E1E1E 100%)",
    padding: "20px",
    color: "#FFFFFF",
    position: "relative",
    overflow: "hidden", // Hide outer scrollbar
  },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "rgba(106, 17, 203, 0.2)",
    color: "#FFFFFF",
    border: "1px solid rgba(179, 136, 255, 0.3)",
    borderRadius: "8px",
    padding: "10px 15px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    outline: "none",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  },
  backArrow: {
    marginRight: "8px",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    marginTop: "50px",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "700",
    margin: "0 0 10px 0",
    background: "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#B0B0B0",
    fontWeight: "300",
    marginTop: "0",
  },
  chartWrapper: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
  },
  chartContainer: {
    backgroundColor: "rgba(30, 30, 30, 0.8)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "20px",
    boxShadow:
      "0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(106, 17, 203, 0.2)",
    width: "100%",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },
  chartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  badge: {
    backgroundColor: "rgba(106, 17, 203, 0.2)",
    borderRadius: "50px",
    padding: "5px 15px",
    fontSize: "0.8rem",
    fontWeight: "600",
    color: "#b388ff",
    border: "1px solid rgba(179, 136, 255, 0.3)",
  },
  imageContainer: {
    overflow: "auto", // Allows scrolling but scrollbar will be hidden by global style
    msOverflowStyle: "none", // Hide scrollbar in IE/Edge
    scrollbarWidth: "none", // Hide scrollbar in Firefox
    borderRadius: "12px",
    backgroundColor: "#252525",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  chartImage: {
    maxWidth: "100%",
    maxHeight: "60vh",
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
  },
};

export default FlowChart;
