import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import helper from "../script/helper";

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
        function() {
          helper.hashChange( this );
        }
      }
      data-hash={"#!/select-dir"}
    />
    <RaisedButton
      label="PARENT"
      style={buttonStyle}
      onTouchTap={
        function() {
          helper.hashChange( this );
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
