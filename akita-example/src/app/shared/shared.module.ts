import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class SharedModule {}
