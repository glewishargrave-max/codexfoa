// ============================================================================
//  SCREENS — ClassSelect · SubclassSelect · Codex (Atlas / Dossier layouts)
// ============================================================================
const { useState: useStateS, useEffect: useEffectS } = React;

// ── Class medallion ───────────────────────────────────────────────────────────
function ClassMedallion({ cls, onClick }) {
  return (
    <button className="medallion" style={{ "--acc": cls.accent }} onClick={() => onClick(cls)}>
      <div className="medallion__art">
        {cls.icon
          ? <img className="medallion__img" src={cls.icon} alt={cls.name} draggable="false" />
          : <span className="medallion__glyph">{cls.glyph}</span>}
        <Corners accent={cls.accent} />
      </div>
      <div className="medallion__name">{cls.name}</div>
      <div className="medallion__role">{cls.role}</div>
    </button>
  );
}

function ClassSelect({ onPick }) {
  return (
    <div className="screen screen--class">
      <header className="select-head">
        <div className="select-head__kicker">Character Codex</div>
        <h1 className="select-head__title">Choose a Class</h1>
        <Divider accent="#b8924a" />
        <p className="select-head__sub">Sixteen disciplines of the Concord. Select one to view its subclasses.</p>
      </header>
      <div className="class-grid">
        {CLASSES.map((c) => <ClassMedallion key={c.id} cls={c} onClick={onPick} />)}
      </div>
    </div>
  );
}

// ── Subclass select ───────────────────────────────────────────────────────────
function SubMedallion({ sub, accent, onClick }) {
  return (
    <button className={"submed" + (sub.locked ? " submed--locked" : "")} style={{ "--acc": accent }} onClick={() => onClick(sub)}>
      <div className="submed__art">
        {sub.icon
          ? <img src={sub.icon} alt={sub.name} draggable="false" />
          : <span className="submed__glyph">{sub.name[0]}</span>}
        <Corners accent={accent} />
      </div>
      <div className="submed__meta">
        <div className="submed__top">
          <span className="submed__name">{sub.name}</span>
          <span className="submed__tier">T{sub.tier}</span>
        </div>
        <div className="submed__roles">
          {sub.role.map((r) => <span key={r} className="submed__role">{r}</span>)}
        </div>
        <p className="submed__blurb">{sub.blurb}</p>
      </div>
      {sub.locked && <span className="submed__lock">SEALED</span>}
      {!sub.locked && sub.id === "scout" && <span className="submed__ready" style={{ color: accent }}>● FULL ENTRY</span>}
    </button>
  );
}

// ── Dual-class medallion (shows the partner class crest) ───────────────────────
function DualMedallion({ dual, cls, onClick }) {
  return (
    <button className="dualmed" style={{ "--acc": cls.accent }} onClick={() => onClick(dual)}>
      <div className="dualmed__art">
        {dual.icon
          ? <img className="dualmed__fused" src={dual.icon} alt={dual.name} draggable="false" />
          : <React.Fragment>
              {dual.partnerIcon
                ? <img src={dual.partnerIcon} alt={dual.partnerName} draggable="false" />
                : <span className="dualmed__glyph" style={{ color: dual.partnerAccent }}>{dual.partnerName[0]}</span>}
              <span className="dualmed__plus" style={{ color: cls.accent }}>+</span>
            </React.Fragment>}
      </div>
      <div className="dualmed__meta">
        <div className="dualmed__name">{dual.name}</div>
        <div className="dualmed__pair">{cls.name} <span>+</span> {dual.partnerName}</div>
      </div>
      <span className="dualmed__tier">T{dual.tier}</span>
    </button>
  );
}

