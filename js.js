function randomColor() {
    function randHex() {
        var min = 0;
        var max = 255;
        var dec = Math.floor(Math.random() * (max - min) + min);
        return dec.toString(16);
    }

    var color = [randHex(), randHex(), randHex()].join("");
    var result = '#' + color;
    return result;
}

function createElement(elem) {
    var background = 'background: ' + elem.background + ';';
    var width = 'width: ' + elem.width + '%;';
    var style = background + ' ' + width;
    return '<div class="element" style="' + style + '"></div>';
}

function createElements(elements) {
    return elements.map(createElement).join('');
}

function createLines(lines) {

    return lines.map(function createLine(line) {
        var background = 'background: ' + line.background + ';';
        var height = 'height: ' + (100 / lines.length) + '%;';
        var style = background + ' ' + height;
        return '<div class="line" data-update-time="' + line.updateTime + '" style="' + style + '">' + createElements(line.elements) + '</div>';
    }).join('');

}

function initBackgroundUpdater(container) {
    var lines = [].slice.call(container.getElementsByClassName('line'));
    lines.forEach(function (line) {
        var delay = Number(line.getAttribute('data-update-time'));
        setInterval(function () {
            var elements = [].slice.call(line.children);
            elements.forEach(function (elem) {
                elem.style.background = randomColor();
            });
        }, delay);
    });
}

function renderTo(container, params) {
    container.innerHTML = createLines(params.lines);
    initBackgroundUpdater(container);
}


var params = {
    lines: [
        {
            background: '#00F',
            updateTime: 1000,
            elements: [
                {
                    background: '#00F',
                    width: 25
                },
                {
                    background: '#00F',
                    width: 50
                },
                {
                    background: '#00F',
                    width: 25
                },
            ]
        },
        {
            background: '#00F',
            updateTime: 2500,
            elements: [
                {
                    background: '#00F',
                    width: 20
                },
                {
                    background: '#00F',
                    width: 50
                },
                {
                    background: '#00F',
                    width: 20
                },
                {
                    background: '#00F',
                    width: 10
                },
            ]
        }
    ],
};

renderTo(document.body, params);