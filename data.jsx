// ============================================================================
//  CODEX DATA MODEL
//  - CLASSES: 16 classes, each with an accent gem + subclass list
//  - Archer is fully populated (real icons). Scout has the complete codex entry.
// ============================================================================

// Resource resolver: uses the bundler's inlined blob URL when present
// (window.__resources[id]), otherwise falls back to the relative path so the
// non-bundled file keeps working.
const RES = (id, path) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || path;

// Stat keys in canonical order (octagon for the radar)
const STAT_KEYS = ["Str", "Dex", "Int", "Wis", "End", "Wil", "Cha", "Luc"];
const STAT_NAMES = {
  Str: "Strength", Dex: "Dexterity", Int: "Intellect", Wis: "Wisdom",
  End: "Endurance", Wil: "Will", Cha: "Charm", Luc: "Luck",
};

// ── SCOUT — full entry ──────────────────────────────────────────────────────
const SCOUT = {
  id: "scout",
  name: "Scout",
  icon: RES("scout", "icons/scout.png"),
  tier: 1,
  code: "2",
  gender: "Male",
  deity: "Ipos",
  role: ["Opener", "Tempo", "Battlefield Control", "Ranged"],
  weapon: { name: "Short Bow", armor: "Light / Scout Leathers", style: "Ranged · Single & AoE", effect: "Initiative bonus — acts sooner in the first round." },
  unlock: { label: "Starting Subclass", detail: "Available from the Archer's first ascension." },
  bg: RES("scoutBg", "images/scout-bg.jpg"),
  blurb: "Acts early and effectively — seizing the battlefield before the first blow lands.",
  description:
    "An early-action specialist who seizes the opening of battle with scouted abilities that can only be used as the first action of a wave, then transform into a lesser related ability afterward. He builds aim quickly, attacks enemies at full health for bonus damage, and is difficult to eliminate before he gets to act.",
  worldNotes:
    "Scouts are an essential part of an enemy army, as only with knowledge of the enemy can success be found. The scouts prepare the battlefield to best support their army's success.",
  mechanic: {
    name: "Scouted Abilities",
    text:
      "Scouted abilities are more powerful only on the very first action of battle. After use, they downgrade permanently to a lesser version for the rest of that battle. The New Beginning capstone restores the scouted condition mid-battle if the Scout's momentum is high enough, allowing him to use the upgraded version again.",
  },
  // stat: [class, sub, req, growth]
  classSkills: [
    "Preliminary Action, Flank All",
    "Preliminary Action, Damage All",
    "Aim Switch, Follow Up Damage",
    "Aim Amount, First Attack",
    "Preliminary Action, Bleed All",
    "Preliminary Action, Stun All",
    "Aim Switch, Penetration",
    "Preliminary Action, Damage All",
    "Aim Amount, First Attack",
    "Aim Threshold, Sudden",
  ],
  stats: {
    Str: [2, 3, 54, 17],
    Dex: [4, 2, 58, 19],
    Int: [1, 1, 50, 6],
    Wis: [3, 4, 61, 23],
    End: [1, 4, 53, 16],
    Wil: [2, 3, 54, 16],
    Cha: [4, 2, 58, 20],
    Luc: [3, 1, 50, 13],
  },
  abilities: {
    Major: [
      ["Adroit Momentum", "Ranged attack with pinpoint and momentum enhancing accuracy."],
      ["Aimed Momentum", "Ranged attack that generates extra aim based on momentum."],
      ["Coordinated Shot", "Ranged attack with quick preparation that grants increased accuracy and damage to next attack versus target."],
      ["Delaying Jolt", "Ranged attack with delay against stunned target."],
      ["Flanking Shot", "Ranged attack that causes flanked."],
      ["Lay of the Land", "Ranged attack that enhances dodge of team based on aim."],
      ["Quickening Aim", "Ranged attack against single target that consumes aim to quicken self."],
      ["Rapid Vow", "Prepared ranged attack that determines target on preparation. Quickens scout on preparation and on use."],
      ["Scouted Arrow Burst", "Ranged attack against all enemies. Deals less damage and requires aim if not first turn.", true],
      ["Scouted Chink", "Full penetration ranged attack if first attack of battle. Can proc full penetration with ranged attack after.", true],
      ["Scouted Shot", "Ranged attack with momentum. Generates aim if first turn.", true],
      ["Speed Shot", "Ranged attack that requires momentum and grants aim and deals extra damage based on momentum."],
      ["Sudden Shot", "Ranged attack with sudden."],
      ["Supplemented Shot", "Ranged attack. Causes the target to take damage on the next x times it misses. Consumes aim."],
    ],
    Move: [
      ["Aimed Pursuit", "Follows hit, quickens ally and enhances accuracy based on aim on target."],
      ["Danger Warning", "Grants all allies enhanced dodge until next turn."],
      ["Momentum Arrow", "Ranged attack requiring momentum."],
      ["Scouted Positions", "Flanks and delays all enemies as first action. Otherwise flanks and delays single enemy.", true],
      ["Scouted Preparations", "Provides initial bonuses as a period enhancement to all allies on first turn. Otherwise only provides them until next turn.", true],
      ["Speed Screen", "Grants haste until next turn and generates aim, must be used as last action."],
    ],
    Minor: [
      ["Momentous Initiative", "Gain initial bonuses until beginning of next turn. Requires momentum."],
      ["Perilous Ground", "Follows ranged attack, flanks target."],
      ["Scouted Aim", "Alpha, generates aim. Also enhances accuracy and quickens self as first action.", true],
      ["Scouted Maneuvers", "Quicken all and remove flanked as first action. Otherwise only quickens and removes flanked from a single target.", true],
      ["Share Momentum", "Quicken all allies based on momentum."],
    ],
  },
  capstone: {
    name: "New Beginning",
    tag: "Momentum Modifier",
    text:
      "If momentum is high enough, gain initial bonuses on turn, including the ability to use scouted abilities.",
  },
  skillTrees: [
    {
      group: "Class Skills",
      skills: [
        ["Preliminary Action", "Flank All 1 · Damage All 5, 20 · Bleed All 11 · Stun All 15"],
        ["Aim Switch", "Follow Up Damage 6 · Penetration 16"],
        ["Aim Amount", "First Attack 10, 21"],
        ["Aim Threshold", "Sudden 24"],
      ],
    },
    {
      group: "Parent Skills",
      skills: [
        ["Momentum", "2"],
        ["Initial Effect", "7"],
        ["Full Team", "12"],
      ],
    },
    {
      group: "Effect Skills",
      skills: [
        ["Enhance Accuracy", "3"],
        ["Enhance Dodge", "4"],
        ["Countdown", "8"],
        ["Weaken Accuracy", "13"],
        ["Weaken Critical Chance", "17"],
      ],
    },
    {
      group: "Modifier Skills",
      skills: [
        ["Enchantment Power α", "9"],
        ["Weakness Power α", "14"],
        ["Enhance Power α", "18"],
        ["Threshold Modifier α", "19"],
        ["Weakness Power β", "22"],
        ["Enhance Power β", "23"],
      ],
    },
  ],
  passives: [
    ["Initiative", "U", "Initiative gives a unit a base timer value at the start of battles and waves.", "1/40 · 6/239 · 17/678 · 33/1315 · 54/2152"],
    ["Initial Damage", "G", "Initial damage increases the damage dealt by the unit’s first action of each wave.", "2/11 · 15/82 · 46/252"],
    ["Initial Defense", "G", "Initial defense reduces the damage taken by unit from each attack before its first action each wave.", "2/9 · 19/82 · 50/217"],
    ["Initial Dodge", "S", "Initial dodge reduces the chance for the unit to be hit by any attack before its first action each wave.", "8 · 36"],
    ["Momentum", "S", "Momentum increases the value of abilities with the momentum modifier, gaining increased power from counter above 1000.", "13 · 43"],
    ["Quickens", "S", "Quickens increases the quicken effect of any ability used by the unit.", "5 · 30"],
    ["Ranged Accuracy", "S", "Ranged accuracy increases the chance for the unit to hit with ranged attacks.", "3 · 22"],
    ["Alone Defense", "L", "Alone defense increases the defense of the unit when it is the last unit left alive.", "11"],
    ["Charm Mastery", "L", "Charm Mastery increases the adjusted value of charm by a percentage amount.  Mastery abilities do not affect acquisition of abilities.", "39"],
    ["Damage versus Flanked", "L", "Damage versus flanked increases the damage dealt to any enemy suffering from the flanked condition.", "27/119"],
    ["Initial Accuracy", "L", "Initial accuracy increases the chance to hit for the unit’s first action of each wave.", "4"],
    ["Reduced Delays", "L", "Reduced delays reduces the effect of any delays targeting the unit by a percentage.", "10"],
    ["Speed", "L", "Speed increases how often a unit gets to act.", "24/1.2"],
  ],
  tutorial: {
    setting: "Abyssal War",
    intro:
      "The Tutorial for the Scout class features an event from the Abyssal War, where a Concord scout was sent to prepare a battleground for the army.",
    quote:
      "The scout prepares for battles ahead of time, best exemplified by his scouted abilities. These abilities are more powerful than normal when used in the first round of combat. For example, Scouted Shot is an attack with momentum, but it also generates aim when used in the first turn. Scouted Positions flanks and delays all enemies in the first round, instead of a single enemy later. Scouted Aim helps generate aim, but also quickens and enhances accuracy as an initial action.",
  },
};

