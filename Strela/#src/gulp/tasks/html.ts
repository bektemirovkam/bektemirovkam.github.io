import fileInclude from "gulp-file-include";
//@ts-ignore
import webpHtmlNosvg from "gulp-webp-html-nosvg";
//@ts-ignore
import versionNumber from "gulp-version-number";

import app from "../../gulpfile";

export const html = () => {
  return app.gulp
    .src(app.projectPath.src.html)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "HTML",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(fileInclude("@@"))
    .pipe(app.plugins.replace(/@img\//g, "img/"))
    .pipe(app.plugins.ifPlugin(app.isBuild, webpHtmlNosvg()))
    .pipe(
      // изменяем версию файлов чтобы не кэшировались
      app.plugins.ifPlugin(
        app.isBuild,
        versionNumber({
          value: `%DT%`,
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.projectPath.build.html))
    .pipe(app.plugins.browsersync.stream());
};
