import path from "path";
import fs from "fs";
import filetype from "file-type";
import languageDetect from "language-detect";
import highlight from "highlight.js";

let helper = {};

const units = [
  "B",
  "KB",
  "MB",
  "GB"
];

const SUPPORTED = [
  { type: "pdf",      extname: [ ".pdf" ] },
  { type: "epub",     extname: [ ".epub" ] },
  { type: "markdown", extname: [ ".md" ] },
  { type: "image",    extname: [ ".png" ] },
  { type: "image",    pattern: /^image/ }
];

const LANGUAGES = highlight.listLanguages();


helper.hashChange = ( self ) => {
  location.hash = self[ "data-hash" ];
  return false;
}

function precision( size, digit ) {
  let nums = size.toString().split( "." ),
      before = nums[ 0 ],
      after  = ( nums[ 1 ] || "" );
  after = after.split( "" ).splice( 0, digit ).join( "" );

  if ( after.length < digit ) {
    after = after + ( "0" * ( digit - after.length ) );
  }

  return before + "." + after;
}

function convert( size, index ) {
  index = typeof index === "undefined" ? 0 : index;
  let hsize = size / 1024

  if ( hsize < 1 ) {
    return precision( size, 3 ) + units[ index ];
  }
  else if ( typeof units[ index + 1 ] === "undefined" ) {
    return precision( size, 3 ) + units[ index ]
  }
  else {
    return convert( hsize, ++index );
  }
}

helper.humanizedSize = ( size ) => {
  return convert( size );
}

helper.toQuery = ( querystring ) => {
  let query = {};

  querystring.split( "&" ).forEach( ( item ) => {
    let pair  = item.split( "=" ),
        key   = pair.shift(),
        value = pair.join( "=" );
    query[ key ] = value;
  });

  return query
}

function detectFileTypeByRead( filepath, callback ) {
  let stream = fs.createReadStream( filepath, { start: 0, end: 1024} );

  stream.once( "readable", () => {
    let content = stream.read();
    callback( filetype( content ) );
    stream.close();
  });
}

helper.statType = ( filepath ) => {
  const stat = fs.statSync( filepath );

  if ( stat.isFile() ) {
    return "file";
  }
  else if ( stat.isDirectory ) {
    return "directory";
  }
  else {
    return "unsupported";
  }
};

helper.filetype = ( filepath, callback ) => {
  let detected, lang,
      extname = path.extname( filepath );

  SUPPORTED.forEach( function( support ) {
    if ( support.extname && support.extname.indexOf( extname ) > -1 ) {
      detected = { type: support.type };
      return false;
    }
  });

  if ( detected ) {
    callback( null, detected );
  }
  else {
    try {
      lang = languageDetect.sync( filepath ).toLowerCase();

      if ( LANGUAGES.indexOf( lang ) ) {
        detected = { type: "program", lang: lang };
        callback( null, detected );
      }
      else {
        throw new Error( "not support in highlighter" );
      }
    }
    catch( err ) {
      detectFileTypeByRead( filepath, ( filetype ) => {
        if ( filetype !== null ) {
          SUPPORTED.forEach( function( support ) {
            if ( support.pattern && support.pattern.test( filetype.mime ) ) {
              detected = filetype;
              detected.type = support.type;
              return false;
            }
          });
        }

        if ( detected ) {
          callback( null, detected );
        }
        else if ( filetype !== null ) {
          callback( new Error( "Unsupported file type: " + filetype.mime ) );
        }
        else {
          callback( new Error( "Unsupported file type" ) );
        }
      });
    }
  }
}

export default helper;
