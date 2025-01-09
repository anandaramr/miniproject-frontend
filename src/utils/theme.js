
export function handleChangeTheme (evt) {
    if (evt.target.id=="system") {
        localStorage.removeItem("theme")

        if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

    } else {
        localStorage.setItem("theme", evt.target.id)
        if (evt.target.id=='dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }
}

export function getTheme() {
    if (!('theme' in localStorage)) {
        return 'system'
    } else if (localStorage.getItem('theme')=='dark') {
        return 'dark'
    } else {
        return 'light'
    }
}