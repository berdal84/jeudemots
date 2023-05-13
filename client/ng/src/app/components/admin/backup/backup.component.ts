import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { APIService } from '@components/backend/api/api.service';
import { CommonModule } from '@angular/common';
import { FormStatus } from 'src/app/models/form-status';

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
  status = signal<FormStatus>('pending');
  /** URL of the JSON to download */
  downloadJsonHref = signal<SafeUrl | null>(null);

  private api = inject(APIService);
  private sanitizer = inject(DomSanitizer)

  async handleSubmit() {
    this.status.set('processing');
    const response = await this.api.backup();
    if ( response.ok) {
      const json        = JSON.stringify(response.data);
      const encodedJson = encodeURIComponent(json);
      const uri         = this.sanitizer.bypassSecurityTrustUrl(`data:text/json;charset=UTF-8,${encodedJson}`);
      this.downloadJsonHref.set(uri);
      this.status.set('success');
    } else {
      this.status.set('error');
    }
  }
}
