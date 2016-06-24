import fs from "fs";
import path from "path";
import {remote} from "electron";

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

function openDir( callback ) {
  // this: window
  // arg[0]: selected entry
  remote.dialog.showOpenDialog(
    {
      properties: [
        "openDirectory"
      ]
    },
    function( dirs ) {
      if ( typeof dirs === "undefined" ) {
        callback( new Error( "Nothing selected" ) );
      }
      else {
        callback( null, dirs[ 0 ] );
      }
    }
  );
};

function list( dirname, callback ) {
  const entries = [],
        dir = path.resolve( path.resolve( dirname ) );

  fs.readdir( dir, function( err, entryNames ) {
    if ( err ) {
      callback( err );
    }
    else {
      entryNames.forEach( function( entryName ) {
        var entryPath = path.resolve( dir, entryName ),
            stat      = fs.statSync( entryPath );

        entries.push( {
          ino:       stat.ino,
          name:      entryName,
          path:      entryPath,
          size:      stat.size,
          updatedAt: stat.mtime,
          type:      entryType( stat )
        });
      });

      callback( null, entries );
    }
  });
}

module.exports = {
  openDir: openDir,
  list: list
}
