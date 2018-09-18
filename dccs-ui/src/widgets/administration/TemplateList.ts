import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v , w } from '@dojo/framework/widget-core/d';
import { Template, TemplateProperties } from './Template';

import * as css from '../styles/TemplateList.m.css';

export interface ListProperties {
  data?: TemplateProperties[];
}

export default class TemplateList extends WidgetBase<ListProperties>
{
  protected renderItems()//rendering a list of element templates for selected form
  {
    let { data = [] } = this.properties;
	  this.invalidate();
    return data.map((item: any) => v('div',[
                                     w(Template,{
                                       eformName: item.eformName,
                                       eformVersion: item.eformVersion,
                                       elementId: item.elementId,
                                       label:item.label,
                                       type:item.type,
                                       validation:item.validation,
                                       value:item.value
                                     })
                                   ]));
  }
	protected render()
	{
		return v('div',{classes:[css.root]}, this.renderItems());
	}
}
