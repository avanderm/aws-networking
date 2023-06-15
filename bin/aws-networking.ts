#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { PipelineStack } from '../lib/pipeline';

const app = new App();

new PipelineStack(app, 'InfraPipeline', {
  env: {
    account: '371092376858',
    region: 'eu-west-1',
  },
});
