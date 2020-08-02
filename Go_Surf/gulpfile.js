// чтобы использовать уже собраный gulp, нужно в терминале npm i;
let project_folder = require('path').basename(__dirname);
let source_folder = "#src_Исходники";
// переменные нужны, чтобы в случае изменения не менять по всему галп_файлу
let fs = require('fs'); //file system
let path = { // куда выгружать обработанные файлы
	build:{ 
		html:project_folder + '/',
		css: project_folder + '/css/',
		js: project_folder + '/js/',
		img: project_folder + '/img/',
		fonts: project_folder + '/fonts/',
	},
	src:{ 
		html:[source_folder + '/*.html', '!' + source_folder + '/_*.html'],
		css: source_folder + '/scss/style.scss',
		js: source_folder + '/js/script.js',
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
		fonts: source_folder + '/fonts/*.ttf',
	},
	watch:{ // слушаем постоянно
		html:source_folder + '/*.html',
		css: source_folder + '/scss/**/*.scss',
		js: source_folder + '/js/**/*.js',
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
	},
	clean:'./' + project_folder + '/' // путь к папке проэкта
}

let { src, dest } = require('gulp'), 
	gulp = require('gulp'),
	browsersync = require('browser-sync').create(),       // плагин для перезагрузки браузера
	fileinclude = require('gulp-file-include'),     // плагин для сборки одного файла из разных файлов 
	del = require('del'), // плагин для автоматического удаления папки dist
	scss = require('gulp-sass'), // плагин для sass
	autoprefixer = require('gulp-autoprefixer'), // добавляет нужные префиксы
	group_media = require('gulp-group-css-media-queries'), //группирует медиа-запросы в конце файла
	clean_css = require('gulp-clean-css'), //чистит и сжимает css
	rename = require('gulp-rename'), // переименование
	uglify = require('gulp-uglify-es').default, // сжатие js
	imagemin = require('gulp-imagemin'), // сжатие js
	webp = require('gulp-webp'), // webp
	webphtml = require('gulp-webp-html'), // автоматом правильно вставляет тэг pictures в html
	webpcss = require('gulp-webpcss'), // плагин для css для webp
// нужна функция которая проверяет может ли браузер отобразить webp
	svgSprite = require('gulp-svg-sprite'), // для работы c svg, задача будет запускаться вручную, отдельно
	ttf2woff = require('gulp-ttf2woff'), // для работы с шрифтами woff
	ttf2woff2 = require('gulp-ttf2woff2'), // для работы с шрифтами woff2
	fonter = require('gulp-fonter') // для работы с шрифтами otf, задача будет запускаться вручную, отдельно


function browserSync(){
	browsersync.init({
		server:{
			baseDir:'./' + project_folder + '/'
		},
		port:3000,
		notify:false
	})
}

// функция для работы с html файлами

function html(){
	return src(path.src.html)
	.pipe(fileinclude())             // перед копированием и перезагрузкой собираем файлы
	.pipe(webphtml())
	.pipe(dest(path.build.html))       // копирования из src -> dist
	.pipe(browsersync.stream())        // перезагрузка браузера
}

// функция для работы с css

function css(){
	return src(path.src.css)
	.pipe(
		scss({
			outputStyle:'expanded'
		})
	)
	.pipe(
		group_media()
	)
	.pipe(
		autoprefixer({
			overrideBrowserslist: ['last 5 versions'],
			cascade: true
		})
	)
	.pipe(webpcss())
	.pipe(dest(path.build.css))       // копирования из src -> dist не сжатый css
	.pipe(clean_css()) // сжимаем css
	.pipe(             // после сжатия переименновываем css
		rename({
			extname: '.min.css'
		})
	)
	.pipe(dest(path.build.css))       // копирования из src -> dist уже сжатый css
	.pipe(browsersync.stream())        // перезагрузка браузера
}

function js(){
	return src(path.src.js)
	.pipe(fileinclude())             // перед копированием и перезагрузкой собираем файлы
	.pipe(dest(path.build.js))       // копирования из src -> dist
	.pipe(uglify())
	.pipe(             // после сжатия переименновываем css
		rename({
			extname: '.min.js'
		})
	)
	.pipe(dest(path.build.js))
	.pipe(browsersync.stream())        // перезагрузка браузера
}

function images(){
	return src(path.src.img)
	.pipe( 
		webp({						// нужны как обычные изображения так и webp для тех браузеров которые webp не поддерживают
			quality: 70
		})
	)
	.pipe(dest(path.build.img))
	.pipe(src(path.src.img))        // поэтому опять обращ-ся к исх-м, и так же сжимаем в обычные картинки
	.pipe(
		imagemin({
			progressive:true,
			svgoPlugins: [{ removeViewBox: false }],
			interlaced: true,
			optimizationLevel: 3 // 0 to 7
		})
	)
	.pipe(dest(path.build.img))       // копирования из src -> dist
	.pipe(browsersync.stream())        // перезагрузка браузера
}

function fonts(){
	src(path.src.fonts)
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts));
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts))
}

// отдельная функция, которую нужно вызывать в отдельном терминале, при запущеном галпе. Команда - gulp svgSprite
// позволяет собирать все svg иконки в один файл
gulp.task('svgSprite', function(){
	return gulp.src([source_folder + '/iconsprite/*.svg'])
		.pipe(svgSprite({
				mode: {
					stack: {
						sprite: '../icons/icons.svg',
						example: true, // опция создает пример
					}	
				},	
			})
		)
		.pipe(dest(path.build.img))
})

gulp.task('otf2ttf', function(){
	return src([source_folder + '/fonts/*.otf'])
		.pipe(
			fonter({
				formats: ['ttf']
			})
		)
		.pipe(dest(source_folder + '/fonts/'));
})

function fontsStyle(){
	let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
	if (file_content == '') {
		fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
}

function cb(){ //callback
}

function watchFiles(){                       // слежка за файлами
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
}
function clean(){
	return del(path.clean);
}
let build = gulp.series(clean, gulp.parallel(css, html, js, images, fonts), fontsStyle);
let watch = gulp.parallel(build,watchFiles,browserSync); // сценарий выполнения

exports.fontsStyle = fontsStyle;
exports.images = images;
exports.css = css;
exports.html = html;
exports.js = js;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;
