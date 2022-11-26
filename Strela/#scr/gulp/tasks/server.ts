import app from "../../gulpfile";

export const server = () => {
  app.plugins.browsersync.init({
    server: {
      baseDir: `${app.projectPath.build.html}`,
    },
    notify: false,
    port: 3000,
  });
};
