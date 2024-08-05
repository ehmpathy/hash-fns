import { withAssure } from 'type-fns';

import { Hash } from '../../domain/Hash';

export const isHashSha256 = withAssure((input: string): input is Hash =>
  /\b[A-Fa-f0-9]{64}\b/.test(input),
);
