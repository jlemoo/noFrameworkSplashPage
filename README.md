# splash-page-symposium

## Summary

This splash page asks the user to agree to certain terms and conditions before proceeding to view the rest of the site. 
If you click "yes" to the terms and conditions, your name is recorded in a SharePoint list, and you are redirected to another page to view the rest of the site.
If you don't agree to the terms and conditions, you are redireted to the home page of the company's intranet.
After agreeing once to the terms and conditions, you are presented with a message indicating that you have already agreed to these terms, and you are given
another button to visit the rest of the site.le]

## Used SharePoint Framework Version

There was a problem with 1.16.1 when I attempted this, so I rolled it back to 1.16.0
![version](https://img.shields.io/badge/version-1.16.1-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

Create a list in the same site named "Terms Accepted" Leave the title column there and add a "Person" column of type Person. Only a single person per entry.

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| folder name | Author details (name, company, twitter alias with link) |

## Version history

| Version     | Date              | Comments        |
| ----------- | ----------------- | --------------- |
| 1.0.0.5     | December 12, 2022 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder

Create a list in the same site named "Terms Accepted" Leave the title column there and add a "Person" column of type Person. Only a single person per entry.
Replace the hard-coded URLs with your own SharePoint URLs.
- in the command-line run:
  - **npm install**
  - **gulp serve**


## Features


> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
