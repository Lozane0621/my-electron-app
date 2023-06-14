//import { MSICreator } from 'electron-wix-msi';
var MSICreator = require("electron-wix-msi").MSICreator;

async function start() {
    
// Step 1: Instantiate the MSICreator
const msiCreator = new MSICreator({
    appDirectory: '/out',
    description: 'My amazing Kitten simulator',
    exe: 'kittens',
    name: 'Kittens',
    manufacturer: 'Kitten Technologies',
    version: '1.1.2',
    outputDirectory:  '/out'
  });
  
  // Step 2: Create a .wxs template file
  await msiCreator.create();
  
  // Step 3: Compile the template to a .msi file
  await msiCreator.compile();
}

start();
