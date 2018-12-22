var volumeRange1 = document.getElementById("volumeRange1");

	
$('#default').puiinputtextarea();

volumeRange1.oninput = () => {
    console.log(volumeRange1.value);
};