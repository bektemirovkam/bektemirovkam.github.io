//@ts-ignore
import replace from "gulp-replace"; // поиск и замена
import plumber from "gulp-plumber"; // обработка ошибок
//@ts-ignore
import notify from "gulp-notify"; // сообщения (подсказки)
import browsersync from "browser-sync";
import newer from "gulp-newer"; // проверка обновилась ли картинка
import ifPlugin from "gulp-if";

export const plugins = {
  replace,
  plumber,
  notify,
  browsersync,
  newer,
  ifPlugin,
};
