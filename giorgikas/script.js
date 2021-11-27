gsap.registerPlugin(MorphSVGPlugin)

document.querySelectorAll('.button').forEach(button => {

    let label = button.querySelector('.label'),
        path = button.querySelector('.background path'),
        svgProgress = button.querySelector('.progress'),
        letters = label.textContent.trim().split(''),
        pathProgress = new Proxy({
            y: null
        }, {
            set(target, key, value) {
                target[key] = value
                if(target.y !== null) {
                    svgProgress.innerHTML = getPath(target.y, .3)
                }
                return true
            },
            get(target, key) {
                return target[key]
            }
        })

    pathProgress.y = 16

    label.innerHTML = ''

    function elements(letter, index, array) {

        let element = document.createElement('span'),
            part = (index >= array.length / 2) ? -1 : 1,
            position = (index >= array.length / 2) ? array.length / 2 - index + (array.length / 2 - 1) : index,
            move = position / (array.length / 2),
            rotate = 1 - move

        element.innerHTML = !letter.trim() ? '&nbsp;' : letter
        element.style.setProperty('--move', move)
        element.style.setProperty('--rotate', rotate)
        element.style.setProperty('--part', part)

        label.appendChild(element)

    }

    letters.forEach(elements);

    button.addEventListener('mouseenter', e => {
        if(button.classList.contains('active')) {
            return
        }
        gsap.to(path, {
            duration: .15,
            morphSVG: 'M0 3C0 1.34315 1.33159 0.0090786 2.98745 0.0667219C15.6914 0.508972 52.8196 3 82 3C111.115 3 148.443 0.520171 161.009 0.0697387C162.664 0.010385 164 1.34315 164 3V42C164 43.6569 162.657 45 161 45H3C1.34314 45 0 43.6569 0 42V3Z'
        })
        gsap.to(button, {
            duration: .15,
            '--letters-y': '2px',
            '--letters-r': '8deg'
        })
    })

    button.addEventListener('mouseleave', e => {
        if(button.classList.contains('active')) {
            return
        }
        gsap.to(path, {
            duration: .15,
            morphSVG: 'M0 3C0 1.34315 1.33152 0 2.98838 0C15.6933 0 52.8204 0 82 0C111.114 0 148.441 0 161.007 0C162.664 0 164 1.34315 164 3V42C164 43.6569 162.657 45 161 45H3C1.34314 45 0 43.6569 0 42V3Z'
        })
        gsap.to(button, {
            duration: .15,
            '--letters-y': '0px',
            '--letters-r': '0deg'
        })
    })

    button.addEventListener('click', e => {
        if(button.classList.contains('active')) {
            return
        }
        button.classList.add('active')
        gsap.to(button, {
            '--letters-o': 0,
            '--letters-y': '8px',
            '--letters-r': '12deg',
            duration: .2
        })
        gsap.to(path, {
            keyframes: [{
                morphSVG: 'M0 3C0 1.34315 1.33326 0.0498162 2.96247 0.351221C15.6427 2.69708 52.8005 16 82 16C111.136 16 148.496 2.75523 161.036 0.366778C162.663 0.0567542 164 1.34315 164 3V42C164 43.6569 162.657 45 161 45H3C1.34314 45 0 43.6569 0 42V3Z',
                duration: .2,
                ease: 'none'
            }, {
                morphSVG: 'M0 42C0 40.3431 1.33152 39 2.98838 39C15.6933 39 52.8204 39 82 39C111.114 39 148.441 39 161.007 39C162.664 39 164 40.3431 164 42V42C164 43.6569 162.657 45 161 45H3C1.34314 45 0 43.6569 0 42V42Z',
                duration: .4,
                ease: 'elastic.out(1, .9)',
                onComplete() {
                    gsap.set(button, {
                        '--background-opacity': 0,
                        '--progress-opacity': 1
                    })
                    gsap.to(button, {
                        '--progress': 0,
                        duration: 3,
                        onComplete() {
                            button.classList.add('success')
                            gsap.to(pathProgress, {
                                keyframes: [{
                                    duration: .2,
                                    y: 10
                                }, {
                                    duration: .6,
                                    ease: 'elastic.out(1, .5)',
                                    y: 16
                                }]
                            })
                            gsap.to(button, {
                                '--progress-y': '-8px',
                                '--progress-sx': .42,
                                '--progress-sy': .35,
                                '--success-opacity': 1,
                                duration: .2,
                                delay: .1,
                                onComplete() {
                                    button.addEventListener('click', e => {
                                        window.open('./Giorgikas.rar', '_blank')
                                    })
                                }
                            })
                        }
                    })
                }
            }]
        })
    })

})

function getPoint(point, i, a, smoothing) {
    let cp = (current, previous, next, reverse) => {
            let p = previous || current,
                n = next || current,
                o = {
                    length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
                    angle: Math.atan2(n[1] - p[1], n[0] - p[0])
                },
                angle = o.angle + (reverse ? Math.PI : 0),
                length = o.length * smoothing;
            return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
        },
        cps = cp(a[i - 1], a[i - 2], point, false),
        cpe = cp(point, a[i - 1], a[i + 1], true);
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
}

function getPath(update, smoothing) {
    let points = [
            [3.5, 16],
            [82, update],
            [160.5, 16]
        ],
        d = points.reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`, '');
    return `<path d="${d}" /><path d="${d}" />`;
}