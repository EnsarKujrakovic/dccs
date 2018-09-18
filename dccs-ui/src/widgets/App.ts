import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import TabContainerWidget from './TabContainerWidget';
import * as css from './styles/App.m.css';

export class App extends WidgetBase
{
	protected render()
	{
		return v('div', {classes: css.root}, [
            w(TabContainerWidget, {})
		]);
	}
}

export default App;
