import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import path from "path";
import fs from "fs";
import kramed from "kramed";
import highlightjs from "highlight.js";
import EPUB from "epub";

import HTTP from "http";
const PORT = 54321; 
let SERVER;

kramed.setOptions( {
  renderer:    new kramed.Renderer(),
  gfm:         true,
  tables:      true,
  breaks:      true,
  sanitize:    true,
  smartLists:  true,
  highlight:   ( code, lang, callback ) => {
    callback( null, highlightjs.highlightAuto( code ).value );
  }
});

kramed.Renderer.prototype.paragraph = function(text) {
  return '<x-pre>' + text + '</x-pre>\n';
};

export class MarkdownView extends React.Component {
  constructor( props ) {
    super( props );
    this.state = { path: props.path };
  }

  content() {
    return (
      <div
        className="markdown-body"
        style={ { padding: 10 } }
        dangerouslySetInnerHTML={ { __html: this.state.content } }
      />
    );
  }

  append() {
    const text = fs.readFileSync( this.props.path, "utf8" );

    kramed( text, ( err, converted ) => {
      if ( err ) {
        reject( err );
      }
      else {
        this.setState( { content: converted } );
      }
    })
  }

  componentDidMount() {
    this.setState( { path: this.props.path } );
    this.append();
  }

  componentDidUpdate() {
    if ( this.state.path !== this.props.path ) {
      this.append();
      this.setState( { path: this.props.path } );
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="entryContent textview">
          <base href={ this.props.path } />
          {this.content()}
        </div>
      </MuiThemeProvider>
    )
  }
}

export class TextView extends React.Component {
  content() {
    const content = fs.readFileSync( this.props.path, "utf8" );
    return <pre>{content}</pre>;
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="entryContent textview">
          <base href={ this.props.path } />
          {this.content()}
        </div>
      </MuiThemeProvider>
    )
  }
}

export class ImageView extends React.Component {
  content() {
    const style = {
      maxWidth: "100%"
    };

    return (
      <img
        src={this.props.path}
        style={style}
        onLoad={
          function() {
            let view = document.querySelector( ".imageview" ),
                height = view.closest( ".main" ).getBoundingClientRect().height;

            view.querySelector( "img" ).style.maxHeight = height + "px";
          }
        }
      />
    );
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="entryContent imageview">
          <base href={ this.props.path } />
          {this.content()}
        </div>
      </MuiThemeProvider>
    )
  }
}

export class PdfView extends React.Component {
  content() {
    const viewer = "file://" + path.resolve( "pdfjs", "web", "viewer.html" ) + "?file=" + this.props.path,
          style = {
            border: 0
          }

    return (
      <iframe
        style={style}
        src={viewer}
      />
    )
  }

  resizable() {
    function resize() {
      let view = document.querySelector( ".pdfview" ),
          rect = view.closest( ".main" ).getBoundingClientRect();

      view.querySelector( "iframe" ).style.width  = rect.width  + "px";
      view.querySelector( "iframe" ).style.height = rect.height + "px";
    }

    window.onresize = resize;
    resize();
  }

  componentDidMount() {
    this.resizable();
  }

  componentDidUpdate() {
    this.resizable();
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="entryContent pdfview">
          <base href={ this.props.path } />
          {this.content()}
        </div>
      </MuiThemeProvider>
    )
  }
}

export class EpubView extends React.Component {
  content() {
    return (
      <div className="epubcontent" />
    )
  }

  closeServer() {
    if ( SERVER ) {
      console.log( "Close server" );
      SERVER.close();
      SERVER = null;
    }
  }

  openServer( epub ) {
    function handleRequest( request, response ) {
      let promise;
      const resources  = request.url.split( "/", 3 ),
            type       = resources[ 1 ],
            resourceId = resources[ 2 ];

      promise = new Promise( ( done, reject ) => {
        switch ( type ) {
        case "image":
          epub.getImage( resourceId, ( err, img, mimeType ) => {
            if ( err ) {
              reject( err );
            }
            else {
              done( { content: img, type: mimeType } );
            }
          });
          break;
        default:
          console.log( "Unknown type requested", type, resoureId );
          break;
        }

      });
      promise.then(
        ( resource ) => {
          response.writeHead( 200, { 'Content-Type': resource.type } );
          response.end( resource.content );
        },
        ( err ) => {
          console.log( err );
          response.writeHead( 500 );
          response.end( " " );
        }
      );
    }
    SERVER = HTTP.createServer( handleRequest );
    SERVER.setTimeout( 2000 );
    SERVER.listen( PORT );
  }

  append() {
    const webroot = "http://localhost:" + PORT;
    let view = document.querySelector( ".epubview > .epubcontent" ),
        epub = new EPUB( this.props.path, webroot + "/image/", webroot + "/file/" );

    this.closeServer();

    epub.on( "end", () => {
      this.openServer( epub );

      for ( let key in epub.manifest ) {
        if ( /css/.test( epub.manifest[ key ][ "media-type" ] ) ) {
          epub.getFile( epub.manifest[ key ].id, ( err, css ) => {
            let style = document.createElement( "style" );
            style.innerHTML = css;
            view.appendChild( style );
          });
        }
      };

      epub.flow.forEach( ( chapter ) => {
        epub.getChapter( chapter.id, ( err, text ) => {
          let article = document.createElement( "article" );
          article.innerHTML = text;
          article.querySelectorAll( "image" ).forEach( ( img ) => {
            const attr = "xlink:href";
            let href;

            if ( href = img.getAttribute( attr ) ) {
              for ( let key in epub.manifest ) {
                if ( epub.manifest[ key ].href === href ) {
                  img.setAttribute( attr, webroot + "/image/" + epub.manifest[ key ].id + "/" + href );
                }
              }
            }
          });

          view.appendChild( article );

          article.querySelectorAll( "img" ).forEach( ( img ) => {
            img.style.maxWidth = "90%";
          });
        });
      });
    });
    epub.parse();
  }

  componentDidMount() {
    this.append();
  }

  componentDidUpdate() {
    let view = document.querySelector( ".epubview > .epubcontent" );
    view.innerHTML = "";
    this.append();
  }

  componentWillUnmount() {
    this.closeServer()
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="entryContent epubview">
          <base href={ this.props.path } />
          {this.content()}
        </div>
      </MuiThemeProvider>
    )
  }
}
