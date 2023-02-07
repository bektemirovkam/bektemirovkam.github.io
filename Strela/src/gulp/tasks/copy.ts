import app from "../../gulpfile";

export const copy = () => {
  return app.gulp
    .src(app.projectPath.src.files)
    .pipe(app.gulp.dest(app.projectPath.build.files));
};
