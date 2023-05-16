import inquirer from "inquirer";

import { ORGS } from "../scraper/constants";

const getUserInputs = () =>
  inquirer
    .prompt({
      type: "list",
      name: "organization",
      message: "Would you like to use players from WTA (Women) or ATP (Men)?",
      choices: ORGS,
      default: ORGS[0],
    })
    .then((answer) => console.log(answer));

export default getUserInputs;
