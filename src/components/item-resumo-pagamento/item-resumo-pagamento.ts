import { Component, Input } from '@angular/core';
import { PagamentoService } from '../../providers/pagamento/pagamento-service';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { FileTransfer } from '@ionic-native/file-transfer';

@Component({
  selector: 'item-resumo-pagamento',
  templateUrl: 'item-resumo-pagamento.html'
})
export class ItemResumoPagamentoComponent {

  @Input('resumo') resumo;
  @Input('perfil') perfil;

  constructor(private file: File,
    private plt: Platform,
     private fileOpener: FileOpener,
     private documentViewer: DocumentViewer,
     private service: PagamentoService,
     private transfer: FileTransfer) {
  }

  abraPDF() {
    // const data = this.resumo.mes..mes.getMonth + "/" + this.resumo.mes.getFullYear;
    let path = null;

    if (this.plt.is('ios')) {
      path = this.file.documentsDirectory;
    } else if (this.plt.is('android')) {
      path = this.file.dataDirectory;
    } else  {
      path = 'C:\TEMP\\';
    }

    const mesano = this.resumo.mes;
    const transfer = this.transfer.create();
    // transfer.download(
    //   `http://localhost:84/api/contracheque/ObtenhaPDF?cpf=${this.perfil.cpf}
    // &empresa=${this.perfil.contratopadrao.empresa}&matricula=${this.perfil.contratopadrao.matricula}&mesAno=${mesano},
    //   path + 'myfile.pdf').then(entry => {
    //     let url = entry.toURL();
    //     this.documentViewer.viewDocument(url, 'application/pdf', {});
    //   });

      transfer.download(
        'https://devdactic.com/html/5-simple-hacks-LBT.pdf',
        path + 'myfile.pdf').then(entry => {
          const url = entry.toURL();
          this.documentViewer.viewDocument(url, 'application/pdf', {});
        });

    // this.service.obtenhaPDF(this.perfil, this.resumo.mes).subscribe(item =>
    // const subscription = this.service.obtenhaPDF(this.perfil, this.resumo.mes).subscribe(item => {
    //   const reciboPdf: any = item;
    //   let pdfBlob = new Blob([reciboPdf.FileStream._buffer], {type: 'application/pdf'});

    //   if (this.plt.is('cordova')) {

    //     // var blob = new Blob([buffer.FileStream._buffer], { type: 'application/pdf' });

    //     // // Save the PDF to the data Directory of our App
    //     // this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
    //     //   // Open the PDf with the correct OS tools
    //     // this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
    //     // });

    //     //let buffer = response.arrayBuffer();

    //     this.file.writeFile(this.file.dataDirectory,"demonstrativo.pdf", pdfBlob);

    //     // this.file.writeFile(this.file.dataDirectory,"demonstrativo.pdf", pdfBlob, {replace: true}).then(c => {

    //     //   this.documentViewer.viewDocument(this.file.dataDirectory+"demonstrativo"+".pdf", "application/pdf",
    //     //     {print: {enabled: true}, bookmarks: {enabled: true}, email: {enabled: true}, title: document.title});
    //     // });


    //   } else {
    //     var fileURL = URL.createObjectURL(pdfBlob);
    //     window.open(fileURL,'_blank');
    //   }

    //   subscription.unsubscribe();
    // });

    // this.documentViewer.viewDocument()
  }
}
