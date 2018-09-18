import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import TextInput from '@dojo/widgets/text-input/index';
import Select from '@dojo/widgets/select/index';
import { templateData} from '../../data/TemplateData';
import * as css from '../styles/Template.m.css';
import RadioTemplateList from './RadioTemplateList';

export interface TemplateProperties
{
  eformName?: string;
  eformVersion?: number;
  elementId?: number;
	label?: string;
	type?: string;
	validation?: string;
	value?: string[];
}

export class Template extends WidgetBase<TemplateProperties>
{
	private findElement(id:any)//position of an element with elementId=id in list of elements of a given form template
	{
	  if(templateData.elements.length == 0)return -1;
	  let i = 0;
    for (i; i < templateData.elements.length;i++)
    {
      if (templateData.elements[i].elementId == id) return i;
    }
    return -1;
	}
	private updateProperty(id:any, value:string, desc:string)//updating properties of current element
	{
     let i =1;
     i = this.findElement(id);
     if(i >=0)
     {
       switch(desc)
       {
         case "label":
           templateData.elements[i].label = value;
           break;
         case "type":
           templateData.elements[i].type = value;
           break;
         case "validation":
           templateData.elements[i].validation = value;
           break;
       }
       this.invalidate();
     }
	}
	private slice()
	{
    if(this.properties.value == undefined) return [];
    return this.properties.value.slice(1);
	}
	protected render()//rendering of one empty element template
	{
	  const options = ['TextBox','CheckBox','Radio Buttons'];
	  const validations = ['None','Number','Mandatory'];
	  const radioOptions = [2, 3, 4, 5, 6];
		return v('div', {
      key: 'Element',
		  classes: [css.root],
		  },[
		  w(TextInput, {
        extraClasses: {root: css.flex},
		    label: 'Element '+ (this.findElement(this.properties.elementId)+1)+":",
	      value: templateData.elements[this.findElement(this.properties.elementId)].label,
	      onChange: (labelValue: string) => {
	         this.updateProperty(this.properties.elementId, labelValue, "label");
        }
      }),

      //if not radio button render only select widget 
      (templateData.elements[this.findElement(this.properties.elementId)].type != "Radio Buttons") ? w(Select, {
        key: "typeSelect",
        extraClasses: {root: css.flexmargin},
	      options: options,
	      value: templateData.elements[this.findElement(this.properties.elementId)].type,
	      onChange: (option: string) => {
		      this.updateProperty(this.properties.elementId, option, "type");
		      this.invalidate();
	      }
      }): v('div', {},[//otherwise render inputs for number and labels of radio button list
            v('div', {},[
             w(Select, {
               key: "typeSelect",
               extraClasses: {root: css.flexmargin},
               options: options,
               value: templateData.elements[this.findElement(this.properties.elementId)].type,
               onChange: (option: string) => {
	               this.updateProperty(this.properties.elementId, option, "type");
	               this.invalidate();
               }
              }),
               w(Select, {
               key: "radioButtonSelect",
               extraClasses: {root: css.radio},
               options: radioOptions,
               placeholder: 'Options...',
               onChange: (val: number) => {
                 let length = templateData.elements[this.findElement(this.properties.elementId)].value.length;
                 if(val < length-1)
                    templateData.elements[this.findElement(this.properties.elementId)].value.splice(val, length-1-val);
                 else if(val > length-1){
                    for(let i = length-1;i < val; i++) templateData.elements[this.findElement(this.properties.elementId)].value.push("");
                 }
                 this.invalidate();
                 
               }
              })
             ]),
            v('div', {},[
              w(RadioTemplateList, {
                data: this.slice(),
                elemPosition: this.findElement(this.properties.elementId)
              })
            ])
      ]),
		 w(Select, {//render select option for validation
        key: "validationSelect",
        extraClasses: {root: css.flexmargin},
	      options: validations,
	      value:templateData.elements[this.findElement(this.properties.elementId)].validation,
	      onChange: (option: string) => {
		      this.updateProperty(this.properties.elementId, option, "validation");
	      }
      })
    ])
	}
}

export default Template;
