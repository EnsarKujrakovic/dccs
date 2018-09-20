import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import Button from '@dojo/widgets/button';
import * as jQuery from 'jquery';
import elementData from '../../data/ElementData';
import formsList from '../../data/FormsList';
import * as css from '../styles/SaveForm.m.css';

export class SaveVersion extends WidgetBase
{
  private versionValidation:string = "";
  private validateVersion()//validating version before sending to server
  {
    if(elementData.formVersion < 1)
    {
      this.versionValidation = "Version invalid";
      return false;
    }
    if(formsList.selectedForm != elementData.formName)
    {
      this.versionValidation = "Cannot save data to selected form!";
      return false;
    }
    for(let i = 0; i < elementData.elements.length; i++)
    {
      if(elementData.elements[i].validation == "Mandatory" && elementData.elements[i].value[0] == "")
      {
        this.versionValidation = "Element " + (i+1) + " is mandatory, please fill it!";
        return false;
      }
      if(elementData.elements[i].validation == "Number" && Number(elementData.elements[i].value[0]).toString() == "NaN")
      {
        this.versionValidation = "Element " + (i+1) + " needs to be a number!";
        return false;
      }
    }
    this.versionValidation = "";
    return true;
  }
  private postForm()//ajax POST request for saving form version
  {
    jQuery.ajax({
      url:"http://localhost:8080/dccs-rest-1.1.0-SNAPSHOT/formular/save",
      type:"POST",
      crossDomain : true,
      //async: false,
      dataType: "text",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(elementData),
      success: function(data, textStatus, jqXHR)
      {
        if(jqXHR.status == 201) alert("Saved!");
      },
      error: function(jqXHR, textStatus, errorThrown){}
    });
	}

	protected render()//save button for version
	{
		return v('div', {classes:[css.flex]}, [
      w(Button, {
				key: 'saveVersion',
				extraClasses:{root: css.margin},
				onClick: () => {
				  this.invalidate();
				  if(this.validateVersion())
				  {
		        this.postForm();
          }
	      },
      }, [ 'Save' ]),
      v('span',{classes:[css.flex, css.red]},["",`${this.versionValidation}`])
		]);
	}
}

export default SaveVersion;
