var gulp  = require( "gulp" ),
    babel = require( "gulp-babel" );

gulp.task( "babel", function() {
  gulp.src( "./**/*.jsx" )
    .pipe( babel() )
    .pipe( gulp.dest( "./" ) );
});

gulp.task( "watch", function() {
  gulp.watch( "./**/*.jsx", [ "babel" ] );
});

gulp.task( "default", [ "babel", "watch" ] );
