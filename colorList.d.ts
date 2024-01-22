declare function colorItemAdd(): HTMLButtonElement;
declare var selectiongItem: any;
declare var selectiongcolor: any;
declare var hvcView: HTMLElement;
declare function colorSet(item: any, colorcode: any): Promise<void>;
declare function HVCviewupdate(obj: any): void;
declare function XYZtoHVC(pos: any): {
    H: number;
    V: number;
    C: number;
};
declare var colorList: HTMLElement;
declare var SelectingColorText: HTMLElement;
declare var btns: HTMLCollectionOf<Element>;
declare var textcolorIswhite: any;
declare function colorUpdate(): void;
declare function rgbToColorcode(rgb: any): any;
declare function colorDelete(): void;
declare function colorAllDelete(): void;
