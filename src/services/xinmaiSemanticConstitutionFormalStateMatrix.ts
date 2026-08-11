export type XinmaiFormalJourneyArea =
  | "BIRTH"
  | "GENESIS"
  | "REALITY"
  | "SIX_DIMENSION"
  | "CHOICE"
  | "RETURN"
  | "OWNERSHIP"
  | "ARCHIVE";

export type XinmaiFormalStateRetryability =
  | "NOT_APPLICABLE"
  | "RETRYABLE"
  | "NON_RETRYABLE";

export type XinmaiFormalStatePresentation = Readonly<{
  area: XinmaiFormalJourneyArea;
  state: string;
  purpose: string;
  currentFact: string;
  nextAction: string;
  exitConsequence: string;
  retryability: XinmaiFormalStateRetryability;
}>;

const p = (
  area: XinmaiFormalJourneyArea,
  state: string,
  purpose: string,
  currentFact: string,
  nextAction: string,
  exitConsequence: string,
  retryability: XinmaiFormalStateRetryability,
): XinmaiFormalStatePresentation => Object.freeze({
  area,
  state,
  purpose,
  currentFact,
  nextAction,
  exitConsequence,
  retryability,
});

export const XINMAI_SEMANTIC_CONSTITUTION_FORMAL_STATE_MATRIX = Object.freeze([
  p("BIRTH", "EMPTY", "填写本次体验的时间坐标。", "尚未填写出生日期与时间。", "填写时间坐标", "暂不填写不会生成起点记录。", "NOT_APPLICABLE"),
  p("BIRTH", "VALID", "核对本次体验的时间坐标。", "日期与时间格式有效，可以确认。", "确认时间坐标", "返回修改不会产生重复记录。", "NOT_APPLICABLE"),
  p("BIRTH", "RANGE", "确认一个可安全推导的时间范围。", "当前范围只覆盖一个时辰，可以继续。", "确认时间范围", "跨时辰范围不会被系统猜测。", "NOT_APPLICABLE"),
  p("BIRTH", "UNKNOWN", "保留用户对时间精度的不确定。", "当前时间精度不足以形成确定坐标。", "返回补充时间", "不补充时不会生成推导结果。", "NON_RETRYABLE"),
  p("BIRTH", "FAILURE", "说明时间坐标为何没有保存。", "本次保存没有完成。", "重试保存时间坐标", "已填写内容留在当前表单，不会冒充已保存。", "RETRYABLE"),
  p("BIRTH", "RECOVERY", "恢复已经确认的时间坐标。", "正在读取已有起点记录。", "等待恢复完成", "离开不会改写已有记录。", "NOT_APPLICABLE"),

  p("GENESIS", "LOADING", "载入视觉同行者与时间坐标。", "正在读取已确认的起点记录。", "等待载入完成", "离开不会改变已保存记录。", "NOT_APPLICABLE"),
  p("GENESIS", "FORMING", "用连续画面承接已确认的起点。", "视觉同行者正在形成，尚未代表新的事实。", "继续等待形成", "动画未完成不会冒充身份确认。", "NOT_APPLICABLE"),
  p("GENESIS", "READY", "说明视觉同行者只承载持续体验。", "起点记录与视觉呈现已准备好。", "继续进入现实情境", "跳过称呼不会损失任何旅程资产。", "NOT_APPLICABLE"),
  p("GENESIS", "FAILURE", "说明形成过程为何中断。", "视觉呈现当前无法完成，起点记录仍保留。", "重试形成", "返回入口不会删除起点记录。", "RETRYABLE"),
  p("GENESIS", "RETURNING", "恢复已有旅程的视觉连续性。", "正在读取已有记录，不会重新生成起点。", "继续已有旅程", "返回入口不会改写旧记录。", "NOT_APPLICABLE"),

  p("REALITY", "NO_INTENT", "建立一次合法的现实情境请求。", "当前没有可继续的现实请求。", "返回旅程入口", "已有记录会保留，不会复用已结束的请求。", "NON_RETRYABLE"),
  p("REALITY", "LOADING", "准备现实入口与候选情境。", "正在核对本次旅程的进入条件。", "等待现实入口就绪", "离开不会生成情境选择。", "NOT_APPLICABLE"),
  p("REALITY", "ADMISSION_READY", "确认本次旅程可以进入现实选择。", "进入条件已经满足。", "查看现实情境", "尚未选择时不会进入六维观察。", "NOT_APPLICABLE"),
  p("REALITY", "CANDIDATE_LOADING", "读取本阶段可用的现实情境。", "候选情境正在准备。", "等待候选情境", "已有旅程记录不会受影响。", "NOT_APPLICABLE"),
  p("REALITY", "CANDIDATE_READY", "让用户选择最贴近当下的一幕。", "可用情境已经列出，系统尚未替你选择。", "选择一段现实情境", "返回不会保存情境选择。", "NOT_APPLICABLE"),
  p("REALITY", "SELECTED", "确认用户选中的现实情境。", "这段现实情境已经由你选择。", "开始六维观察", "更换情境不会生成六维证据。", "NOT_APPLICABLE"),
  p("REALITY", "RETRYABLE", "解释临时中断并提供真实重试。", "现实入口本次没有准备完成，已有记录会保留。", "重试准备现实入口", "返回入口不会删除已有记录。", "RETRYABLE"),
  p("REALITY", "NON_RETRYABLE", "解释当前为何不能继续。", "当前条件不允许进入这段现实。", "返回旅程入口", "不会使用旧请求或邻近阶段情境代替。", "NON_RETRYABLE"),
  p("REALITY", "WITHHELD", "说明新现实暂时被保护性暂停。", "新情境创建已暂停，已有记录仍可查看。", "查看已有记录", "不会生成候选、选择或六维证据。", "NON_RETRYABLE"),
  p("REALITY", "ALREADY_ACTIVE", "把用户带回唯一正在进行的旅程。", "已有一段现实情境正在进行。", "继续当前旅程", "不会并行创建第二段活跃旅程。", "NOT_APPLICABLE"),
  p("REALITY", "RECOVERY", "恢复已有情境与进度。", "正在读取这段旅程已经保存的进度。", "等待恢复完成", "不会以当前版本重解释旧记录。", "NOT_APPLICABLE"),
  p("REALITY", "FRESH_CYCLE", "开始一段新的合法现实旅程。", "上一段记录已保留，新请求与新情境已建立。", "选择新的现实情境", "不会改写上一段事实与痕迹。", "NOT_APPLICABLE"),

  p("SIX_DIMENSION", "LOADING", "准备六维观察所需的记录容器。", "现实情境已保留，观察控件仍在准备。", "等待控件就绪", "等待期间不会保存任何一维。", "NOT_APPLICABLE"),
  p("SIX_DIMENSION", "PREPARING", "显示当前要观察的维度。", "正在准备这一维的可选回应。", "查看这一维的问题", "未明确确认不会形成观察。", "NOT_APPLICABLE"),
  p("SIX_DIMENSION", "OPEN", "让用户选择这一维实际出现的回应。", "这一维可以选择，但尚未保存。", "选择并确认这一维", "暂停不会被计作已观察。", "NOT_APPLICABLE"),
  p("SIX_DIMENSION", "SAVING", "保存用户明确确认的单维选择。", "这一维正在保存，请勿重复提交。", "等待保存结果", "中途离开不会补齐其他维度。", "NOT_APPLICABLE"),
  p("SIX_DIMENSION", "SAVED", "确认单维选择已经持久保存。", "这一维已经保存，下一维尚未开始。", "继续下一维观察", "返回查看不会重复保存。", "NOT_APPLICABLE"),
  p("SIX_DIMENSION", "RETRYABLE", "说明单维保存的临时失败。", "这一维没有保存成功，既有维度仍保留。", "重试保存这一维", "返回不会把失败项计为已完成。", "RETRYABLE"),
  p("SIX_DIMENSION", "NON_RETRYABLE", "说明当前单维无法保存。", "这一维因不可恢复的状态无法提交。", "返回旅程入口", "不会伪造完成记录。", "NON_RETRYABLE"),
  p("SIX_DIMENSION", "RECEIPT_COMPLETE", "确认六项观察完整且可回看。", "六项明确选择均已保存，可以查看回应图谱。", "查看六维回应图谱", "此时仍不会自动形成现实结果。", "NOT_APPLICABLE"),
  p("SIX_DIMENSION", "LEGACY_GENERIC_RECOVERY", "诚实恢复旧版六维记录。", "旧记录证明六个窗口曾完成，但没有保存每项具体选择。", "查看旧版概览", "系统不会用当前选项推测旧选择。", "NON_RETRYABLE"),

  p("CHOICE", "LOADING", "准备一个低风险、可撤销的小行动。", "正在读取六维观察与现实情境。", "等待行动选项", "等待不会自动替你决定。", "NOT_APPLICABLE"),
  p("CHOICE", "READY", "让用户选择愿意回到现实验证的一小步。", "行动选项已准备好，尚未保存。", "选择一个小行动", "返回查看不会形成行动承诺。", "NOT_APPLICABLE"),
  p("CHOICE", "COMMITTED", "确认用户选择的小行动。", "这一步已经保存，但现实行动尚未发生。", "带着这一步回到生活", "离开产品不会被记录为已经尝试。", "NOT_APPLICABLE"),
  p("CHOICE", "DEPARTURE_PREPARING", "准备离开产品并回到生活。", "小行动已保存，正在完成交接。", "等待交接完成", "不会自动追踪或推断现实行为。", "NOT_APPLICABLE"),
  p("CHOICE", "DEPARTED", "明确现实验证将在产品外发生。", "这一步已带回生活，等待你之后主动回来。", "回到生活", "尚未回来确认前不会形成现实结果。", "NOT_APPLICABLE"),
  p("CHOICE", "RECOVERY", "恢复已经保存的小行动。", "正在读取这段旅程带走的行动。", "继续查看已保存行动", "不会重复生成行动记录。", "NOT_APPLICABLE"),

  p("RETURN", "PENDING", "读取上次带回生活的小行动。", "正在恢复现实情境与行动记录。", "等待记录恢复", "等待不会生成现实结果。", "NOT_APPLICABLE"),
  p("RETURN", "SELECTION", "只询问现实里实际发生了什么。", "结果尚未由你确认。", "选择真实发生的情况", "返回不会被当作尝试过。", "NOT_APPLICABLE"),
  p("RETURN", "NOT_ATTEMPTED", "保留尚未尝试的小行动。", "这一步还没有在现实里试过。", "先回到生活或返回重新选择", "不形成现实结果；这一步留在旅程入口等待以后回来。", "NOT_APPLICABLE"),
  p("RETURN", "REJECTED", "尊重用户不留下本次记录的决定。", "本次结果不会被记录。", "确认不记录或返回重新选择", "两个出口都不会形成新的现实痕迹。", "NOT_APPLICABLE"),
  p("RETURN", "FORMATION_PENDING", "保存用户刚确认的现实结果。", "现实结果正在保存，尚未形成可回看的痕迹。", "等待保存完成", "离开不会重复形成记录。", "NOT_APPLICABLE"),
  p("RETURN", "RETRYABLE", "说明现实结果保存的临时失败。", "本次保存未完成，已确认的回应仍保留。", "重试保存现实结果", "返回不会删除既有旅程资产。", "RETRYABLE"),
  p("RETURN", "NON_RETRYABLE", "说明当前为何无法保存结果。", "本次结果无法在当前状态继续保存。", "返回旅程入口", "既有记录保留，本次不会形成新痕迹。", "NON_RETRYABLE"),
  p("RETURN", "FORMED", "确认现实结果已成为可回看的痕迹。", "用户确认的现实结果已经保存一次。", "查看这次旅程的完整记录", "查看不会重复形成记录。", "NOT_APPLICABLE"),

  p("OWNERSHIP", "PENDING", "汇总本轮已经确认的事实与变化。", "正在读取现实情境、六维回应、行动与结果。", "等待记录就绪", "等待不会生成新资产。", "NOT_APPLICABLE"),
  p("OWNERSHIP", "READY", "让用户回看本轮理解如何被现实修正。", "这段旅程的可回看记录已经完整。", "查看完整旅程", "离开不会删除记录。", "NOT_APPLICABLE"),
  p("OWNERSHIP", "NAMING_SAVE", "提供完成一轮后的可选同行称呼。", "称呼尚未保存，也不影响下一段现实。", "保存称呼", "跳过不会阻断下一段现实。", "NOT_APPLICABLE"),
  p("OWNERSHIP", "NAMING_SKIP", "允许不设置称呼直接继续。", "本轮记录已完成，称呼保持不变。", "以后再说", "不会丢失本轮记录或下一段入口。", "NOT_APPLICABLE"),
  p("OWNERSHIP", "OLD_NAME_ADJUST", "允许在完成后的入口调整旧称呼。", "既有称呼正在只读展示，尚未修改。", "调整同行称呼", "取消会保留原称呼。", "NOT_APPLICABLE"),
  p("OWNERSHIP", "FRESH_CYCLE_PREPARING", "准备下一段合法现实旅程。", "上一段已保留，正在建立新的现实入口。", "等待下一段现实", "不会复用上一段已结束的请求。", "NOT_APPLICABLE"),
  p("OWNERSHIP", "FAILURE", "说明下一段现实为何没有建立。", "新入口本次没有完成，上一段记录仍保留。", "重试准备下一段现实", "返回查看不会创建重复旅程。", "RETRYABLE"),
  p("OWNERSHIP", "RECOVERY", "恢复已形成的下一段现实。", "正在读取已经建立的新旅程。", "继续下一段现实", "不会并行创建第二个活跃周期。", "NOT_APPLICABLE"),

  p("ARCHIVE", "EMPTY", "说明这里仅展示用户确认过的旅程记录。", "当前还没有可回看的记录。", "开始第一段现实", "不会根据动画或浏览行为生成记录。", "NOT_APPLICABLE"),
  p("ARCHIVE", "ONE", "回看一段已确认的旅程。", "当前有一段可回看的记录。", "查看这段旅程", "返回不会改变记录。", "NOT_APPLICABLE"),
  p("ARCHIVE", "MULTIPLE", "按形成顺序回看多段旅程。", "已有多段记录，彼此保持独立。", "选择一段记录查看", "不会汇总成人格或命运结论。", "NOT_APPLICABLE"),
  p("ARCHIVE", "LOADING", "读取已有旅程记录。", "记录正在加载。", "等待加载完成", "等待不会重复生成记录。", "NOT_APPLICABLE"),
  p("ARCHIVE", "RECOVERY", "恢复旧版或中断后的只读记录。", "正在核对已保存的记录版本。", "继续查看可用记录", "无法核对的内容不会被当前版本补写。", "NON_RETRYABLE"),
  p("ARCHIVE", "DIRECT_GUARD", "阻止没有合法来源的直接访问。", "当前链接没有可验证的旅程来源。", "返回旅程入口", "不会创建或猜测任何记录。", "NON_RETRYABLE"),
] as const);

export function readXinmaiFormalStatePresentation(
  area: XinmaiFormalJourneyArea,
  state: string,
): XinmaiFormalStatePresentation | null {
  return XINMAI_SEMANTIC_CONSTITUTION_FORMAL_STATE_MATRIX.find(
    (entry) => entry.area === area && entry.state === state,
  ) ?? null;
}

export const XinmaiSemanticConstitutionFormalStatePresentationResolver =
  Object.freeze({
    read: readXinmaiFormalStatePresentation,
    writesAuthority: false as const,
    readsStorage: false as const,
    infersMissingFacts: false as const,
  });
