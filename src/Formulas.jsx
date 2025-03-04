import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import ParticlesBackground from "./components/ParticlesBackground";

function Formulas() {
  // State for all formula input fields
  const [vSolar, setVSolar] = useState("");
  const [iSolar, setISolar] = useState("");
  const [pSolar, setPSolar] = useState("");

  const [pSolarEnergy, setPSolarEnergy] = useState("");
  const [hSolar, setHSolar] = useState("");
  const [eSolar, setESolar] = useState("");

  const [pPl, setPPl] = useState("");
  const [pIn, setPIn] = useState("");
  const [mpptEfficiency, setMpptEfficiency] = useState("");

  const [eResolved, setEResolved] = useState("");
  const [vSystem, setVSystem] = useState("");
  const [dnd, setDnd] = useState("");
  const [cBattery, setCBattery] = useState("");

  const [nTeg, setNTeg] = useState("");
  const [sTeg, setSTeg] = useState("");
  const [xtTeg, setXtTeg] = useState("");
  const [rTeg, setRTeg] = useState("");
  const [pTeg, setPTeg] = useState("");

  const [eTeg, setETeg] = useState("");
  const [eGrid, setEGrid] = useState("");
  const [eTotalInput, setETotalInput] = useState("");

  const [pAc, setPAc] = useState("");
  const [tAc, setTAc] = useState("");
  const [eAc, setEAc] = useState("");

  const [qCooling, setQCooling] = useState("");
  const [wInput, setWInput] = useState("");
  const [cop, setCop] = useState("");

  const [wTotal, setWTotal] = useState("");
  const [wGrid, setWGrid] = useState("");
  const [copEffective, setCopEffective] = useState("");

  // Calculation Functions
  const calculatePSolar = () => {
    const p = parseFloat(vSolar) * parseFloat(iSolar);
    setPSolar(isNaN(p) ? "" : p.toFixed(2));
  };

  const calculateESolar = () => {
    const e = parseFloat(pSolarEnergy) * parseFloat(hSolar);
    setESolar(isNaN(e) ? "" : e.toFixed(2));
  };

  const calculateMpptEfficiency = () => {
    const efficiency = (parseFloat(pPl) / parseFloat(pIn)) * 100;
    setMpptEfficiency(isNaN(efficiency) ? "" : efficiency.toFixed(2));
  };

  const calculateBatteryCapacity = () => {
    const capacity =
      (parseFloat(eResolved) / parseFloat(vSystem)) * (1 / parseFloat(dnd));
    setCBattery(isNaN(capacity) ? "" : capacity.toFixed(2));
  };

  const calculateTEGPower = () => {
    const power =
      parseFloat(nTeg) *
      ((parseFloat(sTeg) * parseFloat(xtTeg) ** 2) / parseFloat(rTeg));
    setPTeg(isNaN(power) ? "" : power.toFixed(2));
  };

  const calculateTotalEnergy = () => {
    const total = parseFloat(eSolar) + parseFloat(eTeg) + parseFloat(eGrid);
    setETotalInput(isNaN(total) ? "" : total.toFixed(2));
  };

  const calculateACEnergy = () => {
    const energy = parseFloat(pAc) * parseFloat(tAc);
    setEAc(isNaN(energy) ? "" : energy.toFixed(2));
  };

  const calculateCOP = () => {
    const copValue = parseFloat(qCooling) / parseFloat(wInput);
    setCop(isNaN(copValue) ? "" : copValue.toFixed(2));
  };

  const calculateGridPower = () => {
    const gridPower =
      parseFloat(wTotal) - (parseFloat(pSolar) + parseFloat(pTeg));
    setWGrid(isNaN(gridPower) ? "" : gridPower.toFixed(2));
  };

  const calculateEffectiveCOP = () => {
    const effectiveCop = parseFloat(qCooling) / parseFloat(wGrid);
    setCopEffective(isNaN(effectiveCop) ? "" : effectiveCop.toFixed(2));
  };

  return (
    <MathJaxContext>
      <ParticlesBackground />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Energy Formulas</h1>
        </div>

        <div style={styles.content}>
          <div style={styles.gridContainer}>
            <FormulaSection
              title="Solar Power Output"
              formula={"P_{solar} = V_{solar} \\times I_{solar}"}
              inputs={[
                { label: "V_solar (V)", value: vSolar, setValue: setVSolar },
                { label: "I_solar (A)", value: iSolar, setValue: setISolar },
              ]}
              calculate={calculatePSolar}
              resultLabel="P_solar (W)"
              result={pSolar}
              color={styles.colors.solar}
            />

            <FormulaSection
              title="Solar Energy per Day"
              formula={"E_{solar} = P_{solar} \\times H"}
              inputs={[
                {
                  label: "P_solar (W)",
                  value: pSolarEnergy,
                  setValue: setPSolarEnergy,
                },
                { label: "H_solar (hrs)", value: hSolar, setValue: setHSolar },
              ]}
              calculate={calculateESolar}
              resultLabel="E_solar (Wh)"
              result={eSolar}
              color={styles.colors.solar}
            />

            <FormulaSection
              title="MPPT Efficiency"
              formula={
                "\\eta_{MPPT} = \\left( \\frac{P_{out}}{P_{in}} \\right) \\times 100"
              }
              inputs={[
                { label: "P_out (W)", value: pPl, setValue: setPPl },
                { label: "P_in (W)", value: pIn, setValue: setPIn },
              ]}
              calculate={calculateMpptEfficiency}
              resultLabel="MPPT Efficiency (%)"
              result={mpptEfficiency}
              color={styles.colors.solar}
            />

            <FormulaSection
              title="Battery Capacity (Ah)"
              formula={
                "C_{battery} = \\frac{E_{Required}}{V_{system}} \\times \\frac{1}{DoD}"
              }
              inputs={[
                {
                  label: "E_Required (Wh)",
                  value: eResolved,
                  setValue: setEResolved,
                },
                { label: "V_system (V)", value: vSystem, setValue: setVSystem },
                { label: "DoD (0-1)", value: dnd, setValue: setDnd },
              ]}
              calculate={calculateBatteryCapacity}
              resultLabel="C_battery (Ah)"
              result={cBattery}
              color={styles.colors.battery}
            />

            <FormulaSection
              title="TEG Power Output"
              formula={"P_{TEG} = n \\times \\frac{(S \\cdot \\Delta T)^2}{R}"}
              inputs={[
                { label: "n (units)", value: nTeg, setValue: setNTeg },
                { label: "S (V/K)", value: sTeg, setValue: setSTeg },
                { label: "ΔT (K)", value: xtTeg, setValue: setXtTeg },
                { label: "R (Ω)", value: rTeg, setValue: setRTeg },
              ]}
              calculate={calculateTEGPower}
              resultLabel="P_TEG (W)"
              result={pTeg}
              color={styles.colors.teg}
            />

            <FormulaSection
              title="Total Input Energy"
              formula={"E_{total\\_input} = E_{solar} + E_{TEG} + E_{grid}"}
              inputs={[
                { label: "E_solar (Wh)", value: eSolar, setValue: setESolar },
                { label: "E_TEG (Wh)", value: eTeg, setValue: setETeg },
                { label: "E_grid (Wh)", value: eGrid, setValue: setEGrid },
              ]}
              calculate={calculateTotalEnergy}
              resultLabel="E_total_input (Wh)"
              result={eTotalInput}
              color={styles.colors.total}
            />

            <FormulaSection
              title="AC Energy Demand"
              formula={"E_{AC} = P_{AC} \\times t"}
              inputs={[
                { label: "P_AC (W)", value: pAc, setValue: setPAc },
                { label: "t (hrs)", value: tAc, setValue: setTAc },
              ]}
              calculate={calculateACEnergy}
              resultLabel="E_AC (Wh)"
              result={eAc}
              color={styles.colors.ac}
            />

            <FormulaSection
              title="AC COP"
              formula={"COP = \\frac{Q_{cooling}}{W_{input}}"}
              inputs={[
                {
                  label: "Q_cooling (W)",
                  value: qCooling,
                  setValue: setQCooling,
                },
                { label: "W_input (W)", value: wInput, setValue: setWInput },
              ]}
              calculate={calculateCOP}
              resultLabel="COP"
              result={cop}
              color={styles.colors.ac}
            />

            <FormulaSection
              title="Hybrid Grid Power"
              formula={"W_{grid} = W_{total} - (P_{solar} + P_{TEG})"}
              inputs={[
                { label: "W_total (W)", value: wTotal, setValue: setWTotal },
                { label: "P_solar (W)", value: pSolar, setValue: setPSolar },
                { label: "P_TEG (W)", value: pTeg, setValue: setPTeg },
              ]}
              calculate={calculateGridPower}
              resultLabel="W_grid (W)"
              result={wGrid}
              color={styles.colors.grid}
            />

            <FormulaSection
              title="Effective Hybrid COP"
              formula={"COP_{effective} = \\frac{Q_{cooling}}{W_{grid}}"}
              inputs={[
                {
                  label: "Q_cooling (W)",
                  value: qCooling,
                  setValue: setQCooling,
                },
                { label: "W_grid (W)", value: wGrid, setValue: setWGrid },
              ]}
              calculate={calculateEffectiveCOP}
              resultLabel="COP_effective"
              result={copEffective}
              color={styles.colors.effective}
            />
          </div>

          <Link to="/" style={styles.link}>
            <button style={styles.navButton}>
              <span style={styles.navButtonIcon}>←</span> Back to Home
            </button>
          </Link>
        </div>
      </div>
    </MathJaxContext>
  );
}

