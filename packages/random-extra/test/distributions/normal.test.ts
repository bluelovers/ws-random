import seedrandom from 'seedrandom'

import inDelta from 'num-in-delta'
import random from '../..'

test('normal() produces numbers', () => {
  const r = random.newUse(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.dfNormal()
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    expect(typeof v).toBe('number')
  }
})

test('normal(120) has mean 120', () => {
  const r = random.newUse(seedrandom('MzUyYjZjZmM4YWI5NzEwNDliZGRmOTE3'))
  const d = r.dfNormal(120)
  let sum = 0

  for (let i = 0; i < 10000; ++i) {
    const v = d()
    sum += v
  }

  const mean = sum / 10000
  expect(inDelta(mean, 120, 0.5)).toBe(true)
})