// Rarity legend for passive tags
const RARITY = {
  U: { label: "Unique", color: "#e0b766" },
  G: { label: "Greater", color: "#9b7bd0" },
  S: { label: "Standard", color: "#6fbf7a" },
  L: { label: "Lesser", color: "#8aa0b0" },
};

// ── Archer subclass icons (real art) ────────────────────────────────────────
const ARCHER_ICONS = {
  scout: RES("scout", "icons/scout.png"),
  huntsman: RES("huntsman", "icons/huntsman.png"),
  crossbowman: RES("crossbowman", "icons/crossbowman.png"),
  marksman: RES("marksman", "icons/marksman.png"),
  falconer: RES("falconer", "icons/falconer.png"),
  "bounty-hunter": RES("bountyHunter", "icons/bounty-hunter.png"),
  stalker: RES("stalker", "icons/stalker.png"),
  poacher: RES("poacher", "icons/poacher.png"),
  sharpshooter: RES("sharpshooter", "icons/sharpshooter.png"),
  toxophilite: RES("toxophilite", "icons/toxophilite.png"),
};

// ── Barbarian subclass icons (real art) ─────────────────────────────────────
const BARBARIAN_ICONS = {
  brute: RES("brute", "icons/brute.png"),
  raider: RES("raider", "icons/raider.png"),
  berserker: RES("berserker", "icons/berserker.png"),
  marauder: RES("marauder", "icons/marauder.png"),
  viking: RES("viking", "icons/viking.png"),
  vandal: RES("vandal", "icons/vandal.png"),
  fury: RES("fury", "icons/fury.png"),
  cannibal: RES("cannibal", "icons/cannibal.png"),
  destroyer: RES("destroyer", "icons/destroyer.png"),
  beastlord: RES("beastlord", "icons/beastlord.png"),
};

// ── Wizard subclass icons (real art) ────────────────────────────────────────
const WIZARD_ICONS = {
  elementalist: RES("wizElementalist", "icons/wizard/elementalist.png"),
  necromancer: RES("wizNecromancer", "icons/wizard/necromancer.png"),
  hydromancer: RES("wizHydromancer", "icons/wizard/hydromancer.png"),
  geomancer: RES("wizGeomancer", "icons/wizard/geomancer.png"),
  aeromancer: RES("wizAeromancer", "icons/wizard/aeromancer.png"),
  pyromancer: RES("wizPyromancer", "icons/wizard/pyromancer.png"),
  arcanist: RES("wizArcanist", "icons/wizard/arcanist.png"),
  solomancer: RES("wizSolomancer", "icons/wizard/solomancer.png"),
  incanter: RES("wizIncanter", "icons/wizard/incanter.png"),
  thaumaturge: RES("wizThaumaturge", "icons/wizard/thaumaturge.png"),
};

// ── Witch subclass icons (real art) ─────────────────────────────────────────
const WITCH_ICONS = {
  cultist: RES("witCultist", "icons/witch/cultist.png"),
  warlock: RES("witWarlock", "icons/witch/warlock.png"),
  effigist: RES("witEffigist", "icons/witch/effigist.png"),
  dustbringer: RES("witDustbringer", "icons/witch/dustbringer.png"),
  crone: RES("witCrone", "icons/witch/crone.png"),
  hedgemage: RES("witHedgemage", "icons/witch/hedgemage.png"),
  mambo: RES("witMambo", "icons/witch/mambo.png"),
  bokor: RES("witBokor", "icons/witch/bokor.png"),
  hag: RES("witHag", "icons/witch/hag.png"),
  malefax: RES("witMalefax", "icons/witch/malefax.png"),
};

// ── Bard subclass icons (real art) ──────────────────────────────────────────
const BARD_ICONS = {
  minstrel: RES("bardMinstrel", "icons/bard/minstrel.png"),
  jester: RES("bardJester", "icons/bard/jester.png"),
  "dirge-singer": RES("bardDirgeSinger", "icons/bard/dirge-singer.png"),
  balladeer: RES("bardBalladeer", "icons/bard/balladeer.png"),
  drummer: RES("bardDrummer", "icons/bard/drummer.png"),
  spy: RES("bardSpy", "icons/bard/spy.png"),
  mountebank: RES("bardMountebank", "icons/bard/mountebank.png"),
  diva: RES("bardDiva", "icons/bard/diva.png"),
  muse: RES("bardMuse", "icons/bard/muse.png"),
  "lantern-bearer": RES("bardLanternBearer", "icons/bard/lantern-bearer.png"),
};

