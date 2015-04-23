// gulpfile.js contains project automation tasks.

var gulp = require('gulp');
var jslint = require('gulp-jslint');
var checkPages = require("check-pages");
var jsonlint = require('gulp-json-lint');
var run = require('gulp-run');
var mocha = require('gulp-mocha');
var bower = require('gulp-bower');

function handleError (err) 
{
    "use strict";
    console.log(err.toString());
    process.exit(-1);
}

// Task default orchestrates the other tasks in a full build:
gulp.task('default', function() 
{
    "use strict";
    console.log(":)");
});

// Task jsonlint will check that the JSON files are well formed:
gulp.task('jsonlint', function(){
    "use strict";
    gulp.start('jsonlintPackageJSON');
    gulp.start('jsonlintBowerJSON');
});

// Task jsonlintPackageJSON will check that the package.json file is well 
// formed:
gulp.task('jsonlintPackageJSON', function(){
    "use strict";
    gulp.src('package.json')
    .pipe(jsonlint())
    .pipe(jsonlint.report('verbose'))
    .on('error', handleError);
});

// Task jsonlintBowerJSON will check that the bower.json file is well formed:
gulp.task('jsonlintBowerJSON', function(){
    "use strict";
    gulp.src('./bower.json')
    .pipe(jsonlint())
    .pipe(jsonlint.report('verbose'))
    .on('error', handleError);
});

// Task jslintGulp will check this file, gulpfile.js, for lint:
gulp.task('jslint', function()
{
    "use strict";
    return gulp.src(['gulpfile.js', 'server.js', './app/**/*.js', 
        './public/app/**/*.js'])

        // Pass your directives as an object:
        .pipe(jslint(
        {
            node: true,
            evil: true,
            nomen: true,
            white: true,
            unparam: true
        }))
        .on('error', handleError);
    });


gulp.task('bower', function() {
    "use strict";
    return bower()
    .pipe(gulp.dest('./public/lib/'))
    .on('error', handleError);
});

// Task checkPages will check that the HTML files served publicly are well 
// formed. The server must be running for this task to work.
gulp.task("checkPages", function(callback) 
{
    "use strict";
    var options = 
    {
        pageUrls: ['http://localhost:8080/'],
        checkLinks: true,
        onlySameDomain: true,
        queryHashes: true,
        noRedirects: true,
        noLocalLinks: true,
        noEmptyFragments: true,
        checkXhtml: true,
        checkCaching: true,
        checkCompression: false,
        maxResponseTime: 1000,
        userAgent: 'custom-user-agent/1.2.3',
        summary: true
    };
    checkPages(console, options, callback);
});

// Task systemTests will run the system tests. The server must be running for
// this to work. This task invokes the tests from the shell because the 
// gulp-casperjs plug-in wouldn't work for me.
gulp.task('systemTests', function () 
{
    "use strict";
    run('./node_modules/casperjs/bin/casperjs test ./test/systemTests.js').exec()
    .pipe(gulp.dest('output'))
    .on('error', handleError);
});

gulp.task('RESTTests', function () {
    "use strict";
    return gulp.src('./test/RESTTest.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}))
    .on('error', handleError);
});


