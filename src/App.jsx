import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABLE_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const QUESTIONS_PER_GAME = 10;

const CARD_REWARDS = [
  { id: 1, name: "Droide Constructor", icon: "🤖", color: "#60a5fa" },
  { id: 2, name: "Nave de Bloques", icon: "🛸", color: "#a78bfa" },
  { id: 3, name: "Caballero Galáctico", icon: "🛡️", color: "#f59e0b" },
  { id: 4, name: "Piloto Estelar", icon: "🌌", color: "#34d399" },
  { id: 5, name: "Base Lunar", icon: "🌙", color: "#f472b6" },
  { id: 6, name: "Robot Mecánico", icon: "⚙️", color: "#fb7185" },
  { id: 7, name: "Explorador del Desierto", icon: "🏜️", color: "#fbbf24" },
  { id: 8, name: "Capitán de la Flota", icon: "🚀", color: "#22c55e" },
  { id: 9, name: "Maestro de Bloques", icon: "🧱", color: "#ef4444" },
  { id: 10, name: "Guardián de la Galaxia", icon: "✨", color: "#38bdf8" }
];

<h2>Modo entrenamiento activado 🚀</h2>

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function uniqueWrongAnswers(correct) {
  const set = new Set();
  while (set.size < 2) {
    const delta = Math.floor(Math.random() * 6) + 1;
    const sign = Math.random() > 0.5 ? 1 : -1;
    const value = Math.max(0, correct + delta * sign);
    if (value !== correct) set.add(value);
  }
  return [...set];
}

function buildQuestion(selectedTables) {
  const a = selectedTables[Math.floor(Math.random() * selectedTables.length)];
  const b = Math.floor(Math.random() * 10) + 1;
  const correct = a * b;
  const options = shuffle([correct, ...uniqueWrongAnswers(correct)]);
  return { a, b, correct, options };
}

function buildGame(selectedTables) {
  return Array.from({ length: QUESTIONS_PER_GAME }, () => buildQuestion(selectedTables));
}

