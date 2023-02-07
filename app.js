const capture = $("#capture");
const back = $("#back");
const front = $("#front");
const text = $("#text");
const span = $("#text-span")
const img1 = "./alxQq4G.png";
const img2 = "./SuEz5Wp.png";

$(function () {
    $("#btnSave").click(function () {
        getScreenShot();
    });

    $('input[type=radio][name=template]').change(function () {
        if (this.value === "vertical") {
            vertical();
        }
        else if (this.value === "horizontal") {
            horizontal();
        }
    });

    init();
});

function getScreenShot() {
    let c = capture[0];
    html2canvas(c).then((canvas) => {
        var t = canvas.toDataURL().replace("data:image/png;base64,", "");
        this.downloadBase64File('image/png', t, 'image');
    })
}

function downloadBase64File(contentType, base64Data, fileName) {
    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

function init() {
    horizontal();
}

function horizontal() {
    back.css("background-image", "url(" + img1 + ")");
    back.css("background-repeat", "no-repeat");
    back.css("background-size", "contain");
    back.css("z-index", "2000");

    const w = $("#div1").width();
    const h = $("#div1").height();

    front.css("left", 0);


    if ((h / 504) > (w / 403)) {
        //w 100
        const i = w / 403 * 504;
        back.css("width", w);
        back.css("height", i + "px");
        capture.css("width", w);
        capture.css("height", i + "px");
        front.css("width", w);
        front.css("height", (i * 0.44) + "px");
    } else {
        //h 100
        const i = h / 504 * 403;
        back.css("width", i + "px");
        back.css("height", h);
        capture.css("width", i + "px");
        capture.css("height", h);
        front.css("width", i + "px");
        front.css("height", (h * 0.44));
    }

    if (window.matchMedia("(orientation: portrait)").matches) {
        front.css("top", $("#div2").height() + "px");
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
        front.css("top", "0px");
    }

}

function vertical() {
    back.css("background-image", "url(" + img2 + ")");
    back.css("background-repeat", "no-repeat");
    back.css("background-size", "contain");
    back.css("z-index", "2000");

    const w = $("#div1").width();
    const h = $("#div1").height();

    if (h > w) {
        //w 100
        const i = w / 403 * 504;
        back.css("width", w);
        back.css("height", w);
        capture.css("width", w);
        capture.css("height", w);
        front.css("width", w * 0.55);
        front.css("left", w * 0.45);
        front.css("height", w);
    } else {
        //h 100
        const i = h / 504 * 403;
        back.css("width", h);
        back.css("height", h);
        capture.css("width", h);
        capture.css("height", h);
        front.css("width", h * 0.55);
        front.css("left", h * 0.45);
        front.css("height", h);
    }

    if (window.matchMedia("(orientation: portrait)").matches) {
        front.css("top", $("#div2").height() + "px");
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
        front.css("top", "0px");
    }

}