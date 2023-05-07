import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { APIService } from '@components/backend/api/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-backup',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent {
  status: null | 'pending' | 'ok' | 'ko';
  /** URL of the JSON to download */
  downloadJsonHref: SafeUrl | null = null;

  constructor(
    private api: APIService,
    private sanitizer: DomSanitizer)
  {
    this.downloadJsonHref = null;
    this.status           = null;
  }

  async onBackup()
  {
    this.status = 'pending';
    const response = await this.api.backup();
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
