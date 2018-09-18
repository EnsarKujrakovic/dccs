import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v , w } from '@dojo/framework/widget-core/d';
import { Element, ElementProperties } from './Element';

import * as css from '../styles/ElementList.m.css';

export interface ListProperties
{
  data?: ElementProperties[];
}

export default class ElementList extends WidgetBase<ListProperties>
{
  protected renderItems()//render list of elements
  {
    let { data = [] } = this.properties;
	  this.invalidate();
    return data.map((item: any) => v('div',[
                                     w(Element,{
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
