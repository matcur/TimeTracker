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

  postFile(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient
      .post(this.endpoint, formData) as Observable<string>;
  }
}
