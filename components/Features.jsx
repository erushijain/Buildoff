import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Features.css";


// ── Data ──────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 1, name: "AI Services", tag: "Trending", glyph: "◈", color: "#c9a84c", side: "left", row: 0,
    subs: ["AI Content Writing", "Prompt Engineering", "AI Chatbot Dev", "Machine Learning", "Data Annotation"],
    desc: "Harness the power of artificial intelligence for your business — from content generation to custom model training.",
    stats: [{ num: "12k+", label: "AI specialists" }, { num: "4.9★", label: "Avg rating" }, { num: "48h", label: "Delivery" }],
  },
  {
    id: 2, name: "Dev & IT", tag: "Popular", glyph: "⟨/⟩", color: "#8b9dc3", side: "left", row: 1,
    subs: ["Web Development", "Mobile Apps", "Backend APIs", "DevOps & Cloud", "Cybersecurity"],
    desc: "Full-stack engineers, cloud architects, and DevOps experts ready to build your next product from scratch.",
    stats: [{ num: "38k+", label: "Developers" }, { num: "4.8★", label: "Avg rating" }, { num: "72h", label: "Delivery" }],
  },
  {
    id: 3, name: "Design", tag: "Creative", glyph: "◎", color: "#c4856a", side: "left", row: 2,
    subs: ["UI / UX Design", "Brand Identity", "Illustration", "Motion Graphics", "3D & Animation"],
    desc: "Award-winning designers who translate ideas into iconic visuals — from brand identity to immersive digital experiences.",
    stats: [{ num: "21k+", label: "Designers" }, { num: "4.9★", label: "Avg rating" }, { num: "36h", label: "Delivery" }],
  },
  {
    id: 4, name: "Marketing", tag: "Growth", glyph: "↗", color: "#7ab87a", side: "left", row: 3,
    subs: ["SEO & SEM", "Social Media", "Email Marketing", "Copywriting", "Lead Generation"],
    desc: "Growth strategists and performance marketers who fill pipelines, grow audiences, and maximize ROI.",
    stats: [{ num: "15k+", label: "Marketers" }, { num: "4.7★", label: "Avg rating" }, { num: "24h", label: "Delivery" }],
  },
  {
    id: 5, name: "Writing", tag: "Global", glyph: "≡", color: "#a889c4", side: "left", row: 4,
    subs: ["Blog & Articles", "Technical Writing", "Proofreading", "Localization", "Ghostwriting"],
    desc: "Eloquent wordsmiths and multilingual translators who make your message land perfectly in any language.",
    stats: [{ num: "9k+", label: "Writers" }, { num: "4.8★", label: "Avg rating" }, { num: "12h", label: "Delivery" }],
  },
  {
    id: 6, name: "Operations", tag: "Reliable", glyph: "⊞", color: "#c9a84c", side: "right", row: 0,
    subs: ["Virtual Assistant", "Data Entry", "Customer Support", "Project Management", "Research"],
    desc: "Reliable operations talent that keeps your business running smoothly so you can focus on what matters most.",
    stats: [{ num: "7k+", label: "Admins" }, { num: "4.7★", label: "Avg rating" }, { num: "6h", label: "Delivery" }],
  },
  {
    id: 7, name: "Finance", tag: "Trusted", glyph: "⊛", color: "#8b9dc3", side: "right", row: 1,
    subs: ["Bookkeeping", "Tax Preparation", "Financial Analysis", "Payroll", "Business Planning"],
    desc: "Certified accountants and financial analysts who keep your numbers sharp and compliance airtight.",
    stats: [{ num: "5k+", label: "Finance pros" }, { num: "4.9★", label: "Avg rating" }, { num: "48h", label: "Delivery" }],
  },
  {
    id: 8, name: "Legal", tag: "Expert", glyph: "§", color: "#c4856a", side: "right", row: 2,
    subs: ["Contract Review", "IP & Trademarks", "Privacy Policy", "Corporate Law", "Legal Research"],
    desc: "Seasoned legal professionals who protect your business with airtight contracts, compliance, and IP strategy.",
    stats: [{ num: "3k+", label: "Legal experts" }, { num: "4.8★", label: "Avg rating" }, { num: "72h", label: "Delivery" }],
  },
  {
    id: 9, name: "HR & People", tag: "Culture", glyph: "⬡", color: "#7ab87a", side: "right", row: 3,
    subs: ["Recruitment", "HR Policies", "Training Programs", "Performance Review", "Team Building"],
    desc: "People-first HR specialists and L&D experts who help you hire brilliantly and build winning team cultures.",
    stats: [{ num: "4k+", label: "HR pros" }, { num: "4.7★", label: "Avg rating" }, { num: "24h", label: "Delivery" }],
  },
  {
    id: 10, name: "Engineering", tag: "Technical", glyph: "⬢", color: "#a889c4", side: "right", row: 4,
    subs: ["CAD & 3D Modeling", "Civil Engineering", "Electronics", "Manufacturing", "Product Design"],
    desc: "Precision engineers across disciplines — transforming complex requirements into real-world solutions.",
    stats: [{ num: "6k+", label: "Engineers" }, { num: "4.8★", label: "Avg rating" }, { num: "96h", label: "Delivery" }],
  },
];

