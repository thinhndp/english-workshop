import { Component, OnInit, Input } from '@angular/core';
import { PictureTraslatingExercise } from '../../models/exercise';
import { VocabularyService } from '../../vocabulary.service';
import { Vocabulary } from '../../models/vocabulary';
import { Output, EventEmitter } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-picture-translating',
  templateUrl: './picture-translating.component.html',
  styleUrls: ['./picture-translating.component.css']
})
export class PictureTranslatingComponent implements OnInit {
  exercise: PictureTraslatingExercise = new PictureTraslatingExercise();
  vocabData: Vocabulary[];
  userInput: string;
  @Input() courseKey: string;
  @Output() sendAnswerEvent = new EventEmitter<Object>();

  constructor(private vocabularyService: VocabularyService, private exerciseService: ExerciseService,
    private sharedService: SharedDataService) { }

  sendAnswer() {
    this.sendAnswerEvent.emit({ chosenAnswer: this.userInput, 
                                correctAnswers: this.exercise.correctAnswers,
                                exerciseDetail: this.exercise.exerciseDetail  });
  }

  ngOnInit() {
    // this.vocabularyService.getVocabularies()
    //     .subscribe(vocabularies => this.vocabData = vocabularies);
    this.vocabData = this.sharedService.vocabList;

    this.vocabData = this.vocabData.filter(data => data.courseKey === this.courseKey);

    //this.exercise.initExercise(this.vocabData);
    this.exercise = this.exerciseService.initExercisePictureTranslating(this.vocabData);
    this.userInput = '';
    this.sendAnswer();
  }

}
