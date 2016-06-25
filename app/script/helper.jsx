let helper = {};

const units = [
  "B",
  "KB",
  "MB",
  "GB"
];

helper.hashChange = ( self ) => {
  location.hash = self[ "data-hash" ];
  return false;
}

function precision( size, digit ) {
  let nums = size.toString().split( "." ),
      before = nums[ 0 ],
      after  = ( nums[ 1 ] || "" );
  after = after.split( "" ).splice( 0, digit ).join( "" );

  if ( after.length < digit ) {
    after = after + ( "0" * ( digit - after.length ) );
  }

  return before + "." + after;
}

function convert( size, index ) {
  index = typeof index === "undefined" ? 0 : index;
  let hsize = size / 1024

  if ( hsize < 1 ) {
    return precision( size, 3 ) + units[ index ];
  }
  else if ( typeof units[ index + 1 ] === "undefined" ) {
    return precision( size, 3 ) + units[ index ]
  }
  else {
    return convert( hsize, ++index );
  }
}

helper.humanizedSize = ( size ) => {
  return convert( size );
}

helper.toQuery = ( querystring ) => {
  var query = {};

  querystring.split( "&" ).forEach( ( item ) => {
    var pair  = item.split( "=" ),
        key   = pair.shift(),
        value = pair.join( "=" );
    query[ key ] = value;
  });

  return query
}

export default helper;
