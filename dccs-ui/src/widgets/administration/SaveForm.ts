import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import Button from '@dojo/widgets/button';
import * as jQuery from 'jquery';
import templateData from '../../data/TemplateData';
import * as css from '../styles/SaveForm.m.css';

export class SaveForm extends WidgetBase
{

  private validation:string  = "";
  private validate()//validation on template save
  {
    if(templateData.formName == "" || templateData.formName == "formName")
    {
      this.validation = "Choose a valid form name!";
      return false;
    }
    if(templateData.elements.length<1)
    {
      this.validation = "Add at least one element to form!";
      return false;
    }  
    for(let i = 0; i < templateData.elements.length;i++)
    {
      if(templateData.elements[i].label == "")
      {
        this.validation = "Fill required fields!";
        return false;
      }
    }
    this.validation = "";
    return true;
	}
  
  private postForm()//ajax request for saving template
  {
    jQuery.ajax({
      url:"http://localhost:8080/dccs-rest-1.1.0-SNAPSHOT/formular/save",
      type:"POST",
      crossDomain : true,
      //async: false,
      dataType: 'text',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(templateData),
      success: function(data, textStatus, jqXHR) {
        if(jqXHR.status == 201) alert("Saved!");
      },
      error: function(jqXHR, textStatus, errorThrown){}
    });
	}

	protected render()//save button widget rendering
	{
		return v('div', {classes:[css.root, css.flex]}, [
      w(Button, {
				key: 'saveButton',
				extraClasses:{root: css.margin},
				onClick: () => {
				    if(this.validate()){
		          this.postForm();
		        }
		        this.invalidate()
	      },
      }, [ 'Save' ]),
       v('span',{classes:[css.flex, css.red]},[`${this.validation}`])
		]);
	}
}

export default SaveForm;
