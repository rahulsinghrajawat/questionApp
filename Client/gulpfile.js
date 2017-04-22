var gulp = require('gulp'); // import the gulp module itself
var useref = require('gulp-useref');
var minifyCss = require('gulp-minify-css');
var gulpif = require('gulp-if');
var wiredep = require('wiredep').stream;
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var runSequence = require('gulp-run-sequence');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var bowerComponent = './app/components';
gulp.task('copy-html-files', function () {
    var stream =  gulp.src('./app/views/**/*.html') // stream source
        .pipe(gulp.dest('./dist/views/')); // copy to dist/views
    return stream;
});

gulp.task('copy-libs', function () {
    var stream =  gulp.src('./app/libs/**/*.*') // stream source
        .pipe(gulp.dest('./dist/libs/')); // copy to dist/views
    return stream;
});

gulp.task('css-files', function () {
    var stream = gulp.src('./app/index.html')
        .pipe(useref()) //take a streem from index.html comment
        .pipe(gulpif('*.css', minifyCss())) // if .css file, minify
        .pipe(gulpif('*.css', gulp.dest('./dist'))); // copy to dist
    return stream;
});

gulp.task('bower-files', function () {
    var stream = gulp.src('./app/index.html')
        .pipe(wiredep({
            directory: bowerComponent //inject dependencies
        }))
        .pipe(useref())
        .pipe(gulpif('*.js', ngAnnotate())) // ng-annotate if .js
        .pipe(gulpif('*.js', uglify())) // uglify if .js
        .pipe(gulpif('*.js', gulp.dest('./dist'))); // paste to dist
    return stream;
});

gulp.task('bower-files-dev', function () {
    var stream = gulp.src('./app/index.html')
        .pipe(wiredep({
            directory: bowerComponent
        }))
        .pipe(useref())
        .pipe(gulpif('*.js', gulp.dest('./dist')));
    return stream;
});

gulp.task('clean', function () {
        var stream =  gulp.src('./dist', {read: false})
                      .pipe(clean());
        return stream
});

gulp.task('serve', [], function() {
    startBrowserSync('serve');
});

gulp.task('image', function () {
    var stream =  gulp.src('./app/images/*.*')
    .pipe(gulp.dest('./dist/images'));
    return stream;

});

gulp.task('initialize', function () {
    var stream =  gulp.src('./app/index.html')
        .pipe(wiredep({
            directory: bowerComponent
        }))
        .pipe(useref())
        .pipe(gulp.dest('./dist'));
    return stream;
});

gulp.task('watch', function() {
    gulp.watch('./app/**/**/*.*', function () {
        runSequence('bower-files-dev', 'copy-html-files');
    });
});

gulp.task('dev', function (callback) {
    runSequence(
        'initialize',
        'css-files',
        'bower-files-dev',
        'copy-html-files',
        'image',
        'copy-libs',        
        'watch',
    callback);    
});


gulp.task('build', function(callback){
    runSequence(
        'initialize',
        'bower-files',
        'css-files',
        'copy-html-files',
        'image',       
        callback
    );
});

gulp.task('default', function () {
    runSequence('clean', 'dev');
});

function startBrowserSync(opt) {
    

    var options = {
        port: 3000,
        ghostMode: {
            clicks: false,
            location: false,
            forms: false,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0, //1000,
        online: false
    };

    switch(opt) {       
        case 'serve':            
            serveApp();
            break;
        default:
           break;
    }

    function serveApp() {

        options.server = {
            baseDir: [
                "app",                
                ".tmp"
            ]
        };
        options.files = [        	
            "app" + '/**/*.*',           
            ".tmp" + '/**/*.css'
        ];

        browserSync(options);
    }

   

    

}