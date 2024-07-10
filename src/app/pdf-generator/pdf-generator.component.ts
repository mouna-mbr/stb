import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.css'],
  standalone: true,
  imports: [PdfGeneratorComponent]
})
export class PdfGeneratorComponent {

  downloadPDF() {
    const link = document.createElement('a');
    link.href = 'assets/spring_boot_tutorial.pdf'; // Chemin vers votre fichier PDF dans le dossier assets
    link.download = 'Fiche_produit.pdf'; // Nom du fichier lors du téléchargement
    link.click();
  }
  openPDF() {
    const pdfUrl = 'assets/spring_boot_tutorial.pdf'; // Chemin vers votre fichier PDF dans le dossier assets
    window.open(pdfUrl, '_blank');
  }
}
