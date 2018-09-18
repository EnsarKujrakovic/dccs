import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import TextInput from '@dojo/widgets/text-input/index';
import Button from '@dojo/widgets/button';
import Select from '@dojo/widgets/select';
import * as jQuery from 'jquery';
import formsList from '../../data/FormsList';
import elementData from '../../data/ElementData';
import ElementList from './ElementList.ts';
import * as css from '../styles/LoadVersion.m.css';


export class LoadVersion extends WidgetBase
{

  private getForm(dis:any, formName: string, formVersion:string)//ajax request for retrieving specified version of a form
  {
    jQuery.ajax({
      url:"http://localhost:8080/dccs-rest-1.1.0-SNAPSHOT/formular/list?formName="+formName+"&formVersion="+formVersion,
      type:"GET",
      crossDomain : true,
      //async: false,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(json)
      {
        if(json != null)
        {
          elementData.formName = json.formName;
          elementData.formVersion = json.formVersion;
          elementData.elements.splice(0,elementData.elements.length);
          elementData.elements.push.apply(elementData.elements, json.elements);
          dis.invalidate();
        }
      },
      error: function(e) {}
    });
	}

	
	protected render()
	{
		return v('div',[
		  v('div', {classes:[css.root, css.flex]}, [
	      w(Select, {
	        label: 'Formular name:',
	        options: formsList.list,
	        placeholder: (formsList.selectedForm != "" )? formsList.selectedForm : "Choose formular...",
	        value : formsList.selectedForm,
	        onChange: (option: string) => {
	          formsList.selectedVersion = "0";
		        formsList.selectedForm = option;
		        this.invalidate();
	        }
        }),
        w(TextInput, {
          extraClasses:{root:css.flex},
          label: 'Version:',
          type: 'number',
	        value: formsList.selectedVersion,
	        onChange: (versionNum: number) => {
	          if(versionNum < 1 || versionNum.toString() == "") versionNum = 0;
              formsList.selectedVersion = versionNum.toString();
              elementData.formVersion = versionNum;
              this.invalidate();
          }
        }),
        w(Button, {
				  key: 'loadbutton',
				  extraClasses:{root: css.margin},
				  onClick: () => {
	          this.getForm(this, formsList.selectedForm, formsList.selectedVersion);
	          this.invalidate();
	        }
        }, [ 'Load' ]),
        ]),
         v('div', [w(ElementList, {data: elementData.elements})])
		]);
	}
}

export default LoadVersion;
