const chalk = require("chalk");
const { execSync } = require('child_process');
const fs = require("fs-extra");

/**
 * A map between packages and their build command.
 * If a certain package is not present in this map, this script
 * will just default to 'npx build' for that package. Thus, it is unecessary 
 * to add the package here if it uses npx build as it's build command.
 */
const BUILD_COMMAND_MAP = {};

/**
 * A map between packages and their lint command.
 * If a certain package is not present in this map, this script
 * will just default to 'npx lint' for that package. Thus, it is unecessary 
 * to add the package here if it uses npx lint as it's lint command.
 */
const LINT_COMMAND_MAP = {};

/**
 * A map between packages and their test command.
 * If a certain package is not present in this map, this script
 * will just default to 'npx test' for that package. Thus, it is unecessary 
 * to add the package here if it uses npx test as it's test command.
 */
const TEST_COMMAND_MAP = {};

/**
 * A map of each command to ignore for certain packages. If a package
 * is present under one of these 3 commands, the respective command
 * will not be executed for that package, e.g. build will not be
 * runned for unified-base-styling.
 */
const IGNORE = {
  build: [
    'unified-base-styling'
  ],
  install: [],
  lint: [
    'unified-ajax-request',
    'unified-base-styling',
    'unified-chart'
  ],
  test: [
    'unified-form'
  ]
};

let _errorCode = 0;

/**
 * The main function
 * @param {Array} args array of command line arguments
 */
const main = async (args) => {
  try {
    // Step 1: Ensure we have the right args
    const { scope, command } = retrieveAndValidateArgs(args);
    
    // Step 2: Loop through our packages
    forEachPackage(scope, path => {
      
      // Step 3: Execute the desired command
      execCommand(path, command);
    });

    // Step 4: If a command returned errors, we'll throw one
    if (_errorCode) throw new Error('One or more commands exited with code ' + _errorCode);

    console.log(chalk.green('Done!'));

  } catch (error) {
    console.error(chalk.white.bgRed.bold('An error occured while bulk executing: ' + error));
    console.warn(chalk.red("Aborting\n"));

    process.exit(1);
  }
};

////////////////////////////////////////////
//////////////// Helpers ///////////////////
////////////////////////////////////////////

/**
 * Ensure necessary arguments are provided and valid.
 * Returns the arguments if they're sufficient
 * @param {Array} args array of command line arguments
 */
const retrieveAndValidateArgs = (args) => {
  const command = validateCommand(args[0]);
  const scope = retrieveAndValidateScope(args);

  return { command, scope };
};

const validateCommand = (commandArg) => {
  if (!commandArg || typeof commandArg !== "string") {
    return console.error(chalk.white.bgRed.bold("No command was provided!"));
  }

  if (!IGNORE[commandArg]) {
    return console.error(chalk.white.bgRed.bold("There is no command called: ", commandArg));
  }

  return commandArg;
}

const retrieveAndValidateScope = (args) => {
  let scope;
  
  args.forEach((arg, index) => {
    if (arg === '-s' || arg === '--scope') {
      scope = args[index + 1];
    }
  });

  if (!scope || typeof scope !== 'string') {
    return console.error(chalk.white.bgRed.bold('No "--scope" argument was provided'));
  }

  if (scope !== 'all' && scope !== 'changed') {
    return console.error(chalk.white.bgRed.bold('"--scope ' + scope + '" is an invalid argument'));
  }

  return scope;
}

const forEachPackage = (scope, cb) => {
  console.log(chalk.cyan('Retrieving the paths of our packages:\n'));
  
  switch (scope) {
    case 'all':
      getAllPackages().forEach(path => cb.call(null, path.substring(2)));
      break;

    case 'changed':
      getChangedPackages().forEach(path => cb.call(null, path.substring(2)));
      break;
  }
};

/**
 * Returns all packages
 * NOTE: For the future lerna exec might be an alternative to this 
 * bulk-exec script.
 */
const getAllPackages = () => {
  const result = execSync('lerna exec shx pwd').toString().split('\n');
  
  // Remove last element since it is an empty string
  result.pop();

  return result;
};

/**
 * Returns packages that has changed since master branch-out
 * NOTE: The --since master parameter might in some cases return
 * different packages than 'lerna changed' since lerna changed looks 
 * at changes in git commits where as '--since master' looks at file 
 * changes from current branch between master. This will likely not
 * be a problem, though.
 */
const getChangedPackages = () => {
  const commitId = getCommitIdToCheckFrom();
  
  const result = execSync('lerna exec shx pwd --since ' + commitId).toString().split('\n');
  
  // Remove last element since it is an empty string
  result.pop();

  return result;
};

const getCommitIdToCheckFrom = () => {
  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString();

  switch (currentBranch.replace(/\s/g,'')) {
    case 'HEAD':
      return getCommitForDetachedState();

    // If we are on master branch then check on the second latest commit
    // (since latest commit will be merge of PR, thus no changes are tracked)
    case 'master':
      return execSync('git rev-parse master~1').toString();
  
    // Else we just check up against the latest commit on master
    default:
      return execSync('git rev-parse master~0').toString();
  }
}

const getCommitForDetachedState = () => {
  const lastCommit = execSync('git rev-parse HEAD~0').toString();
  const lastCommitOnMaster = execSync('git rev-parse master~0').toString();

  // if last last commit matches last commit on master
  // then we are building/releasing after a PR merge
  // and when then wish to return the second last commit id
  if (lastCommit === lastCommitOnMaster) {
    return execSync('git rev-parse master~1').toString();
  
  // else we're building within an unmerged PR and wish
  // to return latest commit of master
  } else {
    return execSync('git rev-parse master~0').toString();
  }
}

const execCommand = (path, command) => {
  const packageObj = fs.readJsonSync(path + '/package.json');
  
  // Don't do anything if package is present in ignore 
  if (IGNORE[command].indexOf(packageObj.name) > -1) return;

  // Set the directory for the package we're working in
  process.chdir(path);

  let terminalCmd;

  switch (command) {
    case 'build':
      terminalCmd = BUILD_COMMAND_MAP[packageObj.name] ? BUILD_COMMAND_MAP[packageObj.name] : 'npx build';
      break;

    case 'install':
      terminalCmd = 'npm ci';
      break;

    case 'lint':
      terminalCmd = LINT_COMMAND_MAP[packageObj.name] ? LINT_COMMAND_MAP[packageObj.name] : 'npx lint';
      break;

    case 'test':
      terminalCmd = TEST_COMMAND_MAP[packageObj.name] ? TEST_COMMAND_MAP[packageObj.name] : 'npx test';
      break;
  }

  console.log(chalk.cyan('\nExecuting command: "' + terminalCmd + '" for package: "' + packageObj.name + '"'));

  try {
    const output = execSync(terminalCmd).toString();
    console.log(output);
    
  } catch (error) {
    console.log(chalk.red(error.stdout.toString()));
    _errorCode = error.status;
  }
};

///////////////////////////////////////////
//////////////// Initiate /////////////////
///////////////////////////////////////////

const args = process.argv.slice(2);

main(args);
