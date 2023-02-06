$(function() { 
    $("#btnSave").click(function() { 
        getScreenShot();
    });
});

function getScreenShot(){
    let c = document.getElementById('capture');
    html2canvas(c).then((canvas)=>{
      var t = canvas.toDataURL().replace("data:image/png;base64,", "");
      this.downloadBase64File('image/png',t,'image');
    })
  }

function downloadBase64File(contentType, base64Data, fileName) {
  const linkSource = `data:${contentType};base64,${base64Data}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}