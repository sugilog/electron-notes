import fs from "fs";
import path from "path";
import {remote} from "electron";
import helper from "./helper"

function isHidden( entryName ) {
  return entryName[ 0 ] === ".";
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
    ( dirs ) => {
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
  let   entries = [];

  fs.readdir( dir, ( err, entryNames ) => {
    if ( err ) {
      callback( err );
    }
    else {
      entryNames.forEach( ( entryName ) => {
        if ( isHidden( entryName ) ) {
          return
        }

        const entryPath = path.resolve( dir, entryName ),
              stat = fs.statSync( entryPath );

        entries.push( {
          ino:       stat.ino,
          name:      entryName,
          path:      entryPath,
          size:      stat.size,
          updatedAt: stat.mtime,
          type:      helper.statType( entryPath )
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
