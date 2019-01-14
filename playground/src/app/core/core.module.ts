import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ApiService } from './services/api.service';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  imports: [SharedModule, HttpClientModule, RouterModule, CoreRoutingModule],
  providers: [ApiService],
  declarations: [HeaderComponent, FooterComponent, AboutComponent],
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
