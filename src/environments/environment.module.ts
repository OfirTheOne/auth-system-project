import { NgModule } from '@angular/core';
import { EnvVariables } from './environment.token';
import { variables } from './environment.generic';

//declare const process: any; // Typescript compiler will complain without this

export function environmentFactory() {
  return variables;
}

@NgModule({
  providers: [
    {
      provide: EnvVariables,
      // useFactory instead of useValue so we can easily add more logic as needed.
      useFactory: environmentFactory
    }
  ]
})
export class EnvironmentsModule {}