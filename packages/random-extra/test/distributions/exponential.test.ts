import seedrandom from 'seedrandom'

import random from '../..'

test('exponential() produces numbers', () => {
  const r = random.newUse(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.dfExponential()
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    expect(typeof v).toBe('number')
  }
})
