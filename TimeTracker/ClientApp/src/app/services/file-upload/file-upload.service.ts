import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../../../shared/apiUrl";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  endpoint = apiUrl + 'files'

  constructor(private httpClient: HttpClient) { }

  postFile(files: FileList) {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }

    return this.httpClient
      .post(this.endpoint, formData) as Observable<string[]>;
  }
}
