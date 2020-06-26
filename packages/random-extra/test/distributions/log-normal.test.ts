import seedrandom from 'seedrandom'

import random from '../..'

test('logNormal() produces numbers', () => {
  const r = random.newUse(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.dfLogNormal()
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    expect(typeof v).toBe('number')
  }
})