// ── Binder subclass icons (real art) ────────────────────────────────────────
const BINDER_ICONS = {
  conjurer: RES("bndConjurer", "icons/binder/conjurer.png"),
  occultist: RES("bndOccultist", "icons/binder/occultist.png"),
  shaman: RES("bndShaman", "icons/binder/shaman.png"),
  medium: RES("bndMedium", "icons/binder/medium.png"),
  animist: RES("bndAnimist", "icons/binder/animist.png"),
  spiritualist: RES("bndSpiritualist", "icons/binder/spiritualist.png"),
  astrologer: RES("bndAstrologer", "icons/binder/astrologer.png"),
  vizier: RES("bndVizier", "icons/binder/vizier.png"),
  alienist: RES("bndAlienist", "icons/binder/alienist.png"),
  "pact-master": RES("bndPactMaster", "icons/binder/pact-master.png"),
};

// ── Cleric subclass icons (real art) ────────────────────────────────────────
const CLERIC_ICONS = {
  acolyte: RES("clrAcolyte", "icons/cleric/acolyte.png"),
  healer: RES("clrHealer", "icons/cleric/healer.png"),
  disciple: RES("clrDisciple", "icons/cleric/disciple.png"),
  priest: RES("clrPriest", "icons/cleric/priest.png"),
  "combat-medic": RES("clrCombatMedic", "icons/cleric/combat-medic.png"),
  exorcist: RES("clrExorcist", "icons/cleric/exorcist.png"),
  preacher: RES("clrPreacher", "icons/cleric/preacher.png"),
  zealot: RES("clrZealot", "icons/cleric/zealot.png"),
  "plague-doctor": RES("clrPlagueDoctor", "icons/cleric/plague-doctor.png"),
  oracle: RES("clrOracle", "icons/cleric/oracle.png"),
};

// ── Fighter subclass icons (real art) ───────────────────────────────────────
const FIGHTER_ICONS = {
  gladiator: RES("ftrGladiator", "icons/fighter/gladiator.png"),
  duelist: RES("ftrDuelist", "icons/fighter/duelist.png"),
  phalanx: RES("ftrPhalanx", "icons/fighter/phalanx.png"),
  dervish: RES("ftrDervish", "icons/fighter/dervish.png"),
  fencer: RES("ftrFencer", "icons/fighter/fencer.png"),
  lancer: RES("ftrLancer", "icons/fighter/lancer.png"),
  samurai: RES("ftrSamurai", "icons/fighter/samurai.png"),
  dreadnaught: RES("ftrDreadnaught", "icons/fighter/dreadnaught.png"),
  swashbuckler: RES("ftrSwashbuckler", "icons/fighter/swashbuckler.png"),
  warlord: RES("ftrWarlord", "icons/fighter/warlord.png"),
};

// ── Knight subclass icons (real art) ────────────────────────────────────────
const KNIGHT_ICONS = {
  bodyguard: RES("kntBodyguard", "icons/knight/bodyguard.png"),
  champion: RES("kntChampion", "icons/knight/champion.png"),
  hospitaler: RES("kntHospitaler", "icons/knight/hospitaler.png"),
  sentinel: RES("kntSentinel", "icons/knight/sentinel.png"),
  dragoon: RES("kntDragoon", "icons/knight/dragoon.png"),
  cavalier: RES("kntCavalier", "icons/knight/cavalier.png"),
  paragon: RES("kntParagon", "icons/knight/paragon.png"),
  blackguard: RES("kntBlackguard", "icons/knight/blackguard.png"),
  crusader: RES("kntCrusader", "icons/knight/crusader.png"),
  templar: RES("kntTemplar", "icons/knight/templar.png"),
};

// ── Monk subclass icons (real art) ──────────────────────────────────────────
const MONK_ICONS = {
  initiate: RES("mnkInitiate", "icons/monk/initiate.png"),
  pugilist: RES("mnkPugilist", "icons/monk/pugilist.png"),
  skirmisher: RES("mnkSkirmisher", "icons/monk/skirmisher.png"),
  vajra: RES("mnkVajra", "icons/monk/vajra.png"),
  stonefist: RES("mnkStonefist", "icons/monk/stonefist.png"),
  infiltrator: RES("mnkInfiltrator", "icons/monk/infiltrator.png"),
  "viper-fang": RES("mnkViperFang", "icons/monk/viper-fang.png"),
  ascetic: RES("mnkAscetic", "icons/monk/ascetic.png"),
  thunderfist: RES("mnkThunderfist", "icons/monk/thunderfist.png"),
  "drunken-master": RES("mnkDrunkenMaster", "icons/monk/drunken-master.png"),
};

// ── Psychic subclass icons (real art) ───────────────────────────────────────
const PSYCHIC_ICONS = {
  telepath: RES("psyTelepath", "icons/psychic/telepath.png"),
  kinetic: RES("psyKinetic", "icons/psychic/kinetic.png"),
  amnesiac: RES("psyAmnesiac", "icons/psychic/amnesiac.png"),
  hypnotist: RES("psyHypnotist", "icons/psychic/hypnotist.png"),
  diviner: RES("psyDiviner", "icons/psychic/diviner.png"),
  haunted: RES("psyHaunted", "icons/psychic/haunted.png"),
  mastermind: RES("psyMastermind", "icons/psychic/mastermind.png"),
  mindbleeder: RES("psyMindbleeder", "icons/psychic/mindbleeder.png"),
  chronomancer: RES("psyChronomancer", "icons/psychic/chronomancer.png"),
  "puppet-master": RES("psyPuppetMaster", "icons/psychic/puppet-master.png"),
};

// ── Reaper subclass icons (real art) ────────────────────────────────────────
const REAPER_ICONS = {
  buccaneer: RES("reaBuccaneer", "icons/reaper/buccaneer.png"),
  executioner: RES("reaExecutioner", "icons/reaper/executioner.png"),
  gravedigger: RES("reaGravedigger", "icons/reaper/gravedigger.png"),
  hangman: RES("reaHangman", "icons/reaper/hangman.png"),
  harbinger: RES("reaHarbinger", "icons/reaper/harbinger.png"),
  "sin-eater": RES("reaSinEater", "icons/reaper/sin-eater.png"),
  sandman: RES("reaSandman", "icons/reaper/sandman.png"),
  whisperer: RES("reaWhisperer", "icons/reaper/whisperer.png"),
  "mercy-bringer": RES("reaMercyBringer", "icons/reaper/mercy-bringer.png"),
  gaslighter: RES("reaGaslighter", "icons/reaper/gaslighter.png"),
};

// ── Rogue subclass icons (real art) ─────────────────────────────────────────
const ROGUE_ICONS = {
  bandit: RES("rogBandit", "icons/rogue/bandit.png"),
  cutthroat: RES("rogCutthroat", "icons/rogue/cutthroat.png"),
  burglar: RES("rogBurglar", "icons/rogue/burglar.png"),
  thief: RES("rogThief", "icons/rogue/thief.png"),
  acrobat: RES("rogAcrobat", "icons/rogue/acrobat.png"),
  assassin: RES("rogAssassin", "icons/rogue/assassin.png"),
  brigand: RES("rogBrigand", "icons/rogue/brigand.png"),
  smuggler: RES("rogSmuggler", "icons/rogue/smuggler.png"),
  skulk: RES("rogSkulk", "icons/rogue/skulk.png"),
  ninja: RES("rogNinja", "icons/rogue/ninja.png"),
};

