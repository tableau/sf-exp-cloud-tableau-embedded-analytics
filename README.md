# Solution Overview

This solution combines the power of the Salesforce Platform with [Tableau Connected Apps (CA)](https://help.tableau.com/current/online/en-us/connected_apps.htm) and [User Attribute Functions (UAF)](https://help.tableau.com/current/pro/desktop/en-us/functions_functions_user.htm#for-embedding-workflows-in-tableau-cloud-only) to enforce data security in a modern, scalable, and developer-friendly manner. Specifically, developers can dynamically query Salesforce Objects using Salesforce Object Query Language (SOQL), at runtime, to programmatically fetch data authorizations and pass those to Tableau using [Connected Apps Direct trust](https://help.tableau.com/current/online/en-us/connected_apps_direct.htm) and JSON Web Tokens (JWT) to enforce data security for Tableau Dashboards.

# Solution Workflow

When the component page loads in a browser or when a user clicks on a Tableau content link in the sidebar menu the InitViz() function is triggered. This function performs the following steps:

1. It calls the Apex method generateJWT() to create a JSON Web Token (JWT).
2. It constructs the URL for the Tableau content.
3. It passes both the JWT and the URL to the Tableau Embedding v3 API.

The Tableau Embedding v3 API then initiates the AuthN/Z flow with Tableau, automatically passing the JWT to Tableau for secure user authentication using Single Sign-On (SSO). This authentication is facilitated by Tableau Connected Apps.

Once authenticated, the Tableau Viz or Pulse Metric is loaded directly within the component's page. The authentication process leverages Tableau Connected Apps and JWT to enforce data security throughout the authenticated user's session. The user's Account Name (in this case, "Wheelworks") is included in the JWT as the "Account" claim, which serves as a data authorization or entitlement to provide the user secure access to only records associated with the Wheelworks account.

For more information on JSON Web Tokens (JWT), visit [jwt.io](https://jwt.io/).

## Additional Resources

 - [Integrate AI Powered Insights into Your Customer Journeys (video)](https://www.youtube.com/watch?v=iAPwsXN8afY)
 - [Configure a Component for Experience Builder](https://developer.salesforce.com/docs/platform/lwc/guide/use-config-for-community-builder.html)
 - [Tableau Insights Delivered Directly to Salesforce](https://www.tableau.com/blog/tableau-insights-delivered-directly-salesforce)
 - [Tableau Embedding API v3](https://help.tableau.com/current/api/embedding_api/en-us/index.html)
 - [Exploring the E-Bikes Sample App (video)](https://www.youtube.com/watch?v=8iE-1q4N0P8&t=63s)
 - [Tableau Postman Collection for the Tableau REST API](https://www.postman.com/salesforce-developers/workspace/salesforce-developers/collection/12721794-7d783742-165f-4d10-8c4c-5719fb60fba2)
 - [Manage Trusted URLs](https://help.salesforce.com/s/articleView?id=sf.security_trusted_urls_manage.htm&type=5)
 - [Unlock the Power of Personalized Analytics with User Attribute Functions](https://www.tableau.com/blog/unlock-power-personalized-analytics-user-attribute-functions)


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
