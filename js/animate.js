     // 動畫
     const counterUp = window.counterUp.default

     const callback = entries => {
         entries.forEach(entry => {
             const el = entry.target
             if (entry.isIntersecting && !el.classList.contains('is-visible')) {
                 counterUp(el, {
                     // 毫秒，2000等於2秒
                     duration: 1500,
                     delay: 16,
                 })
                 el.classList.add('is-visible')
             }
         })
     }