// ── Spellsword subclass icons (real art) ────────────────────────────────────
const SPELLSWORD_ICONS = {
  blitzknecht: RES("splBlitzknecht", "icons/spellsword/blitzknecht.png"),
  feuerknecht: RES("splFeuerknecht", "icons/spellsword/feuerknecht.png"),
  drecknecht: RES("splDrecknecht", "icons/spellsword/drecknecht.png"),
  trinknecht: RES("splTrinknecht", "icons/spellsword/trinknecht.png"),
  mercenary: RES("splMercenary", "icons/spellsword/mercenary.png"),
  transmuter: RES("splTransmuter", "icons/spellsword/transmuter.png"),
  "force-weaver": RES("splForceWeaver", "icons/spellsword/force-weaver.png"),
  myrmidon: RES("splMyrmidon", "icons/spellsword/myrmidon.png"),
  nightblade: RES("splNightblade", "icons/spellsword/nightblade.png"),
  "sword-saint": RES("splSwordSaint", "icons/spellsword/sword-saint.png"),
};

// ── Runemage subclass icons (real art) ──────────────────────────────────────
const RUNEMAGE_ICONS = {
  abjurer: RES("runAbjurer", "icons/runemage/abjurer.png"),
  symbolist: RES("runSymbolist", "icons/runemage/symbolist.png"),
  cabalist: RES("runCabalist", "icons/runemage/cabalist.png"),
  hermit: RES("runHermit", "icons/runemage/hermit.png"),
  disenchanter: RES("runDisenchanter", "icons/runemage/disenchanter.png"),
  scrivener: RES("runScrivener", "icons/runemage/scrivener.png"),
  sage: RES("runSage", "icons/runemage/sage.png"),
  glyphic: RES("runGlyphic", "icons/runemage/glyphic.png"),
  cryptic: RES("runCryptic", "icons/runemage/cryptic.png"),
  sorcerer: RES("runSorcerer", "icons/runemage/sorcerer.png"),
};

// ── Teknixian subclass icons (real art) ─────────────────────────────────────
const TEKNIXIAN_ICONS = {
  scavenger: RES("tekScavenger", "icons/teknixian/scavenger.png"),
  alchemist: RES("tekAlchemist", "icons/teknixian/alchemist.png"),
  artificer: RES("tekArtificer", "icons/teknixian/artificer.png"),
  tinker: RES("tekTinker", "icons/teknixian/tinker.png"),
  engineer: RES("tekEngineer", "icons/teknixian/engineer.png"),
  bomber: RES("tekBomber", "icons/teknixian/bomber.png"),
  gunslinger: RES("tekGunslinger", "icons/teknixian/gunslinger.png"),
  savant: RES("tekSavant", "icons/teknixian/savant.png"),
  machinist: RES("tekMachinist", "icons/teknixian/machinist.png"),
  reliquarian: RES("tekReliquarian", "icons/teknixian/reliquarian.png"),
};

