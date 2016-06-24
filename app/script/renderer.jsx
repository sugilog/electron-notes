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
      workspace.list( dir, function( err, entries ) {
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
