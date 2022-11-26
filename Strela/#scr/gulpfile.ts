import gulp from "gulp";
import { argv } from "yargs";
import { projectPath } from "./gulp/config/path";

// задачи
import { copy } from "./gulp/tasks/copy";
import { reset } from "./gulp/tasks/reset";
import { html } from "./gulp/tasks/html";
import { plugins } from "./gulp/config/plugins";
import { server } from "./gulp/tasks/server";
import { scss } from "./gulp/tasks/scss";
import { js } from "./gulp/tasks/js";
import { images } from "./gulp/tasks/images";
import { fontsStyle, otfToTtf, ttfToWoff } from "./gulp/tasks/fonts";
import { svgSprite } from "./gulp/tasks/svgSprite";
import { zip } from "./gulp/tasks/zip";

const app = {
  gulp,
  projectPath,
  plugins,
  //@ts-ignore  TODO:  переделать нормально
  isBuild: argv.build as boolean,
  //@ts-ignore  TODO:  переделать нормально
  isDev: !argv.build as boolean,
};

// наблюдатель за изменениями в файлах
const watcher = () => {
  gulp.watch(projectPath.watch.files, copy);
  gulp.watch(projectPath.watch.html, html);
  gulp.watch(projectPath.watch.scss, scss);
  gulp.watch(projectPath.watch.js, js);
  gulp.watch(projectPath.watch.images, images);
};

export { svgSprite }; // чтобы запускать отдельно

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
);

// сценарии
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, mainTasks, zip);

// экспорт сценариев

export { dev };
export { build };
export { deployZip };

// выполнение сценария по умолчанию
gulp.task("default", dev);

export default app;
