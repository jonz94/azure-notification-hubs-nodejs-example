import { createNotificationHubService } from 'azure-sb';
import * as dotenv from 'dotenv';

dotenv.config();

const notificationHubService = createNotificationHubService(
  process.env.AZURE_NOTIFICATION_HUB_NAME!,
  process.env.AZURE_NOTIFICATION_HUB_CONNECTION_STRING!,
);

const androidDeviceTag = process.env.ANDROID_DEVICE_TAG!;

if (androidDeviceTag) {
  const gcmPayload = {
    notification: {
      title: 'Hello!',
      body: 'Hello!',
    },
  };

  notificationHubService.gcm.send(androidDeviceTag, gcmPayload, function (error, response) {
    if (error) {
      console.log('error');
      console.log(error);
      return;
    }

    console.log('success');
    console.log(JSON.stringify(response, null, 2));
  });
}

const iosDeviceTag = process.env.IOS_DEVICE_TAG!;

if (iosDeviceTag) {
  const apnsPayload = {
    alert: 'Hello!',
  };

  notificationHubService.apns.send(iosDeviceTag, apnsPayload, function (error, response) {
    if (error) {
      console.log('error');
      console.log(error);
      return;
    }

    console.log('success');
    console.log(JSON.stringify(response, null, 2));
  });
}
