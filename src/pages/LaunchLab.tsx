// ─────────────────────────────────────────────────────────────────────────────
// 观爻 1.0 · ENTRY MODEL —— /launch-lab
//
// User-facing entry language is locked to:
// 走过黑夜的人，会留下光的痕迹。
//
// This page may retain its existing visual machinery, but no user-facing copy
// should introduce legacy onboarding, alternate lore, or secondary myths.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  drawEntryCardRenderer,
  getEntryCardRendererRect,
  type EntryCardRendererOptions,
} from "../components/entry/EntryCardRenderer";
import { GyMobilePreviewFrame } from "../components/visual/GyMobilePreviewFrame";
import { PressureSeedCrossAxisPage, type PressureSeedCrossAxisSeed } from "./PressureSeedCrossAxisPage";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { getEntryUserType } from "../runtime/entry/entryDecision";
import { buildSelectedPressureSeedContext } from "../services/guanyaoPressureSeedSceneBindingService";
import {
  buildTripleForceLandingResult,
  getTripleForceFrontStage,
} from "../services/guanyaoTripleForceLandingService";
import { getPressureSeedSceneTriplet } from "../services/guanyaoPressureSeedSceneBindingService";

const SANS = "-apple-system, system-ui, sans-serif";
const MONO = "SFMono-Regular, Menlo, Monaco, Consolas, monospace";

// Visual points retain the existing motion layout; user-facing meaning remains
// 光痕 -> 光兽 -> 镜面。
const NODES: { x: number; y: number; z: number; big?: boolean }[] = [
  { x: 0.0, y: 0.22, z: 0.0, big: true }, // 0 吻（最近，朝你）
  { x: 0.0, y: -0.04, z: 0.1 }, // 1 头顶
  { x: -0.15, y: -0.18, z: 0.14 }, // 2 左耳
  { x: 0.15, y: -0.18, z: 0.14 }, // 3 右耳
  { x: 0.0, y: 0.05, z: 0.26 }, // 4 颈（点头支点）
  { x: 0.0, y: 0.12, z: 0.42 }, // 5 颈2
  { x: 0.0, y: 0.16, z: 0.5, big: true }, // 6 肩/胸
  { x: 0.0, y: 0.0, z: 0.72 }, // 7 背1
  { x: 0.0, y: -0.05, z: 0.98 }, // 8 背2
  { x: 0.0, y: 0.04, z: 1.22, big: true }, // 9 髋
  { x: 0.02, y: -0.06, z: 1.36 }, // 10 尾1
  { x: 0.06, y: -0.22, z: 1.48 }, // 11 尾2
  { x: 0.1, y: -0.42, z: 1.55 }, // 12 尾3
  { x: 0.12, y: -0.62, z: 1.58, big: true }, // 13 尾尖
  { x: -0.2, y: 0.3, z: 0.48 }, // 14 左前·肩
  { x: -0.26, y: 0.6, z: 0.44 }, // 15 左前·膝
  { x: -0.24, y: 0.92, z: 0.4 }, // 16 左前·爪
  { x: 0.2, y: 0.3, z: 0.48 }, // 17 右前·肩
  { x: 0.26, y: 0.6, z: 0.44 }, // 18 右前·膝
  { x: 0.24, y: 0.92, z: 0.4 }, // 19 右前·爪
  { x: -0.17, y: 0.32, z: 1.15 }, // 20 左后·髋
  { x: -0.21, y: 0.6, z: 1.14 }, // 21 左后·膝
  { x: -0.19, y: 0.9, z: 1.12 }, // 22 左后·爪
  { x: 0.17, y: 0.32, z: 1.15 }, // 23 右后·髋
  { x: 0.21, y: 0.6, z: 1.14 }, // 24 右后·膝
  { x: 0.19, y: 0.9, z: 1.12 }, // 25 右后·爪
  { x: 0.0, y: 0.42, z: 0.52 }, // 26 胸口
  { x: 0.0, y: 0.3, z: 0.85 }, // 27 腹
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [1, 3], [2, 3], [0, 4], [1, 4],
  [4, 5], [5, 6], [6, 7], [7, 8], [8, 9],
  [9, 10], [10, 11], [11, 12], [12, 13],
  [6, 14], [14, 15], [15, 16],
  [6, 17], [17, 18], [18, 19],
  [9, 20], [20, 21], [21, 22],
  [9, 23], [23, 24], [24, 25],
  [6, 26], [26, 27], [27, 9], [14, 26], [17, 26],
];

const CFG = {
  voidMs: 3.6,
  convergeMs: 6.0,
  cyFrac: 0.46,
  scaleFrac: 0.62,
  starfield: 420,
  focal: 2.4, // 透视焦距（越小纵深越夸张）
  zMid: 2.6, // 汇聚成形时的景深（在宇宙深处）
  zNear: 0.35, // 走到你面前的景深
  yaw: 0.3, // 偏航：正面朝你 + 一点 3/4 立体
};

// 步态：四条腿错峰迈步（对角行走）。索引→{相位, 深度:爪>膝>肩}
const GAIT: Record<number, { ph: number; depth: number }> = {
  14: { ph: 0, depth: 0 }, 15: { ph: 0, depth: 0.5 }, 16: { ph: 0, depth: 1 },
  17: { ph: 0.5, depth: 0 }, 18: { ph: 0.5, depth: 0.5 }, 19: { ph: 0.5, depth: 1 },
  20: { ph: 0.75, depth: 0 }, 21: { ph: 0.75, depth: 0.5 }, 22: { ph: 0.75, depth: 1 },
  23: { ph: 0.25, depth: 0 }, 24: { ph: 0.25, depth: 0.5 }, 25: { ph: 0.25, depth: 1 },
};
const TAILS = new Set([10, 11, 12, 13]);
const BODY = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 26, 27]);

const COLOR = {
  bg: "#070512",
  warm: "#E8C88A",
  warmBright: "#FFF3D0",
  field: "230,236,255", // 星河 = 冷白（阴·散光）
  nebula: "120,70,120",
  text: "#F4ECD8",
};

// Visual tone only; user-facing meaning remains pressure transformation.
const PAL = {
  coolWhite: [230, 236, 255] as [number, number, number],
  gold: [232, 200, 138] as [number, number, number],
  cream: [255, 243, 208] as [number, number, number],
};
function mixRGB(a: [number, number, number], b: [number, number, number], t: number) {
  return `${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))}`;
}

