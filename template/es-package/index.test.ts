import { describe, expect, it } from 'vitest'
import { {{ name }} } from '.'

describe('{{ name }}', () => {
    it('no param', () => {
        const test = {{ name }}()
        expect(test).toEqual(undefined)
    })
})
