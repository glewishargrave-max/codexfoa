// ============================================================================
//  CODEX COMPONENTS — shared visual primitives + content blocks
// ============================================================================
const { useState, useMemo } = React;

// ── Ornaments ───────────────────────────────────────────────────────────────
function Corners({ accent }) {
  return (
    <React.Fragment>
      <span className="cnr cnr--tl" style={{ borderColor: accent }}></span>
      <span className="cnr cnr--tr" style={{ borderColor: accent }}></span>
      <span className="cnr cnr--bl" style={{ borderColor: accent }}></span>
      <span className="cnr cnr--br" style={{ borderColor: accent }}></span>
    </React.Fragment>
  );
}

function Divider({ label, accent }) {
  return (
    <div className="divider" style={{ "--acc": accent }}>
      <span className="divider__line"></span>
      {label && <span className="divider__label">{label}</span>}
      <span className="divider__gem">◆</span>
      <span className="divider__line"></span>
    </div>
  );
}

function RoleTag({ children, accent }) {
  return <span className="roletag" style={{ color: accent, borderColor: accent + "66" }}>{children}</span>;
}

// ── Radar chart (8-axis octagon) ─────────────────────────────────────────────
function Radar({ stats, statKeys, accent }) {
  const size = 280, cx = size / 2, cy = size / 2, R = 104;
  const n = statKeys.length;
  const growth = statKeys.map((k) => stats[k][3]);
  const maxVal = Math.max(5, Math.ceil(Math.max(...growth) / 5) * 5);
  const pt = (i, r) => {
    const ang = -Math.PI / 2 + (i / n) * Math.PI * 2;
    return [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r];
  };

  const ring = (frac) =>
    statKeys.map((_, i) => pt(i, R * frac).join(",")).join(" ");

  const dataPts = statKeys.map((k, i) => {
    const v = stats[k][3];
    return pt(i, (v / maxVal) * R);
  });
  const dataStr = dataPts.map((p) => p.join(",")).join(" ");

  return (
    <div className="radar">
      <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <polygon key={f} points={ring(f)} fill="none" stroke="rgba(184,146,74,0.18)" strokeWidth="1" />
        ))}
        {statKeys.map((_, i) => {
          const [x, y] = pt(i, R);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(184,146,74,0.14)" strokeWidth="1" />;
        })}
        <polygon points={dataStr} fill={accent + "33"} stroke={accent} strokeWidth="2" strokeLinejoin="round" />
        {dataPts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill={accent} stroke="#0a1310" strokeWidth="1.5" />
        ))}
        {statKeys.map((k, i) => {
          const [x, y] = pt(i, R + 22);
          return (
            <text key={k} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
              fontFamily="'JetBrains Mono', monospace" fontSize="11" fill="#a89e84"
              letterSpacing="0.08em">{k.toUpperCase()}</text>
          );
        })}
      </svg>
    </div>
  );
}

// ── Stat table (Class / Sub / Req / Growth) ──────────────────────────────────
function StatTable({ stats, statKeys, statNames, accent }) {
  const maxGrowth = Math.max(...statKeys.map((k) => stats[k][3]));
  return (
    <table className="stattable">
      <thead>
        <tr>
          <th className="st-name">Attribute</th>
          <th>Req</th>
          <th className="st-growth">Growth</th>
        </tr>
      </thead>
      <tbody>
        {statKeys.map((k) => {
          const [cls, sub, req, grw] = stats[k];
          return (
            <tr key={k}>
              <td className="st-name"><span className="st-abbr">{k}</span>{statNames[k]}</td>
              <td className="st-req">{req > 50 ? req : "—"}</td>
              <td className="st-growth">
                <div className="growthbar">
                  <div className="growthbar__fill" style={{ width: (grw / maxGrowth * 100) + "%", background: accent }}></div>
                  <span className="growthbar__val">{grw}</span>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// ── Abilities ────────────────────────────────────────────────────────────────
const ABILITY_GROUPS = ["Major", "Move", "Minor"];

function AbilityItem({ name, desc, scouted, accent }) {
  return (
    <div className={"ability" + (scouted ? " ability--scouted" : "")}>
      <div className="ability__head">
        <span className="ability__name">{name}</span>
        {scouted && <span className="ability__flag" style={{ color: accent, borderColor: accent + "66" }}>Scouted</span>}
      </div>
      <p className="ability__desc">{desc}</p>
    </div>
  );
}

function Abilities({ abilities, accent }) {
  const [grp, setGrp] = useState("Major");
  const list = abilities[grp] || [];
  return (
    <div className="abilities">
      <div className="ability-tabs">
        {ABILITY_GROUPS.map((g) => (
          <button key={g}
            className={"ability-tab" + (grp === g ? " is-on" : "")}
            style={grp === g ? { color: accent, borderColor: accent } : null}
            onClick={() => setGrp(g)}>
            {g}<span className="ability-tab__n">{abilities[g].length}</span>
          </button>
        ))}
      </div>
      <div className="ability-grid">
        {list.map(([name, desc, scouted]) => (
          <AbilityItem key={name} name={name} desc={desc} scouted={scouted} accent={accent} />
        ))}
      </div>
    </div>
  );
}

// ── Class skills (curated 10-skill loadout from the codex template) ───────────
function ClassSkills({ skills, accent }) {
  return (
    <div className="classkills">
      {skills.map((raw, i) => {
        const ci = raw.indexOf(",");
        const cat = ci >= 0 ? raw.slice(0, ci).trim() : raw.trim();
        const eff = ci >= 0 ? raw.slice(ci + 1).trim() : "";
        return (
          <div className="classkill" key={i} style={{ "--acc": accent }}>
            <span className="classkill__num">{String(i + 1).padStart(2, "0")}</span>
            <div className="classkill__body">
              <span className="classkill__cat" style={{ color: accent }}>{cat}</span>
              {eff && <span className="classkill__eff">{eff}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Passives & skill trees ────────────────────────────────────────────────────
function Capstone({ cap, accent }) {
  return (
    <div className="capstone" style={{ "--acc": accent }}>
      <div className="capstone__badge">CAPSTONE</div>
      <div className="capstone__body">
        <div className="capstone__head">
          <span className="capstone__name">{cap.name}</span>
          <span className="capstone__tag">{cap.tag}</span>
        </div>
        <p className="capstone__text">{cap.text}</p>
      </div>
    </div>
  );
}

function SkillTrees({ trees, accent }) {
  return (
    <div className="skilltrees">
      {trees.map((t) => (
        <div className="skilltree" key={t.group}>
          <div className="skilltree__group" style={{ color: accent }}>{t.group}</div>
          <div className="skilltree__list">
            {t.skills.map(([name, detail]) => (
              <div className="skill" key={name}>
                <span className="skill__name">{name}</span>
                <span className="skill__detail">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PassiveList({ passives, rarity }) {
  return (
    <div className="passivelist">
      {passives.map(([name, r, desc, scaling], i) => (
        <div className={"passive" + (desc ? "" : " passive--compact")} key={name + i}>
          <div className="passive__top">
            <span className="passive__name">{name}</span>
            <span className="passive__rar" style={{ color: rarity[r].color, borderColor: rarity[r].color + "55" }}
              title={rarity[r].label}>{r}</span>
          </div>
          {desc && <p className="passive__desc">{desc}</p>}
          {scaling && <div className="passive__scale">{scaling}</div>}
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  Corners, Divider, RoleTag, Radar, StatTable, Abilities, ClassSkills,
  Capstone, SkillTrees, PassiveList,
});
