import { Link } from "react-router-dom";
import { GravityWave } from "../components/GravityWave";
import { TextLines } from "../components/TextLines";

export function LaunchPage() {
  return (
    <section className="stage-card launch-stage">
      <div className="time-coordinate">时序坐标已校准</div>
      <GravityWave />
      <span>00 Launch</span>
      <h2>观爻 SANDBOX</h2>
      <TextLines
        lines={["你不是被命运困住的。", "你只是被自己的执念与恐惧，", "留在了原地。"]}
      />
      <TextLines className="launch-line" lines={["开启沙盒，", "照见行为黑洞。"]} />
      <Link className="primary-action" to="/identity">
        开启沙盒
      </Link>
    </section>
  );
}
