//@ts-ignore
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

import app from "../../gulpfile";

export const images = () => {
  return app.gulp
    .src(app.projectPath.src.images)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "IMAGES",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.newer(app.projectPath.build.images))
    .pipe(app.plugins.ifPlugin(app.isBuild, webp()))
    .pipe(
      app.plugins.ifPlugin(
        app.isBuild,
        app.gulp.dest(app.projectPath.build.images)
      )
    )
    .pipe(
      app.plugins.ifPlugin(
        app.isBuild,
        app.gulp.src(app.projectPath.src.images)
      )
    )
    .pipe(
      app.plugins.ifPlugin(
        app.isBuild,
        app.plugins.newer(app.projectPath.build.images)
      )
    )
    .pipe(app.plugins.ifPlugin(app.isBuild, imagemin()))
    .pipe(app.gulp.dest(app.projectPath.build.images))
    .pipe(app.gulp.src(app.projectPath.src.svg))
    .pipe(app.gulp.dest(app.projectPath.build.images))
    .pipe(app.plugins.browsersync.stream());
};
