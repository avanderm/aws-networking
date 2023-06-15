import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DNSStack } from './stacks/dns-stack';

export class CoreStage extends Stage {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new DNSStack(this, 'DNSStack');
  }
}
