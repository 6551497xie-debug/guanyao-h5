import { useNavigate } from "react-router-dom";
import { TextLines } from "../components/TextLines";
import { buildFinalChoiceCode, setSixthYaoChoice } from "../services/trajectoryService";

export function ChoicePage() {
  const navigate = useNavigate();

  function handleChoice(choice: 0 | 1) {
    setSixthYaoChoice(choice);
    buildFinalChoiceCode();
    navigate("/migration");
  }

  return (
    <section className="stage-card">
      <span>最终抉择</span>
      <h2>最后一爻</h2>
      <TextLines
        className="choice-copy"
        lines={["前五爻已经完成推演。", "那不是选择，", "是惯性替你走完的轨迹。", "", "现在，", "只剩你亲手按下最后一个动作。"]}
      />
      <div className="action-row">
        <button className="secondary-action" type="button" onClick={() => handleChoice(1)}>
          继续沿着惯性走
        </button>
        <button className="primary-action" type="button" onClick={() => handleChoice(0)}>
          做一次反本能操作
        </button>
      </div>
    </section>
  );
}
