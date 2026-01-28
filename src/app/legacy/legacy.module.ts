import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LegacyHistoricoComponent } from './legacy-historico.component';
import { PlacaPipe } from '../pipes/placa.pipe';
import { TempoRelativoPipe } from '../pipes/tempo-relativo.pipe';

const routes: Routes = [{ path: '', component: LegacyHistoricoComponent }];

@NgModule({
  declarations: [LegacyHistoricoComponent],
  imports: [CommonModule, RouterModule.forChild(routes), PlacaPipe, TempoRelativoPipe]
})
export class LegacyModule {}
