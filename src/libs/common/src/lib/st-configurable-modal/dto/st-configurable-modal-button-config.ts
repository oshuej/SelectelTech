
export class StConfigurableModalButtonConfig {
	public text!: string;
	public cssClass!: string;
	public callback!: (event?: any) => void;
	public order?: number;
	public hidden?: boolean;
	public disabled?: boolean;


	constructor(text: string,
	            cssClass: string,
	            callback: (event?: any) => void) {
		this.text = text;
		this.cssClass = cssClass;
		this.callback = callback;
	}

	public static init(params: StConfigurableModalButtonConfig): StConfigurableModalButtonConfig {
		const button: StConfigurableModalButtonConfig = new StConfigurableModalButtonConfig(
			params.text,
			params.cssClass,
			params.callback,
		);
		if (params.order) {
			button.order = params.order;
		}
		return button;
	}
}