// ── Dual-class fused crests (real art), keyed by stable dual id ──────────────
const DUAL_ICONS = {
  "dual-psychic-wizard":  RES("dualIllusionist", "icons/duals/illusionist.png"),    // Illusionist
  "dual-runemage-witch":  RES("dualLoreKeeper", "icons/duals/lore-keeper.png"),     // Lore Keeper
  "dual-binder-cleric":   RES("dualInvoker", "icons/duals/invoker.png"),            // Invoker
  "dual-bard-reaper":     RES("dualPhantasm", "icons/duals/phantasm.png"),          // Phantasm
  "dual-witch-wizard":    RES("dualDiabolist", "icons/duals/diabolist.png"),        // Diabolist
  "dual-psychic-runemage":RES("dualFortuneTeller", "icons/duals/fortune-teller.png"),// Fortune Teller
  "dual-bard-binder":     RES("dualChanneler", "icons/duals/channeler.png"),        // Channeler
  "dual-cleric-reaper":   RES("dualScourge", "icons/duals/scourge.png"),            // Scourge
  "dual-runemage-wizard": RES("dualScholar", "icons/duals/scholar.png"),            // Scholar
  "dual-psychic-witch":   RES("dualSpellweaver", "icons/duals/spellweaver.png"),    // Spellweaver
  "dual-binder-reaper":   RES("dualNecrologist", "icons/duals/necrologist.png"),    // Necrologist
  "dual-bard-cleric":     RES("dualSonghealer", "icons/duals/songhealer.png"),      // Songhealer
  "dual-monk-teknixian": RES("dualDrifter", "icons/duals/drifter.png"),        // Drifter
  "dual-archer-rogue": RES("dualSniper", "icons/duals/sniper.png"),            // Sniper
  "dual-knight-spellsword": RES("dualExemplar", "icons/duals/exemplar.png"),   // Exemplar
  "dual-barbarian-fighter": RES("dualReaver", "icons/barbarian-duals/reaver.png"),       // Reaver
  "dual-archer-monk": RES("dualNomad", "icons/duals/nomad.png"),               // Nomad
  "dual-rogue-teknixian": RES("dualSaboteur", "icons/duals/saboteur.png"),    // Saboteur (Rogue + Teknixian)
  "dual-barbarian-knight": RES("dualOutrider", "icons/barbarian-duals/outrider.png"),    // Outrider
  "dual-fighter-spellsword": RES("dualWarblade", "icons/duals/warblade.png"),  // Warblade
  "dual-archer-teknixian": RES("dualSapper", "icons/duals/sapper.png"),         // Sapper (Archer + Teknixian)
  "dual-monk-rogue": RES("dualWildcat", "icons/duals/wildcat.png"),            // Wildcat
  "dual-barbarian-spellsword": RES("dualAncestral", "icons/barbarian-duals/ancestral-blade.png"), // Ancestral Blade
  "dual-fighter-knight": RES("dualWeaponMaster", "icons/duals/weapon-master.png"),      // Weapon Master

  // ── Batch 3–5 fused crests ─────────────────────────────────────────────────
  "dual-spellsword-teknixian": RES("dualShockTrooper", "icons/duals/shock-trooper.png"), // Shock Trooper
  "dual-rogue-witch":          RES("dualTrickster", "icons/duals/trickster.png"),         // Trickster
  "dual-reaper-rogue":         RES("dualVivisectionist", "icons/duals/vivisectionist.png"),// Vivisectionist
  "dual-cleric-psychic":       RES("dualVisionary", "icons/duals/visionary.png"),          // Visionary
  "dual-rogue-wizard":         RES("dualFilch", "icons/duals/filch.png"),                  // Filch
  "dual-knight-runemage":      RES("dualWarder", "icons/duals/warder.png"),                // Warder
  "dual-cleric-wizard":        RES("dualTheurge", "icons/duals/theurge.png"),              // Theurge
  "dual-runemage-teknixian":   RES("dualTrapsmith", "icons/duals/trapsmith.png"),          // Trapsmith
  "dual-knight-witch":         RES("dualWarden", "icons/duals/warden.png"),                // Warden
  "dual-knight-rogue":         RES("dualLiberator", "icons/duals/liberator.png"),          // Liberator
  "dual-runemage-spellsword":  RES("dualValkyrie", "icons/duals/valkyrie.png"),            // Valkyrie
  "dual-knight-monk":          RES("dualGuardian", "icons/duals/guardian.png"),            // Guardian
  "dual-cleric-knight":        RES("dualPaladin", "icons/duals/paladin.png"),              // Paladin
  "dual-knight-psychic":       RES("dualJudge", "icons/duals/judge.png"),                  // Judge
  "dual-fighter-rogue":        RES("dualSlayer", "icons/duals/slayer.png"),                // Slayer
  "dual-psychic-teknixian":    RES("dualMentalist", "icons/duals/mentalist.png"),          // Mentalist
  "dual-fighter-psychic":      RES("dualSybarite", "icons/duals/sybarite.png"),            // Sybarite
  "dual-rogue-spellsword":     RES("dualShadow", "icons/duals/shadow.png"),                // Shadow
  "dual-psychic-rogue":        RES("dualToxitician", "icons/duals/toxitician.png"),        // Toxitician
  "dual-fighter-runemage":     RES("dualRuneWarrior", "icons/duals/rune-warrior.png"),     // Rune Warrior
  "dual-monk-spellsword":      RES("dualKensai", "icons/duals/kensai.png"),                // Kensai
  "dual-teknixian-witch":      RES("dualHeretic", "icons/duals/heretic.png"),              // Heretic
  "dual-cleric-witch":         RES("dualFaithHealer", "icons/duals/faith-healer.png"),     // Faith Healer
  "dual-monk-psychic":         RES("dualDaevic", "icons/duals/daevic.png"),                // Daevic
  "dual-fighter-wizard":       RES("dualEldritchWarrior", "icons/duals/eldritch-warrior.png"), // Eldritch Warrior
  "dual-knight-teknixian":     RES("dualMusketeer", "icons/duals/musketeer.png"),          // Musketeer
  "dual-monk-runemage":        RES("dualFatalist", "icons/duals/fatalist.png"),            // Fatalist
  "dual-reaper-teknixian":     RES("dualKaotek", "icons/duals/kaotek.png"),                // Kaotek
  "dual-reaper-witch":         RES("dualFrightmaster", "icons/duals/frightmaster.png"),    // Frightmaster
  "dual-fighter-reaper":       RES("dualRonin", "icons/duals/ronin.png"),                  // Ronin
  "dual-psychic-spellsword":   RES("dualMindblade", "icons/duals/mindblade.png"),          // Mindblade
  "dual-cleric-runemage":      RES("dualGothi", "icons/duals/gothi.png"),                  // Gothi
  "dual-rogue-runemage":       RES("dualGrimalkin", "icons/duals/grimalkin.png"),          // Grimalkin
  "dual-cleric-teknixian":     RES("dualHerbalist", "icons/duals/herbalist.png"),          // Herbalist
  "dual-cleric-fighter":       RES("dualChaplain", "icons/duals/chaplain.png"),            // Chaplain (renamed from Warpriest)
  "dual-fighter-witch":        RES("dualRenegade", "icons/duals/renegade.png"),            // Renegade

  // ── Newly cut fusion sheets (Archer · Barbarian · Bard · Binder · Reaper) ──
  "dual-archer-fighter": RES("dualRanger", "icons/archer-duals/ranger.png"),
  "dual-archer-runemage": RES("dualBlackthorn", "icons/archer-duals/blackthorn.png"),
  "dual-archer-cleric": RES("dualInquisitor", "icons/archer-duals/inquisitor.png"),
  "dual-archer-spellsword": RES("dualArcaneArcher", "icons/archer-duals/arcane-archer.png"),
  "dual-archer-witch": RES("dualHexbow", "icons/archer-duals/hexbow.png"),
  "dual-archer-bard": RES("dualJuggler", "icons/archer-duals/juggler.png"),
  "dual-archer-knight": RES("dualJusticiar", "icons/archer-duals/justiciar.png"),
  "dual-archer-wizard": RES("dualSpiritGuide", "icons/archer-duals/spirit-guide.png"),
  "dual-archer-reaper": RES("dualDeadeye", "icons/archer-duals/deadeye.png"),
  "dual-archer-barbarian": RES("dualHurler", "icons/archer-duals/hurler.png"),
  "dual-archer-psychic": RES("dualBlindArcher", "icons/archer-duals/blind-archer.png"),
  "dual-archer-binder": RES("dualStargazer", "icons/archer-duals/stargazer.png"),
  "dual-barbarian-rogue": RES("dualThug", "icons/barbarian-duals/thug.png"),
  "dual-barbarian-binder": RES("dualBeastmaster", "icons/barbarian-duals/beastmaster.png"),
  "dual-barbarian-runemage": RES("dualTotemist", "icons/barbarian-duals/totemist.png"),
  "dual-barbarian-monk": RES("dualBearWarrior", "icons/barbarian-duals/bear-warrior.png"),
  "dual-barbarian-reaper": RES("dualBloodrager", "icons/barbarian-duals/bloodrager.png"),
  "dual-barbarian-witch": RES("dualSpelleater", "icons/barbarian-duals/spelleater.png"),
  "dual-barbarian-teknixian": RES("dualOutlaw", "icons/barbarian-duals/outlaw.png"),
  "dual-barbarian-cleric": RES("dualMartyr", "icons/barbarian-duals/martyr.png"),
  "dual-barbarian-wizard": RES("dualPrimalist", "icons/barbarian-duals/primalist.png"),
  "dual-barbarian-bard": RES("dualSkald", "icons/barbarian-duals/skald.png"),
  "dual-barbarian-psychic": RES("dualRageMage", "icons/barbarian-duals/rage-mage.png"),
  "dual-binder-wizard": RES("dualShair", "icons/barbarian-duals/shair.png"),
  "dual-bard-psychic": RES("dualMesmerist", "icons/bard-duals/mesmerist.png"),
  "dual-bard-fighter": RES("dualBravo", "icons/bard-duals/bravo.png"),
  "dual-bard-teknixian": RES("dualEnchanter", "icons/bard-duals/enchanter.png"),
  "dual-bard-wizard": RES("dualSongmage", "icons/bard-duals/songmage.png"),
  "dual-bard-knight": RES("dualHerald", "icons/bard-duals/herald.png"),
  "dual-spellsword-wizard": RES("dualMagus", "icons/bard-duals/magus.png"),
  "dual-bard-runemage": RES("dualCartomancer", "icons/bard-duals/cartomancer.png"),
  "dual-bard-spellsword": RES("dualSongblade", "icons/bard-duals/songblade.png"),
  "dual-bard-monk": RES("dualDancer", "icons/bard-duals/dancer.png"),
  "dual-bard-witch": RES("dualBlasphemer", "icons/bard-duals/blasphemer.png"),
  "dual-monk-wizard": RES("dualShifu", "icons/bard-duals/shifu.png"),
  "dual-bard-rogue": RES("dualChameleon", "icons/bard-duals/chameleon.png"),
  "dual-binder-runemage": RES("dualSummoner", "icons/binder-duals/summoner.png"),
  "dual-teknixian-wizard": RES("dualTechnomancer", "icons/binder-duals/technomancer.png"),
  "dual-binder-monk": RES("dualEsoteric", "icons/binder-duals/esoteric.png"),
  "dual-binder-witch": RES("dualDemonologist", "icons/binder-duals/demonologist.png"),
  "dual-binder-fighter": RES("dualSynergist", "icons/binder-duals/synergist.png"),
  "dual-binder-rogue": RES("dualSilhouette", "icons/binder-duals/silhouette.png"),
  "dual-binder-psychic": RES("dualConduit", "icons/binder-duals/conduit.png"),
  "dual-binder-knight": RES("dualGeneral", "icons/binder-duals/general.png"),
  "dual-binder-teknixian": RES("dualEnigma", "icons/binder-duals/enigma.png"),
  "dual-fighter-teknixian": RES("dualArsenalist", "icons/binder-duals/arsenalist.png"),
  "dual-binder-spellsword": RES("dualMystic", "icons/binder-duals/mystic.png"),
  "dual-knight-wizard": RES("dualTactician", "icons/binder-duals/tactician.png"),
  "dual-reaper-wizard": RES("dualBloodMage", "icons/reaper-duals/blood-mage.png"),
  "dual-reaper-spellsword": RES("dualBloodBlade", "icons/reaper-duals/blood-blade.png"),
  "dual-spellsword-witch": RES("dualHexblade", "icons/reaper-duals/hexblade.png"),
  "dual-reaper-runemage": RES("dualHarrower", "icons/reaper-duals/harrower.png"),
  "dual-cleric-spellsword": RES("dualDivineBlade", "icons/reaper-duals/divine-blade.png"),
  "dual-cleric-monk": RES("dualAvenger", "icons/reaper-duals/avenger.png"),
  "dual-fighter-monk": RES("dualBrawler", "icons/reaper-duals/brawler.png"),
  "dual-monk-witch": RES("dualHellion", "icons/reaper-duals/hellion.png"),
  "dual-cleric-rogue": RES("dualCharlatan", "icons/reaper-duals/charlatan.png"),
  "dual-psychic-reaper": RES("dualDreamstalker", "icons/reaper-duals/dreamstalker.png"),
  "dual-knight-reaper": RES("dualGhostrider", "icons/reaper-duals/ghostrider.png"),
  "dual-monk-reaper": RES("dualGhostfacedKiller", "icons/reaper-duals/ghostfaced-killer.png"),
};

