//@ts-ignore
import del from "del";
import app from "../../gulpfile";

export const reset = () => {
  return del(app.projectPath.clean);
};