// ── Layout constants ──────────────────────────────────────────────────────────
const ROWS = 5;
const ROW_HEIGHT = 120;
const CANVAS_HEIGHT = ROWS * ROW_HEIGHT + 80;
const CANVAS_WIDTH = 960;
const CENTER_X = CANVAS_WIDTH / 2;
const CENTER_Y = CANVAS_HEIGHT / 2;

const NODE_W = 168;
const NODE_H = 72;

// Left nodes: right-aligned column, right nodes: left-aligned column
const LEFT_COL_RIGHT = 200;   // right edge of left nodes
const RIGHT_COL_LEFT = CANVAS_WIDTH - 200; // left edge of right nodes
const NODE_START_Y = 60;

function getNodePos(side, row) {
  const y = NODE_START_Y + row * ROW_HEIGHT + ROW_HEIGHT / 2;
  if (side === "left") {
    return { x: LEFT_COL_RIGHT - NODE_W, y: y - NODE_H / 2 };
  } else {
    return { x: RIGHT_COL_LEFT, y: y - NODE_H / 2 };
  }
}

// L-shaped branch path from node connector to center hub
// Left nodes: connector exits from right edge, goes right then to center
// Right nodes: connector exits from left edge, goes left then to center
function getBranchPath(side, row) {
  const pos = getNodePos(side, row);
  const nodeCy = pos.y + NODE_H / 2;

  if (side === "left") {
    const nodeRightX = pos.x + NODE_W;
    // Horizontal segment to a midpoint, then diagonal to center
    const midX = LEFT_COL_RIGHT + 80;
    return `M ${nodeRightX} ${nodeCy} L ${midX} ${nodeCy} L ${CENTER_X} ${CENTER_Y}`;
  } else {
    const nodeLeftX = pos.x;
    const midX = RIGHT_COL_LEFT - 80;
    return `M ${nodeLeftX} ${nodeCy} L ${midX} ${nodeCy} L ${CENTER_X} ${CENTER_Y}`;
  }
}


// ── SVG Branches ─────────────────────────────────────────────────────────────
function SVGBranches({ activeId }) {
  return (
    <svg
      className="fp-svg-branches"
      viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {CATEGORIES.map((cat) => {
        const active = activeId === cat.id;
        const d = getBranchPath(cat.side, cat.row);
        return (
          <motion.path
            key={cat.id}
            d={d}
            fill="none"
            stroke={active ? cat.color : "rgba(201,168,76,0.18)"}
            strokeWidth={active ? 2.5 : 1}
            strokeDasharray={active ? "none" : "6 10"}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 1.1, delay: cat.id * 0.06 }}
          />
        );
      })}
    </svg>
  );
}

// ── Center Hub ────────────────────────────────────────────────────────────────
function CenterNode() {
  return (
    <div className="fp-center-node">
      <div className="fp-center-inner">
        <span className="fp-center-sb">BuildOff</span>
        <span className="fp-center-lbl">talent</span>
        <div className="fp-center-ring" />
      </div>
    </div>
  );
}

// ── Tree Node ─────────────────────────────────────────────────────────────────
function TreeNode({ cat, active, onClick, index }) {
  const pos = getNodePos(cat.side, cat.row);

  return (
    <motion.div
      className={`fp-tree-node${active ? " active" : ""}`}
      style={{
        left: pos.x,
        top: pos.y,
        width: NODE_W,
        height: NODE_H,
        "--cat-color": cat.color,
      }}
      initial={{ opacity: 0, scale: 0.5, x: cat.side === "left" ? -30 : 30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, type: "spring", stiffness: 160, damping: 18 }}
      onClick={() => onClick(cat.id)}
    >
      <div className="fp-node-inner">
        <span className="fp-glyph">{cat.glyph}</span>
        <div className="fp-node-text">
          <span className="fp-node-name">{cat.name}</span>
          <span className="fp-node-tag">{cat.tag}</span>
        </div>
      </div>
      {active && <div className="fp-pulse-ring" />}
    </motion.div>
  );
}

