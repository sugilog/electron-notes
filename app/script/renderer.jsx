import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';

import path from "path";
import workspace from "./workspace";
import helper from "./helper";

import {App} from "../view/App";
import {EntryList} from "../view/Entry";
import {TextView, ImageView} from "../view/EntryView";

injectTapEventPlugin();

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
        query  = helper.toQuery( hashes.join( "?" ) );

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
    case "#!/open-file":
      helper.filetype( query.path, function( err, filetype ) {
        if ( err ) {
          console.log( err.message );
        }
        else {
          switch( filetype.type ) {
          case "image":
            ReactDOM.render(
              <ImageView path={query.path} />,
              document.querySelector( ".main" )
            );
            break;
          case "markdown":
            ReactDOM.render(
              <TextView path={query.path} />,
              document.querySelector( ".main" )
            );
            break;
          }
        }
      });
      break;
    }

    global.location.hash = "#!";
  });
}
