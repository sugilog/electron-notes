var gulp  = require( "gulp" ),
    babel = require( "gulp-babel" );

gulp.task( "babel", function() {
  gulp.src( "./lib/**/*.jsx" )
    .pipe( babel() )
    .pipe( gulp.dest( "./app/" ) );
});

gulp.task( "watch", function() {
  gulp.watch( "./lib/**/*.jsx", [ "babel" ] );
});

gulp.task( "default", [ "babel", "watch" ] );