function SpaceScene() {
  return (
    <div
      style={{
        position: "relative",
        height: 180,
        borderRadius: 24,
        overflow: "hidden",
        background: "linear-gradient(180deg, #0f172a 0%, #172554 55%, #312e81 100%)",
        boxShadow: "0 10px 30px rgba(15,23,42,0.25)"
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        {[
          ["8%", "18%", 6], ["18%", "65%", 5], ["28%", "40%", 4], ["36%", "80%", 7],
          ["45%", "20%", 5], ["55%", "58%", 6], ["66%", "75%", 4], ["74%", "34%", 6],
          ["82%", "54%", 5], ["90%", "15%", 7]
        ].map(([top, left, size], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top,
              left,
              width: size,
              height: size,
              borderRadius: "50%",
              background: "white",
              opacity: 0.9,
              boxShadow: "0 0 10px rgba(255,255,255,0.9)"
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          right: 20,
          top: 18,
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, #fde68a, #f59e0b)",
          boxShadow: "0 0 30px rgba(245,158,11,0.5)"
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 18,
          bottom: 12,
          width: 140,
          height: 56,
          background: "#334155",
          borderRadius: 18,
          border: "3px solid #94a3b8"
        }}
      >
        <div style={{ position: "absolute", left: 12, top: -24, width: 18, height: 30, background: "#94a3b8", borderRadius: 8 }} />
        <div style={{ position: "absolute", left: 38, top: -34, width: 24, height: 40, background: "#cbd5e1", borderRadius: 12 }} />
        <div style={{ position: "absolute", left: 72, top: -22, width: 16, height: 28, background: "#94a3b8", borderRadius: 8 }} />
        <div style={{ position: "absolute", right: 14, top: -30, width: 28, height: 36, background: "#e2e8f0", borderRadius: 12 }} />
      </div>

      <div
        style={{
          position: "absolute",
          left: "48%",
          top: 56,
          transform: "translateX(-50%)",
          width: 110,
          height: 42,
          background: "#94a3b8",
          borderRadius: 30,
          border: "3px solid #e2e8f0"
        }}
      >
        <div style={{ position: "absolute", left: -18, top: 8, width: 26, height: 18, background: "#cbd5e1", clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }} />
        <div style={{ position: "absolute", right: -18, top: 8, width: 26, height: 18, background: "#cbd5e1", clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
        <div style={{ position: "absolute", left: 38, top: -20, width: 34, height: 24, background: "#60a5fa", borderRadius: "50% 50% 30% 30%" }} />
        <div style={{ position: "absolute", left: 42, bottom: -18, width: 10, height: 18, background: "#f97316", borderRadius: 8 }} />
        <div style={{ position: "absolute", left: 58, bottom: -18, width: 10, height: 18, background: "#fb7185", borderRadius: 8 }} />
      </div>
    </div>
  );
}

function MissionIllustration({ a, b }) {
  const shipCount = Math.min(a, 5);
  const blockCount = Math.min(b, 5);
  return (
    <div
      style={{
        borderRadius: 24,
        padding: 18,
        background: "linear-gradient(135deg, #eff6ff 0%, #ede9fe 100%)",
        border: "1px solid #c7d2fe"
      }}
    >
      <div style={{ fontWeight: 700, color: "#312e81", marginBottom: 10 }}>Misión visual</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {Array.from({ length: shipCount }).map((_, row) => (
          <div key={row} style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ fontSize: 20, width: 28 }}>🚀</div>
            {Array.from({ length: blockCount }).map((_, col) => (
              <div
                key={col}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: ["#60a5fa", "#f59e0b", "#34d399", "#f472b6", "#a78bfa"][col % 5],
                  boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.12)"
                }}
              />
            ))}
          </div>
        ))}
      </div>
      {(a > 5 || b > 5) && <div style={{ marginTop: 8, fontSize: 12, color: "#6366f1" }}>Se muestra una versión simplificada del dibujo.</div>}
    </div>
  );
}

function GroupVisual({ rows, cols }) {
  const cappedRows = Math.min(rows, 5);
  const cappedCols = Math.min(cols, 5);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
      {Array.from({ length: cappedRows }).map((_, r) => (
        <div key={r} style={{ display: "flex", gap: 8 }}>
          {Array.from({ length: cappedCols }).map((_, c) => (
            <div
              key={c}
              style={{
                width: 16,
                height: 16,
                borderRadius: 5,
                background: ["#60a5fa", "#f59e0b", "#34d399", "#fb7185", "#a78bfa"][(r + c) % 5],
                boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.12)"
              }}
            />
          ))}
        </div>
      ))}
      {(rows > 5 || cols > 5) && <div style={{ fontSize: 12, opacity: 0.7 }}>Visual simplificada</div>}
    </div>
  );
}

function RewardCard({ reward }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      style={{
        border: "1px solid #dbeafe",
        borderRadius: 18,
        padding: 16,
        textAlign: "center",
        background: `linear-gradient(180deg, white 0%, ${reward.color}22 100%)`,
        boxShadow: "0 8px 18px rgba(30,41,59,0.08)"
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 8 }}>{reward.icon}</div>
      <div style={{ fontWeight: 700, color: "#1e293b" }}>{reward.name}</div>
      <div style={{ marginTop: 8, height: 8, borderRadius: 999, background: reward.color }} />
    </motion.div>
  );
}

function ChoiceButton({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 26,
        fontWeight: 700,
        padding: "16px 22px",
        borderRadius: 18,
        border: "2px solid #bfdbfe",
        background: "linear-gradient(180deg, #ffffff 0%, #eff6ff 100%)",
        color: "#1e3a8a",
        cursor: "pointer",
        boxShadow: "0 6px 14px rgba(59,130,246,0.12)"
      }}
    >
      {value}
    </button>
  );
}