function ClassPage({ cls, onPick, onPickDual, onPickBase, onBack }) {
  return (
    <div className="screen screen--class-page" style={{ "--acc": cls.accent }}>
      <header className="cp-head">
        <button className="backbtn" onClick={onBack}>‹ Classes</button>
        <button className="cp-base" onClick={onPickBase}>
          <div className="cp-base__crest" style={{ borderColor: cls.accent + "66" }}>
            {cls.icon
              ? <img src={cls.icon} alt={cls.name} draggable="false" />
              : <span style={{ color: cls.accent }}>{cls.glyph}</span>}
          </div>
          <div className="cp-base__text">
            <div className="cp-base__kicker" style={{ color: cls.accent }}>{cls.role} Class</div>
            <h1 className="cp-base__title">{cls.name}</h1>
            <p className="cp-base__blurb">{cls.blurb}</p>
          </div>
          <span className="cp-base__cta" style={{ borderColor: cls.accent + "66", color: cls.accent }}>View Base Class →</span>
        </button>
      </header>

      <div className="cp-scroll">
        <Divider label="Subclasses" accent={cls.accent} />
        <div className="cp-subgrid">
          {cls.subs.map((s) => <SubMedallion key={s.id} sub={s} accent={cls.accent} onClick={onPick} />)}
        </div>

        <Divider label="Dual Classes" accent={cls.accent} />
        <div className="cp-dualgrid">
          {cls.duals.map((d) => <DualMedallion key={d.id} dual={d} cls={cls} onClick={onPickDual} />)}
        </div>
      </div>
    </div>
  );
}

