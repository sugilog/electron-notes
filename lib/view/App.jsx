import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import helper from "../script/helper";

const buttonStyle = {
        margin: 12,
      },
      sideHeaderStyle = {
        position: "absolute",
        top:      0,
        left:     0,
        right:    0,
        height:   70
      },
      sideStyle = {
        position: "absolute",
        top:      50,
        left:     0,
        bottom:   0,
        width:    350,
        overflow: "scroll"
      },
      entrylistStyle = {
        position:   "absolute",
        top:        0,
        left:       0,
        right:      0,
        overflow:   "hidden"
      },
      mainStyle = {
        position: "absolute",
        top:      0,
        left:     350,
        right:    0,
        bottom:   0,
        overflow: "scroll"
      },
      mainControllerLayout = {
        position: "absolute",
        top:      0,
        right:    0,
        padding:  10
      };


export const App = () => (
  <MuiThemeProvider>
    <div>
      <MySideHeaderLayout />
      <MySideLayout />
      <MyMainLayout />
      <MyMainControllerLayout />
    </div>
  </MuiThemeProvider>
);

export const MySideHeaderLayout = () => (
  <section className="side-heaader" style={sideHeaderStyle}>
    <MyHeaderLayout />
  </section>
);

export const MySideLayout = () => (
  <section className="side" style={sideStyle}>
    <MyEntryListLayout />
  </section>
);

export const MyHeaderLayout = () => (
  <div>
    <RaisedButton
      label="OPEN"
      style={buttonStyle}
      onTouchTap={
        function( e ) {
          helper.hashChange( e.currentTarget );
        }
      }
      data-hash="#!/select-dir"
    />
    <RaisedButton
      label="PARENT"
      style={buttonStyle}
      onTouchTap={
        function( e ) {
          helper.hashChange( e.currentTarget );
        }
      }
      data-hash="#!/move-parent"
    />
    <RaisedButton
      label="NEW"
      style={buttonStyle}
      onTouchTap={
        function( e ) {
          helper.hashChange( e.currentTarget );
        }
      }
      data-hash="#!/new-file"
    />
  </div>
);

export const MyEntryListLayout = () => (
  <section className="entrylist" style={entrylistStyle} />
);

export const MyMainLayout = () => (
  <section className="main" style={mainStyle} />
);

export const MyMainControllerLayout = () => (
  <section className="mainController" style={mainControllerLayout} />
)
