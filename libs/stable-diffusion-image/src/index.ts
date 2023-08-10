import Replicate from 'replicate';

const model =
  'stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4';
const replicate = new Replicate({
  auth: process.env['REPLICATE_API_TOKEN'] as string,
});

type CreateOptions = {
  prompt: string;
  height?: number;
  width?: number;
};
export const create = async ({ prompt, height, width }: CreateOptions) => {
  const input = {
    prompt,
    height,
    width,
  };

  const output = await replicate.run(model, { input });
  return output;
};