// Reusable Component for Each Formula Section
const FormulaSection = ({
  title,
  formula,
  inputs,
  calculate,
  resultLabel,
  result,
  color,
}) => (
  <div style={{ ...styles.formulaSection, borderTop: `4px solid ${color}` }}>
    <h2 style={styles.sectionTitle}>{title}</h2>
    <div style={styles.formulaContainer}>
      <MathJax style={styles.formula}>{"\\(" + formula + "\\)"}</MathJax>
    </div>
    <div style={styles.inputsContainer}>
      {inputs.map((input, index) => (
        <label key={index} style={styles.label}>
          {input.label}:
          <input
            type="number"
            value={input.value}
            onChange={(e) => input.setValue(e.target.value)}
            style={styles.input}
            placeholder={`Enter ${input.label}`}
          />
        </label>
      ))}
    </div>
    <button
      onClick={calculate}
      style={{ ...styles.calcButton, backgroundColor: color }}
    >
      Calculate
    </button>
    <div style={styles.resultContainer}>
      <p style={styles.resultLabel}>{resultLabel}</p>
      <p style={styles.resultValue}>{result || "—"}</p>
    </div>
  </div>
);

// Color theme
const colors = {
  background: "#121212",
  cardBg: "#1E1E1E",
  text: "#E0E0E0",
  title: "#FFFFFF",
  solar: "#FFC107", // Yellow for solar
  teg: "#4CAF50", // Green for TEG
  grid: "#2196F3", // Blue for grid
  battery: "#9C27B0", // Purple for battery
  ac: "#F44336", // Red for AC
  total: "#FF9800", // Orange for total energy
  effective: "#009688", // Teal for effective values
  buttonBg: "#2D2D2D",
  buttonHover: "#3D3D3D",
  buttonText: "#FFFFFF",
};

