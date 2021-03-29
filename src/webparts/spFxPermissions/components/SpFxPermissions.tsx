import * as React from 'react';
import styles from './SpFxPermissions.module.scss';
import { ISpFxPermissionsProps } from './ISpFxPermissionsProps'
import { SPPermission } from '@microsoft/sp-page-context';;
import { escape } from '@microsoft/sp-lodash-subset';

interface Permissionstate {      
  noadmin: boolean;  
  siteadmin:boolean;  
  tenantadmin:boolean;    
}  



export default class SpFxPermissions extends React.Component<ISpFxPermissionsProps, Permissionstate> {
  constructor(props: ISpFxPermissionsProps) {    
    super(props);     
    this.state = {    
      noadmin: false,  
      siteadmin:false,  
      tenantadmin:false  
    };    
  }  
  public componentDidMount(){  
    this.UserSitePermission();  
  }  
  
  private UserSitePermission() {  
    console.log(this.props.context.pageContext.web.permissions);  
    console.log(this.props.context.pageContext.legacyPageContext);  

  let sitecoladmin:boolean=this.props.context.pageContext.legacyPageContext.isSiteAdmin;  
  let siteowner:boolean=this.props.context.pageContext.legacyPageContext['isSiteOwner'];  
  
    let permission = new SPPermission(this.props.context.pageContext.web.permissions.value);  
  
    let canEdit = permission.hasPermission(SPPermission.manageWeb);  
    const fullcontrol = permission.hasAllPermissions(SPPermission.fullMask);  
    const anycontrol = permission.hasAnyPermissions(SPPermission.fullMask);  
    const viewpage = permission.hasPermission(SPPermission.viewPages);  
    const nopermision = permission.hasPermission(SPPermission.emptyMask);  
    this.setState({   
      noadmin: nopermision,  
  siteadmin:sitecoladmin,  
  tenantadmin:siteowner  
    });  
  
  }  
  public render(): React.ReactElement<ISpFxPermissionsProps> {  
      
  if(this.state.siteadmin === true) {  
    return (  
      <div >  
 I am site collection admin  
      </div>  
    );}  
    else if(this.state.tenantadmin === true) {  
      return (  
        <div >  
   I am Tenent admin  
        </div>  
      );}  
      else  {  
        return (  
          <div >  
     I am not an Administrator  
          </div>  
        );}  
  
}}  