var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var del = require('del');

var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var htmlmin = require('gulp-htmlmin');

var paths = {
    scripts: 'src/assets/js/**/*',
    images: 'src/assets/img/**/*',
    css: ['src/assets/css/reset.css', 'src/assets/css/music.css', 'src/assets/css/main.css'],
    audio: 'src/assets/audio/**/*',
    font: 'src/assets/font/**/*',
    html: 'src/*.html'
};

gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('copy', ['clean'], function() {
    gulp.src(paths.audio).pipe(gulp.dest('dist/assets/audio'));
    gulp.src(paths.font).pipe(gulp.dest('dist/assets/fonts'));
})

gulp.task('html', ['clean'], function() {
    gulp.src(paths.html)
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'));
})

gulp.task('scripts', ['clean'], function() {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('index.js'))
        .pipe(rev())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'))
});

gulp.task('css', ['clean'], function() {
    return gulp.src(paths.css)
        .pipe(concat('index.css'))
        .pipe(minifyCSS())
        //.pipe(less())
        .pipe(rev())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'))
});

// Copy all static images
gulp.task('images', ['clean'], function() {
    return gulp.src(paths.images)
        // Pass in options to the task
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest('dist/assets/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
});

gulp.task('rev', ['clean'], function() {
    return gulp.src(['rev/**/*.json', 'src/templates/**/*.html'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                './assets/css': './assets/css',
                './assets/js': './assets/js/'
            }
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['copy', 'rev', 'css', 'scripts', 'images']);