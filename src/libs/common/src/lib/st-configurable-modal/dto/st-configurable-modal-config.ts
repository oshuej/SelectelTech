import { StConfigurableModalButtonConfig } from './st-configurable-modal-button-config';
import { TemplateRef } from '@angular/core';

export class StConfigurableModalConfig {
	public header!: string | TemplateRef<any>;
	public body!: string | TemplateRef<any>;
	public buttons!: Array<StConfigurableModalButtonConfig>;
}
