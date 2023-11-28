export default class ScrollContainer {
    constructor(elementId) {
        this.elementId = elementId
    }

    run(){
        var elementId = this.elementId

        const scrollContainer = document.getElementById(elementId);

        scrollContainer.addEventListener("wheel", (evt) => {
            evt.preventDefault();
            scrollContainer.scrollLeft += evt.deltaY;
        });

        if (isMobile.any() || isPwaStandaloneMode()) {
            let touchstartX = 0
            let touchendX = 0
            scrollContainer.addEventListener('touchstart', e => {
                touchstartX = e.changedTouches[0].screenX;
            })

            scrollContainer.addEventListener('touchend', e => {
                touchendX = e.changedTouches[0].screenX;
                scrollContainer.scrollLeft += touchstartX - touchendX;
            })
        }
        //scrollContainer.scrollIntoView({ behavior: "smooth", inline: "center" })
    }
}