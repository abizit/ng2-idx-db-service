/**
 * Created by fh on 08-11-16.
 */
export class CrmNoteConfig {
  noteId?: string;
  txt: string; // required
}
export class CrmNote {
  noteId: string;
  txt: string;

  constructor(n: CrmNoteConfig) {
    this.noteId = n.noteId || '';
    this.txt = n.txt; // required
  }
}