const styles = {
  colors,
  container: {
    minHeight: "100vh",
    backgroundColor: colors.background,
    color: colors.text,
    fontFamily: "'Roboto', 'Helvetica Neue', sans-serif",
    overflow: "auto", // Allow scrolling
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  },
  // Add to all scrollable elements in your existing styles
  header: {
    padding: "30px 0 15px 0",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "2.5rem",
    margin: 0,
    color: colors.title,
    fontWeight: "600",
  },
  content: {
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "25px",
    marginBottom: "40px",
  },
  formulaSection: {
    backgroundColor: colors.cardBg,
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    height: "90%",
  },
  sectionTitle: {
    fontSize: "1.3rem",
    marginTop: 0,
    marginBottom: "15px",
    color: colors.title,
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    paddingBottom: "10px",
  },
  formulaContainer: {
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "15px",
    minHeight: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formula: {
    fontSize: "1.2rem",
    color: colors.title,
  },
  inputsContainer: {
    flex: 1,
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "12px",
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.7)",
  },
  input: {
    display: "block",
    width: "90%",
    padding: "8px 12px",
    marginTop: "4px",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "4px",
    color: colors.text,
    fontSize: "1rem",
  },
  calcButton: {
    padding: "10px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    marginBottom: "15px",
    transition: "all 0.2s ease",
  },
  resultContainer: {
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: "12px",
    borderRadius: "6px",
    textAlign: "center",
  },
  resultLabel: {
    fontSize: "0.9rem",
    marginBottom: "5px",
    color: "rgba(255,255,255,0.7)",
    margin: 0,
  },
  resultValue: {
    fontSize: "1.5rem",
    fontWeight: "600",
    margin: "5px 0 0 0",
    color: colors.title,
  },
  link: {
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
  },
  navButton: {
    padding: "12px 25px",
    fontSize: "1.1rem",
    backgroundColor: colors.buttonBg,
    color: colors.buttonText,
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  navButtonIcon: {
    fontSize: "1.2rem",
  },
};

export default Formulas;