// ── Compact Card ──────────────────────────────────────────────────────────────
function CompactCard({ cat, active, onClick, index }) {
  return (
    <motion.div
      className={`fp-compact-card${active ? " active" : ""}`}
      onClick={() => onClick(cat.id)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <span className="fp-compact-glyph">{cat.glyph}</span>
      <span className="fp-compact-name">{cat.name}</span>
    </motion.div>
  );
}

// ── Detail Panel ──────────────────────────────────────────────────────────────
function DetailPanel({ cat }) {
  if (!cat) return null;
  return (
    <motion.div
      key={cat.id}
      className="fp-detail-inner"
      initial={{ opacity: 0, y: 20, scaleY: 0.96 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      exit={{ opacity: 0, y: -12, scaleY: 0.97 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div>
        <h3 className="fp-det-head">
          {cat.name} <em>&amp; beyond</em>
        </h3>
        <p className="fp-det-desc">{cat.desc}</p>
        <button className="fp-det-cta">
          Browse talent
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div>
        <div className="fp-subs-head">Specializations</div>
        {cat.subs.map((s) => (
          <div className="fp-sub-item" key={s}>
            <div className="fp-sub-dot" />
            {s}
          </div>
        ))}
      </div>

      <div className="fp-stats-col">
        {cat.stats.map((st) => (
          <div className="fp-stat-chip" key={st.label}>
            <div className="fp-sc-num">{st.num}</div>
            <div className="fp-sc-lbl">{st.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Features() {
  const [activeId, setActiveId] = useState(null);
  const [compactView, setCompactView] = useState(false);

  const activeData = CATEGORIES.find((c) => c.id === activeId);

  const handleNodeClick = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="fp-root">
      {/* ── Hero ── */}
      <motion.section
        className="fp-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <motion.div
            className="fp-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Expert talent · On demand
          </motion.div>

          <motion.h1
            className="fp-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find freelancers<br />
            for <em>every</em> kind<br />
            of work
          </motion.h1>

          <motion.p
            className="fp-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Over 100,000 verified specialists across 10 disciplines —
            ready to start within hours, not weeks.
          </motion.p>

          <div className="fp-toggle-row">
            <span className="fp-toggle-lbl">Compact view</span>
            <div
              className={`fp-switch${compactView ? " on" : ""}`}
              onClick={() => setCompactView((v) => !v)}
              role="switch"
              aria-checked={compactView}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setCompactView((v) => !v)}
            >
              <div className="fp-knob" />
            </div>
          </div>
        </div>

        <motion.div
          className="fp-hero-right"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="fp-stat-row">
            {[
              { num: "100k+", lbl: "Specialists" },
              { num: "4.8★", lbl: "Platform rating" },
              { num: "10", lbl: "Disciplines" },
            ].map((s) => (
              <div className="fp-stat" key={s.lbl}>
                <div className="fp-stat-num">{s.num}</div>
                <div className="fp-stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <div className="fp-divider" />

      {/* ── Tree / Compact ── */}
      <section className="fp-tree-section">
        <AnimatePresence mode="wait">
          {!compactView ? (
            <motion.div
              key="tree"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4 }}
            >
              <div className="fp-hint">Select any node to explore</div>
              <div
                className="fp-tree-canvas"
                style={{ height: CANVAS_HEIGHT, maxWidth: CANVAS_WIDTH }}
              >
                <SVGBranches activeId={activeId} />
                <CenterNode />
                {CATEGORIES.map((cat, i) => (
                  <TreeNode
                    key={cat.id}
                    cat={cat}
                    active={activeId === cat.id}
                    onClick={handleNodeClick}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="compact"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <div className="fp-hint">Select a category</div>
              <div className="fp-compact-grid">
                {CATEGORIES.map((cat, i) => (
                  <CompactCard
                    key={cat.id}
                    cat={cat}
                    active={activeId === cat.id}
                    onClick={handleNodeClick}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Detail Panel ── */}
        <div className="fp-detail">
          <AnimatePresence mode="wait">
            {activeId && activeData && (
              <DetailPanel key={activeId} cat={activeData} />
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