function clamp(v: number, a: number, b: number) {
  return Math.min(Math.max(v, a), b);
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function smooth(e0: number, e1: number, x: number) {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

type FieldStar = { x: number; y: number; r: number; ph: number; sp: number; vx: number; vy: number };
type TextStar = { tx: number; ty: number; ox: number; oy: number; ph: number; sp: number; line: number };
type LaunchState =
  | "starfield_idle"
  | "28_lunar_assembly"
  | "beast_formation"
  | "beast_approach"
  | "recognition_ready"
  | "starbeast_sandify"
  | "axis_emergence"
  | "time_calibration"
  | "geo_bind"
  | "display_lock"
  | "entry_pre_collapse"
  | "entry_light_convergence"
  | "entry_static_render";

const STATE = {
  STARFIELD_IDLE: "starfield_idle",
  ASSEMBLY: "28_lunar_assembly",
  FORMATION: "beast_formation",
  APPROACH: "beast_approach",
  READY: "recognition_ready",
  STARBEAST_SANDIFY: "starbeast_sandify",
  AXIS_EMERGENCE: "axis_emergence",
  TIME_CALIBRATION: "time_calibration",
  GEO_BIND: "geo_bind",
  DISPLAY_LOCK: "display_lock",
  ENTRY_PRE_COLLAPSE: "entry_pre_collapse",
  ENTRY_LIGHT_CONVERGENCE: "entry_light_convergence",
  ENTRY_STATIC_RENDER: "entry_static_render",
} as const;

const TOP_LINES = ["走过黑夜的人，会留下光的痕迹。", "这些光，正在慢慢汇聚成深空中的“光兽”。"];
const CTA_LINE = "唤醒它，照见你的样子";
const ENTRY_HANDOFF_DELAY_MS = 700;
const PRESSURE_SEED_AUTO_RESOLVE_MS = 2400;
const RAIL_COMMIT_THRESHOLD = 0.72;
const PERIOD_LABELS = ["子时", "丑时", "寅时", "卯时", "辰时", "巳时", "午时", "未时", "申时", "酉时", "戌时", "亥时"];
const CHRONO_DIMS = ["year", "month", "day", "hour"] as const;
type ChronoDim = (typeof CHRONO_DIMS)[number];
type GeoDim = "province" | "city";
type ChronoCoords = { year: number; month: number; day: number; hour: number };
type EntryTransitionSnapshot = EntryCardRendererOptions["snapshot"];
type LaunchInteractionState =
  | "ENTRY"
  | "PRESSURE_CANVAS_ACTIVE"
  | "SEED_SELECTED"
  | "SNAPSHOT_GENERATED"
  | "DYNAMICS_HANDOFF";
const DIM_LABEL: Record<ChronoDim, string> = { year: "压力入口", month: "状态映射", day: "转化刻度", hour: "资产预备" };
const DIM_STAGE_LABEL: Record<ChronoDim, string> = { year: "当前压力", month: "状态层级", day: "转化位置", hour: "资产入口" };
const GEO_DIMS = ["province", "city"] as const;
const GEO_LABEL: Record<GeoDim, string> = { province: "压力场", city: "转化场" };
const PROVINCE_OPTIONS = [
  "北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北",
  "湖南", "广东", "广西", "海南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "香港", "澳门", "台湾",
];
const CITY_OPTIONS_BY_PROVINCE: Record<string, string[]> = {
  北京: ["东城区", "西城区", "朝阳区", "海淀区", "丰台区", "石景山区", "通州区", "昌平区", "大兴区", "顺义区"],
  天津: ["和平区", "河西区", "南开区", "河北区", "河东区", "红桥区", "滨海新区", "西青区", "津南区", "北辰区"],
  河北: ["石家庄", "唐山", "秦皇岛", "邯郸", "邢台", "保定", "张家口", "承德", "沧州", "廊坊", "衡水"],
  山西: ["太原", "大同", "阳泉", "长治", "晋城", "朔州", "晋中", "运城", "忻州", "临汾", "吕梁"],
  内蒙古: ["呼和浩特", "包头", "乌海", "赤峰", "通辽", "鄂尔多斯", "呼伦贝尔", "巴彦淖尔", "乌兰察布", "兴安盟"],
  辽宁: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦"],
  吉林: ["长春", "吉林", "四平", "辽源", "通化", "白山", "松原", "白城", "延边"],
  黑龙江: ["哈尔滨", "齐齐哈尔", "牡丹江", "佳木斯", "大庆", "鸡西", "双鸭山", "伊春", "七台河", "黑河"],
  上海: ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "浦东新区", "闵行区", "宝山区"],
  江苏: ["南京", "无锡", "徐州", "常州", "苏州", "南通", "连云港", "淮安", "盐城", "扬州", "镇江"],
  浙江: ["杭州", "宁波", "温州", "嘉兴", "湖州", "绍兴", "金华", "衢州", "舟山", "台州", "丽水"],
  安徽: ["合肥", "芜湖", "蚌埠", "淮南", "马鞍山", "淮北", "铜陵", "安庆", "黄山", "滁州", "阜阳"],
  福建: ["福州", "厦门", "莆田", "三明", "泉州", "漳州", "南平", "龙岩", "宁德"],
  江西: ["南昌", "景德镇", "萍乡", "九江", "新余", "鹰潭", "赣州", "吉安", "宜春", "抚州", "上饶"],
  山东: ["济南", "青岛", "淄博", "枣庄", "东营", "烟台", "潍坊", "济宁", "泰安", "威海", "临沂"],
  河南: ["郑州", "开封", "洛阳", "平顶山", "安阳", "鹤壁", "新乡", "焦作", "濮阳", "许昌", "南阳"],
  湖北: ["武汉", "黄石", "十堰", "宜昌", "襄阳", "鄂州", "荆门", "孝感", "荆州", "黄冈", "咸宁"],
  湖南: ["长沙", "株洲", "湘潭", "衡阳", "邵阳", "岳阳", "常德", "张家界", "益阳", "郴州", "永州"],
  广东: ["广州", "深圳", "珠海", "汕头", "佛山", "韶关", "湛江", "肇庆", "江门", "茂名", "惠州", "东莞"],
  广西: ["南宁", "柳州", "桂林", "梧州", "北海", "防城港", "钦州", "贵港", "玉林", "百色", "贺州"],
  海南: ["海口", "三亚", "三沙", "儋州", "五指山", "琼海", "文昌", "万宁", "东方"],
  重庆: ["渝中区", "江北区", "南岸区", "沙坪坝区", "九龙坡区", "渝北区", "巴南区", "北碚区", "涪陵区", "万州区"],
  四川: ["成都", "自贡", "攀枝花", "泸州", "德阳", "绵阳", "广元", "遂宁", "内江", "乐山", "宜宾"],
  贵州: ["贵阳", "六盘水", "遵义", "安顺", "毕节", "铜仁", "黔西南", "黔东南", "黔南"],
  云南: ["昆明", "曲靖", "玉溪", "保山", "昭通", "丽江", "普洱", "临沧", "楚雄", "红河", "大理"],
  西藏: ["拉萨", "日喀则", "昌都", "林芝", "山南", "那曲", "阿里"],
  陕西: ["西安", "铜川", "宝鸡", "咸阳", "渭南", "延安", "汉中", "榆林", "安康", "商洛"],
  甘肃: ["兰州", "嘉峪关", "金昌", "白银", "天水", "武威", "张掖", "平凉", "酒泉", "庆阳"],
  青海: ["西宁", "海东", "海北", "黄南", "海南州", "果洛", "玉树", "海西"],
  宁夏: ["银川", "石嘴山", "吴忠", "固原", "中卫"],
  新疆: ["乌鲁木齐", "克拉玛依", "吐鲁番", "哈密", "昌吉", "博尔塔拉", "巴音郭楞", "阿克苏", "喀什", "伊犁"],
  香港: ["中西区", "湾仔区", "东区", "南区", "油尖旺区", "深水埗区", "九龙城区", "观塘区", "荃湾区", "元朗区"],
  澳门: ["花地玛堂区", "圣安多尼堂区", "大堂区", "望德堂区", "风顺堂区", "嘉模堂区", "路氹填海区"],
  台湾: ["台北", "新北", "桃园", "台中", "台南", "高雄", "基隆", "新竹", "嘉义", "宜兰", "花莲", "台东"],
};
const DEFAULT_PROVINCE_INDEX = PROVINCE_OPTIONS.indexOf("广东");
const DEFAULT_CITY_INDEX = CITY_OPTIONS_BY_PROVINCE["广东"]?.indexOf("广州") ?? 0;

function pad2(v: number) {
  return String(v).padStart(2, "0");
}

function hourToPeriodIndex(hour: number) {
  return Math.floor((((hour + 1) % 24) + 24) % 24 / 2);
}

function hourToPeriodRange(hour: number) {
  const periodIndex = hourToPeriodIndex(hour);
  const start = (periodIndex * 2 + 23) % 24;
  const end = (start + 2) % 24;
  return `${pad2(start)}:00-${pad2(end)}:00`;
}

function dimRange(coords: ChronoCoords, dim: ChronoDim) {
  if (dim === "year") return { min: 1940, max: 2026 };
  if (dim === "month") return { min: 1, max: 12 };
  if (dim === "day") return { min: 1, max: new Date(coords.year, coords.month, 0).getDate() };
  return { min: 0, max: 23 };
}

function dimValue(coords: ChronoCoords, dim: ChronoDim) {
  return coords[dim];
}

function makeAudio() {
  let ctx: AudioContext | null = null;
  function ensure() {
    if (typeof window === "undefined") return null;
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AC) ctx = new AC();
    }
    if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  }
  function tone(freq: number, dur: number, gain: number, type: OscillatorType = "sine") {
    const c = ensure();
    if (!c) return;
    const t = c.currentTime;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.06);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.05);
  }
  function gather() {
    [196, 261.6, 392].forEach((f, i) => tone(f, 2.4, 0.05 - i * 0.01));
  }
  function form() {
    tone(392, 1.6, 0.07);
    tone(523.25, 2.0, 0.05);
    tone(784, 1.6, 0.03, "triangle");
  }
  function tick() {
    tone(880 + Math.random() * 220, 0.12, 0.025);
  }
  return { ensure, gather, form, tick };
}

function buildDeterministicPressureSeedCandidate(): PressureSeedCrossAxisSeed | undefined {
  const triplet = getPressureSeedSceneTriplet();
  const seed = triplet.seeds[0];
  if (!seed) return undefined;

  return {
    id: seed.id,
    num: "01",
    main: seed.surface,
    sub: seed.shell,
    seed,
    seedIndex: 1 as PressureSeedCrossAxisSeed["seedIndex"],
  };
}

