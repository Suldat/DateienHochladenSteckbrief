/* The script is deployed as a web app and renders the form */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('form.html')
            .setSandboxMode(HtmlService.SandboxMode.NATIVE);
  // This is important as file upload fail in IFRAME Sandbox mode.
}
 
/* This function will process the submitted form */
function uploadFiles(form) {
  
  try {
    
    /* Name of the Drive folder where the files should be saved */
    //var dropbox = "123456789"; //form.myName + " " + form.myEmail; //HARDCODED ORDNERNAME
    //var folder = DriveApp.getFoldersByName("Steckbriefe_Bilder_26285").next(); AUSKOMMENTIERT
    var folder = DriveApp.getFolderById("0ByKa-hRU5ipiN3d6UklsUk0wb1k");
    
    folder = folder.createFolder(+form.myName +" " +form.myEmail);
    
    /* Get the file NO.1 uploaded though the form as a blob */
    var blob1 = form.fotoFile;    
    var fileFoto = folder.createFile(blob1);

    /* Get the file NO.2 uploaded though the form as a blob */
    var blob2 = form.kindheitsfotoFile;    
    var filekFoto = folder.createFile(blob2);    
    
    
    /* Set the file description as the name of the uploader */
    fileFoto.setDescription("Hochgeladen von " +form.myName);
    var email = form.myEmail;
      
    fileFoto.setName(form.myName);
    filekFoto.setName("kFoto_"+form.myName);
    
    /*Creates a Info.txt*/
    folder.createFile("info.txt", "Name: "+form.myName +"\nLink zum Foto: " +fileFoto.getUrl() +"\nLink zum Kindheitsfoto: " +filekFoto.getUrl());
    
    /* Return that the file was uploaded succesful */
    return "Die Bilder wurden erfolgreich hochgeladen!";
    
  } catch (error) {
    
    /* If there's an error, show the error message */
    return error.toString();
  }
  
}
 