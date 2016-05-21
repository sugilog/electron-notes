const workspace = require( "./workspace.js" ),
      {dialog}  = require( "electron" ).remote;

exports.ready = function( global ) {
  global.addEventListener( "DOMContentLoaded", function( event ) {
    console.log( "DOMContentLoaded", event );

    // this: window
    // arg[0]: selected entry
    dialog.showOpenDialog(
      {
        properties: [
          "openDirectory"
        ]
      },
      function( dirs ) {
        workspace.list( dirs[ 0 ], function( err, entry ) {
          if ( err ) {
            console.log( err );
          }
          else {
            console.log( entry );
          }
        });
      }
    );
  });

  global.addEventListener( "hashchange", function( event ) {
    console.log( "hashchang", event )
  });
}
