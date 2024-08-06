import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgxsModule } from '@ngxs/store'
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr'

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(),
  importProvidersFrom(NgxsModule.forRoot()),
  provideAnimations(),
  provideToastr(
    {
      timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }
  )
]
};


