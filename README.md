# Solution Overview and Workflow

When the component page loads in a browser or when a user clicks on a Tableau content link in the sidebar menu the InitViz() function is triggered. This function performs the following steps:

1. It calls the Apex method generateJWT() to create a JSON Web Token (JWT).
2. It constructs the URL for the Tableau content.
3. It passes both the JWT and the URL to the Tableau Embedding v3 API.

The Tableau Embedding v3 API then initiates the AuthN/Z flow with Tableau, automatically passing the JWT to Tableau for secure user authentication using Single Sign-On (SSO). This authentication is facilitated by Tableau Connected Apps.

Once authenticated, the Tableau Viz or Pulse Metric is loaded directly within the component's page. The authentication process leverages Tableau Connected Apps and JWT to enforce data security throughout the authenticated user's session. The user's Account Name (in this case, "Wheelworks") is included in the JWT as the "Account" claim, which serves as a data authorization or entitlement to provide the user secure access to only records associated with the Wheelworks account.

For more information on JSON Web Tokens (JWT), visit [jwt.io](https://jwt.io/).

## Additional Resources

 - Github repository
 - Configure a Component for Experience Builder
 - Tableau Insights Delivered Directly to Salesforce
 - Tableau Embedding API v3
 - Exploring the E-Bikes Sample App
 - Tableau Postman Collection for the Tableau REST API
 - Manage Trusted URLs
 - Unlock the Power of Personalized Analytics with User Attribute Functions

# Salesforce DX Project Basics

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## How Do You Plan to Deploy Your Changes?

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
