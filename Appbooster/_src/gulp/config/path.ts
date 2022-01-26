import path from "path";

const rootFolder = path.basename(path.resolve());
const buildFolder = "./dist";
const srcFolder = "./src";

export const projectPath = {
  build: {
    css: `${buildFolder}/css/`,
    files: `${buildFolder}/files/`,
    html: `${buildFolder}/`,
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
  },
  src: {
    scss: `${srcFolder}/scss/style.scss`,
    files: `${srcFolder}/files/**/*.*`,
    html: `${srcFolder}/*.html`,
    js: `${srcFolder}/js/app.ts`,
    images: `${srcFolder}/img/**/*.{jpg, jpeg, png, gif, webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
  },
  watch: {
    scss: `${srcFolder}/scss/**/*.scss`,
    files: `${srcFolder}/files/**/*.*`,
    js: `${srcFolder}/js/**/*.ts`,
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/**/*.{jpg, jpeg, png, gif, webp, svg, ico}`,
  },
  clean: buildFolder,
  rootFolder,
  srcFolder,
  buildFolder,
  ftp: ``,
};
