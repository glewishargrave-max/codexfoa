// ============================================================================
//  APP — state machine (class → subclass → codex) + Tweaks
// ============================================================================
const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "codexLayout": "atlas",
  "backdrop": "deep",
  "ornaments": true,
  "accentSource": "class"
}/*EDITMODE-END*/;

const BACKDROPS = {
  deep:     { bg: "#0a1310", glow: "rgba(111,191,122,0.05)" },
  obsidian: { bg: "#08090b", glow: "rgba(184,146,74,0.05)" },
  warm:     { bg: "#14100a", glow: "rgba(224,183,102,0.06)" },
};

function App() {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [view, setView] = useStateA("class");      // class | classpage | codex
  const [clsId, setClsId] = useStateA(null);
  const [entry, setEntry] = useStateA(null);       // selected codex entry (sub/base/dual)
  const [anim, setAnim] = useStateA("in");

  const cls = CLASSES.find((c) => c.id === clsId);

  // Force emerald accent if the user prefers a unified theme
  const themedCls = cls
    ? (tweaks.accentSource === "emerald" ? { ...cls, accent: "#6fbf7a" } : cls)
    : null;

  function transition(next) {
    setAnim("out");
    setTimeout(() => { next(); setAnim("in"); }, 180);
  }

  const pickClass = (c) => transition(() => { setClsId(c.id); setView("classpage"); });
  const pickEntry = (e) => transition(() => { setEntry(e); setView("codex"); });
  const pickBase  = () => transition(() => { setEntry(cls.baseEntry); setView("codex"); });
  const toClasses = () => transition(() => { setView("class"); });
  const toClassPage = () => transition(() => { setView("classpage"); });

  // Backdrop
  useEffectA(() => {
    const b = BACKDROPS[tweaks.backdrop] || BACKDROPS.deep;
    document.documentElement.style.setProperty("--bg", b.bg);
    document.documentElement.style.setProperty("--bg-glow", b.glow);
  }, [tweaks.backdrop]);

  useEffectA(() => {
    document.body.dataset.ornaments = tweaks.ornaments ? "on" : "off";
  }, [tweaks.ornaments]);

  return (
    <div className="stage">
      <div className={"viewport anim-" + anim}>
        {view === "class" && <ClassSelect onPick={pickClass} />}
        {view === "classpage" && themedCls && <ClassPage cls={themedCls} onPick={pickEntry} onPickDual={pickEntry} onPickBase={pickBase} onBack={toClasses} />}
        {view === "codex" && themedCls && entry && <Codex sub={entry} cls={themedCls} layout={tweaks.codexLayout} onBack={toClassPage} />}
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Codex Sheet" />
        <TweakRadio label="Layout" value={tweaks.codexLayout}
          options={[{ value: "atlas", label: "Atlas" }, { value: "dossier", label: "Dossier" }]}
          onChange={(v) => setTweak("codexLayout", v)} />
        <TweakSection label="Theme" />
        <TweakRadio label="Accent" value={tweaks.accentSource}
          options={[{ value: "class", label: "Class color" }, { value: "emerald", label: "Emerald" }]}
          onChange={(v) => setTweak("accentSource", v)} />
        <TweakRadio label="Backdrop" value={tweaks.backdrop}
          options={[{ value: "deep", label: "Deep" }, { value: "obsidian", label: "Obsidian" }, { value: "warm", label: "Warm" }]}
          onChange={(v) => setTweak("backdrop", v)} />
        <TweakToggle label="Corner ornaments" value={tweaks.ornaments}
          onChange={(v) => setTweak("ornaments", v)} />
      </TweaksPanel>
    </div>
  );
}

window.App = App;
