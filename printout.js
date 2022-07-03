(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.printout = factory();
    }
}(this, function () {
    return function (e, options) {
        let defaults = {
            pageTitle: window.document.title, // Title of the page
            importCSS: true, // Import parent page css
            inlineStyle: true, // If true it takes inline style tag 
            autoPrint: true, // Print automatically when the page is open
            autoPrintDelay: 1000, // Delay in milliseconds before printing
            closeAfterPrint: true, // Close the window after printing
            header: null, // String or element this will be appended to the top of the printout
            footer: null, // String or element this will be appended to the bottom of the printout
            noPrintClass: 'no-print' // Class to remove the elements that should not be printed
        }

        let config = Object.assign({}, defaults, options),
            element = null; // The element to print

        const isDomEntity = entity => typeof entity === 'object' && entity.nodeType !== undefined;

        element = isDomEntity(e) ? e : document.querySelector(e);

        if (config.header != null && isDomEntity(config.header)) {
            config.header = config.header.outerHTML;
        }

        if (config.footer != null && isDomEntity(config.footer)) {
            config.footer = config.footer.outerHTML;
        }

        let win = window.open('', ''),
            head = '<meta charset="UTF-8"><title>' + config.pageTitle + '</title>';

        // Converting style relative path to absolute path and return a corrected link tag
        const getLink = (link) => {
            let clone = link.cloneNode(true);
            clone.href = (new URL(clone.href, location)).href
            return clone.outerHTML;
        };

        // Get all the link tags and append them to the head
        if (config.importCSS) {
            let links = document.querySelectorAll('link');
            for (let i = 0; i < links.length; i++) {
                head += getLink(links[i]);
            }
        }

        // Get all the style tags and append them to the head if inlineStyle is true
        if (config.inlineStyle) {
            let styles = document.querySelectorAll('style');
            for (let i = 0; i < styles.length; i++) {
                head += styles[i].outerHTML;
            }
        }

        // Set new document direction to main document direction
        win.document.documentElement.setAttribute('dir', document.documentElement.getAttribute('dir'))

        win.document.head.innerHTML = head;
        // Set header
        win.document.body.innerHTML = config.header;

        // Get the element and remove the noPrintClass then append it to the body
        element = element.cloneNode(true);
        let noPrint = element.querySelectorAll('.' + config.noPrintClass);
        for (let i = 0; i < noPrint.length; i++) {
            noPrint[i].remove();
        }
        win.document.body.appendChild(element);

        // Set footer
        if (config.footer != null) {
            win.document.body.insertAdjacentHTML('beforeend', config.footer);
        }

        if (config.autoPrint) {
            // Allow stylesheets time to load
            win.setTimeout(() => {
                win.print();
                if (config.closeAfterPrint) {
                    win.close();
                }
            }, config.autoPrintDelay);
        }
    };
}));
