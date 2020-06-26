import seedrandom from 'seedrandom'

import random from '..'

test('random.newUse witth a seed is consistent', () => {
  const r = random.newUse(seedrandom('ZjExZDczNWQxY2NlZjUzYmRiZWU0ZGIz'))
  const d = r.dfUniform()
  const o = []
  for (let i = 0; i < 100; ++i) {
    const v = d()
    o.push(v)
  }

  expect(o).toMatchSnapshot()
})
