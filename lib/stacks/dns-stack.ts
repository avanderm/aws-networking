import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

export class DNSStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hostedZone = new route53.HostedZone(this, 'BFLZone', {
      zoneName: 'brainfartlab.com',
    });

    new route53.NsRecord(this, 'BFLZone-tst', {
      recordName: 'api-test.brainfartlab.com',
      ttl: cdk.Duration.seconds(300),
      values: [
        'ns-1693.awsdns-19.co.uk.',
        'ns-523.awsdns-01.net.',
        'ns-1087.awsdns-07.org.',
        'ns-130.awsdns-16.com.',
      ],
      zone: hostedZone,
    });
  }
}
