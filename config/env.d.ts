/**
 *  Declare ENV variables for typescript
 * 
 *  To add more ENV variables
 * 
 *    Add it to package.json under "environment" dev, staging, and prod
 *    Add its type here in the ENV object for typescript
 */

declare var ENV: {
  PORT: number;
  API_ROOT: string;
  AUTH_TOKEN: string;

  // Client or server
  BUILD_TARGET: string;
  BUILD_TARGET_CLIENT: 'client';
  BUILD_TARGET_SERVER: 'server';

  // dev / staging / production
  DEPLOY_TARGET: string;

  // constants for use with DEPLOY_TARGET
  TARGET_DEV: string;
  TARGET_STAGING: string;
  TARGET_PRODUCTION: string;
}