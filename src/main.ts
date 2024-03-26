import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/ui_components/app_component/app.config';
import { AppComponent } from './app/ui_components/app_component/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
