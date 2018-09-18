import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
//import { ElementProperties } from './Element';
import { templateData } from '../../data/TemplateData';
import TextInput from '@dojo/widgets/text-input/index';

import * as css from '../styles/RadioTemplateList.m.css';

export interface ListProperties 
{
  data?: string[];
  elemPosition?: number;
}

export default class RadioButtonList extends WidgetBase<ListProperties>
{
  protected renderItems()//rendering list of text labels for radio buttons on template tab
  {
    let { data = [] } = this.properties;
    return data.map((item: any, index:number) => v('div',[
                                     w(TextInput,{
                                       extraClasses:{root:css.flex},
					                             value: (this.properties.elemPosition != undefined) ? templateData.elements[this.properties.elemPosition].value[index+1] : "",
                                       onChange: (value:string) => {
                                         data[index] = value;
                                         if(this.properties.elemPosition != undefined)
		                                     templateData.elements[this.properties.elemPosition].value[index+1] = value;
		                                     this.invalidate();
	                                     }
                                     })
                                   ]));
  }
	protected render()
	{
		return v('div',{classes:[css.root]}, this.renderItems());
	}
}
