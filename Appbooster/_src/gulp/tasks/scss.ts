//@ts-ignore
import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css"; //сжатие css
//@ts-ignore
import webpcss from "gulp-webpcss"; // вывод webp изображений
import autoprefixer from "gulp-autoprefixer"; // добавление вендорных префиксов
//@ts-ignore
import groupCssMediaQueries from "gulp-group-css-media-queries";

import app from "../../gulpfile";

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.projectPath.src.scss, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(
      sass({
        outputStyle: "expanded",
        includePaths: require("scss-resets").includePaths,
      })
    )
    .pipe(app.plugins.ifPlugin(app.isBuild, groupCssMediaQueries()))
    .pipe(
      app.plugins.ifPlugin(
        app.isBuild,
        autoprefixer({
          cascade: true,
        })
      )
    )
    .pipe(
      app.plugins.ifPlugin(
        app.isBuild,
        webpcss({
          webpClass: ".webp",
          noWebpClass: ".no-webp",
        })
      )
    )
    .pipe(app.gulp.dest(app.projectPath.build.css)) // сохранить не сжатый css
    .pipe(app.plugins.ifPlugin(app.isBuild, cleanCss()))
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(app.gulp.dest(app.projectPath.build.css))
    .pipe(app.plugins.browsersync.stream());
};
