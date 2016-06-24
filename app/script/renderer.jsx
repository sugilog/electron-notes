import React from "react";
import ReactDOM from "react-dom";
import workspace from "./workspace";
import {FileInfo, FileList} from "../view/view";

import path from "path";
let global;

function currentDir( dir ) {
  console.log( global, global.localStorage, dir );
  if ( typeof dir === "undefined" || dir === null ) {
    return global.localStorage.dir;
  }
  else {
    return global.localStorage.dir = dir;
  }
}

function listEntries( dir ) {
  currentDir( dir );

  workspace.list( dir, ( err, entries ) => {
    if ( err ) {
      console.log( err );
    }
    else {
      ReactDOM.render(
        <FileList entries={entries} />,
        document.querySelector( "#main" )
      );
    }
  });
}

function selectDir() {
  workspace.openDir( ( err, dir ) => {
    if ( err ) {
      console.log( err );
    }
    else {
      listEntries( dir );
    }
  });
}

export function ready( _global ) {
  global = _global;

  global.addEventListener( "DOMContentLoaded", ( event ) => {
    selectDir();
    location.hash = "#!";
  });

  global.addEventListener( "hashchange", ( event ) => {
    console.log( "hashchang", event )
    console.log( global );

    var hashes = global.location.hash.split( "?" ),
        action = hashes.shift(),
        query  = toQuery( hashes.join( "?" ) );

    switch( action ) {
    case "#!":
      // do nothing
      break;
    case "#!/select-dir":
      selectDir();
      break;
    case "#!/open-directory":
      console.log( currentDir(), query.path );
      listEntries( path.resolve( currentDir(), query.path ) );
      break;
    case "#!/open-file":
      break;
    }

    global.location.hash = "#!";
  });
}

function toQuery( querystring ) {
  var query = {};

  querystring.split( "&" ).forEach( ( item ) => {
    var pair  = item.split( "=" ),
        key   = pair.shift(),
        value = pair.join( "=" );
    query[ key ] = value;
  });

  return query
}
