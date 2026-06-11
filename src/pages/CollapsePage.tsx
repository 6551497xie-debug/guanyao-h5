import { Navigate } from "react-router-dom";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";

export function CollapsePage() {
  return <Navigate to={GUANYAO_ROUTES.dynamics} replace />;
}
