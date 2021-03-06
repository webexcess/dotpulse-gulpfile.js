> ##### Package-Information
> This Sourcecode belongs to the webexcess open source initiative of Neos Packages built at dotpulse.

> Please have a look at the [Information-Page](https://webexcess.github.io/open-source-initiative/).
* * *

# gulpfile.js

gulpfile.js is a delicious blend of tasks and build tools poured into [Gulp](http://gulpjs.com/) to form a full-featured modern asset pipeline. You can easily be integrated to the development environment and site or app structure.

## Clone from bitbucket

```bash
# Go into an empty folder
# Clone from bitbucket
hg clone ssh://hg@bitbucket.org/dotpulse/gulpfile.js ./
# Make the repo your own
rm -rf .hg .hgflow .flow .hgtags
```

## Usage

Make sure Node installed. We recommend using [NVM](https://github.com/creationix/nvm) to manage versions.

### Install Dependencies

If you use this library the first time, you need to be shure all global dependencies are installed correctly:

```bash
# Install Yarn
brew update
brew install yarn
# Uninstall Gulp
npm uninstall --global gulp gulp-cli
# Install ScssLint
gem install scss_lint
# Install some plugins globally
npm install --global gulp-cli eslint jshint
```

If the global dependencies are installed, you can install the rest with **`yarn`**.

## Overview

Features       | Tools Used
-------------- | ---------------------
**CSS**        | [Sass](http://sass-lang.com) ([Libsass](http://sass-lang.com/libsass) via [node-sass](https://github.com/sass/node-sass)) and [PostCSS](http://postcss.org)
**Javascript** | [Browserify](http://browserify.org/) with [Babel](https://babeljs.io)
**Images**     | Compression with [imagemin](https://www.npmjs.com/package/gulp-imagemin). Run width `gulp optimizeImages`. Overwrites files in the resource folder.
**Icons**      | Auto-generated [SVG Sprites](https://github.com/w0rm/gulp-svgstore) and/or [Icon Fonts](https://www.npmjs.com/package/gulp-iconfont)
**Lint**       | [ScssLint](https://github.com/brigade/scss-lint), [ESLint](http://eslint.org/) and [JSHint](http://jshint.com/about/) included

You can configure the behaviour with the `gulp.json` in the root folder. To turn of a certain task, just do it like this:

```json
{
	"tasks": {
		"js": false
	}
}
```

Take a look into `config.json` the figure out which options are available. The script loads also the informations (`description`, `author` and `homepage` entry) from `composer.json` in the [Neos](http://neos.io) or [Flow](https://flow.neos.io/) folder.  


## CSS

### SCSS

These small helpers can make your developer life much easier. These files get filled automatically by the gulp task `scss`

Filename             | Description
-------------------- | ----------------------
**`_all.scss`**      | Every file from the same directory get an `@import` statement. Files with beginning underscore (`_`) get ignored.
**`_allsub.scss`**   | Every file from sub directories an `@import` statement. Files and folders with beginning underscore (`_`) get ignored.


### PostCSS

Following plugins are included:

Plugin                                              | Description
--------------------------------------------------- | ----------------------
**[postcss-at-warn](https://www.npmjs.com/package/postcss-at-warn)** | `@warn` for PostCSS.
**[lost](https://www.npmjs.com/package/lost)**      | PostCSS fractional grid system built with calc() by the guy who built Jeet. Supports masonry, vertical, and waffle grids.
**[postcss-short](https://www.npmjs.com/package/postcss-short)**        | Short creates and extends shorthand properties in CSS
**[postcss-utilities](https://ismamz.github.io/postcss-utilities/)** | postcss-utilities is a PostCSS plugin that have the most used mixins, shortcuts and helpers to use as `@util` rules in yours stylesheets.
**[postcss-center](https://www.npmjs.com/package/postcss-center)**      | PostCSS plugin to center elements.
**[rucksack-css](https://simplaio.github.io/rucksack/)**                | A little bag of CSS superpowers
**[postcss-flexbox](https://www.npmjs.com/package/postcss-flexbox)**    | Flexbox layouts made easy with PostCSS
**[postcss-assets](https://www.npmjs.com/package/postcss-assets)**      | PostCSS plugin to manage assets
**[postcss-flexibility](https://www.npmjs.com/package/postcss-flexibility)**           | PostCSS plugin for Flexibility polyfill
**[pleeease-filters](https://www.npmjs.com/package/pleeease-filters)**                 | Convert CSS shorthand filters to SVG ones
**[postcss-selector-matches](https://www.npmjs.com/package/postcss-selector-matches)** | PostCSS plugin to transform :matches() W3C CSS pseudo class to more compatible CSS selectors
**[postcss-selector-not](https://www.npmjs.com/package/postcss-selector-not)**         | PostCSS plugin to transform :not() W3C CSS leve 4 pseudo class to :not() CSS level 3 selectors
**[postcss-pseudoelements](https://www.npmjs.com/package/postcss-pseudoelements)**     | PostCSS plugin to add single-colon CSS 2.1 syntax pseudo selectors (i.e. :before)
**[postcss-quantity-queries](https://www.npmjs.com/package/postcss-quantity-queries)** | PostCSS plugin enabling quantity-queries
**[css-mqpacker](https://www.npmjs.com/package/css-mqpacker)**        | Pack same CSS media query rules into one media query rule.
**[postcss-fixes](https://www.npmjs.com/package/postcss-fixes)**      | PostCSS plugin to fix known Browser Bugs.
**[cssnano](http://cssnano.co)**      | Minify & autoprefix final css files

## Javascript
For easier include of files, **[gulp-include](https://www.npmjs.com/package/gulp-include)** is integrated into the building process. [Babel](https://babeljs.io) can be turned off via an `gulp.json` config file.

## Plugins for Editors

### [Atom](https://atom.io/)

Package | Command
------- | -------
[ScssLint](https://atom.io/packages/linter-scss-lint) | `apm install linter-scss-lint`
[ESLint](https://atom.io/packages/linter-eslint) | `apm install linter-eslint`
[JSHint](https://atom.io/packages/linter-jshint) | `apm install linter-jshint`
[TypoScript 2](https://atom.io/packages/language-typoscript2) | `apm installlanguage-typoscript2`

### [PhpStorm](https://www.jetbrains.com/phpstorm/) and [WebStorm](https://www.jetbrains.com/webstorm/)

* [ScssLint](https://plugins.jetbrains.com/plugin/7530)
* [ESLint](https://plugins.jetbrains.com/plugin/7494)
* [TypoScript 2](https://plugins.jetbrains.com/plugin/7463)* * *
> ##### License Terms
> DE: Dieses Package wird durch webexcess unter der [GNU GPLv3 Lizenz](https://choosealicense.com/licenses/gpl-3.0/) verwaltet. Dieses Package und darin enthaltene oder hinzugefügte Quellcodes können exklusiv durch webexcess in Teilen oder als Ganzes zusätzlich und unter eigenem Namen unter der MIT-Lizenz veröffentlicht werden.

> EN: This package is managed by webexcess under the [GNU GPLv3 license](https://choosealicense.com/licenses/gpl-3.0/). This package and any sourcecode wich is included or added to it may be published exclusively by webexcess, in whole or in part, under its own name under the MIT license.

