import { describe, expect, it } from 'vitest'
import { cls } from './cls'

describe('Classnames', () => {

    it('Should concatenate strings given as comma-seperated paramters', () => {
        const classNames = cls('classA', 'classB classC', 'classD')
        expect(classNames.toString()).toBe('classA classB classC classD')
    })

    it('Should be able to create classnames conditionally', () => {
        const condition = true
        const classNamesA = [ 'classA', condition ? 'classB' : 'classC' ]
        const classNamesB = [ 'classA', !condition ? 'classB' : 'classC' ]

        expect(cls(...classNamesA).toString()).toBe('classA classB')
        expect(cls(...classNamesB).toString()).toBe('classA classC')
    })
    
})