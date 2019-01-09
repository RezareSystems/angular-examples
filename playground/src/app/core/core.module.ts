import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ApiService } from './services/api.service';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [SharedModule, HttpClientModule, RouterModule],
  providers: [ApiService],
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent]
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
