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
      recordName: 'tst.brainfartlab.com',
      ttl: cdk.Duration.seconds(172800),
      values: [
        'ns-1672.awsdns-12.co.uk.',
        'ns-921.awsdns-51.net.',
        'ns-1531.awsdns-63.org.',
        'ns-283.awsdns-35.com.',
      ],
      zone: hostedZone,
    });

    new route53.NsRecord(this, 'BFLZone-dev', {
      recordName: 'dev.brainfartlab.com',
      ttl: cdk.Duration.seconds(172800),
      values: [
        'ns-1924.awsdns-48.co.uk.',
        'ns-590.awsdns-09.net.',
        'ns-1319.awsdns-36.org.',
        'ns-60.awsdns-07.com.',
      ],
      zone: hostedZone,
    });

    new route53.CnameRecord(this, 'BFLBlog', {
      recordName: 'blog.brainfartlab.com',
      zone: hostedZone,
      domainName: 'brainfartlab.github.io',
    });
  }
}
