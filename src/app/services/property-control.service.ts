import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FlowPropertyBase } from '../models/flow-data-def';

@Injectable()
export class PropertyControlService {
  constructor() { }

  toFormGroup(properties: FlowPropertyBase<any>[] ) {
    let group: any = {};

    properties.forEach(p => {
      group[p.guid] = p.required ? 
        new FormControl(p.value || '', Validators.required) : 
        new FormControl(p.value || '');
    });
    
    return new FormGroup(group);
  }
}

