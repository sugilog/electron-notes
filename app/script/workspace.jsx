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
          ino:       stat.ino,
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
  openDir: openDir,
  list: list
}
