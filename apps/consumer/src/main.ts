// Will want to break all this up at some point
import { prisma } from '@db';
import { systemPrompts, ask } from '@openAI';
import { create } from '@stableDiffusionImage';
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

    for (const message of messages) {
      try {
        const event = JSON.parse(message.value.toString());
        const systemPrompt = systemPrompts.imageGenerator;
        const userPrompt = `${event.name} ${event.description}`;
        const imagePrompt = await ask({ userPrompt, systemPrompt });
        const url = await create({
          prompt: imagePrompt,
          height: 320,
          width: 768,
        });
        await prisma.events.update({
          where: {
            id: event.id,
          },
          data: {
            display: {
              image: url,
            },
          },
        });
      } catch (e) {
        console.error('Could not create new event display image');
      }
    }

    return run();
  };

  run().catch(console.error);
} catch (e) {
  console.log(e);
}
