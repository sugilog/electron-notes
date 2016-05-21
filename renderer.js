const workspace = require( "./workspace.js" );

exports.ready = function( global ) {
  global.addEventListener( "DOMContentLoaded", function( event ) {
    console.log( "DOMContentLoaded", event );

    workspace.openDir( function( dir ) {
      workspace.list( dir, function( err, entry ) {
        if ( err ) {
          console.log( err );
        }
        else {
          console.log( entry );
        }
      });
    });
  });

  global.addEventListener( "hashchange", function( event ) {
    console.log( "hashchang", event )
  });
}
