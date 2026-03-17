"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const ROUND_COUNT = 20;
const RESPONSE_TIME = 40;
const MAX_DEGREES = 30;
const REPLAY_IMAGE_DURATION = 1000;
const REPLAY_PAIR_REPETITIONS = 5;

const mockRounds = [
  {
    id: 1,
    set1: "/imagenes/ronda-01/set1.png",
    set2: "/imagenes/ronda-01/set2.png",
    set3: "/imagenes/ronda-01/set3.png",
    set4: "/imagenes/ronda-01/set4.png",
    correctDirection: "derecha",
    correctDegrees: 14,
  },
  {
    id: 2,
    set1: "/imagenes/ronda-02/set1.png",
    set2: "/imagenes/ronda-02/set2.png",
    set3: "/imagenes/ronda-02/set3.png",
    set4: "/imagenes/ronda-02/set4.png",
    correctDirection: "derecha",
    correctDegrees: 14,
  },
  {
    id: 3,
    set1: "/imagenes/ronda-03/set1.png",
    set2: "/imagenes/ronda-03/set2.png",
    set3: "/imagenes/ronda-03/set3.png",
    set4: "/imagenes/ronda-03/set4.png",
    correctDirection: "derecha",
    correctDegrees: 26,
  },
  {
    id: 4,
    set1: "/imagenes/ronda-04/set1.png",
    set2: "/imagenes/ronda-04/set2.png",
    set3: "/imagenes/ronda-04/set3.png",
    set4: "/imagenes/ronda-04/set4.png",
    correctDirection: "izquierda",
    correctDegrees: 30,
  },
  {
    id: 5,
    set1: "/imagenes/ronda-05/set1.png",
    set2: "/imagenes/ronda-05/set2.png",
    set3: "/imagenes/ronda-05/set3.png",
    set4: "/imagenes/ronda-05/set4.png",
    correctDirection: "izquierda",
    correctDegrees: 7,
  },
  {
    id: 6,
    set1: "/imagenes/ronda-06/set1.png",
    set2: "/imagenes/ronda-06/set2.png",
    set3: "/imagenes/ronda-06/set3.png",
    set4: "/imagenes/ronda-06/set4.png",
    correctDirection: "izquierda",
    correctDegrees: 17,
  },
  {
    id: 7,
    set1: "/imagenes/ronda-07/set1.png",
    set2: "/imagenes/ronda-07/set2.png",
    set3: "/imagenes/ronda-07/set3.png",
    set4: "/imagenes/ronda-07/set4.png",
    correctDirection: "derecha",
    correctDegrees: 22,
  },
  {
    id: 8,
    set1: "/imagenes/ronda-08/set1.png",
    set2: "/imagenes/ronda-08/set2.png",
    set3: "/imagenes/ronda-08/set3.png",
    set4: "/imagenes/ronda-08/set4.png",
    correctDirection: "izquierda",
    correctDegrees: 24,
  },
  {
    id: 9,
    set1: "/imagenes/ronda-09/set1.png",
    set2: "/imagenes/ronda-09/set2.png",
    set3: "/imagenes/ronda-09/set3.png",
    set4: "/imagenes/ronda-09/set4.png",
    correctDirection: "izquierda",
    correctDegrees: 30,
  },
  {
    id: 10,
    set1: "/imagenes/ronda-10/set1.png",
    set2: "/imagenes/ronda-10/set2.png",
    set3: "/imagenes/ronda-10/set3.png",
    set4: "/imagenes/ronda-10/set4.png",
    correctDirection: "izquierda",
    correctDegrees: 17,
  },
  {
    id: 11,
    set1: "/imagenes/ronda-11/set1.png",
    set2: "/imagenes/ronda-11/set2.png",
    set3: "/imagenes/ronda-11/set3.png",
    set4: "/imagenes/ronda-11/set4.png",
    correctDirection: "derecha",
    correctDegrees: 21,
  },
  {
    id: 12,
    set1: "/imagenes/ronda-12/set1.png",
    set2: "/imagenes/ronda-12/set2.png",
    set3: "/imagenes/ronda-12/set3.png",
    set4: "/imagenes/ronda-12/set4.png",
    correctDirection: "derecha",
    correctDegrees: 13,
  },
  {
    id: 13,
    set1: "/imagenes/ronda-13/set1.png",
    set2: "/imagenes/ronda-13/set2.png",
    set3: "/imagenes/ronda-13/set3.png",
    set4: "/imagenes/ronda-13/set4.png",
    correctDirection: "izquierda",
    correctDegrees: 28,
  },
  {
    id: 14,
    set1: "/imagenes/ronda-14/set1.png",
    set2: "/imagenes/ronda-14/set2.png",
    set3: "/imagenes/ronda-14/set3.png",
    set4: "/imagenes/ronda-14/set4.png",
    correctDirection: "derecha",
    correctDegrees: 21,
  },
  {
    id: 15,
    set1: "/imagenes/ronda-15/set1.png",
    set2: "/imagenes/ronda-15/set2.png",
    set3: "/imagenes/ronda-15/set3.png",
    set4: "/imagenes/ronda-15/set4.png",
    correctDirection: "izquierda",
    correctDegrees: 16,
  },
  {
    id: 16,
    set1: "/imagenes/ronda-16/set1.png",
    set2: "/imagenes/ronda-16/set2.png",
    set3: "/imagenes/ronda-16/set3.png",
    set4: "/imagenes/ronda-16/set4.png",
    correctDirection: "derecha",
    correctDegrees: 27,
  },
  {
    id: 17,
    set1: "/imagenes/ronda-17/set1.png",
    set2: "/imagenes/ronda-17/set2.png",
    set3: "/imagenes/ronda-17/set3.png",
    set4: "/imagenes/ronda-17/set4.png",
    correctDirection: "derecha",
    correctDegrees: 11,
  },
  {
    id: 18,
    set1: "/imagenes/ronda-18/set1.png",
    set2: "/imagenes/ronda-18/set2.png",
    set3: "/imagenes/ronda-18/set3.png",
    set4: "/imagenes/ronda-18/set4.png",
    correctDirection: "izquierda",
    correctDegrees: 19,
  },
  {
    id: 19,
    set1: "/imagenes/ronda-19/set1.png",
    set2: "/imagenes/ronda-19/set2.png",
    set3: "/imagenes/ronda-19/set3.png",
    set4: "/imagenes/ronda-19/set4.png",
    correctDirection: "izquierda",
    correctDegrees: 25,
  },
  {
    id: 20,
    set1: "/imagenes/ronda-20/set1.png",
    set2: "/imagenes/ronda-20/set2.png",
    set3: "/imagenes/ronda-20/set3.png",
    set4: "/imagenes/ronda-20/set4.png",
    correctDirection: "derecha",
    correctDegrees: 21,
  },
];

