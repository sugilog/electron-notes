const workspace = require( "./workspace.js" );

function listEntries() {
  workspace.openDir( function( err, dir ) {
    if ( err ) {
      console.log( err );
    }
    else {
      workspace.list( dir, function( err, entry ) {
        if ( err ) {
          console.log( err );
        }
        else {
          console.log( entry );
        }
      });
    }
  });
}

exports.ready = function( global ) {
  global.addEventListener( "DOMContentLoaded", function( event ) {
    listEntries();
  });

  global.addEventListener( "hashchange", function( event ) {
    console.log( "hashchang", event )

    if ( "#!" === global.location.hash ) {
      // do nothing
    }
    else if ( "#!/open-dir" === global.location.hash ) {
      listEntries();
      global.location.hash = "#!";
    }
  });
}
