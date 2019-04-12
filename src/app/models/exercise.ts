import { Vocabulary } from './vocabulary';

export class Exercise {
    requirement: string; //Vd: Viet muc nay bang tieng Viet, Danh dau nghia dung,...
    type: string;
    correctAnswers: string[] = [];
}

export class VieEngImagePickingExercise extends Exercise {
    options: Vocabulary[];
    correctId: number; //id cua tu dung trong options array
    setOptions() {
        //Chọn 3 từ từ database cho bài tập (phù hợp với level)
        //Chọn correctId
        //correctAnswer = options[correctId].engWord
    }
    getRequirement(): string {
        return 'Chọn từ cho "' + this.options[this.correctId].vieMeaning + '"';
    }
    constructor() {
        super();
        this.type = "vieengimagepicking";
        this.setOptions();
    }
}



import { Sentence } from './sentence'
import { VIE_WORDS } from '../mock-words';
import { ArrayHelper } from '../helpers/array-helper';


export class SentenceCorrectingExercise extends Exercise {
    chosenSentence: Sentence;
    wordsToChoose: string[] = [];

    constructor() {
        super();
    }

    //** Chọn random 1 Sentence trong Sentence[] và set các thuộc tính liên quan */
    chooseSentence(sentences: Sentence[]) {
        this.chosenSentence = sentences[Math.floor(Math.random() * sentences.length)];
        this.correctAnswers.push(this.chosenSentence.vie);
    }

    //** Set các lựa chọn words gồm các chữ đúng cộng thêm 4 chữ random */
    setWordsToChoose(): void {
        const wordsOfChosenSentence = this.chosenSentence.vie.split(" "); // Tách câu ra thành mảng các chữ
        this.wordsToChoose = this.wordsToChoose.concat(wordsOfChosenSentence);

        const numberOfWords = wordsOfChosenSentence.length + 4;
        while (this.wordsToChoose.length < numberOfWords) {
            let fakeWordToPush;
            do {
                fakeWordToPush = VIE_WORDS[Math.floor(Math.random() * VIE_WORDS.length)];
            } while (this.wordsToChoose.includes(fakeWordToPush));

            this.wordsToChoose.push(fakeWordToPush);
        }

        // Shuffle array lên
        this.wordsToChoose = ArrayHelper.shuffleArray(this.wordsToChoose);
    }

    initExercise(sentences: Sentence[]) {
        this.chooseSentence(sentences);
        this.setWordsToChoose();
        this.type = 'engvie-sentencecorrecting';
        this.requirement = `${this.chosenSentence.eng} nghĩa là:`
    }
}