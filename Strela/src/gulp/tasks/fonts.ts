import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

import app from "../../gulpfile";

export const otfToTtf = () => {
  return app.gulp
    .src(`${app.projectPath.srcFolder}/fonts/*.otf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(
      //@ts-ignore
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(app.gulp.dest(`${app.projectPath.srcFolder}/fonts/`));
};

export const ttfToWoff = () => {
  return app.gulp
    .src(`${app.projectPath.srcFolder}/fonts/*.ttf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(
      //@ts-ignore
      fonter({
        formats: ["woff"],
      })
    )
    .pipe(app.gulp.dest(`${app.projectPath.build.fonts}`))
    .pipe(app.gulp.src(`${app.projectPath.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.projectPath.build.fonts}`));
};

const getFontWeightValue = (fontWeight: string) => {
  switch (fontWeight.toLowerCase()) {
    case "thin":
      return 100;

    case "extralight":
      return 200;

    case "light":
      return 300;

    case "medium":
      return 500;

    case "semibold":
      return 600;

    case "bold":
      return 700;

    case "extrabold":
      return 800;

    case "heavy":
      return 800;

    case "black":
      return 900;

    default:
      return 400;
  }
};

export const fontsStyle = () => {
  // файл стилей подключения шрифтов
  const fontStyleFilePath = `${app.projectPath.srcFolder}/scss/fonts.scss`;
  // проверяем существуют ли файлы шрифтов
  fs.readdir(app.projectPath.build.fonts, (_, fontFiles) => {
    if (fontFiles) {
      // проверяем существует ли файлы стилей для подключения шрифтов
      if (!fs.existsSync(fontStyleFilePath)) {
        // если файла нет создаем его
        fs.writeFile(fontStyleFilePath, "", (err) => {
          if (err) {
            console.log(err);
          }
        });

        let newFileOnly;

        for (let i = 0; i < fontFiles.length; i++) {
          // Записываем подключение шрифтов в файл стилей
          const fontFileName = fontFiles[i].split(".")[0];

          if (newFileOnly !== fontFileName) {
            const fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            const fontWeightName = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;

            const fontWeightValue = getFontWeightValue(fontWeightName);

            fs.appendFile(
              fontStyleFilePath,
              `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeightValue};\n\tfont-style: normal \n}\r\n`,
              (err) => {
                if (err) {
                  console.log(err);
                }
              }
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log(
          "Файл scss/fonts.sccs уже существует. Для обновления нужно его удалить"
        );
      }
    }
  });

  return app.gulp.src(`${app.projectPath.srcFolder}`);
};