export default function MultiplicaGalaxiaPrototipo() {
  const [screen, setScreen] = useState("home");
  const [selectedTables, setSelectedTables] = useState([2, 5, 10]);
  const [questions, setQuestions] = useState(() => buildGame([2, 5, 10]));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showSupport, setShowSupport] = useState(false);
  const [collection, setCollection] = useState([]);

  const currentQuestion = questions[currentIndex];
  const progress = useMemo(() => (currentIndex / QUESTIONS_PER_GAME) * 100, [currentIndex]);

  const startGame = () => {
    const newQuestions = buildGame(selectedTables);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setStars(0);
    setFeedback(null);
    setShowSupport(false);
    setScreen("game");
  };

  const toggleTable = (table) => {
    setSelectedTables((prev) => {
      if (prev.includes(table)) {
        if (prev.length === 1) return prev;
        return prev.filter((t) => t !== table);
      }
      return [...prev, table].sort((a, b) => a - b);
    });
  };

  const moveNext = (updatedScore) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= QUESTIONS_PER_GAME) {
      const earnedCards = Math.floor(updatedScore / 5);
      if (earnedCards > 0) {
        setCollection((prev) => {
          const remaining = CARD_REWARDS.filter((item) => !prev.some((owned) => owned.id === item.id));
          const toAdd = remaining.slice(0, earnedCards);
          return [...prev, ...toAdd];
        });
      }
      setScreen("results");
      return;
    }

    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setFeedback(null);
      setShowSupport(false);
    }, 700);
  };

  const playSound = (type) => {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.play();
  };

  const answer = (value) => {
    if (feedback) return;
    const isCorrect = value === currentQuestion.correct;
    if (isCorrect) {
      playSound("correct");
    } else {
      playSound("wrong");
    }
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    setStars((prev) => prev + (isCorrect ? 1 : 0));
    setFeedback(isCorrect ? { type: "correct", text: "¡Muy bien, comandante!" } : { type: "wrong", text: "Buen intento" });
    setShowSupport(!isCorrect);
    moveNext(newScore);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: 24,
        maxWidth: 980,
        margin: "0 auto",
        color: "#0f172a",
        background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
        minHeight: "100vh"
      }}
    >
      <SpaceScene />

      <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 34, color: "#1e1b4b" }}>Multiplica la Galaxia</h1>
          <p style={{ margin: "8px 0 0", color: "#475569" }}>Una aventura de bloques galácticos para practicar multiplicaciones.</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div style={{ background: "#fff7ed", color: "#9a3412", padding: "10px 14px", borderRadius: 999, fontWeight: 700 }}>⭐ {stars} estrellas</div>
          <div style={{ background: "#eff6ff", color: "#1d4ed8", padding: "10px 14px", borderRadius: 999, fontWeight: 700 }}>🧩 {collection.length} piezas</div>
        </div>
      </div>

      {screen === "home" && (
        <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }}>
          <div style={{ background: "white", borderRadius: 24, padding: 20, boxShadow: "0 10px 25px rgba(30,41,59,0.08)" }}>
            <h3 style={{ marginTop: 0, color: "#312e81" }}>Elige sectores para entrenar a tu escuadrón</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
              {TABLE_OPTIONS.map((table) => {
                const active = selectedTables.includes(table);
                return (
                  <button
                    key={table}
                    onClick={() => toggleTable(table)}
                    style={{
                      padding: "12px 16px",
                      borderRadius: 16,
                      border: active ? "2px solid #4f46e5" : "2px solid #cbd5e1",
                      background: active ? "linear-gradient(180deg, #818cf8 0%, #6366f1 100%)" : "white",
                      color: active ? "white" : "#334155",
                      fontWeight: 700,
                      cursor: "pointer",
                      minWidth: 96
                    }}
                  >
                    Sector {table}
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={startGame}
                style={{
                  padding: "14px 22px",
                  borderRadius: 18,
                  border: "none",
                  background: "linear-gradient(180deg, #22c55e 0%, #16a34a 100%)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer"
                }}
              >
                🚀 Iniciar misión
              </button>
              <button
                onClick={() => setScreen("collection")}
                style={{
                  padding: "14px 22px",
                  borderRadius: 18,
                  border: "2px solid #cbd5e1",
                  background: "white",
                  color: "#334155",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                🧱 Ver mi hangar
              </button>
            </div>
          </div>

          <div style={{ background: "white", borderRadius: 24, padding: 20, boxShadow: "0 10px 25px rgba(30,41,59,0.08)" }}>
            <h3 style={{ marginTop: 0, color: "#312e81" }}>Cómo se juega</h3>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ background: "#eff6ff", borderRadius: 16, padding: 12 }}>⭐ Cada acierto da una estrella.</div>
              <div style={{ background: "#fef3c7", borderRadius: 16, padding: 12 }}>🧩 Con 5 aciertos ganas una pieza especial.</div>
              <div style={{ background: "#ecfccb", borderRadius: 16, padding: 12 }}>🚀 Cada misión tiene 10 retos cortos.</div>
              <div style={{ background: "#f3e8ff", borderRadius: 16, padding: 12 }}>🖍️ Si fallas, verás un dibujo que lo explica.</div>
            </div>
          </div>
        </div>
      )}

      {screen === "game" && currentQuestion && (
        <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }}>
          <div style={{ background: "white", borderRadius: 24, padding: 22, boxShadow: "0 10px 25px rgba(30,41,59,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <h2 style={{ margin: 0, color: "#312e81" }}>Misión {currentIndex + 1} de {QUESTIONS_PER_GAME}</h2>
              <div style={{ width: 180, height: 14, background: "#e2e8f0", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #22c55e 0%, #3b82f6 100%)" }} />
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <MissionIllustration a={currentQuestion.a} b={currentQuestion.b} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentIndex}-${currentQuestion.a}-${currentQuestion.b}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <div style={{ marginTop: 18, borderRadius: 24, padding: 24, background: "linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)", textAlign: "center" }}>
                  <div style={{ color: "#475569", fontWeight: 700, marginBottom: 8 }}>¿Cuánta energía necesita la misión?</div>
                  <div style={{ fontSize: 54, fontWeight: 800, color: "#1e1b4b" }}>{currentQuestion.a} × {currentQuestion.b}</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 18 }}>
                  {currentQuestion.options.map((option) => (
                    <ChoiceButton key={option} value={option} onClick={() => answer(option)} />
                  ))}
                </div>

                {feedback && (
                  <div
                    style={{
                      marginTop: 18,
                      borderRadius: 18,
                      padding: 14,
                      textAlign: "center",
                      fontWeight: 700,
                      background: feedback.type === "correct" ? "#dcfce7" : "#fef3c7",
                      color: feedback.type === "correct" ? "#166534" : "#92400e"
                    }}
                  >
                    {feedback.text}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ background: "white", borderRadius: 24, padding: 20, boxShadow: "0 10px 25px rgba(30,41,59,0.08)" }}>
              <h3 style={{ marginTop: 0, color: "#312e81" }}>Panel holográfico</h3>
              {showSupport ? (
                <>
                  <div style={{ marginBottom: 10, color: "#475569" }}>{currentQuestion.a} grupos de {currentQuestion.b}</div>
                  <GroupVisual rows={currentQuestion.a} cols={currentQuestion.b} />
                  <div style={{ marginTop: 12, fontWeight: 700, color: "#1e293b" }}>{currentQuestion.a} × {currentQuestion.b} = {currentQuestion.correct}</div>
                </>
              ) : (
                <div style={{ color: "#64748b" }}>Aquí aparecerá una construcción de bloques de color cuando necesites ayuda.</div>
              )}
            </div>

            <div style={{ background: "white", borderRadius: 24, padding: 20, boxShadow: "0 10px 25px rgba(30,41,59,0.08)" }}>
              <h3 style={{ marginTop: 0, color: "#312e81" }}>Panel de mando</h3>
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ background: "#eff6ff", borderRadius: 16, padding: 12, display: "flex", justifyContent: "space-between" }}><span>Aciertos</span><strong>{score}</strong></div>
                <div style={{ background: "#fff7ed", borderRadius: 16, padding: 12, display: "flex", justifyContent: "space-between" }}><span>Estrellas</span><strong>{stars}</strong></div>
                <div style={{ background: "#f5f3ff", borderRadius: 16, padding: 12, display: "flex", justifyContent: "space-between" }}><span>Sectores</span><strong>{selectedTables.join(", ")}</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === "results" && (
        <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }}>
          <div style={{ background: "white", borderRadius: 24, padding: 22, boxShadow: "0 10px 25px rgba(30,41,59,0.08)" }}>
            <h2 style={{ marginTop: 0, color: "#312e81" }}>Fin de la misión</h2>
            <div style={{ borderRadius: 24, padding: 24, background: "linear-gradient(135deg, #dcfce7 0%, #dbeafe 100%)", textAlign: "center" }}>
              <div style={{ fontSize: 56, fontWeight: 800, color: "#14532d" }}>{score} / {QUESTIONS_PER_GAME}</div>
              <div style={{ marginTop: 8, color: "#334155", fontWeight: 700 }}>Has conseguido {stars} cristales de energía.</div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
              <button onClick={startGame} style={{ padding: "14px 20px", borderRadius: 18, border: "none", background: "#22c55e", color: "white", fontWeight: 700, cursor: "pointer" }}>🚀 Nueva misión</button>
              <button onClick={() => setScreen("collection")} style={{ padding: "14px 20px", borderRadius: 18, border: "2px solid #cbd5e1", background: "white", fontWeight: 700, cursor: "pointer" }}>🧱 Ver hangar</button>
              <button onClick={() => setScreen("home")} style={{ padding: "14px 20px", borderRadius: 18, border: "2px solid #cbd5e1", background: "white", fontWeight: 700, cursor: "pointer" }}>↩️ Inicio</button>
            </div>
          </div>

          <div style={{ background: "white", borderRadius: 24, padding: 20, boxShadow: "0 10px 25px rgba(30,41,59,0.08)" }}>
            <h3 style={{ marginTop: 0, color: "#312e81" }}>Consejo de entrenamiento</h3>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ background: "#eff6ff", borderRadius: 16, padding: 12 }}>Empieza por 2, 5 y 10.</div>
              <div style={{ background: "#ecfccb", borderRadius: 16, padding: 12 }}>Haz misiones de 5 minutos.</div>
              <div style={{ background: "#fef3c7", borderRadius: 16, padding: 12 }}>Usa los dibujos para entender grupos.</div>
            </div>
          </div>
        </div>
      )}

      {screen === "collection" && (
        <div style={{ marginTop: 22, background: "white", borderRadius: 24, padding: 22, boxShadow: "0 10px 25px rgba(30,41,59,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <h2 style={{ margin: 0, color: "#312e81" }}>Mi hangar</h2>
            <button onClick={() => setScreen("home")} style={{ padding: "12px 18px", borderRadius: 16, border: "2px solid #cbd5e1", background: "white", fontWeight: 700, cursor: "pointer" }}>Volver</button>
          </div>

          {collection.length === 0 ? (
            <div style={{ marginTop: 18, borderRadius: 18, padding: 18, background: "#f8fafc", color: "#64748b" }}>Aún no has conseguido piezas especiales. Juega una misión y consigue al menos 5 aciertos.</div>
          ) : (
            <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
              {collection.map((card) => (
                <RewardCard key={card.id} reward={card} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
