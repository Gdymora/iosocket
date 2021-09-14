import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainLayoutComponent } from 'src/app/main-layout/main-layout.component';
import { AuthGuard } from 'src/app/share/guards/auth.guard';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(
            [
                {
                    path: '', component: MainLayoutComponent, children: [
                        { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

                    ]
                }
            ]),
    ]
})
export class AdminModule { }