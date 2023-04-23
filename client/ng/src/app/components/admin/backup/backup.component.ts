import { Component } from '@angular/core';
import { BackendService } from '@services/backend.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent {
  status: null | 'pending' | 'ok' | 'ko';
  /** URL of the JSON to download */
  downloadJsonHref: SafeUrl | null = null;

  constructor(
    private backend: BackendService,
    private sanitizer: DomSanitizer)
  {
    this.downloadJsonHref = null;
    this.status           = null;
  }

  async onBackup()
  {
    this.status = 'pending';
    const response = await this.backend.backup();
    if ( response.ok)
    {
      const json        = JSON.stringify(response.data);
      const encodedJson = encodeURIComponent(json);
      const uri         = this.sanitizer.bypassSecurityTrustUrl(`data:text/json;charset=UTF-8,${encodedJson}`);
      this.downloadJsonHref = uri;
      this.status = 'ok';
    } else {
      this.status = 'ko';
    }
  }
}
