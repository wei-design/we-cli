import { describe, expect, it } from 'vitest'
import { {{ name }} } from '.'

describe('{{ name }}', () => {
    it('test', () => {
        const test = {{ name }}()
        expect(test).not.toBe(undefined)
    })
})