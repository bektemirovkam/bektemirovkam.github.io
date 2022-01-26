import webpack from "webpack-stream";

import app from "../../gulpfile";

export const js = () => {
  return app.gulp
    .src(app.projectPath.src.js, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "JS",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(
      webpack({
        mode: app.isDev ? "development" : "production",
        output: {
          filename: "app.min.js",
        },
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              use: "ts-loader",
              exclude: /node_modules/,
            },
          ],
        },
        resolve: {
          extensions: [".tsx", ".ts", ".js"],
        },
        devtool: "inline-source-map",
      })
    )
    .pipe(app.gulp.dest(app.projectPath.build.js))
    .pipe(app.plugins.browsersync.stream());
};
