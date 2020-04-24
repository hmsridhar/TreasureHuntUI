import { Component, OnInit } from '@angular/core';
import { BackendServices } from 'src/app/backend-services';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  fileToUpload: File = null;
  isImageReadyToRender = false;
  url: any;
  isFileValid = false;
  constructor(private backendService: BackendServices) { 
  }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if(this.fileToUpload.size > 2097152){
      alert('File size exceeds 2MB');
      this.fileToUpload = null;
    }else if (this.fileToUpload.type != "image/png" && this.fileToUpload.type != "image/jpeg"){
      alert('Invalid file format');
      this.fileToUpload = null;
    }else{
      this.isFileValid = true;
      this.isImageReadyToRender = true;
      var reader = new FileReader();
      reader.readAsDataURL(this.fileToUpload); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  } 

  upload(){
    this.backendService.uploadTeamFile(this.fileToUpload).subscribe(response => {
      if(response.status == 200){
        this.isFileValid = false;
        this.isImageReadyToRender = false;
        this.fileToUpload = null;
      }
      alert(response.body.message);
      
    });
  }
  

}
