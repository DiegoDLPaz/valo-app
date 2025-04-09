import {ChangeDetectorRef, Component, computed, inject, OnInit, Signal, signal} from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {User} from '../../auth/interfaces/user.interface';
import {rxResource} from '@angular/core/rxjs-interop';
import {Converter} from '../../shared/utils/converter';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-profile-page',
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './profile-page.component.html'
})

export class ProfilePageComponent{
  authService = inject(AuthService)
  http = inject(HttpClient)
  converter = new Converter()

  selectedFile: File | null = null;
  image: string | null = null; // To hold the image preview
  isDragOver = false;

  user = computed(() => this.authService.user());

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.handleFile(this.selectedFile)
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.handleFile(file); // Handle the file dropped by the user
    }
  }

  private handleFile(file: File): void {
    const formData = new FormData();
    formData.append('profileIcon', file, file.name);

    this.authService.uploadProfileImage(this.user()?.id!, formData).subscribe(() => {
      this.loadImagePreview(file); // Show image preview after upload
    });
  }

  private loadImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
