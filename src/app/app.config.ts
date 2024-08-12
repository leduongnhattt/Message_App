import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgxsModule } from '@ngxs/store'
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr'
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { MessageState } from './store/MessageState';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(),
  importProvidersFrom(NgxsModule.forRoot([MessageState]), HttpClientModule),
  provideAnimations(),
  provideToastr(
    {
      timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }
  ),
  provideHttpClient(withInterceptors([httpInterceptor])),
]
};


