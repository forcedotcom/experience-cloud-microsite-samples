# Lead Form Lightning Web Component

This repository contains code for the Lead Form LWC.

This Lead Form component allows you to submit lead records into Salesforce. It is a draggable component only supported in Salesforce community.

## Salesforce Community

You can find this custom component under the lightning icon and drop it into a community.

Clicking on the component will open the property panel for the Lead Form component.

## Features

-   Insert a Lead record using the form
-   Configurable properties (Button Text, Button Size, Submit Button Action Type, Submit Action Success Message, Submit Action Error Message)

## Installing the component using a Scratch Org

1. Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components Trailhead](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) project. The steps include:

    - Enable Dev Hub
    - Install Salesforce CLI
    - Install Visual Studio Code
    - Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

2. If you haven't already done so, authorize your hub org and provide it with an alias (**myhuborg** in the command below):

> sfdx force:auth:web:login -d -a myhuborg

3. Clone the Lead Form repository:

> git clone \***\*\_\*\***

4. Create a scratch org and provide it with an alias (lead-form in the command below):

> sfdx force:org:create -s -f config/project-scratch-def.json -a contact-form

5. Push the component to your scratch org:

> sfdx force:source:push

6. Open the scratch org:

> sfdx force:org:open

## Usage

1. Open a Salesforce community (Setup --> Digital Experiences --> All Sites)
2. Click the lightning icon and drop the Lead Form component into the community
3. Be able to customize any configurable property to your liking and insert lead records with the form

# Salesforce DX Project: Next Steps

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## How Do You Plan to Deploy Your Changes?

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## Read All About It

-   [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
-   [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
-   [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
-   [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