// ── 16 Classes — metadata (gem accent, role, crest icon, blurb) ─────────────
const CLASS_META = [
  { id: "archer",    name: "Archer",    glyph: "A", accent: "#6fbf7a", role: "Striker",     icon: RES("clsArcher","icons/classes/archer.png"),         blurb: "Masters of distance, tempo, and the prepared shot." },
  { id: "barbarian", name: "Barbarian", glyph: "B", accent: "#c2463b", role: "Defender",  icon: RES("clsBarbarian","icons/classes/barbarian.png"),   blurb: "Raw fury that grows with every wound taken." },
  { id: "bard",      name: "Bard",      glyph: "B", accent: "#b07ad0", role: "Leader",    icon: RES("clsBard","icons/classes/bard.png"),             blurb: "Songs that hearten allies and unmake foes." },
  { id: "binder",    name: "Binder",    glyph: "B", accent: "#45c2c8", role: "Leader",   icon: RES("clsBinder","icons/classes/binder.png"),         blurb: "Pacts with bound spirits and lesser fiends." },
  { id: "cleric",    name: "Cleric",    glyph: "C", accent: "#e0a93a", role: "Leader",     icon: RES("clsCleric","icons/classes/cleric.png"),         blurb: "Divine mending and the wrath of the faithful." },
  { id: "fighter",   name: "Fighter",   glyph: "F", accent: "#aeb6c0", role: "Defender",    icon: RES("clsFighter","icons/classes/fighter.png"),       blurb: "Disciplined steel — adaptable, relentless." },
  { id: "knight",    name: "Knight",    glyph: "K", accent: "#5b8fd0", role: "Defender",   icon: RES("clsKnight","icons/classes/knight.png"),         blurb: "The unbreakable line; protector of the host." },
  { id: "monk",      name: "Monk",      glyph: "M", accent: "#d6a23f", role: "Striker",    icon: RES("clsMonk","icons/classes/monk.png"),             blurb: "Channelled ki and the perfected strike." },
  { id: "psychic",   name: "Psychic",   glyph: "P", accent: "#9a6fd0", role: "Controller",  icon: RES("clsPsychic","icons/classes/psychic.png"),       blurb: "Bends the mind and the field of battle." },
  { id: "reaper",    name: "Reaper",    glyph: "R", accent: "#9a7ab8", role: "Leader",      icon: RES("clsReaper","icons/classes/reaper.png"),         blurb: "Harvests the dying; shepherds the fallen." },
  { id: "rogue",     name: "Rogue",     glyph: "R", accent: "#9472c4", role: "Striker",   icon: RES("clsRogue","icons/classes/rogue.png"),           blurb: "Shadow, poison, and the opportune blade." },
  { id: "runemage",  name: "Runemage",  glyph: "R", accent: "#4fb4c8", role: "Controller",      icon: RES("clsRunemage","icons/classes/runemage.png"),     blurb: "Inscribes power into lasting sigils." },
  { id: "spellsword",name: "Spellsword",glyph: "S", accent: "#5b9fd8", role: "Defender",     icon: RES("clsSpellsword","icons/classes/spellsword.png"), blurb: "Blade and spell woven into one art." },
  { id: "teknixian", name: "Teknixian", glyph: "T", accent: "#46b0a0", role: "Leader",  icon: RES("clsTeknixian","icons/classes/teknixian.png"),   blurb: "Clockwork, alchemy, and arcane machinery." },
  { id: "witch",     name: "Witch",     glyph: "W", accent: "#a06fc0", role: "Controller",      icon: RES("clsWitch","icons/classes/witch.png"),           blurb: "Curses, brews, and the old wild magics." },
  { id: "wizard",    name: "Wizard",    glyph: "W", accent: "#5b8fd0", role: "Controller",     icon: RES("clsWizard","icons/classes/wizard.png"),         blurb: "Scholarly mastery of the elemental weave." },
];

