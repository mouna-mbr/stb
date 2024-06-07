import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  title = 'hello formeee';
  selectedFiles: File[] | undefined;

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.selectedFiles = Array.from(files) as File[]; // Conversion de FileList en tableau de File
      this.selectedFiles.forEach(file => {
        // Vérifier si le fichier est une image
        if (file.type.startsWith('image/')) {
          // Traiter chaque fichier
          console.log('Nom du fichier :', file.name);
          console.log('Type de fichier :', file.type);
          console.log('Taille du fichier :', file.size, 'bytes');
        } else {
          console.log('Le fichier', file.name, 'n\'est pas une image.');
        }
      });
    }
  }

  getImgURL(file: File): string {
    return window.URL.createObjectURL(file);
  }
}
