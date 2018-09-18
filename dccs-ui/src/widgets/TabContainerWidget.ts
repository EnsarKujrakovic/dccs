import { DNode } from '@dojo/framework/widget-core/interfaces';
import { deepAssign } from '@dojo/framework/core/lang';
import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/framework/widget-core/interfaces';
import Tab from '@dojo/widgets/tab/index';
import TabController from '@dojo/widgets/tab-controller/index';
import AdminTab from './administration/AdminTab';
import FormTab from './formular/FormTab';
import formsList from '../data/FormsList.ts';
import * as jQuery from 'jquery';

//import * as css from './styles/TabContainerWidget.m.css';


interface State
{
	activeIndex: number;
}

export class TabContainerWidget extends WidgetBase<WidgetProperties>
{
  private getForms(dis:any)//get list of all forms from database
  {
    jQuery.ajax({
      url:"http://localhost:8080/dccs-rest-1.1.0-SNAPSHOT/formular/forms",
      type:"GET",
      crossDomain : true,
     // async: false,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(json)
      {
        formsList.selectedForm = ""; formsList.selectedVersion = "";
        formsList.list.splice(0,formsList.list.length);
        for(let i = 0; i < json.length; i++)
        formsList.list.push(json[i]);
        dis.invalidate();
      },
      error: function(e)
      {
        console.log('form not found');
      }
    });
    this.invalidate();
  }
	private _state: State = {
		activeIndex: 0
	};

	private setState(state: Partial<State>)
	{
		this._state = deepAssign(this._state, state);
		this.invalidate();
	}

	
	render(): DNode//render administration or formular tab
	{
		const { activeIndex = 0 } = this._state;

		return v('div', {}, [
			w(TabController, {
				activeIndex: activeIndex,
				onRequestTabChange: (index: number, key: string) => {
						this.setState({ activeIndex: index });
						if(index == 1) this.getForms(this);
						this.invalidate();
				}
			}, [
				w(Tab, {
					key: 'administration',
					label: 'Administration'
				}, [
				    w(AdminTab, {})
				]),
				w(Tab, {
					key: 'formular',
					label: 'Formular'
				}, [
				  w(FormTab, {})
				])
			])
		]);
	}
}

export default TabContainerWidget