// ── Codex content blocks ───────────────────────────────────────────────────────
function IdentityCard({ sub, cls, layout }) {
  // Stat requirements come either as an explicit map (generated subs) or are
  // derived from the full stat block's Req column > 50 (hand-authored Scout).
  const reqEntries = sub.statReqs
    ? Object.entries(sub.statReqs).sort((a, b) => b[1] - a[1])
    : sub.stats
      ? STAT_KEYS.filter((k) => sub.stats[k][2] > 50).sort((a, b) => sub.stats[b][2] - sub.stats[a][2]).map((k) => [k, sub.stats[k][2]])
      : [];
  const w = sub.weapon || {};
  const isDual = sub.kind === "dual";
  return (
    <div className={"identity identity--" + layout} style={{ "--acc": cls.accent }}>
      {isDual && !sub.icon ? (
        <div className="identity__art identity__art--dual">
          <div className="identity__halo" style={{ background: `radial-gradient(circle, ${cls.accent}33, transparent 70%)` }}></div>
          <div className="dualcrest">
            <div className="dualcrest__one">
              {sub.c1Meta && sub.c1Meta.icon
                ? <img src={sub.c1Meta.icon} alt={sub.c1} draggable="false" />
                : <span style={{ color: (sub.c1Meta && sub.c1Meta.accent) || cls.accent }}>{(sub.c1 || "?")[0]}</span>}
            </div>
            <span className="dualcrest__plus">+</span>
            <div className="dualcrest__one">
              {sub.c2Meta && sub.c2Meta.icon
                ? <img src={sub.c2Meta.icon} alt={sub.c2} draggable="false" />
                : <span style={{ color: (sub.c2Meta && sub.c2Meta.accent) || cls.accent }}>{(sub.c2 || "?")[0]}</span>}
            </div>
          </div>
        </div>
      ) : (
        <div className={"identity__art" + (sub.icon ? "" : " identity__art--glyph")}>
          <div className="identity__halo" style={{ background: `radial-gradient(circle, ${cls.accent}33, transparent 70%)` }}></div>
          {sub.icon
            ? <img src={sub.icon} alt={sub.name} draggable="false" />
            : <span className="identity__glyph" style={{ color: cls.accent }}>{sub.name[0]}</span>}
        </div>
      )}
      <div className="identity__info">
        <div className="identity__breadcrumb">
          {isDual ? (
            <React.Fragment>
              <span style={{ color: (sub.c1Meta && sub.c1Meta.accent) || cls.accent }}>{sub.c1}</span>
              <span className="identity__sep">+</span>
              <span style={{ color: (sub.c2Meta && sub.c2Meta.accent) || cls.accent }}>{sub.c2}</span>
              <span className="identity__sep">·</span>
              <span>Dual Class</span>
            </React.Fragment>
          ) : sub.kind === "base" ? (
            <React.Fragment>
              <span style={{ color: cls.accent }}>{cls.name}</span>
              <span className="identity__sep">›</span>
              <span>Base Class</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span style={{ color: cls.accent }}>{cls.name}</span>
              <span className="identity__sep">›</span>
              <span>Subclass</span>
            </React.Fragment>
          )}
        </div>
        <h1 className="identity__name">{sub.name}</h1>
        <div className="identity__roles">
          {sub.role.map((r) => <RoleTag key={r} accent={cls.accent}>{r}</RoleTag>)}
        </div>
        <dl className="identity__facts">
          <div><dt>Tier</dt><dd>{romanize(sub.tier)}</dd></div>
          {sub.code && <div><dt>Code</dt><dd>{sub.code}</dd></div>}
          {sub.gender && <div><dt>Bearing</dt><dd>{sub.gender}</dd></div>}
          {sub.deity && <div><dt>Opposed</dt><dd>{sub.deity}</dd></div>}
          {sub.character && <div><dt>Exemplar</dt><dd>{sub.character}</dd></div>}
        </dl>
        {sub.weapon && (
          <div className="identity__weapon">
            <div className="identity__weapon-row"><span>Weapon</span><b>{w.name}</b></div>
            {w.armor && <div className="identity__weapon-row"><span>Armor</span><b>{w.armor}</b></div>}
            {w.style && <div className="identity__weapon-row"><span>Style</span><b>{w.style}</b></div>}
            {w.effect && (
              <div className="identity__weapon-row identity__weapon-row--effect"><span>Effect</span><b>{w.effect}</b></div>
            )}
          </div>
        )}
        {reqEntries.length > 0 && (
          <div className="identity__unlock">
            <span className="identity__unlock-tag">Unlock · Stat Requirements</span>
            <div className="identity__reqs-list">
              {reqEntries.map(([k, v]) => (
                <span key={k} className="reqchip"><b>{k}</b>{v}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OverviewTab({ sub, cls }) {
  const hasStats = !!sub.stats;
  return (
    <div className="tabpane">
      <div className={"overview" + (hasStats ? "" : " overview--nostats")}>
        <div className="overview__text">
          <Divider label="Description" accent={cls.accent} />
          <p className="lore">{sub.description}</p>
          {sub.worldNotes && (
            <div className="worldnotes">
              <div className="worldnotes__label">World Notes</div>
              <p className="worldnotes__text">{sub.worldNotes}</p>
            </div>
          )}
          {sub.tutorial && (
            <React.Fragment>
              <Divider label={`Lore · ${sub.tutorial.setting}`} accent={cls.accent} />
              <p className="loretab__intro">{sub.tutorial.intro}</p>
              <blockquote className="loretab__quote" style={{ "--acc": cls.accent }}>
                <span className="loretab__mark">“</span>
                {sub.tutorial.quote}
              </blockquote>
            </React.Fragment>
          )}
        </div>
        {hasStats && (
          <div className="overview__stats">
            <Divider label="Growth" accent={cls.accent} />
            <div className="radar-wrap">
              <Radar stats={sub.stats} statKeys={STAT_KEYS} accent={cls.accent} />
              <div className="radar-cap">Stat growth per level</div>
            </div>
            <StatTable stats={sub.stats} statKeys={STAT_KEYS} statNames={STAT_NAMES} accent={cls.accent} />
          </div>
        )}
      </div>
    </div>
  );
}

function AbilitiesTab({ sub, cls }) {
  const total = sub.abilities.Major.length + sub.abilities.Move.length + sub.abilities.Minor.length;
  const cs = sub.classSkills || [];
  return (
    <div className="tabpane">
      {sub.mechanic && (
        <div className="mechanic mechanic--feature" style={{ "--acc": cls.accent }}>
          <div className="mechanic__label">Defining Mechanic · {sub.mechanic.name}</div>
          <p className="mechanic__text">{sub.mechanic.text}</p>
        </div>
      )}
      {cs.length > 0 && (
        <React.Fragment>
          <Divider label={`Class Skills · ${cs.length}`} accent={cls.accent} />
          <ClassSkills skills={cs} accent={cls.accent} />
        </React.Fragment>
      )}
      {total > 0 && (
        <React.Fragment>
          <Divider label={`Ability Pool · ${total} known`} accent={cls.accent} />
          <Abilities abilities={sub.abilities} accent={cls.accent} />
        </React.Fragment>
      )}
    </div>
  );
}

// ── Concepts (base-class mechanic pillars) ───────────────────────────────────
function ConceptsTab({ sub, cls }) {
  const concepts = sub.concepts || [];
  const rich = concepts.some((c) => c.text);
  return (
    <div className="tabpane">
      {sub.character && (
        <div className="concept-exemplar" style={{ "--acc": cls.accent }}>
          <span className="concept-exemplar__label">Exemplar</span>
          <span className="concept-exemplar__name">{sub.character}</span>
        </div>
      )}
      <Divider label={`Core Concepts \u00b7 ${concepts.length}`} accent={cls.accent} />
      {rich ? (
        <div className="concepts">
          {concepts.map((c, i) => (
            <div className="concept" key={c.name + i} style={{ "--acc": cls.accent }}>
              <span className="concept__num">{String(i + 1).padStart(2, "0")}</span>
              <div className="concept__body">
                <h3 className="concept__name">{c.name}</h3>
                {c.text
                  ? <p className="concept__text">{c.text}</p>
                  : <p className="concept__pending">Detail pending transcription.</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <React.Fragment>
          <div className="conceptgrid">
            {concepts.map((c, i) => (
              <div className="conceptpill" key={c.name + i} style={{ "--acc": cls.accent }}>
                <span className="conceptpill__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="conceptpill__name">{c.name}</span>
              </div>
            ))}
          </div>
          <p className="concepts__note">The pillars of the {sub.name}’s kit. Full breakdowns are being transcribed — Spellsword is the first complete entry.</p>
        </React.Fragment>
      )}
    </div>
  );
}

function PassivesTab({ sub, cls }) {
  return (
    <div className="tabpane">
      {sub.capstone && <Capstone cap={sub.capstone} accent={cls.accent} />}
      {sub.skillTrees && (
        <React.Fragment>
          <Divider label="Slot Passives" accent={cls.accent} />
          <SkillTrees trees={sub.skillTrees} accent={cls.accent} />
        </React.Fragment>
      )}
      {sub.passives && (
        <React.Fragment>
          <Divider label="Passive Aptitudes" accent={cls.accent} />
          <PassiveList passives={sub.passives} rarity={RARITY} />
        </React.Fragment>
      )}
    </div>
  );
}

// Which content tabs a given subclass can populate, in display order.
function tabsFor(sub) {
  const t = [];
  const abilTotal = sub.abilities ? (sub.abilities.Major.length + sub.abilities.Move.length + sub.abilities.Minor.length) : 0;
  if (sub.description || sub.stats || sub.tutorial) t.push({ id: "overview", label: "Overview", comp: OverviewTab });
  if (sub.concepts && sub.concepts.length) t.push({ id: "concepts", label: "Concepts", comp: ConceptsTab });
  if ((sub.classSkills && sub.classSkills.length) || abilTotal > 0) t.push({ id: "abilities", label: "Abilities", comp: AbilitiesTab });
  if (sub.capstone || sub.skillTrees || sub.passives) t.push({ id: "passives", label: "Passives", comp: PassivesTab });
  return t;
}

// ── Sealed (pending) codex ───────────────────────────────────────────────────
function SealedCodex({ sub, cls, onBack }) {
  const isDual = sub.kind === "dual";
  const kicker = isDual
    ? `${sub.c1} + ${sub.c2} · Dual Class`
    : sub.kind === "base"
      ? `${cls.name} · Base Class`
      : `${cls.name} · Tier ${romanize(sub.tier)}`;
  return (
    <div className="screen screen--codex sealed" style={{ "--acc": cls.accent }}>
      <button className="backbtn" onClick={onBack}>‹ {cls.name}</button>
      <div className="sealed__inner">
        {isDual && !sub.icon ? (
          <div className="sealed__art sealed__art--dual">
            <div className="dualcrest">
              <div className="dualcrest__one">
                {sub.c1Meta && sub.c1Meta.icon
                  ? <img src={sub.c1Meta.icon} alt={sub.c1} draggable="false" />
                  : <span style={{ color: (sub.c1Meta && sub.c1Meta.accent) || cls.accent }}>{(sub.c1 || "?")[0]}</span>}
              </div>
              <span className="dualcrest__plus" style={{ color: cls.accent }}>+</span>
              <div className="dualcrest__one">
                {sub.c2Meta && sub.c2Meta.icon
                  ? <img src={sub.c2Meta.icon} alt={sub.c2} draggable="false" />
                  : <span style={{ color: (sub.c2Meta && sub.c2Meta.accent) || cls.accent }}>{(sub.c2 || "?")[0]}</span>}
              </div>
            </div>
          </div>
        ) : (
          <div className="sealed__art">
            {sub.icon
              ? <img src={sub.icon} alt={sub.name} draggable="false" />
              : <span className="sealed__glyph" style={{ color: cls.accent }}>{sub.name[0]}</span>}
            <Corners accent={cls.accent} />
          </div>
        )}
        <div className="sealed__kicker" style={{ color: cls.accent }}>{kicker}</div>
        <h1 className="sealed__name">{sub.name}</h1>
        <div className="sealed__roles">{sub.role.map((r) => <RoleTag key={r} accent={cls.accent}>{r}</RoleTag>)}</div>
        {sub.blurb && <p className="sealed__blurb">{sub.blurb}</p>}
        <Divider accent={cls.accent} />
        <div className="sealed__msg">
          <span className="sealed__seal">✦</span>
          Codex entry pending transcription.
        </div>
      </div>
    </div>
  );
}

// ── Codex (full) ─────────────────────────────────────────────────────────────
function Codex({ sub, cls, layout, onBack }) {
  const tabs = tabsFor(sub);
  const [tab, setTab] = useStateS(tabs.length ? tabs[0].id : "overview");
  useEffectS(() => { const t = tabsFor(sub); setTab(t.length ? t[0].id : "overview"); }, [sub.id]);

  if (tabs.length === 0) return <SealedCodex sub={sub} cls={cls} onBack={onBack} />;

  const activeEntry = tabs.find((t) => t.id === tab) || tabs[0];
  const ActiveTab = activeEntry.comp;
  const nav = (
    <div className={"codex-tabs codex-tabs--" + layout}>
      {tabs.map((t) => (
        <button key={t.id}
          className={"codex-tab" + (tab === t.id ? " is-on" : "")}
          style={tab === t.id ? { color: cls.accent, borderColor: cls.accent } : null}
          onClick={() => setTab(t.id)}>{t.label}</button>
      ))}
    </div>
  );

  return (
    <div className={"screen screen--codex codex--" + layout} style={{ "--acc": cls.accent }}>
      {sub.bg && <div className="codex-bg" style={{ backgroundImage: `url("${sub.bg}")` }}></div>}
      <button className="backbtn backbtn--codex" onClick={onBack}>‹ {cls.name}</button>
      {layout === "atlas" ? (
        <div className="atlas">
          <aside className="atlas__rail">
            <IdentityCard sub={sub} cls={cls} layout="atlas" />
          </aside>
          <main className="atlas__main">
            {nav}
            <div className="atlas__scroll">
              <ActiveTab sub={sub} cls={cls} />
            </div>
          </main>
        </div>
      ) : (
        <div className="dossier">
          <IdentityCard sub={sub} cls={cls} layout="dossier" />
          {nav}
          <div className="dossier__scroll">
            <ActiveTab sub={sub} cls={cls} />
          </div>
        </div>
      )}
    </div>
  );
}

function romanize(n) {
  return ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][n] || String(n);
}

Object.assign(window, { ClassSelect, ClassPage, Codex });
