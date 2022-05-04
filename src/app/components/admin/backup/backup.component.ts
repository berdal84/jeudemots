import { Component } from '@angular/core';
import { JokeService } from 'src/app/services/joke.service';
import { DomSanitizer } from '@angular/platform-browser';

enum Status {
  IDLE,
  ERROR,
  SUCCESS
}

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent {

  Status = Status;

  status;

  /** URL of the JSON to download */
  downloadJsonHref;

  constructor(
    private jokeService: JokeService,
    private sanitizer: DomSanitizer)
  {
    this.downloadJsonHref = null;
    this.status = Status.IDLE;
  }

  async onBackup()
  {                
    const jsonResponse = await this.jokeService.backup();
    if( jsonResponse ) 
    {
      const json        = JSON.stringify(jsonResponse);
      const encodedJson = encodeURIComponent(json);
      const uri         = this.sanitizer.bypassSecurityTrustUrl(`data:text/json;charset=UTF-8,${encodedJson}`);
      this.downloadJsonHref = uri;
      this.status           = Status.SUCCESS;
    }
    else
    {
      this.status = Status.ERROR;
    }
  }
}