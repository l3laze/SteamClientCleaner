'use strict';

const electron = require('electron')
const remote = require('electron').remote
const path = require('path')
const os = require('os')
const fs = remote.require('fs-extra')
const dialog = remote.require('electron').dialog
const app = remote.require('electron').app

var _steamCleaner;

function SteamClientCleaner() {
  if( _steamCleaner === undefined ) {
    this.steamPath = undefined;
    this.whitelist = [
      "config",
      "registry.vdf",
      "steamapps",
      "userdata",
      "Steam.exe"
    ];
  }

  _steamCleaner = this;
}

SteamClientCleaner.prototype.chooseSteam = function() {
  var chosen = dialog.showOpenDialog({
    title: "Select your Steam installation folder",
    properties: ['openDirectory'],
    defaultPath: this.getDefaultLocation()
  });

  if( chosen === undefined ) {
    alert( "You must choose a Steam location before you can continue." );
  }
  else {
    if( fs.existsSync( path.join( chosen[ 0 ], "config", "config.vdf" )) === false ) {
      throw new Error( "Invalid Steam installation path. Please try again." );
    }
    else {
      this.steamPath = chosen[ 0 ];
    }
  }
}

SteamClientCleaner.prototype.cleanSteam = function() {
  if( this.steamPath !== undefined ) {
    var data = fs.readdirSync( this.steamPath );
    for( var i = 0; i < data.length; i++ ) {
      if( this.whitelist.includes( data[ i ]) === false && data[ i ].indexOf( "ssfn" ) === -1 ) {
        console.info( "Deleting " + data[ i ]);
        try {
          fs.removeSync( path.join( this.steamPath, data[ i ]));
        }
        catch( err ) {
          if( err.indexOf( "EPERM" )) {
            throw new Error( "Please make sure the Steam client is not running." );
          }
          else {
            throw new Error( "Problem cleaning `./Steam/` -- " + err );
          }
        }
      }
    }

    console.info( "Cleaning ../config/" );

    var data = fs.readdirSync( path.join( this.steamPath, "config" ));
    for( var i = 0; i < data.length; i++ ) {
      if( data[ i ] !== "config.vdf" && data[ i ] !== "loginusers.vdf" ) {
        console.info( "Deleting " + data[ i ]);
        try {
          fs.removeSync( path.join( this.steamPath, "config", data[ i ]));
        }
        catch( err ) {
          if( err.indexOf( "EPERM" )) {
            throw new Error( "Please make sure the Steam client is not running." );
          }
          else {
            throw new Error( "Problem cleaning `../config/` -- " + err );
          }
        }
      }
    }

    alert( "Done!" );
  }
  else {
    alert( "You must set a Steam location before you can clean." );
  }
};

SteamClientCleaner.prototype.getDefaultLocation = function() {
  if( os.platform().indexOf( "darwin" ) !== -1 ) {
    return path.join( app.getPath( "appData" ), "Steam" );
  }
  else if( os.platform().indexOf( "linux" ) !== -1 ) {
    return path.join( app.getPath( "home" ), ".share", "steam" );
  }
  else if ( os.platform().indexOf( "win32" ) !== -1 ) {
    if( fs.existsSync( path.join( "C:", "Program Files (x86)" ))) {
      return path.join( "C:", "Program Files (x86)", "Steam" );
    }
    else {
      return path.join( "C:", "Program Files", "Steam" );
    }
  }
  else {
    return "Your OS is unsupported; sorry.";
  }
};

process.on('uncaughtException', (err) => {
    logger.error('Whoops! There was an uncaught error', err);
    // do a graceful shutdown,
    // close the database connection etc.
    process.exit( 1 );
});
