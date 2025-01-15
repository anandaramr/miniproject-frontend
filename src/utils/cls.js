
class ClassNames {

    constructor() {
        this.classNames = new Set()
    }

    add(...classNames) {
        classNames.join(' ').split(' ').forEach((className) => this.addClass(className));
        return this;
    }

    toString() {
        return Array.from(this.classNames).join(' ')
    }

    addClass(className) {
        this.classNames.add(`${className.trim()}`)
    }

}

/**
 * A utility function to create a class name string
 *
 * @param {...string} classNames - Class names to add
 * @returns {string} A space-separated string of unique class names
 *
 * @example
 * const active = false
 * const classes = cls('text-lg bg-white', 'select-none', active ? 'text-emerald-300' : 'text-red-500'); // "text-lg bg-white select-none text-red-500"
 */
export function cls(...classNames) {
    return new ClassNames().add(...classNames)
}