const sequence = [
  { key: "set1", duration: 4000, label: "Set 1" },
  { key: "set2", duration: 1500, label: "Set 2" },
  { key: "set3", duration: 1500, label: "Set 3" },
  { key: "set4", duration: 4000, label: "Set 4" },
];

function shuffleArray(array) {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function calculatePoints(userDirection, userDegrees, correctDirection, correctDegrees) {
  if (!userDirection || userDegrees === "" || Number.isNaN(Number(userDegrees))) return 0;
  if (userDirection !== correctDirection) return 0;

  const diff = Math.abs(Number(userDegrees) - correctDegrees);
  if (diff === 0) return 5;
  if (diff >= 1 && diff <= 3) return 3;
  if (diff >= 4 && diff <= 5) return 1;
  return 0;
}

export default function Home() {
  const [screen, setScreen] = useState("inicio");
  const [rounds, setRounds] = useState([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [selectedDirection, setSelectedDirection] = useState("");
  const [typedDegrees, setTypedDegrees] = useState("");
  const [responseTimer, setResponseTimer] = useState(RESPONSE_TIME);
  const [score, setScore] = useState(0);
  const [roundPoints, setRoundPoints] = useState(0);
  const [history, setHistory] = useState([]);
  const [flashImage, setFlashImage] = useState("set1");

  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const responseIntervalRef = useRef(null);
  const imageSectionRef = useRef(null);

  const currentRound = rounds[currentRoundIndex];
  const isMobileViewport = typeof window !== "undefined" && window.innerWidth <= 768;

  const currentSequenceImage = useMemo(() => {
    if (!currentRound) return null;
    if (sequenceIndex < 0 || sequenceIndex >= sequence.length) return null;

    const key = sequence[sequenceIndex]?.key;
    return key ? currentRound[key] || null : null;
  }, [currentRound, sequenceIndex]);

  const clearAllTimers = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (responseIntervalRef.current) clearInterval(responseIntervalRef.current);
  };

  const scrollToImageSection = () => {
    setTimeout(() => {
      imageSectionRef.current?.scrollIntoView({
        behavior: isMobileViewport ? "smooth" : "auto",
        block: "center",
      });
    }, 50);
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  useEffect(() => {
    if (screen === "secuencia" || screen === "repeticion") {
      scrollToImageSection();
    }
  }, [screen, currentRoundIndex]);


  useEffect(() => {
    if (screen !== "secuencia" || !currentRound) return;

    if (sequenceIndex >= sequence.length) {
      setScreen("respuesta");
      setResponseTimer(RESPONSE_TIME);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setSequenceIndex((prev) => prev + 1);
    }, sequence[sequenceIndex].duration);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [screen, sequenceIndex, currentRound]);

  useEffect(() => {
    if (screen !== "respuesta") return;

    responseIntervalRef.current = setInterval(() => {
      setResponseTimer((prev) => {
        if (prev <= 1) {
          clearInterval(responseIntervalRef.current);
          submitAnswer(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (responseIntervalRef.current) clearInterval(responseIntervalRef.current);
    };
  }, [screen]);

  useEffect(() => {
    if (screen !== "repeticion" || !currentRound) return;

    let toggles = 0;
    const totalToggles = REPLAY_PAIR_REPETITIONS * 2 - 1;
    setFlashImage("set1");
    intervalRef.current = setInterval(() => {
      toggles += 1;
      setFlashImage((prev) => (prev === "set1" ? "set4" : "set1"));
      if (toggles >= totalToggles) {
        clearInterval(intervalRef.current);
      }
    }, REPLAY_IMAGE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [screen, currentRoundIndex, currentRound]);

  const startGame = () => {
    clearAllTimers();
    const selectedRounds = shuffleArray(mockRounds).slice(0, ROUND_COUNT);
    setRounds(selectedRounds);
    setCurrentRoundIndex(0);
    setSequenceIndex(0);
    setSelectedDirection("");
    setTypedDegrees("");
    setResponseTimer(RESPONSE_TIME);
    setScore(0);
    setRoundPoints(0);
    setHistory([]);
    setScreen("secuencia");
  };

  const submitAnswer = (automatic = false) => {
    if (!currentRound) return;
    clearAllTimers();

    const points = calculatePoints(
      automatic ? "" : selectedDirection,
      automatic ? "" : typedDegrees,
      currentRound.correctDirection,
      currentRound.correctDegrees
    );

    const entry = {
      roundNumber: currentRoundIndex + 1,
      userDirection: automatic ? "sin responder" : selectedDirection || "sin responder",
      userDegrees: automatic ? "-" : typedDegrees || "-",
      correctDirection: currentRound.correctDirection,
      correctDegrees: currentRound.correctDegrees,
      points,
    };

    setRoundPoints(points);
    setScore((prev) => prev + points);
    setHistory((prev) => [...prev, entry]);
    setScreen("resultado");
  };

  const startReplay = () => {
    setScreen("repeticion");
  };

  const goToNextRound = () => {
    const isLastRound = currentRoundIndex >= rounds.length - 1;
    if (isLastRound) {
      setScreen("final");
      return;
    }

    setCurrentRoundIndex((prev) => prev + 1);
    setSequenceIndex(0);
    setSelectedDirection("");
    setTypedDegrees("");
    setResponseTimer(RESPONSE_TIME);
    setRoundPoints(0);
    setScreen("secuencia");
  };

  const progressPercent = rounds.length
    ? Math.round(((currentRoundIndex + (screen === "final" ? 1 : 0)) / rounds.length) * 100)
    : 0;

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>Juego de borneos</h1>
            <p style={styles.subtitle}>Entrenamiento visual para interpretación de rotación del viento</p>
          </div>
          <div style={styles.badges}>
            <span style={styles.badge}>20 rondas</span>
            <span style={styles.badge}>Máximo 100 puntos</span>
          </div>
        </header>

        {screen !== "inicio" && rounds.length > 0 && (
          <section style={styles.panel}>
            <div style={styles.rowBetween}>
              <span>Ronda {Math.min(currentRoundIndex + 1, rounds.length)} de {rounds.length}</span>
              <span>Puntaje: {score}</span>
            </div>
            <div style={styles.progressBarOuter}>
              <div style={{ ...styles.progressBarInner, width: `${progressPercent}%` }} />
            </div>
          </section>
        )}

        {screen === "inicio" && (
          <section ref={imageSectionRef} style={styles.card}>
            <h2 style={styles.sectionTitle}>Reglas</h2>
            <p style={styles.text}>
              En cada ronda se mostrará una secuencia de cuatro imágenes. La primera simula una vista de regata, las dos siguientes son vistas del propio barco y la última es una vista igual que la primera, pero luego de que el viento haya rotado. Deberás indicar hacia qué lado borneó y cuántos grados.
            </p>
            <div style={styles.scoreSpacer}></div>
            <div style={styles.scoreSpacer}></div>
            <p style={styles.text}>
              Puntaje: 5 puntos acierto exacto, 3 puntos errando por 1-3 grados, 1 punto errando por 4-5 grados, siempre que la dirección sea correcta.
            </p>
            <div style={styles.scoreSpacer}></div>
            <div style={styles.scoreSpacer}></div>
            <button style={styles.primaryButton} onClick={startGame}>Comenzar</button>
          </section>
        )}

        {screen === "secuencia" && currentRound && currentSequenceImage && (
          <section ref={imageSectionRef} style={styles.card}>
            <div style={styles.imageWrap}>
              <img
                src={currentSequenceImage}
                alt={sequence[sequenceIndex]?.label || "Secuencia"}
                style={styles.image}
              />
              <div style={styles.imageOverlay}>
                <span>{sequence[sequenceIndex]?.label}</span>
                <span>Observá con atención</span>
              </div>
            </div>
          </section>
        )}

        {screen === "respuesta" && currentRound && (
          <section style={styles.card}>
            <div style={styles.rowBetween}>
              <h2 style={styles.sectionTitle}>Ingresá tu respuesta</h2>
              <span style={styles.badge}>{responseTimer}s</span>
            </div>

            <div style={styles.fieldBlock}>
              <p style={styles.label}>Dirección de la rotación</p>
              <div style={styles.buttonGrid}>
                <button
                  style={selectedDirection === "izquierda" ? styles.primaryButton : styles.secondaryButton}
                  onClick={() => setSelectedDirection("izquierda")}
                >
                  Izquierda
                </button>
                <button
                  style={selectedDirection === "derecha" ? styles.primaryButton : styles.secondaryButton}
                  onClick={() => setSelectedDirection("derecha")}
                >
                  Derecha
                </button>
              </div>
            </div>

            <div style={styles.fieldBlock}>
              <p style={styles.label}>¿Cuántos grados rotó?</p>
              <div style={styles.degreePicker}>
                <div style={styles.degreeValueBox}>
                  <span style={styles.degreeValueLabel}>Valor seleccionado</span>
                  <span style={styles.degreeValue}>
                    {typedDegrees === "" ? "—" : `${typedDegrees}°`}
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max={MAX_DEGREES}
                  step="1"
                  value={typedDegrees === "" ? 0 : Number(typedDegrees)}
                  onChange={(e) => setTypedDegrees(e.target.value)}
                  style={styles.rangeInput}
                />

                <div style={styles.rangeLabels}>
                  <span>0°</span>
                  <span>5°</span>
                  <span>10°</span>
                  <span>15°</span>
                  <span>20°</span>
                  <span>25°</span>
                  <span>30°</span>
                </div>

                <div style={styles.degreeButtonsGrid}>
                  {[0, 5, 10, 15, 20, 25, 30].map((degree) => (
                    <button
                      key={degree}
                      type="button"
                      style={Number(typedDegrees) === degree ? styles.primaryButton : styles.secondaryButton}
                      onClick={() => setTypedDegrees(String(degree))}
                    >
                      {degree}°
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button style={styles.primaryButton} onClick={() => submitAnswer(false)}>
              Confirmar respuesta
            </button>
          </section>
        )}

        {screen === "resultado" && currentRound && history.length > 0 && (
          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>Resultado de la ronda</h2>

            <div style={styles.summaryGrid}>
              <div style={styles.smallCard}>
                <p style={styles.smallLabel}>Tu respuesta</p>
                <p style={styles.bigText}>{history[history.length - 1].userDirection}</p>
                <p style={styles.responseDegree}>{history[history.length - 1].userDegrees}°</p>
              </div>
              <div style={styles.smallCard}>
                <p style={styles.smallLabel}>Respuesta correcta</p>
                <p style={styles.bigText}>{currentRound.correctDirection}</p>
                <p style={styles.responseDegree}>{currentRound.correctDegrees}°</p>
              </div>
              <div style={styles.smallCard}>
                <p style={styles.smallLabel}>Puntos en la ronda</p>
                <p style={styles.bigNumber}>{roundPoints}</p>
              </div>
              <div style={styles.smallCard}>
                <p style={styles.smallLabel}>Puntaje acumulado</p>
                <p style={styles.bigNumber}>{score}</p>
              </div>
            </div>

            <div style={styles.buttonRow}>
              <button style={styles.primaryButton} onClick={startReplay}>Ver repetición rápida</button>
              <button style={styles.secondaryButton} onClick={goToNextRound}>Siguiente ronda</button>
            </div>
          </section>
        )}

        {screen === "repeticion" && currentRound && (
          <section ref={imageSectionRef} style={styles.card}>
            <div style={styles.imageWrap}>
              <img
                src={currentRound[flashImage]}
                alt={flashImage}
                style={styles.image}
              />
              <div style={styles.imageOverlay}>
                <span>Repetición comparativa</span>
                <span>{flashImage === "set1" ? "Set 1" : "Set 4"}</span>
              </div>
            </div>
            <div style={styles.buttonRow}>
              <button style={styles.secondaryButton} onClick={() => setScreen("resultado")}>Volver al resultado</button>
            </div>
          </section>
        )}

        {screen === "final" && (
          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>Juego terminado</h2>
            <div style={styles.summaryGrid}>
              <div style={styles.smallCard}>
                <p style={styles.smallLabel}>Puntaje total</p>
                <p style={styles.bigNumber}>{score}</p>
              </div>
              <div style={styles.smallCard}>
                <p style={styles.smallLabel}>Exactas</p>
                <p style={styles.bigNumber}>{history.filter((h) => h.points === 5).length}</p>
              </div>
              <div style={styles.smallCard}>
                <p style={styles.smallLabel}>Aproximadas</p>
                <p style={styles.bigNumber}>{history.filter((h) => h.points === 3 || h.points === 1).length}</p>
              </div>
              <div style={styles.smallCard}>
                <p style={styles.smallLabel}>Sin puntos</p>
                <p style={styles.bigNumber}>{history.filter((h) => h.points === 0).length}</p>
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <h3 style={styles.label}>Historial de rondas</h3>
              <div style={styles.historyList}>
                {history.map((item) => (
                  <div key={item.roundNumber} style={styles.historyItem}>
                    <strong>Ronda {item.roundNumber}</strong> — Tu respuesta: {item.userDirection} {item.userDegrees}° | Correcta: {item.correctDirection} {item.correctDegrees}° | Puntos: {item.points}
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.buttonRow}>
              <button style={styles.primaryButton} onClick={startGame}>Jugar de nuevo</button>
              <button style={styles.secondaryButton} onClick={() => setScreen("inicio")}>Volver al inicio</button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #dbe7f3 0%, #eef4fa 100%)",
    padding: "16px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gap: "16px",
  },
  heroCard: {
    background: "linear-gradient(135deg, #ffffff 0%, #e8eefc 100%)",
    borderRadius: "28px",
    padding: "28px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
    border: "1px solid rgba(148, 163, 184, 0.25)",
    overflow: "hidden",
    position: "relative",
  },
  heroTop: {
    display: "grid",
    gap: "12px",
    maxWidth: "760px",
  },
  heroBadge: {
    display: "inline-block",
    width: "fit-content",
    background: "#0f172a",
    color: "#ffffff",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "bold",
    letterSpacing: "0.02em",
  },
  heroTitle: {
    margin: 0,
    fontSize: "40px",
    lineHeight: 1.08,
    color: "#020617",
  },
  heroText: {
    margin: 0,
    color: "#1e293b",
    lineHeight: 1.7,
    fontSize: "18px",
    maxWidth: "720px",
  },
  heroInfoGrid: {
    marginTop: "24px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "16px",
  },
  heroInfoBox: {
    background: "rgba(255,255,255,0.72)",
    borderRadius: "20px",
    padding: "18px",
    boxShadow: "0 4px 16px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(148, 163, 184, 0.18)",
  },
  heroInfoTitle: {
    margin: "0 0 8px 0",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#020617",
  },
  heroSpacer: {
    height: "22px",
  },
  heroScoreText: {
    margin: 0,
    color: "#0f172a",
    lineHeight: 1.7,
    fontSize: "17px",
    fontWeight: "bold",
  },
  heroButtonRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "24px",
  },
  page: {
    minHeight: "100vh",
    background: "#e6eef6",
    padding: "16px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gap: "16px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    flexWrap: "wrap",
  },
  title: {
    fontSize: "32px",
    margin: 0,
    color: "#020617",
  },
  subtitle: {
    margin: "6px 0 0 0",
    color: "#1e293b",
  },
  badges: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  badge: {
    background: "#cbd5f5",
    color: "#020617",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  panel: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "16px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
  },
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    color: "#020617",
    fontWeight: "bold",
  },
  progressBarOuter: {
    marginTop: "12px",
    height: "10px",
    background: "#cbd5f5",
    borderRadius: "999px",
    overflow: "hidden",
  },
  progressBarInner: {
    height: "100%",
    background: "#020617",
  },
  card: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: "12px",
    fontSize: "28px",
    color: "#020617",
  },
  text: {
    color: "#020617",
    lineHeight: 1.6,
  },
  scoreSpacer: {
    height: "20px",
  },
  imageWrap: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    background: "#020617",
    borderRadius: "18px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 16px",
    color: "white",
    background: "linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0))",
    fontSize: "14px",
    fontWeight: "bold",
  },
  fieldBlock: {
    marginBottom: "24px",
  },
  label: {
    fontWeight: "bold",
    color: "#020617",
    marginBottom: "10px",
  },
  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
  },
  degreePicker: {
    display: "grid",
    gap: "14px",
  },
  degreeValueBox: {
    background: "#cbd5f5",
    borderRadius: "16px",
    padding: "14px 16px",
    display: "grid",
    gap: "4px",
  },
  degreeValueLabel: {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#334155",
  },
  degreeValue: {
    fontSize: "34px",
    fontWeight: "bold",
    color: "#020617",
    lineHeight: 1,
  },
  rangeInput: {
    width: "100%",
    cursor: "pointer",
    accentColor: "#020617",
  },
  rangeLabels: {
    display: "flex",
    justifyContent: "space-between",
    gap: "8px",
    color: "#334155",
    fontSize: "13px",
    fontWeight: "bold",
  },
  degreeButtonsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(72px, 1fr))",
    gap: "10px",
  },
  input: {
    width: "100%",
    height: "48px",
    padding: "0 14px",
    borderRadius: "14px",
    border: "1px solid #94a3b8",
    fontSize: "16px",
  },
  primaryButton: {
    background: "#020617",
    color: "white",
    border: "none",
    padding: "14px 18px",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  secondaryButton: {
    background: "#ffffff",
    color: "#020617",
    border: "2px solid #020617",
    padding: "14px 18px",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
  },
  smallCard: {
    background: "#cbd5f5",
    borderRadius: "16px",
    padding: "16px",
  },
  smallLabel: {
    margin: 0,
    color: "#020617",
    fontSize: "14px",
    fontWeight: "bold",
  },
  bigText: {
    fontSize: "22px",
    fontWeight: "bold",
    margin: "10px 0 4px 0",
    color: "#020617",
  },
  responseDegree: {
    margin: "4px 0 0 0",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#020617",
    lineHeight: 1.1,
  },
  bigNumber: {
    fontSize: "30px",
    fontWeight: "bold",
    margin: "10px 0 0 0",
    color: "#020617",
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  historyList: {
    display: "grid",
    gap: "10px",
    marginTop: "12px",
  },
  historyItem: {
    background: "#cbd5f5",
    padding: "12px 14px",
    borderRadius: "12px",
    color: "#020617",
    fontWeight: "500",
  },
};
