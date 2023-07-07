// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const appSettings = require('../../appsettings.json');

export const getResourceConnectionString = (): string => {
  const resourceConnectionString = process.env['ResourceConnectionString'] || appSettings.ResourceConnectionString;

  if (!resourceConnectionString) {
    throw new Error('No ACS connection string provided');
  }

  return resourceConnectionString;
};

export const getEndpoint = (): string => {
  const uri = new URL(process.env['EndpointUrl'] || appSettings.EndpointUrl);
  return `${uri.protocol}//${uri.host}`;
};

export const getAdminUserId = (): string => {
  const adminUserId = process.env['AdminUserId'] || appSettings.AdminUserId;

  if (!adminUserId) {
    throw new Error('No ACS Admin UserId provided');
  }

  return adminUserId;
};

export const getEmailSender = (): string => {
  const emailSender = process.env['EmailSender'] || appSettings.EmailSender;

  if (!emailSender) {
    throw new Error('No Email Address for Email Sender provided');
  }

  return emailSender;
};

export const getEmailRecipient = (): string => {
  const emailRecipient = process.env['EmailRecipient'] || appSettings.EmailRecipient;

  if (!emailRecipient) {
    throw new Error('No Email Address for Email Recipient provided');
  }

  return emailRecipient;
};
