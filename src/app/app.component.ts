import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'SelectelTech';
}

//		"libraryTest": {
//			"projectType": "library",
//			"root": "projects/library-test",
//			"sourceRoot": "projects/library-test/src",
//			"prefix": "lib",
//			"architect": {
//				"build": {
//					"builder": "@angular-devkit/build-angular:ng-packagr",
//					"options": {
//						"project": "projects/library-test/ng-package.json"
//					},
//					"configurations": {
//						"production": {
//							"tsConfig": "projects/library-test/tsconfig.lib.prod.json"
//						},
//						"development": {
//							"tsConfig": "projects/library-test/tsconfig.lib.json"
//						}
//					},
//					"defaultConfiguration": "production"
//				},
//				"test": {
//					"builder": "@angular-devkit/build-angular:karma",
//					"options": {
//						"main": "projects/library-test/src/test.ts",
//						"tsConfig": "projects/library-test/tsconfig.spec.json",
//						"karmaConfig": "projects/library-test/karma.conf.js"
//					}
//				}
//			}
//		},
