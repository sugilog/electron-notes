import React from "react";
import ReactDOM from "react-dom";

import workspace from "./workspace";
import {App} from "../view/App";
import {EntryList} from "../view/entry";

import path from "path";
let global;

function currentDir( dir ) {
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
        <EntryList entries={entries} />,
        document.querySelector( ".entrylist" )
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
    ReactDOM.render(
      <App />,
      document.querySelector( "#app" )
    );
    selectDir();
    location.hash = "#!";
  });

  global.addEventListener( "hashchange", ( event ) => {
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
    case "#!/move-parent":
      listEntries( path.resolve( currentDir(), ".." ) );
      break;
    case "#!/open-directory":
      listEntries( path.resolve( query.path ) );
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
