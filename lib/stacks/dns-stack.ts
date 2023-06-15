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

    new acm.Certificate(this, 'BFLCertificate', {
      domainName: 'api.brainfartlab.com',
      certificateName: 'BrainFartLab Service',
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });
  }
}
