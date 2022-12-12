import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { escape } from '@microsoft/sp-lodash-subset';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/profiles";
import "@pnp/sp/site-users";

//see https://pnp.github.io/pnpjs/getting-started for details about setting up PNPJS. Advise that you watch the 5 part YouTube series.
import { getSP } from './pnpjsConfig';


import styles from './SplashPageTermsWebPart.module.scss';
import * as strings from 'SplashPageTermsWebPartStrings';
import { SPFI } from '@pnp/sp';

export interface ISplashPageTermsWebPartProps {
  description: string;
}

export default class SplashPageTermsWebPart extends BaseClientSideWebPart<ISplashPageTermsWebPartProps> {

  private _isDarkTheme: boolean = false;
  private userId:number=null;
  public sp: SPFI=null;
  public hasAcceptedTerms:boolean=false;
  
  public render(): void {
    //borrowed this from the default setup of a new SPFX project with no framework.
    const innerHTMLString=this.hasAcceptedTerms?`
    <section class="${styles.splashPageTerms} ${!!this.context.sdks.microsoftTeams ? styles.teams : ''}">
      <div class="${styles.welcome}">
        <img alt="" src="${this._isDarkTheme ? require('./assets/welcome-dark.png') : require('./assets/welcome-light.png')}" class="${styles.welcomeImage}" />
        <h2>Welcome ${escape(this.context.pageContext.user.displayName)}!</h2>
      </div>
      <div>
        <h3>Welcome to the RBC Engineering Symposium!</h3>
        <p>
        Privileged & Confidential
        RBC Bearings Incorporated, Proprietary & Trade Secret Information
        © 2022 RBC Bearings Incorporated.  All Rights Reserved.
        I agree that the following copyrighted information is owned by RBC Bearings Incorporated and contains Trade Secrets information.
        Our records indicate you have already agreed to these terms.  
       </p>
        <button id="ContinueToSite" class="${styles.button}">Continue to Site</button>
      </div>
    </section>`:`
    <section class="${styles.splashPageTerms} ${!!this.context.sdks.microsoftTeams ? styles.teams : ''}">
      <div class="${styles.welcome}">
        <img alt="" src="${this._isDarkTheme ? require('./assets/welcome-dark.png') : require('./assets/welcome-light.png')}" class="${styles.welcomeImage}" />
        <h2>Welcome ${escape(this.context.pageContext.user.displayName)}!</h2>
      </div>
      <div>
        <h3>Welcome to the RBC Engineering Symposium!</h3>
        <p>
          Privileged & Confidential
          RBC Bearings Incorporated, Proprietary & Trade Secret Information
          © 2022 RBC Bearings Incorporated.  All Rights Reserved.
          I agree that the following copyrighted information is owned by RBC Bearings Incorporated and contains Trade Secrets information.
       </p>
        <button id="signTermsAndConditions" class="${styles.button}">I accept the terms and conditions</button>
        <button id="rejectTermsAndConditions" class="${styles.button}">I do not accept these terms and conditions</button>
      </div>
    </section>`;
    this.domElement.innerHTML = innerHTMLString;
    if(this.hasAcceptedTerms){this.setButtonEventHandlerAccepted()}else{this.setButtonEventHandlerNotAccepted()}
  }
  private setButtonEventHandlerNotAccepted():void{
    document.getElementById("signTermsAndConditions").addEventListener('click', () => { this.signTermsAndConditions(); });
    document.getElementById("rejectTermsAndConditions").addEventListener('click', () => { this.rejectTermsAndConditions(); });
  }
  private setButtonEventHandlerAccepted():void{
    document.getElementById("ContinueToSite").addEventListener('click', () => { this.ContinueToSite(); });
  }
  private signTermsAndConditions():void{
    // you'll need a list with two columns, Person and Title, Person should be of type Person. Title is plain text.
    // eslint-disable-next-line no-void
    void this.sp.web.lists.getByTitle("Terms Accepted").items.add({
      Title: "Signature",
      PersonId: this.userId
    });
    window.location.replace("https://rbcbearings.sharepoint.com/sites/RBC-Engineering-Symposium/SitePages/RBC-Engineering-Symposium.aspx");
  }
  private rejectTermsAndConditions():void{
    window.location.replace("https://rbcbearings.sharepoint.com");
  }
  private ContinueToSite():void{
    window.location.replace("https://rbcbearings.sharepoint.com/sites/RBC-Engineering-Symposium/SitePages/RBC-Engineering-Symposium.aspx");
  }
  protected async onInit(): Promise<void> {
    await super.onInit();
    this.sp = getSP(this.context);
    const user = await this.sp.web.currentUser.select("Id", "LoginName")();
    this.userId = user.Id;
    const items = await this.sp.web.lists.getByTitle("Terms Accepted").items();
    const personIDArray=[];
    personIDArray[0] = items[0].PersonId;
    let n=0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items.forEach((element: { PersonId: number; }) => {
      personIDArray[n]=element.PersonId;
      n++
    });
    this.hasAcceptedTerms = personIDArray.indexOf(this.userId)===-1?false:true;
    console.log("This is version 1.0.0.5");
    console.log("hasAcceptedTerms is " + this.hasAcceptedTerms.valueOf.toString)
  }  
  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
