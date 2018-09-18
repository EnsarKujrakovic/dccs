import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { elementData } from '../../data/ElementData';
import Radio from '@dojo/widgets/radio';

import * as css from '../styles/RadioButtonList.m.css';

export interface ListProperties
{
  data?: string[];
  elemPosition?: number;
}

export default class RadioButtonList extends WidgetBase<ListProperties>
{
  protected renderItems()//render list of options for a radiobutton list
  {
    let { data = [] } = this.properties;
    return data.map((item: any, index:number) => v('div',[
                                     w(Radio,{
                                       key: 'radio'+index+this.properties.elemPosition,
                                       extraClasses:{root:css.flex},
                                       checked: (this.properties.elemPosition != undefined)? index.toString() == elementData.elements[this.properties.elemPosition].value[0]: false,
					                             value: data.indexOf(item).toString(),
				                               label: item,
					                             name: 'RadioButtons'+this.properties.elemPosition+elementData.formName+elementData.formVersion,
                                       onChange: (value:string) => {
                                         if(this.properties.elemPosition != undefined){
		                                       elementData.elements[this.properties.elemPosition].value[0] = index.toString();
		                                     }
		                                       this.invalidate();
	                                     }
                                     })
                                   ]));
  }
	protected render()
	{
	  this.invalidate();
		return v('div',{}, this.renderItems());
	}
}
