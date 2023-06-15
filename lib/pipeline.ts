import {
  Arn,
  SecretValue,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { CoreStage } from './stage';

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('avanderm/aws-networking', 'main', {
          connectionArn: Arn.format({
            resource: 'connection',
            resourceName: '67960df5-0329-44cb-8350-78fe55d9868f',
            service: 'codestar-connections',
          }, this),
        }),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });

    pipeline.addStage(new CoreStage(this, 'Production'));
  }
}
