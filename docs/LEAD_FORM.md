# **Lead Form Lightning Web Component**

This repository contains code for the Lead Form Lightning Web Component (LWC), found in Experience Builder. The Lead Form allows you to submit Lead records into Salesforce.

## **Experience Cloud Site**

From Experience Builder, select the Components menu and find the Lead Form component. Drag a new Lead Form onto your canvas.
Select the component to open the property panel and modify the options.

## **Features**

-   Insert a Lead record directly from Experience Site.
-   Configurable properties, including: button text, button size, submit button action type, submit action success message, and submit action error message.

## **Installing the component using a Scratch Org**

---

1. To set up your environment, follow the steps in the [Quick Start: Lightning Web Components Trailhead](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) project. The steps include:

    1. Enable Dev Hub
    2. Install Salesforce CLI
    3. Install Visual Studio Code
    4. Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

2. If you haven't already done so, authorize your hub org and give it an alias (myhuborg in the command below):

    ```shell
    sfdx force:auth:web:login -d -a myhuborg
    ```

3. Clone the Lead Form repository:

    ```shell
    git clone git@github.com:forcedotcom/experience-cloud-microsite-samples.git
    ```

4. Create a scratch org and provide it with an alias (lead-form in the command below):

    ```shell
    sfdx force:org:create -s -f config/project-scratch-def.json -a lead-form
    ```

5. Push the component to your scratch org:

    ```shell
    sfdx force:source:push
    ```

6. Open the scratch org:

    ```shell
    sfdx force:org:open
    ```

## **Usage**

---

1. From Salesforce Setup, enter `Digital Experiences` and select **All Sites**.
2. Select **Builder** next to the site you want to modify.
3. Select the lightning icon and drag the Lead Form component onto your builder canvas.
4. Customize the properties and insert Lead records with the form.

## **Salesforce DX Project: Next Steps**

---

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## **How Do You Plan to Deploy Your Changes?**

---

Do you want to deploy a set of changes or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## **Configure Your Salesforce DX Project**

---

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## **Read All About It**

---

-   [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
-   [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
-   [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
-   [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
