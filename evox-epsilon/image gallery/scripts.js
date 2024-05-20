document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
    const img1 = document.getElementById("img1")
    img1.onload = function () {
        var height = img1.offsetHeight;
        console.log('Image height:', height);
        document.getElementById("item1").style.height = height + "px"
    }

    const img2 = document.getElementById("img2")
    img2.onload = function () {
        var height = img2.offsetHeight;
        document.getElementById("item2").style.height = height + "px"
    }

    const img3 = document.getElementById("img3")
    img3.onload = function () {
        var height = img3.offsetHeight;
        document.getElementById("item3").style.height = height + "px"
    }

    const img4 = document.getElementById("img4")
    img4.onload = function () {
        var height = img4.offsetHeight;
        document.getElementById("item4").style.height = height + "px"
    }

    const img5 = document.getElementById("img5")
    img5.onload = function () {
        var height = img5.offsetHeight;
        document.getElementById("item5").style.height = height + "px"
    }

    const img6 = document.getElementById("img6")
    img6.onload = function () {
        var height = img6.offsetHeight;
        document.getElementById("item6").style.height = height + "px"
    }

    document.getElementById("navbar").classList.add("active")
});


const targetElement = document.querySelector('.container');

// Create a new ResizeObserver
const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        // Check if the maximum width or height of the element has changed
        if (entry.contentRect.width !== entry.contentRect.height) {
            // Run your code here when max-width or max-height changes
            console.log('Max-width or max-height changed!');
            const img1 = document.getElementById("img1")
            img1.onload = function () {
                var height = img1.offsetHeight;
                console.log('Image height:', height);
                document.getElementById("item1").style.height = height + "px"
            }

            const img2 = document.getElementById("img2")
            img2.onload = function () {
                var height = img2.offsetHeight;
                document.getElementById("item2").style.height = height + "px"
            }

            const img3 = document.getElementById("img3")
            img3.onload = function () {
                var height = img3.offsetHeight;
                document.getElementById("item3").style.height = height + "px"
            }

            const img4 = document.getElementById("img4")
            img4.onload = function () {
                var height = img4.offsetHeight;
                document.getElementById("item4").style.height = height + "px"
            }

            const img5 = document.getElementById("img5")
            img5.onload = function () {
                var height = img5.offsetHeight;
                document.getElementById("item5").style.height = height + "px"
            }

            const img6 = document.getElementById("img6")
            img6.onload = function () {
                var height = img6.offsetHeight;
                document.getElementById("item6").style.height = height + "px"
            }

            document.getElementById("navbar").classList.remove("active")
            setTimeout(function() {
                document.getElementById("navbar").classList.add("active")
            }, 500)
            // You can add your custom code logic here
        }
    }
});

// Start observing the target element
resizeObserver.observe(targetElement);