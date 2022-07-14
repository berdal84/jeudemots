import { Component } from '@angular/core';
import { BackendService, Status } from 'src/app/services/backend.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent {

  Status = Status;
  status: Status;

  /** URL of the JSON to download */
  downloadJsonHref;

  constructor(
    private jokeService: BackendService,
    private sanitizer: DomSanitizer)
  {
    this.downloadJsonHref = null;
    this.status           = null;
  }

  async onBackup()
  {
    const response = await this.jokeService.backup();
    if( response.status === Status.SUCCESS )
    {
      const json        = JSON.stringify(response.data);
      const encodedJson = encodeURIComponent(json);
      const uri         = this.sanitizer.bypassSecurityTrustUrl(`data:text/json;charset=UTF-8,${encodedJson}`);
      this.downloadJsonHref = uri;
    }
    this.status = response.status;
  }
}
