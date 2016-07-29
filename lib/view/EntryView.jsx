import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import path from "path";
import fs from "fs";
import kramed from "kramed";
// import {PDFJS} from "pdfjs-dist";

kramed.setOptions( {
  renderer:    new kramed.Renderer(),
  gfm:         true,
  tables:      true,
  breaks:      true,
  sanitize:    true,
  smartLists:  true
});

kramed.Renderer.prototype.paragraph = function(text) {
  return '<x-pre>' + text + '</x-pre>\n';
};

export class MarkdownView extends React.Component {
  content() {
    const content = fs.readFileSync( this.props.path, "utf8" );
    return (
      <div
        className="markdown-body"
        style={ { padding: 10 } }
        dangerouslySetInnerHTML={ { __html: kramed( content ) } }
      />
    );
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
        onLoad={
          function() {
            function resize() {
              let view = document.querySelector( ".pdfview" ),
                  rect = view.closest( ".main" ).getBoundingClientRect();

              view.querySelector( "iframe" ).style.width  = rect.width  + "px";
              view.querySelector( "iframe" ).style.height = rect.height + "px";
            }

            window.onresize = resize;
            resize();
          }
        }
      />
    )
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