// ── Curated role tags, distilled from each subclass's archetype description ──
// Keyed by classId → subclass id. 3–4 short play-pattern tags apiece, in the
// spirit of the Scout's hand-authored set (timing/role/pattern + range or melee).
// Where a class isn't listed yet, the subclass falls back to its weapon name.
// Controlled vocabulary (one concept = one token):
//   Delivery — Ranged · Melee · Caster · Hybrid
//   Role     — Striker · Defender · Support · Controller · Healer · Summoner
//   Pattern  — Opener · Tempo · Late Game · Scaling · Burst · Sustained ·
//              Multi-Target · Single-Target · Penetration · Heavy Hitter ·
//              Stealth · Mobility · Setup · Combo · Battlefield Control ·
//              Disruption · Debuff · Affliction · Marks · Buffs · Self-Sustain ·
//              High Risk · Reactive · Counter · Executioner · Payoff ·
//              Resource · Bleed · Poison · Companion
// Classes with no codex description yet (Knight, Spellsword, Reaper, Runemage)
// are intentionally absent and fall back to their weapon name.
const SUBCLASS_ROLES = {
  archer: {
    scout:           ["Opener", "Tempo", "Battlefield Control", "Ranged"],
    huntsman:        ["Ranged", "Penetration", "Single-Target", "Scaling"],
    crossbowman:     ["Ranged", "Defender", "Heavy Hitter", "Penetration"],
    marksman:        ["Ranged", "Support", "Marks", "Penetration"],
    falconer:        ["Ranged", "Companion", "Setup", "Disruption"],
    "bounty-hunter": ["Ranged", "Marks", "Debuff", "Payoff"],
    stalker:         ["Ranged", "Stealth", "Burst", "Single-Target"],
    poacher:         ["Ranged", "Executioner", "Reactive", "Burst"],
    sharpshooter:    ["Ranged", "Multi-Target", "High Risk", "Penetration"],
    toxophilite:     ["Ranged", "Buffs", "Scaling", "Late Game"],
  },
  monk: {
    initiate:          ["Melee", "Striker", "Burst", "Setup"],
    pugilist:          ["Melee", "Striker", "Single-Target", "Sustained"],
    skirmisher:        ["Melee", "Striker", "Tempo", "Bleed"],
    vajra:             ["Melee", "Defender", "Counter", "Disruption"],
    stonefist:         ["Melee", "Defender", "Tank", "Counter"],
    infiltrator:       ["Melee", "Stealth", "Burst", "Tempo"],
    "viper-fang":      ["Melee", "Striker", "Poison", "Sustained"],
    ascetic:           ["Melee", "Striker", "Burst", "Self-Sustain"],
    thunderfist:       ["Melee", "Striker", "Combo", "Disruption"],
    "drunken-master":  ["Melee", "Striker", "High Risk", "Counter"],
  },
  rogue: {
    bandit:    ["Hybrid", "Striker", "Reactive", "Burst"],
    cutthroat: ["Melee", "Striker", "Bleed", "Sustained"],
    burglar:   ["Melee", "Striker", "Burst", "Debuff"],
    thief:     ["Melee", "Striker", "Debuff", "Self-Sustain"],
    acrobat:   ["Melee", "Defender", "Reactive", "Mobility"],
    assassin:  ["Melee", "Executioner", "Single-Target", "Marks"],
    brigand:   ["Ranged", "Striker", "High Risk", "Payoff"],
    smuggler:  ["Melee", "Support", "Stealth", "Poison"],
    skulk:     ["Melee", "Defender", "Disruption", "Counter"],
    ninja:     ["Melee", "Striker", "Stealth", "Tempo"],
  },
  teknixian: {
    scavenger:    ["Ranged", "Support", "High Risk", "Resource"],
    alchemist:    ["Caster", "Healer", "Poison", "Setup"],
    artificer:    ["Caster", "Support", "Setup", "Resource"],
    tinker:       ["Caster", "Companion", "Setup", "Disruption"],
    engineer:     ["Caster", "Support", "Buffs", "Companion"],
    bomber:       ["Caster", "Striker", "Multi-Target", "High Risk"],
    gunslinger:   ["Ranged", "Striker", "Burst", "Debuff"],
    savant:       ["Caster", "Controller", "Affliction", "Late Game"],
    machinist:    ["Caster", "Companion", "Setup", "Heavy Hitter"],
    reliquarian:  ["Caster", "Buffs", "Scaling", "Late Game"],
  },
  barbarian: {
    brute:     ["Melee", "Defender", "Tank", "Resource"],
    raider:    ["Melee", "Defender", "Burst", "Counter"],
    berserker: ["Melee", "Striker", "High Risk", "Disruption"],
    marauder:  ["Melee", "Striker", "Executioner", "Scaling"],
    viking:    ["Melee", "Defender", "Setup", "Heavy Hitter"],
    vandal:    ["Melee", "Striker", "Scaling", "Late Game"],
    fury:      ["Melee", "Striker", "Tempo", "Self-Sustain"],
    cannibal:  ["Melee", "Striker", "Self-Sustain", "Single-Target"],
    destroyer: ["Melee", "Striker", "Heavy Hitter", "Debuff"],
    beastlord: ["Melee", "Striker", "Multi-Target", "High Risk"],
  },
  bard: {
    minstrel:         ["Caster", "Support", "Buffs", "Healer"],
    jester:           ["Caster", "Controller", "Disruption", "High Risk"],
    "dirge-singer":   ["Caster", "Striker", "Sustained", "Executioner"],
    balladeer:        ["Caster", "Support", "Affliction", "Scaling"],
    drummer:          ["Caster", "Support", "Buffs", "Disruption"],
    spy:              ["Caster", "Support", "Stealth", "Setup"],
    mountebank:       ["Caster", "Striker", "Stealth", "Burst"],
    diva:             ["Caster", "Support", "Buffs", "Tank"],
    muse:             ["Caster", "Healer", "Buffs", "Reactive"],
    "lantern-bearer": ["Caster", "Support", "Buffs", "Battlefield Control"],
  },
  binder: {
    conjurer:      ["Caster", "Summoner", "Companion", "Buffs"],
    occultist:     ["Caster", "Controller", "Counter", "Disruption"],
    shaman:        ["Caster", "Support", "Companion", "Payoff"],
    medium:        ["Caster", "Controller", "Burst", "Setup"],
    animist:       ["Caster", "Summoner", "Companion", "Healer"],
    spiritualist:  ["Caster", "Striker", "High Risk", "Scaling"],
    astrologer:    ["Caster", "Striker", "Scaling", "Self-Sustain"],
    vizier:        ["Caster", "Controller", "Affliction", "High Risk"],
    alienist:      ["Caster", "Striker", "High Risk", "Scaling"],
    "pact-master": ["Caster", "Summoner", "Companion", "High Risk"],
  },
  cleric: {
    acolyte:         ["Caster", "Healer", "Support", "Resource"],
    healer:          ["Caster", "Healer", "Buffs", "Sustained"],
    disciple:        ["Caster", "Defender", "Counter", "Self-Sustain"],
    priest:          ["Caster", "Striker", "Buffs", "Counter"],
    "combat-medic":  ["Caster", "Healer", "Reactive", "Single-Target"],
    exorcist:        ["Caster", "Striker", "Disruption", "Single-Target"],
    preacher:        ["Caster", "Controller", "Battlefield Control", "Disruption"],
    zealot:          ["Melee", "Support", "Tempo", "Buffs"],
    "plague-doctor": ["Caster", "Controller", "Affliction", "High Risk"],
    oracle:          ["Caster", "Support", "Buffs", "Late Game"],
  },
  fighter: {
    gladiator:    ["Melee", "Striker", "High Risk", "Burst"],
    duelist:      ["Melee", "Defender", "Counter", "Single-Target"],
    phalanx:      ["Melee", "Defender", "Tank", "Counter"],
    dervish:      ["Melee", "Striker", "Tempo", "Combo"],
    fencer:       ["Melee", "Striker", "Single-Target", "Disruption"],
    lancer:       ["Melee", "Striker", "Multi-Target", "Penetration"],
    samurai:      ["Melee", "Striker", "Opener", "High Risk"],
    dreadnaught:  ["Melee", "Defender", "Tank", "Counter"],
    swashbuckler: ["Melee", "Defender", "Counter", "Disruption"],
    warlord:      ["Melee", "Support", "Buffs", "Tempo"],
  },
  psychic: {
    telepath:        ["Caster", "Controller", "Disruption", "Single-Target"],
    kinetic:         ["Caster", "Striker", "Multi-Target", "Reactive"],
    amnesiac:        ["Caster", "Controller", "Disruption", "Debuff"],
    hypnotist:       ["Caster", "Controller", "Battlefield Control", "Sustained"],
    diviner:         ["Caster", "Support", "Setup", "Debuff"],
    haunted:         ["Caster", "Striker", "Executioner", "Stealth"],
    mastermind:      ["Caster", "Support", "Tempo", "Buffs"],
    mindbleeder:     ["Caster", "Striker", "High Risk", "Scaling"],
    chronomancer:    ["Caster", "Controller", "Tempo", "Disruption"],
    "puppet-master": ["Caster", "Controller", "Disruption", "Single-Target"],
  },
  witch: {
    cultist:     ["Caster", "Support", "Debuff", "Buffs"],
    warlock:     ["Caster", "Striker", "Multi-Target", "Affliction"],
    effigist:    ["Caster", "Striker", "Affliction", "Penetration"],
    dustbringer: ["Caster", "Controller", "Affliction", "Late Game"],
    crone:       ["Caster", "Controller", "Disruption", "Resource"],
    hedgemage:   ["Caster", "Controller", "Affliction", "High Risk"],
    mambo:       ["Caster", "Support", "Buffs", "Self-Sustain"],
    bokor:       ["Caster", "Summoner", "Companion", "Scaling"],
    hag:         ["Caster", "Controller", "Affliction", "Late Game"],
    malefax:     ["Caster", "Controller", "Affliction", "Battlefield Control"],
  },
  wizard: {
    elementalist: ["Caster", "Striker", "Scaling", "Buffs"],
    necromancer:  ["Caster", "Summoner", "Companion", "Scaling"],
    hydromancer:  ["Caster", "Controller", "Battlefield Control", "Multi-Target"],
    geomancer:    ["Caster", "Defender", "Buffs", "Debuff"],
    aeromancer:   ["Caster", "Striker", "Multi-Target", "High Risk"],
    pyromancer:   ["Caster", "Striker", "Multi-Target", "Sustained"],
    arcanist:     ["Caster", "Striker", "Burst", "Resource"],
    solomancer:   ["Caster", "Support", "Buffs", "Disruption"],
    incanter:     ["Caster", "Controller", "Counter", "Disruption"],
    thaumaturge:  ["Caster", "Striker", "Scaling", "Late Game"],
  },
};

