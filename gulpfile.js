var gulp = require('gulp');
var shell = require('gulp-shell');
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var ts = require('gulp-typescript');
var notify = require("gulp-notify");
var typedoc = require("gulp-typedoc");
var tsd = require('gulp-tsd');
var plumber = require('gulp-plumber');
var merge = require('merge2');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var wavi = require('wavi');

var outputPath = 'app/';
var srcTS = ['src/**/*.ts', 'typings/tsd.d.ts'];
var srcFiles = ['src/**/*', '!src/**/*.ts'];

var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

gulp.task('default', function (cb) {
    runSequence('tsd', 'clean', 'compile', 'watch', cb);
});

gulp.task('watch', ['watch:files', 'watch:ts']);

gulp.task('watch:files', function () {

    return gulp.src(srcFiles)
        .pipe(plumber())
        .pipe(watch(srcFiles))
        .pipe(gulp.dest(outputPath))
        .on('end', function () {
            // gulp.start('livesync');
        });
});

gulp.task('watch:ts', function (cb) {

    //return gulp.watch(srcTS, function (event) {
    //    return gulp.src(event.path)
    //        .pipe(ts(tsProject))
    //        .pipe(gulp.dest(path.dirname(event.path.replace('src/','app/'))));
    //});
    return gulp.watch(srcTS, function (event) {
        var tsResult = gulp.src(srcTS)
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(ts(tsProject));

        return merge([
            tsResult.dts.pipe(gulp.dest(outputPath)),
            tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest(outputPath))
        ]);
    });

});


gulp.task('compile', function () {
    var tsResult = gulp.src(srcTS)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return merge([
        tsResult.dts.pipe(gulp.dest(outputPath)),
        tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest(outputPath))
    ]);
});

gulp.task('copy', function () {
    return gulp.src(srcFiles)
        .pipe(plumber())
        .pipe(gulp.dest(outputPath));
});

gulp.task('clean', function () {
    return gulp.src(outputPath, {read: false})
        .pipe(plumber())
        .pipe(clean())
});

gulp.task('deploy', function (cb) {
    runSequence('build', 'run', cb);
});

gulp.task('build', function (cb) {
    runSequence('tsd', 'clean', 'copy', 'compile', cb);
});

gulp.task('tsd', function (callback) {
    tsd({
        command: 'reinstall',
        config: './tsd.json'
    }, callback);
});

gulp.task('docs', function (cb) {

    return gulp
        .src(srcTS)
        .pipe(plumber())
        .pipe(typedoc({
            name: 'Code Generator from RAML files',
            theme: 'minimal',
            module: 'commonjs',
            target: 'es5',
            out: 'docs/'
        }));
});


gulp.task('diagram', function (cb) {
    wavi.generateGraph('png', 'app', 'class-diagram.png', false, function (err) {
        cb();
    });
});