import {shell} from "electron";

import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';

import path from "path";
import workspace from "./workspace";
import helper from "./helper";

import {App} from "../view/App";
import {EntryList} from "../view/Entry";
import {MarkdownView, TextView, ProgramSourceView, ImageView, PdfView, EpubView} from "../view/EntryView";
import {MarkdownController} from "../view/EntryController";

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
          let view, controller;

          switch( filetype.type ) {
          case "image":
            view = <ImageView path={query.path} />;
            controller = <ImageController path={query.path} />;
            break;
          case "markdown":
            view = <MarkdownView path={query.path} />;
            controller = <MarkdownController path={query.path} />;
            break;
          case "program":
            view = <ProgramSourceView path={query.path} lang={filetype.lang} />;
            break;
          case "pdf":
            view = <PdfView path={query.path} />;
            break;
          case "epub":
            view = <EpubView path={query.path} />;
            break;
          }

          ReactDOM.render( view, document.querySelector( ".main" ) )
          controller && ReactDOM.render( controller, document.querySelector( ".mainController" ) );
        }
      });
      break;
    case "#!/new-file":
      console.log( "Not implemented yet." );
      break;
    }

    global.location.hash = "#!";
  });

  global.addEventListener( "click", ( event ) => {
    if ( event.target.nodeName.toLowerCase() === "a" ) {
      if ( /^file:\/\/\//.test( event.target.href ) ) {
        let filepath = event.target.href.replace( /^file:\/\//, "" );

        switch( helper.statType( filepath ) ) {
        case "file":
          location.hash = "#!/open-file?path=" + filepath;
          break;
        case "directory":
          location.hash = "#!/open-directory?path=" + filepath;
          break;
        default:
          console.log( "Unsupported type", filepath );
          break;
        }

      }
      else if ( /^https?:\/\//.test( event.target.href ) ) {
        shell.openExternal( event.target.href );
      }
      else {
        console.log( "Not support href", event.target.href );
      }

      event.preventDefault();
    }
  });
}
