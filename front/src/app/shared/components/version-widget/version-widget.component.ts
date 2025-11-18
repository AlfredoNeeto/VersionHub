import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Version } from '../../../models/version.model';

@Component({
    selector: 'app-version-widget',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
      <!-- Name -->
      <div>
        <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">{{ version.name }}</h3>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{{ version.releaseDate }}</p>
      </div>
      
      <!-- Version Number -->
      <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">Versão Atual</p>
        <p class="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{{ version.version }}</p>
      </div>
    </div>
  `,
    styleUrl: './version-widget.component.css'
})
export class VersionWidgetComponent {
    @Input() version!: Version;
}
