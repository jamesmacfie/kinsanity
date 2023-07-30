import { Kafka } from '@upstash/kafka';

export const kafka = new Kafka({
  url: process.env['UPSTASH_KAFKA_REST_URL'] as string,
  username: process.env['UPSTASH_KAFKA_USERNAME'] as string,
  password: process.env['UPSTASH_KAFKA_PASSWORD'] as string,
});
