import svgsprite from "gulp-svg-sprite";
import app from "../../gulpfile";

export const svgSprite = () => {
  return app.gulp
    .src(`${app.projectPath.src.svgicons}`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SVG-SPRITE",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(
      svgsprite({
        mode: {
          stack: {
            sprite: "../icons/icons.svg",
            // создаем страницу с перечнем иконок
            example: true,
          },
        },
      })
    )
    .pipe(app.gulp.dest(`${app.projectPath.build.images}`));
};
