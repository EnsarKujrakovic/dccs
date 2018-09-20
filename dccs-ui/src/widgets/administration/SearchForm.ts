import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import TextInput from '@dojo/widgets/text-input/index';
import Button from '@dojo/widgets/button';
//import { TemplateProperties } from './Template';
import TemplateList from './TemplateList';
import { deepAssign } from '@dojo/framework/core/lang';
import * as jQuery from 'jquery';
import templateData from '../../data/TemplateData';
import * as css from '../styles/SearchForm.m.css';

interface State
{
	formName: string;
	formVersion: number;
}

export class SearchForm extends WidgetBase
{
  private _state: State = {
		formName: "",
		formVersion: 0,
	};
	private setState(state: Partial<State>)
	{
		this._state = deepAssign(this._state, state);
		this.invalidate();
	}
	private rand()
	{
    return Math.random();
  };
	
	private getForm(dis:any, formName: string)//ajax request for retreiving template(template is saved as version 0 and cannot be overwritten with data
	{
    jQuery.ajax({
      url:"http://localhost:8080/dccs-rest-1.1.0-SNAPSHOT/formular/list?formName="+formName+"&formVersion=0",
      type:"GET",
      crossDomain : true,
      //async: false,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(json)
      {
        if(json != null)
        {
          templateData.formName = json.formName;
          templateData.formVersion = json.formVersion;
          templateData.elements.splice(0,templateData.elements.length);
          templateData.elements.push.apply(templateData.elements, json.elements);
       }
       else
       {
         templateData.formName = "";
         templateData.formVersion = 0;
         templateData.elements.splice(0,templateData.elements.length);
       }
       dis.invalidate();
      },
      error: function(e)
      {
        console.log('form not found');
      }
    });
	}

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
      async: false,
      dataType: 'text',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(templateData),
      success: function(data, textStatus, jqXHR) {
        if(jqXHR.status == 201) alert("Saved!");
      },
      error: function(jqXHR, textStatus, errorThrown){}
    });
	}





	
	protected render()
	{
		return v('div', {classes:[css.root]}, [
      v('div', {classes: [css.root, css.flex]},[
        w(TextInput, {
          label: 'Form Name:',
          extraClasses: {root: css.flex},
	        value: this._state.formName,
	        onChange: (value: string) => {
            this.setState({ formName: value });
            templateData.formName = value;
          }
        }),
        w(Button, {
				  key: 'search',
				  extraClasses: {root: css.flexmargin},
				  onClick: () => {
		        this.getForm(this, this._state.formName);
		        this.invalidate();
	        }
        }, [ 'Search' ])]),
      w(TemplateList,{data: templateData.elements}),
      w(Button, {
				key: 'addElemButton',
				extraClasses:{root: css.margin},
				onClick: () => {
				  templateData.formName = this._state.formName;
				  templateData.formVersion = 0;
          templateData.elements.push({
            formName : this._state.formName,
            formVersion : 0,
            elementId: this.rand(),
        		label: "",
        		type: "TextBox",
        		validation: "None",
        		value: [""]});
        		this.invalidate();
	      },
      }, [ '+' ]),
      v('div', {classes:[css.flex]}, [
        w(Button, {
				  key: 'saveButton',
				  extraClasses:{root: css.margin},
				  onClick: () => {
				      if(this.validate()){
		            this.postForm();
		            this.getForm(this, templateData.formName);
		          }
		          this.invalidate()
	        },
        }, [ 'Save' ]),
         v('span',{classes:[css.flex, css.red, css.margin]},[`${this.validation}`])
		  ])
		])
	}
}

export default SearchForm;
