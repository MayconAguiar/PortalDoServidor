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

    const mesano = this.resumo.mes;
    const baixarArquivo = this.service.obtenhaPDF(this.perfil, mesano, '').subscribe((data) => {

      let pathFile: string;

      if (this.plt.is('ios')) {
        console.log('ios detectado');
        pathFile = this.file.documentsDirectory;
      } else {
        console.log('other platform');
        pathFile = this.file.externalDataDirectory;
      }

      console.log(pathFile);
      const fileName = 'recibo.pdf';
      console.log('Iniciando escrita do arquivo pdf');
      debugger;
      this.file.writeFile(pathFile, fileName, data, {replace: true} ).then((entry) => {
            console.log(pathFile);
            // if (this.platform.is("ios")) {
            //   window.open(pathFile + fileName, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=yes');
            // } else {
            //   window.open(pathFile + fileName, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=yes');
            // }
            // let optionsArray:DocumentViewerOptions[] = [];
            // optionsArray.push(this.options);

            this.documentViewer.viewDocument(pathFile + fileName, 'application/pdf', {});

      // const url =  URL.createObjectURL(data);
      // this.documentViewer.viewDocument(url, 'application/pdf', {});
      });
    });

    // let path = null;
    //  if (this.plt.is('ios')) {
    //    path = this.file.documentsDirectory;
    //  } else if (this.plt.is('android')) {
    //    path = this.file.dataDirectory;
    //  } else  {
    //    path = 'C:\TEMP\\';
    // }

    // this.documentViewer.viewDocument(url, 'application/pdf', {})
    // ,
    // (err) => {},
    // () => this.mostraLoader = false);
  }
}
