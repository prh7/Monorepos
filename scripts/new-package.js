const fs = require("fs-extra");
const inquirer = require("inquirer");
const chalk = require("chalk");
const Spinner = require("cli-spinner").Spinner;

/**
 * A map of our templates and their corresponding folder:
 * Key: Template folder name
 * Value: Package grouping
 * 
 * If you'd like to add a new template and/or a new package group,
 * then update this map with your new template/grouping
 */
const TEMPLATE_FOLDER_MAP = {
  "visual"      : "visual",
  "functional"  : "functional",
  "redux_module": "redux_modules"
};

/**
 * Directories and files to ignore in the template while 
 * copy-pasting
 */
const IGNORE_DIRS = [
  "node_modules",
  "cache",
  "coverage",
  "dist"
];

/**
 * The main function
 * @param {Array} args array of command line arguements
 */
const main = async (args) => {
  const packageName = args[0];

  if (!packageName || typeof packageName !== "string") {
    return console.error(chalk.white.bgRed.bold("No package name was provided!"));
  }

  try {
    // Step 1: Ask for which template to use
    const answer = await askForTemplateType();
    const { templateType } = answer;

    // Step 2: Copy paste template to correct folder
    const destination = moveTemplate(templateType, packageName);
    if (!destination) return console.warn(chalk.red("Aborting\n"));

    // Step 3: Update name and version in the package.json file 
    editNpmPackageFile(destination, packageName);

    console.log(chalk.green("Done!"));

  } catch (error) {
    console.error(chalk.white.bgRed.bold("An error occured while creating new package: " + error));
    console.warn(chalk.red("Aborting"));
  }
}

////////////////////////////////////////////
//////////////// Helpers ///////////////////
////////////////////////////////////////////

const askForTemplateType = () => {
  const questions = [{
    type: "list",
    name: "templateType",
    message: chalk.cyan("Which template do you wish to use?"),
    choices: Object.keys(TEMPLATE_FOLDER_MAP)
  }];

  return inquirer.prompt(questions);
}

const moveTemplate = (templateType, packageName) => {
  const root = __dirname + "/..";
  const src = root + "/templates/" + templateType;
  const relativeDest = "/packages/" + TEMPLATE_FOLDER_MAP[templateType] + "/" + packageName;
  const dest = root + relativeDest;

  try {
    // Run a spinner while moving files
    const spinner = new Spinner(chalk.cyan("Copy-pasting template to new location, this might take a while... \n\n"));
    spinner.setSpinnerString(1);
    spinner.start();

    // Do copying of template
    fs.copySync(src, dest, { filter: filterTemplateFiles });

    // Stop spinner when copying is done
    spinner.stop();
    console.log(chalk.bgGreen.bold("Successfully created package at " + relativeDest + "\n"));
    
    return dest;

  } catch (error) {
    console.error(chalk.white.bgRed.bold("Copy-pasting template failed: " + error));
  }
}

const filterTemplateFiles = (srcFile) => {
  let result = true;

  IGNORE_DIRS.forEach(dir => {
    if (srcFile.indexOf(dir) > -1) result = false;
  });

  return result;
}

const editNpmPackageFile = (destination, packageName) => {
  const filePath = destination + "/package.json";
  
  try {
    const packageObj = fs.readJsonSync(filePath);
    
    fs.writeJsonSync(filePath, Object.assign(packageObj, {
      name: packageName,
      version: "0.0.0"
    }), {
      spaces: 2
    });

    console.log(chalk.bgGreen.bold("Successfully updated package.json\n"));

  } catch (error) {
    console.error(chalk.white.bgRed.bold("Updating package.json failed: " + error));
  }
}

///////////////////////////////////////////
//////////////// Initiate /////////////////
///////////////////////////////////////////

const args = process.argv.slice(2);

main(args);
