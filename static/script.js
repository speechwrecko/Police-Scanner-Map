$(document).ready(function() {

  var myTimer;
  document.getElementById("scanneroff").disabled = true;

  function processData() {
    var parser = document.getElementById("geoparser").value;
    var scannerReq = $.get("/sendRequest/scanner", { option: parser });
    scannerReq.done(function(data) {
        if (data.map_markers.length >=1) {

            for (i = 0; i < data.map_markers.length; i++) {

                L.mapbox.featureLayer(data.map_markers[i]).addTo(map);

                var x = document.getElementById("snackbar"+i.toString());
                x.innerHTML = "<p>" + JSON.stringify(data.map_markers[i].properties.description) + "</br>" + JSON.stringify(data.map_markers[i].properties.title) + "</br>" + "</p>" ;
                x.className = "show";
                setDelay(x)
                //setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                }
            }
        //document.getElementById("loader").style.display = "none";
        //$("#image").html(data.image);
        //document.getElementById("audio1").src=data.audio
        //document.getElementById("audio1").play();
        //if (data.transcript.length > 1) {
        //    document.getElementById("transcript").innerHTML=data.transcript.join('<br/>');
        //} else {
        //    document.getElementById("transcript").innerHTML=data.transcript;
    });
  }


  function setDelay(x) {
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

  $("#scanneron").click(function() {
    //$("#image").html("");
    //document.getElementById("transcript").innerHTML="";
    //document.getElementById("audio1").pause();
    //document.getElementById("loader").style.display = "block";
    document.getElementById("scanneron").disabled = true;
    document.getElementById("geoparser").disabled = true;
    document.getElementById("scanneroff").disabled = false;
    //$("#image").html('<img src=static/portland1.png>');
    myTimer = setInterval(processData, 1000 * 45);
    processData();
  });

  $("#scanneroff").click(function() {
    document.getElementById("scanneron").disabled = false;
    document.getElementById("geoparser").disabled = false;
    document.getElementById("scanneroff").disabled = true;
    clearInterval(myTimer);
    //document.getElementById("audio1").pause();
  });


});

