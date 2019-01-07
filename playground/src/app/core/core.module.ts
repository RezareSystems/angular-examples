import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // This prevents CoreModule being imported in any other module besides the main AppModule
    if (parentModule) {
      throw new Error(
        'CoreModules is already loaded. Import it in the AppModule only'
      );
    }
  }
}
