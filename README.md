## SteamClientCleaner

[![AppVeyor Build Status](https://img.shields.io/appveyor/ci/l3laze/SteamClientCleaner/master.svg)](https://ci.appveyor.com/project/l3laze/SteamClientCleaner)

[![Libraries.io for GitHub](https://img.shields.io/librariesio/github/l3laze/SteamClientCleaner.svg)](https://github.com/l3laze/SteamClientCleaner/issues)

[![GitHub issues](https://img.shields.io/github/issues/l3laze/SteamClientCleaner.svg)](https://github.com/l3laze/SteamClientCleaner/issues)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/l3laze/SteamClientCleaner/master/LICENSE.md)

[![Total Downloads](https://img.shields.io/github/downloads/l3laze/SteamClientCleaner/total.svg)](https://github.com/l3laze/SteamClientCleaner/releases)


> A tool to automate "Steam Client clean up", as described [here](https://forums.steamrep.com/threads/steam-client-clean-up.104175/).

--------------------------------------------------------------------------------

# Table of contents

- [SteamClientCleaner](#SteamClientCleaner)
- [Table of contents](#table-of-contents)
- [What is it?](#what-is-it)
- [Why?](#why)
- [Installation](#installation)

  - [Windows](#windows)
  - [Mac](#mac)

- [Usage](#usage)

  - [Notes](#notes)
  - [Warning](#warning)
  
- [Do It Manually](#do-it-manually) (Giggity)

- [Unsigned](#unsigned)
- [License](#license)
- [Contact](#contact)

# What is it?

> A tool to automate "Steam Client clean up", as described [here](https://forums.steamrep.com/threads/steam-client-clean-up.104175/).

- Deletes most of the Steam client installation files, but:

 - Will not delete the folders with your screenshots or installed apps & games.

 - Will not force you to login to Steam again.

 - Will not destroy the categories you've set for apps.

--------------------------------------------------------------------------------

# Why?

The Steam client can get bloated from log files, and stores a lot of information in it's client installation data that is kept for historical purposes or other reasons, and isn't necessary or can keep refreshed/updated. Some information can also become corrupted during updates, or in the course of "natural" use (when Steam crashes..). But, doing a Steam Client clean up can help.

--------------------------------------------------------------------------------

# Installation

## Windows

Download the latest SteamClientCleaner-v#.#.#-Setup.exe and install it.

## Mac

  Download the latest SteamClientCleaner-#.#.#.dmg, mount it, and then drag SteamClientCleaner.app to Applications.

--------------------------------------------------------------------------------

# Usage

## Notes

SCC does a lot of reading/writing. Using it on/from an SSD is not recommended.

Don't run SCC while Steam is running, or you will get an error, and it may cause issues for the Steam client!

If prompted by your OS to delete the SteamApps folder **don't do it!**

--------------------------------------------------------------------------------

## Warning

SteamClientCleaner is in no way affiliated with, authorized, maintained, sponsored or endorsed by Valve or any employees of Valve. It's also experimental, as with almost any program, so

***USE AT YOUR OWN RISK***.

--------------------------------------------------------------------------------

First, make sure Steam is closed.

Press "Choose" and then find and select your Steam installation folder. If you're using the default Steam installation location it should be automatically selected. The default Steam installation location can also be viewed by going to the Help page.

Press "Clean". Wait; the program will say when it's "Done".

Exit SCC and start Steam (.exe, .app, however you like to start it -- I won't tell anyone); Steam will reinstall itself and launch when finished.

--------------------------------------------------------------------------------

# Do It Manually
(Giggity)

First, make sure Steam is not open. If it's open you **will** get error(s), and may cause problems for the Steam client.

* Go to the folder where Steam is installed (by default this is C:\\Program Files\\Steam or C:\\Program Files (x86)\\Steam on Windows, /Users/yourusername/Library/Application Support/Steam on Mac, and I think /home/username/.steam on Ubuntu Linux).

* Delete everything in the ../Steam/config/ folder ***except for***
 * config.vdf
 * loginusers.vdf

* Delete everything in the ../Steam/ folder ***except for***
 * ../Steam/steamapps/ -- installed games
 * ../Steam/config/ -- config folder above
 * ../Steam/userdata/ -- some settings, screenshots, local save data (which should be synched to the Steam Cloud, but isn't always)
 * ../Steam/ssfn\* -- ***All files*** that start with the characters ssfn

* Then run Steam (.exe, .app, whatever) to "re-install" the client around the existing data.

--------------------------------------------------------------------------------

# License

Distributed under the MIT license. See [LICENSE](https://github.com/l3laze/SteamClientCleaner/blob/master/LICENSE.md) for more information.

--------------------------------------------------------------------------------

# Contact

l3l_aze (Tom Shaver) [GitHub]([https://github.com/l3laze/) [Reddit](https://www.reddit.com/u/l3l_aze) [Steam](http://steamcommunity.com/id/l3l_aze/) email: l3l_aze [at] yahoo (dot) com

<https://github.com/l3laze/SteamClientCleaner>
