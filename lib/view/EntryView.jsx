import React from "react";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import fs from "fs";
import kramed from "kramed";

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
      <MuiThemeProvider muiTheme={getMuiTheme()}>
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
      <MuiThemeProvider muiTheme={getMuiTheme()}>
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

            console.log( this, arguments, view, view.querySelector( "img" ), height );
            view.querySelector( "img" ).style.maxHeight = height + "px";
          }
        }
      />
    );
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="entryContent imageview">
          <base href={ this.props.path } />
          {this.content()}
        </div>
      </MuiThemeProvider>
    )
  }
}
