const { Menu } = require('electron')
const electron = require('electron')
const app = electron.app
const os = require('os')

const template = [
  {
    label: 'View',
    submenu: [
      {
        role: 'reload'
      },
      {
        role: 'toggledevtools'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Help',
        click( item, window, event ) {
          window.webContents.executeJavaScript(
            "$( '#contributorContainer' ).css( 'display', 'none' );" +
            "$( '#madeWithContainer' ).css( 'display', 'none' );" +
            "$( '#mainContainer' ).css( 'display', 'none' );" +
            "$( '#helpContainer' ).css( 'display', 'block' );",
            function( result ) { /* Ignoring it..*/ }
          );
        }
      }
    ]
  }
]

if (os.platform() === 'darwin') {
  const name = app.getName()
  template.unshift({
    label: 'Edit',
    submenu: [
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'selectall'
      }
    ]
  })
  template.unshift({
    label: name,
    submenu: [
      {
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  })
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
