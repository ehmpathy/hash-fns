import { withAssure } from 'type-fns';

import type { Hash } from '@src/domain.objects/Hash';

export const isHashSha256 = withAssure((input: string): input is Hash =>
  /\b[A-Fa-f0-9]{64}\b/.test(input),
);
