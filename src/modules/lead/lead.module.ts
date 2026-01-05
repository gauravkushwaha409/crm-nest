import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';

@Module({
  imports: [],
  providers: [LeadService],
  controllers: [LeadController],
})
export class LeadModule {}
