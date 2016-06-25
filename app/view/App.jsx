import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

const buttonStyle = {
  margin: 12,
};

export const App = () => (
  <MuiThemeProvider>
    <div>
      <MySideLayout />
      <MyMainLayout />
    </div>
  </MuiThemeProvider>
);

export const MySideLayout = () => (
  <section className="side">
    <MyHeaderLayout />
    <MyEntryListLayout />
  </section>
);

export const MyHeaderLayout = () => (
  <section className="header">
    <RaisedButton
      label="OPEN"
      style={buttonStyle}
      onTouchTap={
        function( event ) {
          location.hash = this[ "data-hash" ];
          return false;
        }
      }
      data-hash={"#!/select-dir"}
    />
    <RaisedButton
      label="PARENT"
      style={buttonStyle}
      onTouchTap={
        function( event ) {
          location.hash = this[ "data-hash" ];
          return false;
        }
      }
      data-hash={"#!/move-parent"}
    />
  </section>
);

export const MyEntryListLayout = () => (
  <section className="entrylist" />
);

export const MyMainLayout = () => (
  <section className="main" />
);
