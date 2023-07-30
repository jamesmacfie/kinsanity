import { kafka } from '@kafka';

try {
  const run = async () => {
    const c = kafka.consumer();
    const messages = await c.consume({
      consumerGroupId: 'kinsanity_consumer',
      instanceId: 'kinsanity_consumer',
      topics: ['event_create'],
      autoOffsetReset: 'earliest',
    });

    console.log({ messages });

    return run();
  };

  run().catch(console.error);
} catch (e) {
  console.log(e);
}
