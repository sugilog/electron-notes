exports.ready = function( global ) {
  global.addEventListener( "DOMContentLoaded", function( event ) {
    console.log( "DOMContentLoaded", event );
  });

  global.addEventListener( "hashchange", function( event ) {
    console.log( "hashchang", event )
  });
}
