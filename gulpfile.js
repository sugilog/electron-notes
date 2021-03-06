var gulp   = require( "gulp" ),
    babel  = require( "gulp-babel" ),
    rename = require( "gulp-rename" );

gulp.task( "babel", function() {
  gulp.src( "./lib/**/*.jsx" )
    .pipe( babel() )
    .pipe( gulp.dest( "./app/" ) );
});

gulp.task( "html", function() {
  gulp.src( "./lib/**/*.html" )
    .pipe( gulp.dest( "./app/" ) );
});

gulp.task( "css", function() {
  gulp.src( "./github-markdown-css/github-markdown.css" )
    .pipe( gulp.dest( "./app/" ) );

  gulp.src( "./node_modules/highlight.js/styles/github.css" )
    .pipe( rename( { basename: "highlight.js", extname: ".css" } ) )
    .pipe( gulp.dest( "./app/" ) );

  gulp.src( "./lib/**/*.css" )
    .pipe( gulp.dest( "./app/" ) );
});

gulp.task( "copy", [ "babel", "html", "css" ] );

gulp.task( "watch", function() {
  gulp.watch( "./lib/**/*.jsx", [ "babel" ] );
  gulp.watch( "./lib/**/*.html", [ "html" ] );
  gulp.watch( "./github-markdown-css/github-markdown.css", [ "css" ] );
  gulp.watch( "./node_modules/highlight.js/styles/github.css", [ "css" ] );
  gulp.watch( "./lib/**/*.css", [ "css" ] );
});

gulp.task( "default", [ "copy", "watch" ] );
