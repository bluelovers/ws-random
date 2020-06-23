
import { dfSumFloat as create } from 'random-extra';
export { create }

export function randomSumFloat(size: number, sum?: number, min?: number, max?: number)
{
	return create(size, sum, min, max)()
}

export default randomSumFloat
