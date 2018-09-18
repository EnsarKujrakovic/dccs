import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import SearchForm from './SearchForm';
import SaveForm from './SaveForm';

import * as css from '../styles/AdminTab.m.css';

export class AdminTab extends WidgetBase
{
	protected render()//rendering administration tab
	{
		return v('div', { classes: css.root }, [
      w(SearchForm, {}),
      w(SaveForm, {})
		]);
	}
}

export default AdminTab;
