import { TestBed } from '@angular/core/testing';

import { ExerciseDataService } from './exercise-data.service';

describe('ExerciseDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExerciseDataService = TestBed.get(ExerciseDataService);
    expect(service).toBeTruthy();
  });
});
