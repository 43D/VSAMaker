const capture = $("#capture");
const back = $("#back");
const front = $("#front");
const text = $("#text");
const imgFile = $("#image");
const span = $("#text-span")
const img1 = "./src/models/0/0.png";
const img2 = "./src/models/0/1.png";

$(() => {
    $("#btnSave").click(() => getScreenShot());
    $("#btnCopy").click(() => getScreenShotCopy());

    $("#vertical").click(() => vertical());
    $("#horizontal").click(() => horizontal());
    $("#fsize").change(() => textChange());
    $("#title").change(() => textChange());
    $("#fline").change(() => textChange());
    $("#fweight").change(() => textChange());

    imgFile.change(() => {
        try {
            const file = imgFile[0].files[0];
            serializator(file);
        } catch (er) {

        }
    });

    $(window).resize(function () {
        const r = $('input[name=template]:checked').val();
        if (r === "vertical")
            vertical();
        else
            horizontal();
    });

    init();
});

async function serializator(file) {
    let reader = new FileReader()
    reader.onload = async function (base64) {
        showImg(base64.target.result);
    }
    reader.readAsDataURL(file);
}

function showImg(b64) {
    front.css("background-image", "url(" + b64 + ")");
    front.css("background-repeat", "no-repeat");
    front.css("background-size", "cover");
    front.css("background-position", "center");
}

function getScreenShot() {
    let c = capture[0];
    html2canvas(c).then((canvas) => {
        var t = canvas.toDataURL().replace("data:image/png;base64,", "");
        this.downloadBase64File('image/png', t, 'image');
    })
}

function getScreenShotCopy() {
    let c = capture[0];
    html2canvas(c).then((canvas) => {
        var t = canvas.toDataURL().replace("data:image/png;base64,", "");
        this.copyImageBase64File('image/png', t);
    })
}

function copyImageBase64File(contentType, base64Data) {
    navigator.permissions.query({ name: "clipboard-write" }).then(async (result) => {
        if (result.state == "granted" || result.state == "prompt") {
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: contentType });

            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob
                })
            ]);
        }
    });
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
    textChange();
}

function textChange() {
    span.css("font-size", $("#fsize").val() + "pt");
    span.css("line-height", $("#fline").val() + "px");
    span.css("font-weight", $("#fweight").val());
    const t = $("#title").val().replaceAll("\n", "<br>").split("\\alert");
    let t2 = "";
    t.forEach((text, id) => {
        if (id % 2 == 1) {
            t2 += '<span class="alert">' + text + '</span>';
        } else {
            t2 += text;
        }
    })
    span.html(t2);
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
        text.css("width", w);
        text.css("top", (i * 0.50) + "px");
        text.css("height", (i * 0.50) + "px");
    } else {
        //h 100
        const i = h / 504 * 403;
        back.css("width", i + "px");
        back.css("height", h);
        capture.css("width", i + "px");
        capture.css("height", h);
        front.css("width", i + "px");
        front.css("height", (h * 0.44));
        text.css("width", i);
        text.css("top", (h * 0.50) + "px");
        text.css("height", (h * 0.50) + "px");
    }

    if (window.matchMedia("(orientation: portrait)").matches) {
        front.css("top", $("#div2").height() + "px");
        text.css("top", (($("#div1").height() * 0.50) + $("#div2").height()) + "px");
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
        front.css("top", "0px");
        text.css("top", ($("#div1").height() * 0.50) + "px");
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
        text.css("width", w * 0.45);
        text.css("top", 0 + "px");
        text.css("height", w);
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
        text.css("width", h * 0.45);
        text.css("top", $("#div2").height() + "px");
        text.css("height", h);
    }

    if (window.matchMedia("(orientation: portrait)").matches) {
        front.css("top", $("#div2").height() + "px");
        text.css("top", $("#div2").height() + "px");

    }

    if (window.matchMedia("(orientation: landscape)").matches) {
        front.css("top", "0px");
        text.css("top", "0px");
    }

}