import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { StConfigurableModalConfig } from '@libs/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
	selector: 'st-configurable-modal',
	templateUrl: './st-configurable-modal.component.html',
	styleUrls: ['./st-configurable-modal.component.css']
})
export class StConfigurableModalComponent implements OnInit {

	public modalConfig!: StConfigurableModalConfig;

	public isContentResolved = false;
	public body!: TemplateRef<any>;
	public header!: TemplateRef<any>;

	constructor(private dialogConfig: DynamicDialogConfig,
	            private dialogRef: DynamicDialogRef,
	            private domSanitizer: DomSanitizer) {
	}

	ngOnInit() {
		this.modalConfig = this.dialogConfig.data;
		this.checkContentAvailability()
			.then((resolved) => {
				this.isContentResolved = resolved;
				this.processContent();
			})
			.catch((error) => {
				throw new Error(error);
			})
	}

	public getSanitizedTemplate(template: any): SafeHtml {
		return this.domSanitizer.bypassSecurityTrustHtml(template);
	}

	private checkContentAvailability = (): Promise<boolean> => {
		return new Promise<boolean>((resolve, reject) => {
			if (!this.modalConfig) {
				reject(`${StConfigurableModalComponent.name}: modalConfig must be defined`);
			} else if (!this.modalConfig.body || (typeof this.modalConfig.body === 'string' && !this.modalConfig.body.length)) {
				reject(`${StConfigurableModalComponent.name}: body must be defined`);
			}
			resolve(true);
		});
	}

	private processContent(): void {
		this.modalConfig = this.dialogConfig.data;
		if (!!this.modalConfig.body && this.modalConfig.body instanceof TemplateRef) {
			this.body = (this.modalConfig.body as TemplateRef<any>);
		}
		if (!!this.modalConfig.header && this.modalConfig.header instanceof TemplateRef) {
			this.header = (this.modalConfig.header as TemplateRef<any>);
		}
	}
}
