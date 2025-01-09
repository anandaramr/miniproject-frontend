
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

export function cls(...classNames) {
    return new ClassNames().add(...classNames)
}