import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import TextInput from '@dojo/widgets/text-input/index';
import CheckBox from '@dojo/widgets/checkbox';
import { elementData} from '../../data/ElementData';
import RadioButtonList from './RadioButtonList';
import * as css from '../styles/Element.m.css';

export interface ElementProperties
{
  eformName?: string;
  eformVersion?: number;
  elementId?: number;
	label?: string;
	type?: string;
	validation?: string;
	value?: string[];
}


export class Element extends WidgetBase<ElementProperties>
{

	private findElement(id:any)
	{
	  if(elementData.elements.length == 0)return -1;
	  let i = 0;
    for (i; i < elementData.elements.length;i++)
    {
      if (elementData.elements[i].elementId == id) return i;
    }
    return -1;
	}
	private slice()
	{
    if(this.properties.value == undefined) return [];
    return this.properties.value.slice(1);
	}
	protected renderElement()//render element base on 'type' property : textbox, checkbox or radiobuttons
	{
	  this.invalidate();
	  if(this.properties.type == "TextBox")
        return v('div', {
           classes: [css.root, css.flex]
        },[
           v('div', {classes: [css.width]}, [`${this.properties.label}`, ((this.properties.validation == "Mandatory")? "*" : "")]),
           w(TextInput, {
             value: elementData.elements[this.findElement(this.properties.elementId)].value[0],
             onChange: (val: string) => {
	             elementData.elements[this.findElement(this.properties.elementId)].value[0] = val;
	             this.invalidate();
             }
           })
        ]);
    else if(this.properties.type == "CheckBox")
         return v('div', {
           classes: [css.root, css.flex]
        },[
           v('div', {classes: [css.width]}, [`${this.properties.label}`, ((this.properties.validation == "Mandatory")? "*" : "")]),
           w(CheckBox, {
             checked: (elementData.elements[this.findElement(this.properties.elementId)].value[0] == 'true')? true: false,
             onChange: (value:string, checked: boolean) => {
	            elementData.elements[this.findElement(this.properties.elementId)].value[0] = checked.toString();
             }
           })
        ]);
    else
        return v('div', {
           classes: [css.root, css.flex]
        },[
           v('div', {classes: [css.width]}, [`${this.properties.label}`, ((this.properties.validation == "Mandatory")? "*" : "")]),
           v('div', [
             w(RadioButtonList,{
               data:this.slice(),
               elemPosition: this.findElement(this.properties.elementId)
             })
           ])
       
        ]);
  }
	protected render()
	{
	  return this.renderElement(); 
	}
}

export default Element;
