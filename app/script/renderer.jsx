import React from "react";
import ReactDOM from "react-dom";
import workspace from "./workspace";
import {FileInfo, FileList} from "../view/view";

function listEntries() {
  workspace.openDir( function( err, dir ) {
    if ( err ) {
      console.log( err );
    }
    else {
      var entries = [];

      workspace.list( dir, function( err, entry ) {
        if ( err ) {
          console.log( err );
        }
        else {
          entries.push( entry );

          ReactDOM.render(
            <FileList entries={entries} />,
            document.querySelector( "#main" )
          );
        }
      });
    }
  });
}

export function ready( global ) {
  global.addEventListener( "DOMContentLoaded", function( event ) {
    listEntries();
  });

  global.addEventListener( "hashchange", function( event ) {
    console.log( "hashchang", event )

    if ( "#!" === global.location.hash ) {
      // do nothing
    }
    else if ( "#!/open-dir" === global.location.hash ) {
      listEntries();
      global.location.hash = "#!";
    }
  });
}
