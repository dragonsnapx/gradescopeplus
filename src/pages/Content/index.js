const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
let removedPages = 0;

// Globals: Variables which are captured once per web page
// 1. Class Page URL
// 2. Course Code: <h1 class="sidebar--title">.getText()
// 3. Course Name: <div class="sidebar--subtitle">.getText()

// Locals: Variables which are caputured once per table row, many times per web page
// First, get body child of assigments table: <table id="assignments-student-table">/tbody
// Then, iterate through each row (<tr> element). All locals will be children of this element
// 1. Exercise Name: 1st child of <tr>.getText(), or <th class="table--primaryLink">.getText()
// 2. Exercise Status: 2nd child of <tr>.getText()
// 3. Exercise Due Date: <td class="progressBar--caption">.(2nd Child).getText()


chrome.storage.sync.get(['fmblocker_blocklist'], fmblocklistParent => {

    console.log(fmblocklistParent);
    const fmblocklist = fmblocklistParent.fmblocker_blocklist;
    $$('.fm_best_widget > ul > li').forEach(posts => {

        const galleryName = posts.querySelector('.category').textContent.trim();
        const [galleryParent, galleryChild] = galleryName.split('-').map(e => e.trim());

        // First, block all the blocked galleries
        if(Object.keys(fmblocklist).length !== 0 && fmblocklist && fmblocklist.hasOwnProperty(galleryParent)){
            // Check if asks to block all content from parent gallery
            if(fmblocklist[galleryParent] === '*'){
                posts.classList.add('fmblocker-hidden-post');
                removedPages++;
                return;
            }else{
                if(fmblocklist[galleryParent].includes(galleryChild)){
                    posts.classList.add('fmblocker-hidden-post');
                    removedPages++;
                    return;
                }
            }
        }

        let blockingHtml = `<button class="fmblocker-button" data-blocking="${galleryParent}" data-relation="parent" style="margin-right: 3px"> ${galleryParent} 블라인드 </button>`;
        blockingHtml += galleryChild ? `<button class="fmblocker-button" data-blocking="${galleryChild}" data-blocking-parent="${galleryParent}" data-relation="child"> ${galleryChild} 블라인드 </button>` : ''

        // Then, show the 'block' button on all pages
        posts.querySelector('.category').insertAdjacentHTML('beforeend',
            blockingHtml)
    })

    $('.bd_tl').insertAdjacentHTML('beforeend', `<div> 총 ${removedPages}개 포스트 블라인드 </div>`)

    $$('.fmblocker-button').forEach(button => {
        button.addEventListener('click', () => {
            const isParent = button.getAttribute('data-relation').trim() === 'parent';
            const blockingGallery = button.getAttribute('data-blocking').trim();
            const blockGalleryParent = isParent ? null : button.getAttribute('data-blocking-parent');

            if(isParent){
                chrome.storage.sync.get(['fmblocker_blocklist'], result => {

                    const temp = {
                        ...(result.fmblocker_blocklist),
                        [blockingGallery]: "*"
                    };

                    console.log(temp)

                    chrome.storage.sync.set({fmblocker_blocklist: {
                        ...(result.fmblocker_blocklist),
                        [blockingGallery]: "*"
                    }}, () => {
                        alert(`${blockingGallery} 갤러리의 모든 포스트를 블라인드 처리하셨습니다.`)
                    })
                })
            }else{
                chrome.storage.sync.get(['fmblocker_blocklist'], result => {

                    const prevBlockGalleryParent = result['fmblocker_blocklist'][blockGalleryParent] ?? []

                    const temp = {
                        ...(result.fmblocker_blocklist),
                        [blockGalleryParent]: [
                            ...prevBlockGalleryParent,
                            blockingGallery
                        ]
                    };

                    console.log(temp);

                    chrome.storage.sync.set({fmblocker_blocklist: {
                        ...(result.fmblocker_blocklist),
                        [blockGalleryParent]: [
                            ...prevBlockGalleryParent,
                            blockingGallery
                        ]
                    }}, () => {
                        alert(`${blockGalleryParent} - ${blockingGallery} 갤러리의 포스트를 블라인드 처리하셨습니다.`)
                    })
                })
            }
        });
    })
});
