import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu">
                        <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i" role="none"></li>
                    </ul>
                </li>
                <a href="https://www.primefaces.org/primeblocks-ng/#/">
                    <img src="assets/layout/quiz.jpg" alt="Prime Blocks" class="w-full mt-3"/>
                </a>
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items:[
                    {label: 'Dashboard',icon: 'pi pi-fw pi-home', routerLink: ['/dashboard']}
                ]
            },
            {
                label: 'Quiz',
                items: [
                    {label: 'USERS', icon: 'pi pi-fw pi-id-card', routerLink: ['/user/alluser'] ,role: "admin"},
                    {label: 'Question', icon: 'pi pi-fw pi-check-square', routerLink: ['/recruitment/quetion'],role: "admin"},
                    {label: 'Test', icon: 'pi pi-fw pi-bookmark', routerLink: ['/recruitment/test'], role: "admin"},
                    {label: 'Evaluation tests', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/recruitment/test-evalution'] ,role: "all"},
                   
                ]
            },
          
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement> event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
