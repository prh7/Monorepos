# Mono Repository for Shared NPM Packages

Our mono repository for all our shared packages managed with [lerna](https://github.com/lerna/lerna).

## Prerequisities

Install global dependencies:
```
npm install lerna -g
```

## Getting Started

Fetch and work in this repository:
```
git clone https://github.com/prh7/Monorepos.git
cd Monorepos
npm install
```

Install all dependecies accross all packages and symlink inter dependencies:
```
lerna bootstrap
```

If you want to make sure that all packages dependent on each other are symlinked, then run:
```
lerna link --force-local
```

If you want to whip down the dependencies and symlinking, then run:
```
lerna clean
```

## Folder structure
```
|
|- packages
|  |- functional    // Packages that uses the redux store
|  |- redux_modules // Each package in here is a redux sub store
|  |- visual        // Visual components without any redux logic
|
|- scripts          // Various scripts e.g. for creating new package
|- templates        // Our templates for each package group
|- lerna.json       // Lerna configuration file
|- package.json     // Npm package file for dependencies for e.g. our scripts
```

## Version and Publish
**Important:** ``lerna changed``, ``lerna diff``, and ``lerna version`` are not working as expected, so when bumping up the version in a package, please, use ``npm version`` in that package instead.

Lerna provides various commands for bulk versioning and publishing of packages. 

To see what changes has been made since last version, run:
```
lerna changed // See which packages has changed
lerna diff    // See exactly which changes in the code that has been made
```
Notice that lerna checks changes on git commits, so remember to commit your work in order for these commands to work.

When you have made your changes and feel ready to publish them, then do a ``lerna version`` and make a pull request. ``lerna version`` will guide you through versioning of the different packages and VSTS handles publishing of the packages.
```
Ensure all your paths under the ``packages`` prop in ``lerna.json`` contains a package.json file in them. Otherwise publish will fail.

## Contribute

### Create a new Package

If you want to create an entire new npm package, then run the following in your terminal:
```
cd Monorepos
npm run new-package <your-package-name>
```
Replace "your-package-name" with your own package name. A selector will appear where you can choose which template you want to use.

**Remember** to add the path to your new package to lerna.json ``packages`` array.

### Import an Existing Package

If you have an existing repo you want into the lerna setup, use the lerna import command:
```
lerna import ../path/to/project --flatten
```
Use the flatten parameter if the commit history contains conflicts.

**Pro tip**: If you want to import a project to e.g. ``/packages/functional`` then ensure that only this path is suffixed with a * symbol in the lerna.json file. Example:
```
"packages": [
  "packages/functional/*",
  "packages/redux_modules/",
  "packages/visual/",
  "templates/"
],
```
### Creating new Template

Add new package templates to the templates folder. Remember to update ``scripts/new-package.js`` with your new template as well as ``lerna.json``.