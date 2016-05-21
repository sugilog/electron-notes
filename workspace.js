const fs = require( "fs" ),
      path = require( "path" );

function entryType( stat ) {
  if ( stat.isFile() ) {
    return "file";
  }
  else if ( stat.isDirectory ) {
    return "directory";
  }
  else {
    return "unsupported";
  }
}

function list( dirname, callback ) {
  const dir = path.resolve( path.resolve( dirname ) );

  fs.readdir( dir, function( err, entries ) {
    if ( err ) {
      callback( err );
    }
    else {
      entries.forEach( function( entry ) {
        var entrypath = path.resolve( dir, entry ),
            stat      = fs.statSync( entrypath );

        callback( null, {
          name:      entry,
          path:      entrypath,
          size:      stat.size,
          updatedAt: stat.mtime,
          type:      entryType( stat )
        });
      });
    }
  });
}

module.exports = {
  list: list
}
