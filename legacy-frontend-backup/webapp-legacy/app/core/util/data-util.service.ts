import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataUtils {
  /**
   * Method to abbreviate the text given
   */
  abbreviate(text: string, append = '...'): string {
    if (text.length < 30) {
      return text;
    }
    return text ? text.substring(0, 15) + append + text.slice(-10) : text;
  }

  /**
   * Method to find the byte size of the string provides
   */
  byteSize(base64String: string): string {
    return this.formatAsBytes(this.size(base64String));
  }

  private endsWith(suffix: string, str: string): boolean {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }

  private paddingSize(value: string): number {
    if (this.endsWith('==', value)) {
      return 2;
    }
    if (this.endsWith('=', value)) {
      return 1;
    }
    return 0;
  }

  private size(value: string): number {
    return (value.length / 4) * 3 - this.paddingSize(value);
  }

  private formatAsBytes(bytes: number): string {
    return bytes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' bytes';
  }

  /**
   * Method to open file
   */
  openFile(data: any, contentType: string | null | undefined): void {
    if (data && contentType) {
      const byteCharacters = atob(data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: contentType });
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL);
    }
  }

  /**
   * Method to download file
   */
  downloadFile(data: any, contentType: string | null | undefined, filename?: string): void {
    if (data && contentType) {
      const byteCharacters = atob(data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: contentType });
      const fileURL = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(fileURL);
    }
  }

  /**
   * Method to convert the file to base64
   */
  toBase64(file: File, cb: (base64Data: string) => void): void {
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e: any) => {
      const base64Data: string = e.target.result.substr(e.target.result.indexOf('base64,') + 'base64,'.length);
      cb(base64Data);
    };
  }

  /**
   * Method to clear input file
   */
  clearInputImage(entity: any, elementRef: any, field: string, fieldContentType: string, idInput: string): void {
    if (entity && field && fieldContentType) {
      if (entity.hasOwnProperty(field)) {
        entity[field] = null;
      }
      if (entity.hasOwnProperty(fieldContentType)) {
        entity[fieldContentType] = null;
      }
      if (elementRef && idInput && elementRef.nativeElement.querySelector('#' + idInput)) {
        elementRef.nativeElement.querySelector('#' + idInput).value = null;
      }
    }
  }

  /**
   * Sets file data to a form
   */
  setFileData(event: Event, entity: any, field: string, isImage: boolean): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const eventTarget: HTMLInputElement = event.target as HTMLInputElement;
      if (eventTarget.files && eventTarget.files[0]) {
        const file: File = eventTarget.files[0];
        if (isImage && !file.type.startsWith('image/')) {
          observer.error('File was expected to be an image but was found to be ' + file.type);
        } else {
          this.toBase64(file, (base64Data: string) => {
            entity[field] = base64Data;
            entity[`${field}ContentType`] = file.type;
            observer.next(entity);
            observer.complete();
          });
        }
      } else {
        observer.error('No file found');
      }
    });
  }
}