export function LaunchLab() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const navigate = useNavigate();
  const [showPressureSeedCapture, setShowPressureSeedCapture] = useState(false);
  const [interactionState, setInteractionState] = useState<LaunchInteractionState>("ENTRY");
  const interactionStateRef = useRef<LaunchInteractionState>("ENTRY");

  const setLaunchInteractionState = useCallback((nextState: LaunchInteractionState) => {
    interactionStateRef.current = nextState;
    setInteractionState(nextState);
  }, []);

  const openPressureSeedCanvas = useCallback(() => {
    if (interactionStateRef.current !== "ENTRY") return;
    setLaunchInteractionState("PRESSURE_CANVAS_ACTIVE");
    setShowPressureSeedCapture(true);
  }, [setLaunchInteractionState]);

  const commitPressureSeedCapture = useCallback(
    (candidate: PressureSeedCrossAxisSeed | undefined) => {
      if (!candidate) return;
      setLaunchInteractionState("SEED_SELECTED");

      const selectedPressureSeedContext = buildSelectedPressureSeedContext(candidate.seed);
      const tripleForceLandingResult = buildTripleForceLandingResult(selectedPressureSeedContext);
      const tripleForceFrontStage = getTripleForceFrontStage(tripleForceLandingResult);

      window.localStorage.setItem("guanyao:selectedPressureSeedContext", JSON.stringify(selectedPressureSeedContext));
      window.localStorage.setItem("guanyao:tripleForceLandingResult", JSON.stringify(tripleForceLandingResult));
      window.localStorage.setItem("guanyao:tripleForceFrontStage", JSON.stringify(tripleForceFrontStage));
      window.localStorage.setItem("guanyao:selectedPressureSeedId", candidate.seed.id);
      window.localStorage.setItem("guanyao:selectedPressureSliceId", candidate.seed.id);
      window.localStorage.setItem("guanyao:selectedPressureSliceText", candidate.seed.surface);

      setLaunchInteractionState("SNAPSHOT_GENERATED");
      setLaunchInteractionState("DYNAMICS_HANDOFF");
      navigate(GUANYAO_ROUTES.dynamics);
    },
    [navigate, setLaunchInteractionState],
  );

  useEffect(() => {
    if (!showPressureSeedCapture || interactionState !== "PRESSURE_CANVAS_ACTIVE") return undefined;

    const timer = window.setTimeout(() => {
      if (interactionStateRef.current !== "PRESSURE_CANVAS_ACTIVE") return;
      commitPressureSeedCapture(buildDeterministicPressureSeedCandidate());
    }, PRESSURE_SEED_AUTO_RESOLVE_MS);

    return () => window.clearTimeout(timer);
  }, [commitPressureSeedCapture, interactionState, showPressureSeedCapture]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const audio = makeAudio();

    const m = {
      w: 0,
      h: 0,
      state: STATE.STARFIELD_IDLE as LaunchState,
      t: 0,
      pulsed: false,
      chaos: NODES.map(() => ({ ox: (Math.random() - 0.5) * 2.4, oy: (Math.random() - 0.5) * 2.4, oz: (Math.random() - 0.5) * 3.0, ph: Math.random() * 6.28, sp: 0.6 + Math.random() * 0.8 })),
      arrived: NODES.map(() => false),
      presentDone: false,
      gaitPhase: 0,
      walk: 0,
      field: [] as FieldStar[],
      textStars: [] as TextStar[],
      entryTransitionSnapshot: null as EntryTransitionSnapshot | null,
      pressureCanvasOpened: false,
      entryCardSide: "front" as "front" | "back",
      entryCardFlipTo: "front" as "front" | "back",
      entryCardFlipT: 1,
      afterForm: 0,
      formed: false,
      phaseX: 3,
      precisionY: 10,
      dwellT: 0,
      coords: { year: 1995, month: 6, day: 2, hour: 17 } as ChronoCoords,
      chronoStep: 0,
      geo: { provinceIndex: DEFAULT_PROVINCE_INDEX >= 0 ? DEFAULT_PROVINCE_INDEX : 0, cityIndex: DEFAULT_CITY_INDEX >= 0 ? DEFAULT_CITY_INDEX : 0 },
      geoStep: 0,
      dialFloat: 1995,
      railProgress: 0,
      clutched: false,
      handoffStarted: false,
      verticalTuned: false,
      verticalDragMoved: false,
      dragging: false,
      dragAxis: null as null | "x" | "y",
      lastX: 0,
      lastY: 0,
      fps: 0,
      fpsAcc: 0,
      fpsN: 0,
    };
    for (let i = 0; i < CFG.starfield; i++) {
      const isLunarMansion = i < NODES.length;
      m.field.push({
        x: Math.random(),
        y: Math.random(),
        r: isLunarMansion ? 1.35 + Math.random() * 0.65 : 0.45 + Math.random() * 1.0,
        ph: Math.random() * 6.28,
        sp: isLunarMansion ? 0.75 + Math.random() * 0.45 : 0.5 + Math.random(),
        vx: 0,
        vy: 0,
      });
    }

    function vibrate(p: number | number[]) {
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate(p);
    }
    function resize() {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = Math.max(1, Math.floor(rect.width * dpr));
      c.height = Math.max(1, Math.floor(rect.height * dpr));
      const ctx = c.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      m.w = rect.width;
      m.h = rect.height;
      buildTextStars();
    }

    function buildTextStars() {
      if (!m.w || !m.h) return;
      const size = Math.min(18, m.w * 0.046);
      const lines = [
        { text: TOP_LINES[0], y: m.h * 0.18, weight: 600 },
        { text: TOP_LINES[1], y: m.h * 0.23, weight: 600 },
        { text: CTA_LINE, y: m.h * 0.82, weight: 700 },
      ];
      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.floor(m.w));
      off.height = Math.max(1, Math.floor(m.h));
      const o = off.getContext("2d");
      if (!o) return;
      o.textAlign = "center";
      o.textBaseline = "middle";
      const gap = 5;
      const stars: TextStar[] = [];
      lines.forEach((line, li) => {
        o.clearRect(0, 0, off.width, off.height);
        o.fillStyle = "#fff";
        o.font = `${line.weight} ${size}px ${SANS}`;
        o.fillText(line.text, m.w / 2, line.y);
        const data = o.getImageData(0, 0, off.width, off.height).data;
        for (let y = 0; y < off.height; y += gap) {
          for (let x = 0; x < off.width; x += gap) {
            if (data[(y * off.width + x) * 4 + 3]! > 128) {
              const source = m.field[NODES.length + (stars.length % Math.max(1, m.field.length - NODES.length))] ?? m.field[stars.length % m.field.length];
              stars.push({
                tx: x,
                ty: y,
                ox: source ? source.x * m.w : Math.random() * m.w,
                oy: source ? source.y * m.h : Math.random() * m.h,
                ph: Math.random() * 6.28,
                sp: 0.6 + Math.random(),
                line: li,
              });
            }
          }
        }
      });
      m.textStars = stars;
    }

    function nodeConv(i: number) {
      // 每颗星的汇聚进度（错峰）
      const start = (i / NODES.length) * (CFG.convergeMs * 0.55);
      return smooth(start, start + 1.2, m.t);
    }
    function isAxisState() {
      return m.state === STATE.AXIS_EMERGENCE ||
        m.state === STATE.TIME_CALIBRATION ||
        m.state === STATE.GEO_BIND ||
        m.state === STATE.DISPLAY_LOCK;
    }
    function isConvergenceState() {
      return m.state === STATE.ENTRY_PRE_COLLAPSE || m.state === STATE.ENTRY_LIGHT_CONVERGENCE;
    }
    function isEntryStaticState() {
      return m.state === STATE.ENTRY_STATIC_RENDER;
    }
    function axisMetrics() {
      const cols = 7;
      const rows = 21;
      const cw = Math.min(m.w, 440);
      const cl = (m.w - cw) / 2;
      const railX0 = cl + cw * 0.06;
      const railX1 = cl + cw * 0.92;
      const axisX = cl + cw * 0.74;
      const axisTop = m.h * 0.3;
      const axisBottom = m.h * 0.84;
      const railY = m.h * 0.78;
      return { cols, rows, cl, cw, railX0, railX1, axisX, axisTop, axisBottom, railY };
    }
    function axisPoint(col: number, row: number) {
      const g = axisMetrics();
      return {
        x: lerp(g.railX0, g.railX1, col / (g.cols - 1)),
        y: lerp(g.axisTop, g.axisBottom, row / (g.rows - 1)),
      };
    }
    function railPoint(col: number) {
      const g = axisMetrics();
      return { x: lerp(g.railX0, g.railX1, col / (g.cols - 1)), y: g.railY };
    }
    function tunePoint(row: number) {
      const g = axisMetrics();
      return { x: g.axisX, y: lerp(g.axisTop, g.axisBottom, row / (g.rows - 1)) };
    }
    function activeDim(): ChronoDim {
      return CHRONO_DIMS[m.chronoStep] ?? "hour";
    }
    function setDimValue(dim: ChronoDim, value: number) {
      void dim;
      const { min, max } = dimRange(m.coords, dim);
      const v = Math.round(clamp(value, min, max));
      m.coords[dim] = v;
      if (dim === "month") {
        const dayMax = dimRange(m.coords, "day").max;
        m.coords.day = Math.min(m.coords.day, dayMax);
      }
    }
    function dimText(dim: ChronoDim, value: number) {
      const v = Math.round(value);
      if (dim === "year") return `压力入口 ${String(v).slice(-2)}`;
      if (dim === "month") return `状态映射 ${pad2(v)}`;
      if (dim === "day") return `转化刻度 ${pad2(v)}`;
      return `资产预备 ${pad2(clamp(v, 0, 23))}`;
    }
    function activeGeoDim(): GeoDim {
      return GEO_DIMS[m.geoStep] ?? "city";
    }
    function geoOptions(dim: GeoDim) {
      if (dim === "province") return PROVINCE_OPTIONS;
      const province = PROVINCE_OPTIONS[m.geo.provinceIndex] ?? "广东";
      return CITY_OPTIONS_BY_PROVINCE[province] ?? ["广州"];
    }
    function geoRange(dim: GeoDim) {
      return { min: 0, max: Math.max(0, geoOptions(dim).length - 1) };
    }
    function geoValue(dim: GeoDim) {
      return dim === "province" ? m.geo.provinceIndex : m.geo.cityIndex;
    }
    function setGeoValue(dim: GeoDim, value: number) {
      const { min, max } = geoRange(dim);
      const v = Math.round(clamp(value, min, max));
      if (dim === "province") {
        const changed = m.geo.provinceIndex !== v;
        m.geo.provinceIndex = v;
        if (changed) m.geo.cityIndex = 0;
      } else {
        m.geo.cityIndex = v;
      }
    }
    function geoText(dim: GeoDim, value: number) {
      const index = Math.round(clamp(value, 0, Math.max(0, geoOptions(dim).length - 1)));
      return dim === "province" ? `压力场 ${pad2(index + 1)}` : `转化场 ${pad2(index + 1)}`;
    }
    function buildEntryTransitionSnapshot(): EntryTransitionSnapshot {
      return {
        chrono: "光痕已显现",
        direction: "光兽汇聚",
        trigram: "镜面可进入",
        cacheStatus: "missing",
        entryCode: "光痕",
        entrySource: "镜面",
      } as unknown as EntryTransitionSnapshot;
    }
    function blockLegacyEntryExecution() {
      return;
    }
    function syncDialToCurrent() {
      const rangeOwner = m.state === STATE.GEO_BIND ? activeGeoDim() : activeDim();
      m.dialFloat = m.state === STATE.GEO_BIND
        ? geoValue(rangeOwner as GeoDim)
        : dimValue(m.coords, rangeOwner as ChronoDim);
      const { min, max } = m.state === STATE.GEO_BIND
        ? geoRange(rangeOwner as GeoDim)
        : dimRange(m.coords, rangeOwner as ChronoDim);
      const frac = max > min ? (m.dialFloat - min) / (max - min) : 0;
      m.precisionY = max > min ? Math.round((1 - frac) * 20) : 10;
    }
    function triggerEntryTransition() {
      if (m.handoffStarted) return;
      m.handoffStarted = true;
      window.setTimeout(() => {
        if (m.pressureCanvasOpened) return;
        m.pressureCanvasOpened = true;
        openPressureSeedCanvas();
      }, ENTRY_HANDOFF_DELAY_MS);
    }
    function routeEntryFromBeastClick() {
      const type = getEntryUserType();
      const routeMode = type === "NEW_USER" ? "ORIGINAL_COORDINATE_LOADING" : "PRESSURE_SEED_LOADING";

      console.log("ENTRY_DECISION", type);
      console.log("ROUTE_MODE", routeMode);

      if (type === "NEW_USER") {
        m.state = STATE.STARBEAST_SANDIFY;
        m.t = 0;
        audio.form();
        vibrate([0, 18, 24]);
        return;
      }

      openPressureSeedCanvas();
    }
    function completeEntryCanvasHandoff() {
      if (m.handoffStarted) return;
      m.railProgress = 1;
      m.phaseX = 6;
      m.clutched = true;
      m.entryTransitionSnapshot = m.entryTransitionSnapshot ?? buildEntryTransitionSnapshot();
      m.state = STATE.DISPLAY_LOCK;
      m.t = 0;
      audio.form();
      vibrate([0, 18, 24]);
      blockLegacyEntryExecution();
      triggerEntryTransition();
    }
    function commitCurrentDim() {
      if (m.clutched) return;
      if (m.state === STATE.GEO_BIND) {
        const geoDim = activeGeoDim();
        setGeoValue(geoDim, m.dialFloat);
        completeEntryCanvasHandoff();
        return;
      }

      const dim = activeDim();
      setDimValue(dim, m.dialFloat);
      completeEntryCanvasHandoff();
    }
    function headAngle(tp: number) {
      const settle = smooth(0.6, 2.6, tp) * 0.05; // 缓缓侧头看你
      let nod = 0;
      const nodStart = 1.8;
      if (tp > nodStart) {
        const ph = (tp - nodStart) % 6.5; // 每隔几秒，轻轻点一次头（老朋友打招呼）
        if (ph < 1.0) nod = Math.sin(ph * Math.PI) * 0.18;
      }
      return settle + nod;
    }
    function nodePos(i: number) {
      const formedLike =
        m.state === STATE.FORMATION ||
        m.state === STATE.APPROACH ||
        m.state === STATE.READY ||
        m.state === STATE.STARBEAST_SANDIFY ||
        isAxisState();
      const present =
        m.state === STATE.APPROACH ||
        m.state === STATE.READY ||
        m.state === STATE.STARBEAST_SANDIFY ||
        isAxisState();
      const conv = formedLike ? 1 : nodeConv(i);
      const n = NODES[i]!;
      const t = performance.now() / 1000;
      // 全局景深：宇宙深处(zMid) → 缓缓推近你面前(zNear)
      const approachDepth =
        m.state === STATE.APPROACH || m.state === STATE.READY
          ? smooth(0.3, 4.6, m.t)
          : m.state === STATE.STARBEAST_SANDIFY || isAxisState()
            ? 1
            : 0;
      const zApproach = lerp(CFG.zMid, CFG.zNear, approachDepth);
      let X = n.x;
      let Y = n.y;
      let Z = n.z;
      // 点头：头部（吻/头/耳）绕颈(节点4)在 Y-Z 平面俯仰 → 朝你颔首
      if (i <= 3 && present) {
        const ang = headAngle(m.t) * m.walk;
        const pv = NODES[4]!;
        const dy = Y - pv.y;
        const dz = Z - pv.z;
        Y = pv.y + dy * Math.cos(ang) - dz * Math.sin(ang);
        Z = pv.z + dy * Math.sin(ang) + dz * Math.cos(ang);
      }
      // 步态：四腿朝你迈步(Z 前后) + 抬腿(Y)
      const g = GAIT[i];
      if (g && present) {
        const ph = m.gaitPhase + g.ph * Math.PI * 2;
        Z += -Math.cos(ph) * 0.1 * g.depth * m.walk;
        Y += -Math.max(0, Math.sin(ph)) * 0.08 * g.depth * m.walk;
      }
      if (TAILS.has(i) && present) {
        X += Math.sin(m.gaitPhase * 0.7 - i * 0.5) * 0.04 * m.walk;
        Y += -Math.abs(Math.sin(m.gaitPhase * 0.7)) * 0.03 * m.walk;
      }
      if (BODY.has(i) && present) {
        Y += -Math.abs(Math.sin(m.gaitPhase)) * 0.02 * m.walk; // 身子起伏
      }
      // 偏航：正面朝你 + 一点点 3/4 立体 + 缓慢微摆
      const yaw = CFG.yaw + Math.sin(t * 0.25) * 0.04;
      const zc = Z - 0.55;
      const Xr = X * Math.cos(yaw) + zc * Math.sin(yaw);
      const Zr = -X * Math.sin(yaw) + zc * Math.cos(yaw) + 0.55;
      X = Xr;
      Z = Zr;
      // 透视投影
      Z = Math.max(0.05, Z + zApproach);
      const p = CFG.focal / (CFG.focal + Z);
      const scale = m.w * CFG.scaleFrac;
      const cx = m.w / 2;
      const cy = m.h * CFG.cyFrac;
      const breathe = present ? Math.sin(performance.now() / 1100 + i * 0.3) * 0.004 : 0;
      const targetX = cx + X * p * scale;
      const targetY = cy + (Y + breathe) * p * scale;
      const sourceStar = m.field[i];
      if (!formedLike && sourceStar) {
        return {
          x: lerp(sourceStar.x * m.w, targetX, conv),
          y: lerp(sourceStar.y * m.h, targetY, conv),
          conv,
          p,
        };
      }
      return { x: targetX, y: targetY, conv, p };
    }

    function isPointNearSegment(px: number, py: number, ax: number, ay: number, bx: number, by: number) {
      const dx = bx - ax;
      const dy = by - ay;
      const lenSq = dx * dx + dy * dy;
      if (lenSq <= 0.0001) return Math.hypot(px - ax, py - ay);
      const t = clamp(((px - ax) * dx + (py - ay) * dy) / lenSq, 0, 1);
      return Math.hypot(px - (ax + dx * t), py - (ay + dy * t));
    }

    function isBeastHit(x: number, y: number) {
      const pos = NODES.map((_, i) => nodePos(i));
      const nodeHit = pos.some((p) => Math.hypot(x - p.x, y - p.y) <= Math.max(22, p.p * 28));
      if (nodeHit) return true;
      return EDGES.some(([a, b]) => {
        const pa = pos[a]!;
        const pb = pos[b]!;
        return isPointNearSegment(x, y, pa.x, pa.y, pb.x, pb.y) <= 18;
      });
    }

    function step(dt: number) {
      m.t += dt;
      if (m.state === STATE.FORMATION || m.state === STATE.APPROACH || m.state === STATE.READY) {
        m.afterForm += dt;
      }
      // 步态时钟一直走（慢步 ~0.4Hz）；只在成形后逐渐"起步"
      m.gaitPhase += dt * 2.6;
      const targetWalk = m.state === STATE.APPROACH || m.state === STATE.READY ? 1 : 0;
      m.walk += (targetWalk - m.walk) * Math.min(1, dt * 1.4);
      if (m.entryCardFlipT < 1) {
        const prev = m.entryCardFlipT;
        m.entryCardFlipT = Math.min(1, m.entryCardFlipT + dt * 2.6);
        if (prev < 0.5 && m.entryCardFlipT >= 0.5) m.entryCardSide = m.entryCardFlipTo;
      }
      switch (m.state) {
        case STATE.STARFIELD_IDLE: {
          if (!m.pulsed && m.t > 0.16) {
            m.pulsed = true;
            vibrate([0, 12, 60]);
          }
          if (m.t >= CFG.voidMs) {
            m.state = STATE.ASSEMBLY;
            m.t = 0;
            audio.gather();
          }
          break;
        }
        case STATE.ASSEMBLY: {
          NODES.forEach((_, i) => {
            if (!m.arrived[i] && nodeConv(i) > 0.6) {
              m.arrived[i] = true;
              audio.tick();
            }
          });
          if (m.t >= CFG.convergeMs) {
            m.state = STATE.FORMATION;
            m.t = 0;
            if (!m.formed) {
              m.formed = true;
              audio.form();
              vibrate([0, 22, 40]);
            }
          }
          break;
        }
        case STATE.FORMATION: {
          if (m.t >= 1.4) {
            m.state = STATE.APPROACH;
            m.t = 0;
          }
          break;
        }
        case STATE.APPROACH: {
          if (m.t >= 5.0) {
            m.state = STATE.READY;
            m.t = 0;
            m.presentDone = true;
          }
          break;
        }
        case STATE.READY: {
          break;
        }
        case STATE.STARBEAST_SANDIFY: {
          if (m.t >= 1.25) {
            m.state = STATE.AXIS_EMERGENCE;
            m.t = 0;
          }
          break;
        }
        case STATE.AXIS_EMERGENCE: {
          if (m.t >= 1.35) {
            syncDialToCurrent();
            m.state = STATE.TIME_CALIBRATION;
            m.t = 0;
            m.dwellT = 0;
          }
          break;
        }
        case STATE.TIME_CALIBRATION: {
          if (!m.dragging && m.railProgress > 0) m.railProgress += (0 - m.railProgress) * Math.min(1, dt * 12);
          if (!m.dragging) m.clutched = false;
          break;
        }
        case STATE.GEO_BIND:
          break;
        case STATE.DISPLAY_LOCK: {
          if (m.handoffStarted && m.t >= 0.82) {
            m.state = STATE.ENTRY_PRE_COLLAPSE;
            m.t = 0;
          }
          break;
        }
        case STATE.ENTRY_PRE_COLLAPSE: {
          if (m.t >= 0.55) {
            m.state = STATE.ENTRY_LIGHT_CONVERGENCE;
            m.t = 0;
            audio.form();
            vibrate([0, 12, 18]);
          }
          break;
        }
        case STATE.ENTRY_LIGHT_CONVERGENCE: {
          if (m.t >= 1.05) {
            if (!m.entryTransitionSnapshot) {
              m.entryTransitionSnapshot = buildEntryTransitionSnapshot();
            }
            m.state = STATE.ENTRY_STATIC_RENDER;
            m.t = 0;
          }
          break;
        }
        case STATE.ENTRY_STATIC_RENDER: {
          break;
        }
      }
    }

    function draw(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, m.w, m.h);
      // 星河底（黑紫 + 极淡星云）
      ctx.fillStyle = COLOR.bg;
      ctx.fillRect(0, 0, m.w, m.h);
      const neb = ctx.createRadialGradient(m.w / 2, m.h * 0.5, 0, m.w / 2, m.h * 0.5, Math.max(m.w, m.h) * 0.7);
      neb.addColorStop(0, `rgba(${COLOR.nebula},0.1)`);
      neb.addColorStop(0.5, `rgba(${COLOR.nebula},0.03)`);
      neb.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = neb;
      ctx.fillRect(0, 0, m.w, m.h);
      const now = performance.now() / 1000;
      const convergenceActive = isConvergenceState();
      const entryStaticActive = isEntryStaticState();
      const axisActive = m.state === STATE.STARBEAST_SANDIFY || isAxisState() || convergenceActive;

      if (m.state === STATE.STARFIELD_IDLE) {
        m.field.forEach((s) => {
          const blink = Math.pow(0.5 + 0.5 * Math.sin(now * (2.2 + s.sp * 1.8) + s.ph), 2.2);
          const flare = Math.pow(Math.max(0, Math.sin(now * (0.9 + s.sp) + s.ph * 1.7)), 18);
          const a = Math.min(0.95, 0.16 + 0.34 * blink + flare * 0.38);
          ctx.fillStyle = `rgba(${COLOR.field},${a.toFixed(3)})`;
          ctx.shadowColor = "rgba(230,236,255,0.34)";
          ctx.shadowBlur = 2.5 + flare * 6;
          ctx.beginPath();
          ctx.arc(s.x * m.w, s.y * m.h, s.r * (0.78 + blink * 0.42 + flare * 0.55), 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        const topLineStarts = [0.35, 0.95];
        const topGather = 1.15;
        m.textStars.forEach((s, i) => {
          if (s.line > 1) return;
          const t0 = topLineStarts[s.line]!;
          const stagger = ((i % 19) / 19) * 0.35;
          const e = smooth(t0 + stagger, t0 + topGather + stagger, m.t);
          if (e <= 0.001) return;
          const x = lerp(s.ox, s.tx, e);
          const y = lerp(s.oy, s.ty, e);
          const tw = 0.65 + 0.35 * Math.sin(now * s.sp + s.ph);
          const solid = smooth(t0 + topGather - 0.1, t0 + topGather + 0.65, m.t);
          const a = e * 0.85 * tw * (1 - solid * 0.55);
          ctx.fillStyle = `rgba(${mixRGB(PAL.coolWhite, PAL.cream, e)},${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.1, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `600 ${Math.min(18, m.w * 0.046)}px ${SANS}`;
        const titleAlpha = smooth(1.35, 2.1, m.t);
        const subtitleAlpha = smooth(1.95, 2.75, m.t);
        if (titleAlpha > 0.001) {
          ctx.fillStyle = `rgba(255,247,228,${(titleAlpha * 0.95).toFixed(3)})`;
          ctx.fillText(TOP_LINES[0], m.w / 2, m.h * 0.18);
        }
        if (subtitleAlpha > 0.001) {
          ctx.fillStyle = `rgba(255,247,228,${(subtitleAlpha * 0.82).toFixed(3)})`;
          ctx.fillText(TOP_LINES[1], m.w / 2, m.h * 0.23);
        }
        ctx.restore();
        return;
      }

      // Visual points fill the field first; then the entry form and text resolve.
      const enter = m.state === STATE.STARBEAST_SANDIFY
        ? smooth(0.1, 1.25, m.t)
        : isAxisState()
          ? 1
          : convergenceActive
            ? 1
            : entryStaticActive
              ? 1
          : 0;
      const assemblyFade =
        m.state === STATE.ASSEMBLY
          ? 1 - smooth(CFG.convergeMs * 0.2, CFG.convergeMs, m.t) * 0.78
          : m.state === STATE.FORMATION || m.state === STATE.APPROACH || m.state === STATE.READY
              ? 0.2 * (1 - smooth(0.2, 3.0, m.afterForm)) + 0.035
              : 0.12;
      const fieldA = assemblyFade * (1 - enter * 0.55);
      m.field.forEach((s, i) => {
        const isLunarMansion = i < NODES.length;
        if (isLunarMansion && m.state !== STATE.STARFIELD_IDLE) return;
        if (m.state !== STATE.STARFIELD_IDLE && !isLunarMansion) {
          const thinning = m.state === STATE.ASSEMBLY
            ? smooth(CFG.convergeMs * 0.25, CFG.convergeMs, m.t)
            : smooth(0.2, 3.0, m.afterForm);
          const keepEvery = m.state === STATE.ASSEMBLY ? 1 + Math.floor(thinning * 2) : 4 + Math.floor(thinning * 8);
          if ((i - NODES.length) % keepEvery !== 0) return;
        }
        const blink = Math.pow(0.5 + 0.5 * Math.sin(now * (2.2 + s.sp * 1.8) + s.ph), 2.2);
        const flare = Math.pow(Math.max(0, Math.sin(now * (0.9 + s.sp) + s.ph * 1.7)), 18);
        const base = isLunarMansion ? 0.34 : 0.16;
        const pulse = isLunarMansion ? 0.48 : 0.34;
        const a = Math.min(0.95, base + pulse * blink + flare * 0.38) * fieldA;
        ctx.fillStyle = `rgba(${COLOR.field},${a.toFixed(3)})`;
        ctx.shadowColor = isLunarMansion ? "rgba(255,243,208,0.72)" : "rgba(230,236,255,0.34)";
        ctx.shadowBlur = (isLunarMansion ? 8 : 2.5) + flare * (isLunarMansion ? 12 : 6);
        ctx.beginPath();
        ctx.arc(s.x * m.w, s.y * m.h, s.r * (0.78 + blink * 0.42 + flare * 0.55), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      const pos = NODES.map((_, i) => {
        const p = nodePos(i);
        if (m.state !== STATE.STARBEAST_SANDIFY) return p;
        const k = smooth(0.05, 1.15, m.t);
        const gp = i % 2 === 0
          ? railPoint(i % 7)
          : tunePoint(Math.min(20, 2 + Math.floor(i / 7) * 5));
        return {
          ...p,
          x: lerp(p.x, gp.x, k),
          y: lerp(p.y, gp.y, k),
          conv: 1,
        };
      });
      const beastAlpha = m.state === STATE.STARBEAST_SANDIFY
        ? 1 - smooth(0.25, 1.18, m.t)
        : isAxisState()
          ? 0
          : 1;

      // 连线（两端都汇聚到位才显，亮度随汇聚）
      ctx.lineCap = "round";
      ctx.shadowColor = "rgba(232,200,138,0.35)";
      ctx.shadowBlur = 5;
      if (beastAlpha > 0.001) EDGES.forEach(([a, b]) => {
        const pa = pos[a]!;
        const pb = pos[b]!;
        const la = Math.min(pa.conv, pb.conv);
        if (la < 0.5) return;
        const warm = clamp((la - 0.55) / 0.45, 0, 1) * (m.state === STATE.APPROACH || m.state === STATE.READY ? 1 : 0.6);
        ctx.strokeStyle = `rgba(${mixRGB(PAL.coolWhite, PAL.gold, warm)},${(((la - 0.5) * 0.9) * beastAlpha).toFixed(3)})`;
        ctx.lineWidth = 1.3 * (0.5 + ((pa.p + pb.p) / 2) * 1.2);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      });
      ctx.shadowBlur = 0;

      // 28 颗星
      if (beastAlpha > 0.001) pos.forEach((p, i) => {
        const n = NODES[i]!;
        const ch = m.chaos[i]!;
        const tw = 0.7 + 0.3 * Math.sin(now * (1 + ch.sp) + ch.ph);
        const warmth = clamp((p.conv - 0.55) / 0.45, 0, 1) * (m.state === STATE.APPROACH || m.state === STATE.READY ? 1 : 0.55);
        const depth = 0.35 + p.p * 1.5; // 近大远小
        const r = (n.big ? 3.2 : 2.0) * (0.5 + 0.5 * p.conv) * depth;
        ctx.globalAlpha = clamp(p.conv * tw * beastAlpha, 0, 1);
        ctx.fillStyle = `rgb(${mixRGB(PAL.coolWhite, PAL.cream, warmth)})`;
        ctx.shadowColor = `rgba(${mixRGB([255, 255, 255], PAL.gold, warmth)},0.75)`;
        ctx.shadowBlur = (n.big ? 12 : 7) * depth;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      if (axisActive) {
        const axisSeed =
          m.state === STATE.STARBEAST_SANDIFY
            ? smooth(0.35, 1.2, m.t) * 0.45
            : m.state === STATE.AXIS_EMERGENCE
              ? smooth(0, 1.25, m.t)
              : 1;
        const axisGrow =
          m.state === STATE.AXIS_EMERGENCE
            ? smooth(0.25, 1.25, m.t)
            : isAxisState() || convergenceActive
              ? 1
              : 0;
        const warmAxisRgb = "232,200,138";
        const starWhiteRgb = "255,247,228";
        const g = axisMetrics();
        const isGeoStage = m.state === STATE.GEO_BIND;
        const dim = activeDim();
        const geoDim = activeGeoDim();
        const range = isGeoStage ? geoRange(geoDim) : dimRange(m.coords, dim);
        const dialFrac = range.max > range.min ? (m.dialFloat - range.min) / (range.max - range.min) : 0;
        m.precisionY = range.max > range.min ? Math.round((1 - clamp(dialFrac, 0, 1)) * 20) : 10;
        const railCursor = { x: lerp(g.railX0, g.railX1, m.railProgress), y: g.railY };
        const tuneCursor = tunePoint(m.precisionY);
        const guideCycle = (now * 0.34) % 1;
        const guideStage = guideCycle < 0.54 ? "y" : "x";
        const guideProgress = guideStage === "y"
          ? guideCycle / 0.54
          : (guideCycle - 0.54) / 0.46;
        const comet = (pos: number, head: number, width = 0.12) => {
          const d = Math.abs(pos - head);
          return Math.max(0, 1 - d / width);
        };
        ctx.save();
        ctx.globalAlpha = axisSeed;
        pos.forEach((p, i) => {
          const residueTarget = i % 2 === 0
            ? railPoint(i % 7)
            : tunePoint(i % 21);
          const settle = smooth(0.1 + (i / pos.length) * 0.45, 1.0, axisSeed);
          const x = lerp(p.x, residueTarget.x, settle);
          const y = lerp(p.y, residueTarget.y, settle);
          ctx.fillStyle = `rgba(232,200,138,${(0.18 + axisSeed * 0.38).toFixed(3)})`;
          ctx.shadowColor = "rgba(232,200,138,0.32)";
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(x, y, i % 9 === 0 ? 2.2 : 1.25, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.shadowBlur = 0;
        ctx.globalAlpha = axisGrow;
        ctx.strokeStyle = `rgba(${warmAxisRgb},${0.18 + axisGrow * 0.58})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(g.railX0, g.railY);
        ctx.lineTo(g.railX1, g.railY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(g.axisX, g.axisTop);
        ctx.lineTo(g.axisX, g.axisBottom);
        ctx.stroke();
        for (let col = 0; col < g.cols; col++) {
          const p = railPoint(col);
          const lit = col <= m.phaseX || Math.abs(p.x - railCursor.x) < 5;
          const posOnAxis = col / (g.cols - 1);
          const sweep = guideStage === "x" ? comet(posOnAxis, guideProgress, 0.16) : 0;
          const dragGlow = m.dragAxis === "x" ? comet(posOnAxis, m.railProgress, 0.18) : 0;
          const flow = Math.max(sweep, dragGlow);
          ctx.fillStyle = `rgba(${starWhiteRgb},${(lit ? 0.58 + flow * 0.38 : 0.2 + flow * 0.48).toFixed(3)})`;
          ctx.shadowColor = `rgba(${starWhiteRgb},${(0.14 + flow * 0.62).toFixed(3)})`;
          ctx.shadowBlur = lit ? 7 + flow * 12 : 2 + flow * 12;
          ctx.beginPath();
          ctx.arc(p.x, p.y, lit ? 2.35 + flow * 1.2 : 1.25 + flow * 1.25, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
        for (let row = 0; row < g.rows; row++) {
          const p = tunePoint(row);
          if (row % 2 !== 0 && row !== m.precisionY) continue;
          const posOnAxis = row / (g.rows - 1);
          const sweep = guideStage === "y" ? comet(posOnAxis, guideProgress, 0.11) : 0;
          const dragGlow = m.dragAxis === "y" ? comet(posOnAxis, m.precisionY / (g.rows - 1), 0.13) : 0;
          const flow = Math.max(sweep, dragGlow);
          const selected = row === m.precisionY;
          ctx.fillStyle = `rgba(${starWhiteRgb},${(selected ? 0.72 + flow * 0.26 : 0.16 + flow * 0.58).toFixed(3)})`;
          ctx.shadowColor = `rgba(${starWhiteRgb},${(0.1 + flow * 0.68).toFixed(3)})`;
          ctx.shadowBlur = selected ? 10 + flow * 12 : 2 + flow * 12;
          ctx.beginPath();
          ctx.arc(p.x, p.y, row === m.precisionY ? 3.1 + flow * 1.1 : 1.0 + flow * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowColor = `rgba(${starWhiteRgb},0.92)`;
        ctx.shadowBlur = 18;
        ctx.fillStyle = `rgba(${starWhiteRgb},0.98)`;
        ctx.beginPath();
        ctx.arc(tuneCursor.x, tuneCursor.y, m.state === STATE.DISPLAY_LOCK ? 5.2 : 4.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(railCursor.x, railCursor.y, m.state === STATE.DISPLAY_LOCK ? 5.2 : 4.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        if (m.state === STATE.TIME_CALIBRATION || m.state === STATE.GEO_BIND || m.state === STATE.DISPLAY_LOCK) {
          ctx.textAlign = "left";
          const finalLocked = m.state === STATE.DISPLAY_LOCK;
          ctx.fillStyle = "rgba(232,200,138,0.82)";
          ctx.font = `600 ${Math.min(12, m.w * 0.03)}px ${MONO}`;
          ctx.fillText("走过黑夜的人，会留下光的痕迹。", g.railX0, m.h * 0.1);
          ctx.fillStyle = "rgba(255,247,228,0.78)";
          ctx.font = `650 ${Math.min(15, m.w * 0.038)}px ${SANS}`;
          ctx.fillText("进入压力。", g.railX0, m.h * 0.145);
          ctx.fillText("开始六步转化。", g.railX0, m.h * 0.18);
          ctx.fillStyle = "rgba(232,200,138,0.82)";
          ctx.font = `600 ${Math.min(12, m.w * 0.03)}px ${MONO}`;
          ctx.fillText(finalLocked ? "［ 光痕 ］" : isGeoStage ? `［ ${GEO_LABEL[geoDim]} ］` : `［ ${DIM_STAGE_LABEL[dim]} ］`, g.railX0, m.h * 0.34);
          ctx.fillStyle = "rgba(255,247,228,0.96)";
          const valueSize = finalLocked
            ? Math.min(28, m.w * 0.062)
            : !isGeoStage && dim === "hour"
              ? Math.min(36, m.w * 0.082)
              : Math.min(48, m.w * 0.11);
          ctx.font = `700 ${valueSize}px ${MONO}`;
          ctx.fillText(finalLocked ? "光兽正在靠近" : isGeoStage ? geoText(geoDim, m.dialFloat) : dimText(dim, m.dialFloat), g.railX0, m.h * 0.47);
          ctx.font = `700 ${Math.min(16, m.w * 0.04)}px ${MONO}`;
          ctx.fillStyle = "rgba(232,200,138,0.82)";
          ctx.fillText("它们不会定义你", g.railX0, m.h * 0.58);
          ctx.fillStyle = "rgba(232,200,138,0.74)";
          ctx.fillText("只是帮你抵住那些风暴和内耗", g.railX0, m.h * 0.63);
          ctx.fillStyle = "rgba(232,200,138,0.46)";
          ctx.font = `600 ${Math.min(12, m.w * 0.03)}px ${MONO}`;
          ctx.fillText(m.state === STATE.DISPLAY_LOCK ? "压力已进入" : isGeoStage ? "先上下调频 · 再右滑进入转化" : "先上下调频 · 再右滑进入压力", g.railX0, m.h * 0.705);
          ctx.fillStyle = "rgba(232,200,138,0.58)";
          ctx.font = `600 ${Math.min(11, m.w * 0.028)}px ${MONO}`;
          const railHint = finalLocked
            ? "压力已进入"
            : m.verticalTuned && isGeoStage && geoDim === "city"
              ? "右滑 · 光痕"
              : m.verticalTuned
                ? `右滑进入 · ${isGeoStage ? GEO_LABEL[geoDim] : DIM_LABEL[dim]}`
                : "纵轴调频后 · 横轴解锁";
          ctx.fillText(railHint, g.railX0, g.railY + 30);
          ctx.textAlign = "right";
          ctx.fillStyle = "rgba(232,200,138,0.82)";
          ctx.fillText(m.state === STATE.DISPLAY_LOCK ? "镜面" : "光痕", g.railX1, g.railY - 18);
        }

        if (convergenceActive) {
          const freeze = m.state === STATE.ENTRY_PRE_COLLAPSE ? smooth(0, 0.55, m.t) : 1;
          const converge = m.state === STATE.ENTRY_LIGHT_CONVERGENCE ? smooth(0, 0.95, m.t) : 0;
          const centerX = m.w / 2;
          const centerY = m.h * 0.48;
          ctx.fillStyle = `rgba(0,0,0,${(0.1 + freeze * 0.18 + converge * 0.22).toFixed(3)})`;
          ctx.fillRect(0, 0, m.w, m.h);
          const pulse = 0.72 + Math.sin(now * 5.4) * 0.1;
          for (let i = 0; i < NODES.length; i++) {
            const from = i % 2 === 0
              ? railPoint(i % 7)
              : tunePoint(Math.min(20, 2 + Math.floor(i / 7) * 5));
            const ring = (i % 7) / 7;
            const targetX = centerX + Math.cos(ring * Math.PI * 2 + i * 0.47) * (8 + (i % 3) * 4);
            const targetY = centerY + Math.sin(ring * Math.PI * 2 + i * 0.47) * (8 + (i % 4) * 3);
            const x = lerp(from.x, targetX, converge);
            const y = lerp(from.y, targetY, converge);
            const alpha = 0.2 + freeze * 0.32 + converge * 0.42;
            ctx.fillStyle = `rgba(${starWhiteRgb},${alpha.toFixed(3)})`;
            ctx.shadowColor = `rgba(${starWhiteRgb},${(0.18 + converge * 0.55).toFixed(3)})`;
            ctx.shadowBlur = 5 + converge * 16;
            ctx.beginPath();
            ctx.arc(x, y, 1.2 + converge * 1.7, 0, Math.PI * 2);
            ctx.fill();
          }
          const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 58);
          coreGradient.addColorStop(0, `rgba(${starWhiteRgb},${(0.08 + converge * 0.42 * pulse).toFixed(3)})`);
          coreGradient.addColorStop(0.46, `rgba(${warmAxisRgb},${(0.06 + converge * 0.18).toFixed(3)})`);
          coreGradient.addColorStop(1, "rgba(232,200,138,0)");
          ctx.fillStyle = coreGradient;
          ctx.beginPath();
          ctx.arc(centerX, centerY, 58, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.textAlign = "center";
          ctx.fillStyle = `rgba(255,247,228,${(0.18 + converge * 0.55).toFixed(3)})`;
          ctx.font = `650 ${Math.min(14, m.w * 0.036)}px ${SANS}`;
          ctx.fillText("状态正在进入转化系统。", centerX, centerY + 82);
        }
        ctx.restore();
      }

      if (entryStaticActive) {
        const snapshot = m.entryTransitionSnapshot ?? buildEntryTransitionSnapshot();
        drawEntryCardRenderer({
          ctx,
          snapshot,
          width: m.w,
          height: m.h,
          side: m.entryCardSide,
          flipProgress: m.entryCardFlipT,
        });
        ctx.save();
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(232,200,138,0.74)";
        ctx.font = `650 ${Math.min(13, m.w * 0.034)}px ${SANS}`;
        ctx.fillText("点击光兽", m.w / 2, m.h * 0.9);
        ctx.restore();
        return;
      }

      if (m.state === STATE.ASSEMBLY || m.state === STATE.FORMATION || m.state === STATE.APPROACH || m.state === STATE.READY || m.state === STATE.STARBEAST_SANDIFY) {
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `600 ${Math.min(18, m.w * 0.046)}px ${SANS}`;
        ctx.fillStyle = "rgba(255,247,228,0.95)";
        ctx.fillText(TOP_LINES[0], m.w / 2, m.h * 0.18);
        ctx.fillStyle = "rgba(255,247,228,0.82)";
        ctx.fillText(TOP_LINES[1], m.w / 2, m.h * 0.23);
        ctx.restore();
      }

      // Text resolves after the entry form stabilizes.
      if (m.state === STATE.FORMATION || m.state === STATE.APPROACH || m.state === STATE.READY || m.state === STATE.STARBEAST_SANDIFY) {
        const cx = m.w / 2;
        const lineStarts = [0.2, 0.55, 3.1];
        const gather = 1.35;
        m.textStars.forEach((s, i) => {
          if (s.line !== 2) return;
          const t0 = lineStarts[s.line]!;
          const stagger = ((i % 19) / 19) * 0.38;
          const e = smooth(t0 + stagger, t0 + gather + stagger, m.afterForm);
          if (e <= 0.001) return;
          const x = lerp(s.ox, s.tx, e);
          const y = lerp(s.oy, s.ty, e);
          const tw = 0.65 + 0.35 * Math.sin(now * s.sp + s.ph);
          const solid = smooth(t0 + gather - 0.1, t0 + gather + 0.8, m.afterForm);
          const a = e * 0.85 * tw * (1 - solid * 0.55) * (1 - enter);
          ctx.fillStyle = `rgba(${mixRGB(PAL.coolWhite, PAL.cream, e)},${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.1, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const textSize = Math.min(18, m.w * 0.046);
        [
          { text: CTA_LINE, y: 0.82, start: lineStarts[2]!, weight: 700 },
        ].forEach((line) => {
          const solid = smooth(line.start + gather - 0.1, line.start + gather + 0.8, m.afterForm);
          if (solid <= 0.001) return;
          ctx.font = `${line.weight} ${textSize}px ${SANS}`;
          ctx.fillStyle = `rgba(255,247,228,${(solid * 0.95 * (1 - enter)).toFixed(3)})`;
          ctx.fillText(line.text, cx, m.h * line.y);
        });
        const ctaSolid = smooth(lineStarts[2]! + gather - 0.1, lineStarts[2]! + gather + 0.8, m.afterForm);
        if (ctaSolid > 0.001) {
          ctx.font = `${Math.min(12, m.w * 0.031)}px ${SANS}`;
          ctx.fillStyle = `rgba(255,247,228,${(ctaSolid * 0.62 * (1 - enter)).toFixed(3)})`;
          ctx.fillText("点击光兽", cx, m.h * 0.77);
          ctx.font = `${Math.min(11, m.w * 0.028)}px ${MONO}`;
          ctx.fillStyle = `rgba(232,200,138,${(ctaSolid * 0.42 * (1 - enter)).toFixed(3)})`;
          ctx.fillText("观爻 · GUANYAO", cx, m.h * 0.94);
        }
        ctx.textBaseline = "alphabetic";
      }

    }

    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const STEP = 1 / 60;
    function frame(t: number) {
      let dt = (t - last) / 1000;
      last = t;
      m.fpsAcc += dt;
      m.fpsN += 1;
      if (m.fpsAcc >= 0.5) {
        m.fps = m.fpsN / m.fpsAcc;
        m.fpsAcc = 0;
        m.fpsN = 0;
      }
      dt = Math.min(0.1, dt);
      acc += dt;
      while (acc >= STEP) {
        step(STEP);
        acc -= STEP;
      }
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) draw(ctx);
      raf = requestAnimationFrame(frame);
    }

    function onDown(e: PointerEvent) {
      audio.ensure();
      canvasRef.current?.setPointerCapture?.(e.pointerId);
      const r = canvas!.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (m.state === STATE.ENTRY_STATIC_RENDER) {
        const rect = getEntryCardRendererRect(m.w, m.h);
        const inCard = x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
        if (inCard && m.entryCardFlipT >= 1) {
          m.entryCardFlipTo = m.entryCardSide === "front" ? "back" : "front";
          m.entryCardFlipT = 0;
          audio.tick();
          vibrate(8);
        }
        if (!inCard && m.entryCardFlipT >= 1) {
          openPressureSeedCanvas();
        }
        return;
      }
      if (m.state === STATE.READY && m.presentDone && isBeastHit(x, y)) {
        routeEntryFromBeastClick();
        return;
      }
      if (m.state === STATE.TIME_CALIBRATION || m.state === STATE.GEO_BIND) {
        m.dragging = true;
        const g = axisMetrics();
        const onVertical = Math.abs(x - g.axisX) < 52 && y >= g.axisTop - 18 && y <= g.axisBottom + 18;
        const onHorizontal = Math.abs(y - g.railY) < 42 && x >= g.railX0 - 12 && x <= g.railX1 + 12;
        m.dragAxis = onVertical ? "y" : onHorizontal ? "x" : null;
        m.lastX = x;
        m.lastY = y;
        if (m.dragAxis === "x") {
          m.railProgress = clamp((x - g.railX0) / (g.railX1 - g.railX0), 0, 1);
          m.phaseX = Math.round(m.railProgress * 6);
        }
        if (m.dragAxis === "y") {
          m.verticalDragMoved = false;
          const isGeoStage = m.state === STATE.GEO_BIND;
          const dim = activeDim();
          const geoDim = activeGeoDim();
          const { min, max } = isGeoStage ? geoRange(geoDim) : dimRange(m.coords, dim);
          const frac = 1 - clamp((y - g.axisTop) / (g.axisBottom - g.axisTop), 0, 1);
          m.dialFloat = min + frac * (max - min);
          if (isGeoStage) setGeoValue(geoDim, m.dialFloat);
          else setDimValue(dim, m.dialFloat);
          m.precisionY = max > min ? Math.round((1 - frac) * 20) : 10;
        }
        m.dwellT = 0;
      }
    }
    function onMove(e: PointerEvent) {
      if (!m.dragging || (m.state !== STATE.TIME_CALIBRATION && m.state !== STATE.GEO_BIND)) return;
      const r = canvas!.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const dx = x - m.lastX;
      const dy = y - m.lastY;
      if (m.dragAxis === null && Math.hypot(dx, dy) > 10) {
        m.dragAxis = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
      }
      if (m.dragAxis === "x") {
        const g = axisMetrics();
        m.railProgress = clamp((x - g.railX0) / (g.railX1 - g.railX0), 0, 1);
        m.phaseX = Math.round(m.railProgress * 6);
        m.lastX = x;
        m.dwellT = 0;
        if (m.railProgress >= RAIL_COMMIT_THRESHOLD) {
          commitCurrentDim();
          m.dragging = false;
          m.dragAxis = null;
        }
        audio.tick();
        vibrate(6);
      }
      if (m.dragAxis === "y") {
        const isGeoStage = m.state === STATE.GEO_BIND;
        const dim = activeDim();
        const geoDim = activeGeoDim();
        const { min, max } = isGeoStage ? geoRange(geoDim) : dimRange(m.coords, dim);
        const g = axisMetrics();
        const frac = 1 - clamp((y - g.axisTop) / (g.axisBottom - g.axisTop), 0, 1);
        m.dialFloat = min + frac * (max - min);
        if (isGeoStage) setGeoValue(geoDim, m.dialFloat);
        else setDimValue(dim, m.dialFloat);
        m.precisionY = max > min ? Math.round((1 - frac) * 20) : 10;
        if (Math.abs(y - m.lastY) > 2) {
          m.verticalDragMoved = true;
          m.verticalTuned = true;
        }
        m.lastY = y;
        m.dwellT = 0;
        audio.tick();
        vibrate(4);
      }
    }
    function onUp(e?: PointerEvent) {
      try {
        if (e) canvasRef.current?.releasePointerCapture?.(e.pointerId);
      } catch {
        // ignore pointer capture release differences across browsers
      }
      const shouldCommitOnRelease =
        m.dragAxis === "x" &&
        m.railProgress >= RAIL_COMMIT_THRESHOLD &&
        (m.state === STATE.TIME_CALIBRATION || m.state === STATE.GEO_BIND) &&
        !m.clutched;
      if (shouldCommitOnRelease) commitCurrentDim();
      m.dragging = false;
      if (m.dragAxis === "y" && m.verticalDragMoved) m.verticalTuned = true;
      m.dragAxis = null;
      m.dwellT = 0;
      if ((m.state === STATE.TIME_CALIBRATION || m.state === STATE.GEO_BIND) && !m.clutched) {
        m.railProgress = 0;
        m.phaseX = 0;
      }
      m.clutched = false;
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, [openPressureSeedCanvas]);

  if (showPressureSeedCapture) {
    return <PressureSeedCrossAxisPage onComplete={commitPressureSeedCapture} />;
  }

  return (
    <GyMobilePreviewFrame background="#070512">
      <canvas
        ref={canvasRef}
        data-launch-interaction-state={interactionState}
        style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }}
      />
    </GyMobilePreviewFrame>
  );
}
