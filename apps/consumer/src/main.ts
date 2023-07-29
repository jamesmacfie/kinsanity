import { Kafka } from '@upstash/kafka';

try {
  const kafka = new Kafka({
    url: process.env.UPSTASH_KAFKA_REST_URL,
    username: process.env.UPSTASH_KAFKA_USERNAME,
    password: process.env.UPSTASH_KAFKA_PASSWORD,
  });

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
