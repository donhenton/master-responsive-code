/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var gutil = require('gulp-util');
var del = require('del');
var watch = require('gulp-watch');
var gulpsync = require('gulp-sync')(gulp);
var server = require('gulp-server-livereload');


var livereload = require('gulp-livereload');

var pageURL = 'http://localhost:8080';
var targetLocation = 'public_html/build/';
var SASS_FILES = './src/sass/**/*.scss';

var sassProcess =
        function () {

            return gulp.src('./src/sass/site-styles.scss')
                    .pipe(sass({sourceComments: true, outputStyle: 'expanded',sourceMapEmbed:true,sourceMapContents: true}).on('error', sass.logError))
                    .pipe(concat('css/site-styles.css'))
                    //  .pipe(uglifycss())
                    .pipe(gulp.dest(targetLocation));
        };

gulp.task('sass', function () {
    sassProcess();

});
gulp.task('clean', function (  ) {

    del([targetLocation]);

});

gulp.task('watch', function () {

    watch(SASS_FILES, function (events, done) {

        sassProcess()
                .on('finish', function ( ) {
                    gutil.log("processing change in css");
                    livereload.reload(pageURL);
                });

    });

    

});

gulp.task('serve', function (done) {
    livereload.listen();
    gulp.src('./public_html')
            .pipe(server({
                livereload: {
                    enable: true
                },
                host: '127.0.0.1',
                port: 8080,
                defaultFile: 'index.html',
                directoryListing: false,
                open: true
            }));
});

gulp.task('default', gulpsync.sync(['clean',   'sass',   'watch', 'serve' ]));