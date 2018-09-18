import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import LoadVersion from './LoadVersion';
import SaveVersion from './SaveVersion';

import * as css from '../styles/FormTab.m.css';


export class FormTab extends WidgetBase
{
	protected render()
	{
		return v('div', { classes: css.root }, [
      w(LoadVersion, {}),
      w(SaveVersion, {})
		]);
	}
}

export default FormTab;
