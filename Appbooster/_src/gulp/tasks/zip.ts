import del from "del";
import zipPlugin from "gulp-zip";
import app from "../../gulpfile";

export const zip = () => {
  del(`./${app.projectPath.rootFolder}.zip`);
  return app.gulp
    .src(`${app.projectPath.buildFolder}/**/*.*`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "ZIP",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(zipPlugin(`${app.projectPath.rootFolder}.zip`))
    .pipe(app.gulp.dest("./"));
};
