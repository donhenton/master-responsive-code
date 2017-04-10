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

var pageURL = 'http://127.0.0.1:8080';
var targetLocation = 'public_html/build/';
var SASS_FILES = './src/sass/**/*.scss';

var sassProcess =
        function (sassSrc) {

            return gulp.src(sassSrc)
                    .pipe(sass({sourceComments: true, outputStyle: 'expanded',sourceMapEmbed:true,sourceMapContents: true}).on('error', sass.logError))
                    .pipe(concat('css/site-styles.css'))
                    //  .pipe(uglifycss())
                    .pipe(gulp.dest(targetLocation));
        };

gulp.task('sass', function () {
    sassProcess('./src/sass/site-styles.scss');

});

gulp.task('sass-my-code', function () {
    sassProcess('./src/sass/my-code.scss');

});

gulp.task('clean', function (  ) {

    del([targetLocation]);

});

gulp.task('watch', function () {

    watch(SASS_FILES, function (events, done) {

        sassProcess('./src/sass/site-styles.scss')
                .on('finish', function ( ) {
                    gutil.log("processing change in css");
                    livereload.reload(pageURL);
                });

    });

    

});

gulp.task('watch-mycode', function () {

    watch(SASS_FILES, function (events, done) {

        sassProcess('./src/sass/my-code.scss')
                .on('finish', function ( ) {
                    gutil.log("processing change in css");
                    livereload.reload(pageURL);
                });

    });

     watch('./src/js/**/*', function (events, done) {

        gulp.start('copy-assets');
    });

});

gulp.task('copy-assets', function () {
    
      gulp.src(['./src/js/**/*'] )
              .pipe(gulp.dest(targetLocation+'/js'));
 
    
    
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
gulp.task('mycode', gulpsync.sync(['clean',   'sass-my-code', 'copy-assets', 'watch-mycode', 'serve' ]));