// Normalize a generated subclass record into the shape the UI consumes.
function normalizeSub(g, classId) {
  const out = Object.assign({ kind: "subclass" }, g);
  const curated = SUBCLASS_ROLES[classId] && SUBCLASS_ROLES[classId][out.id];
  if (!out.role && curated) out.role = curated;
  if (!out.role) out.role = out.weapon && out.weapon.name ? [out.weapon.name] : ["Tier " + (out.tier || 1)];
  if (classId === "archer" && ARCHER_ICONS[out.id]) out.icon = ARCHER_ICONS[out.id];
  if (classId === "barbarian" && BARBARIAN_ICONS[out.id]) out.icon = BARBARIAN_ICONS[out.id];
  if (classId === "wizard" && WIZARD_ICONS[out.id]) out.icon = WIZARD_ICONS[out.id];
  if (classId === "witch" && WITCH_ICONS[out.id]) out.icon = WITCH_ICONS[out.id];
  if (classId === "bard" && BARD_ICONS[out.id]) out.icon = BARD_ICONS[out.id];
  if (classId === "binder" && BINDER_ICONS[out.id]) out.icon = BINDER_ICONS[out.id];
  if (classId === "cleric" && CLERIC_ICONS[out.id]) out.icon = CLERIC_ICONS[out.id];
  if (classId === "fighter" && FIGHTER_ICONS[out.id]) out.icon = FIGHTER_ICONS[out.id];
  if (classId === "knight" && KNIGHT_ICONS[out.id]) out.icon = KNIGHT_ICONS[out.id];
  if (classId === "monk" && MONK_ICONS[out.id]) out.icon = MONK_ICONS[out.id];
  if (classId === "psychic" && PSYCHIC_ICONS[out.id]) out.icon = PSYCHIC_ICONS[out.id];
  if (classId === "reaper" && REAPER_ICONS[out.id]) out.icon = REAPER_ICONS[out.id];
  if (classId === "rogue" && ROGUE_ICONS[out.id]) out.icon = ROGUE_ICONS[out.id];
  if (classId === "spellsword" && SPELLSWORD_ICONS[out.id]) out.icon = SPELLSWORD_ICONS[out.id];
  if (classId === "runemage" && RUNEMAGE_ICONS[out.id]) out.icon = RUNEMAGE_ICONS[out.id];
  if (classId === "teknixian" && TEKNIXIAN_ICONS[out.id]) out.icon = TEKNIXIAN_ICONS[out.id];
  return out;
}

const META_BY_NAME = {};
CLASS_META.forEach((m) => { META_BY_NAME[m.name] = m; });

const GEN = (typeof window !== "undefined" && window.CODEX_GEN) || { subByClass: {}, baseById: {}, duals: [] };

const CLASSES = CLASS_META.map((meta) => {
  // Subclasses
  let subs = (GEN.subByClass[meta.id] || []).map((g) => normalizeSub(g, meta.id));
  if (meta.id === "archer") {
    subs = subs.map((s) => (s.id === "scout" ? SCOUT : s));
    if (!subs.some((s) => s.id === "scout")) subs.unshift(SCOUT);
  }
  if (subs.length === 0) {
    subs = [{ id: meta.id + "-pending", kind: "subclass", name: "Entry Pending", tier: 1, role: ["\u2014"], blurb: "Codex entry pending transcription.", locked: true }];
  }

  // Base class entry — carries class identity; content fills in as the sheet grows
  const baseGen = GEN.baseById[meta.id] || {};
  const baseEntry = Object.assign({}, baseGen, {
    kind: "base",
    id: "base-" + meta.id,
    name: meta.name,
    icon: meta.icon,
    role: [meta.role],
    description: baseGen.description || meta.blurb,
    isBase: true,
  });

  // Dual classes for this class (15) — attach the partner's crest + accent
  const duals = (GEN.duals || [])
    .filter((d) => d.c1 === meta.name || d.c2 === meta.name)
    .map((d) => {
      const partnerName = d.c1 === meta.name ? d.c2 : d.c1;
      const pm = META_BY_NAME[partnerName] || {};
      return Object.assign({}, d, {
        kind: "dual",
        icon: DUAL_ICONS[d.id] || null,
        partnerName,
        partnerIcon: pm.icon || null,
        partnerAccent: pm.accent || meta.accent,
        role: [meta.name + " + " + partnerName],
        c1Meta: META_BY_NAME[d.c1] || null,
        c2Meta: META_BY_NAME[d.c2] || null,
      });
    })
    .sort((a, b) => (a.tier - b.tier) || a.name.localeCompare(b.name));

  return Object.assign({}, meta, { subs, baseEntry, duals });
});

Object.assign(window, { CLASSES, SCOUT, STAT_KEYS, STAT_NAMES, RARITY, META_BY_NAME });
