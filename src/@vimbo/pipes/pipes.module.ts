import { NgModule } from '@angular/core';

import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
import { GetByIdUnderscorePipe } from './getByIdUnderscore.pipe';
import { SlugifyPipe } from './slugify.pipe';
import { TrackByVimboPipe } from './trackByVimbo.pipe';
import { NoSanitizePipe } from './noSanitize.pipe';
import { TruncatePipe } from './truncate.pipe';
import { ShowArrayNotHiddenPipe } from './show-array-not-hidden.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { HighlightPipe } from './highlight.pipe';
import { SortPipe } from './sort.pipe';
import { EvalExpressionPipe } from './eval-expression.pipe';
import { CheckDataTypesPipe } from './check-data-types.pipe';
import { TrimPipe } from './trim.pipe';
import { VimboResolveObjectPipe } from './vimbo-resolve-object.pipe';
import { UpperCasePipe } from './upperCase.pipe';
import { LowerCasePipe } from './lowerCase.pipe';
import { SafeURLPipe } from './safeURL.pipe';
import { ToStringPipe } from './toString.pipe';

@NgModule({
    declarations: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        GetByIdUnderscorePipe,
        SlugifyPipe,
        TrackByVimboPipe,
        NoSanitizePipe,
        TruncatePipe,
        ShowArrayNotHiddenPipe,
        CapitalizePipe,
        HighlightPipe,
        SortPipe,
        EvalExpressionPipe,
        CheckDataTypesPipe,
        TrimPipe,
        VimboResolveObjectPipe,
        UpperCasePipe,
        LowerCasePipe,
        SafeURLPipe,
        ToStringPipe
    ],
    imports: [],
    exports: [
        KeysPipe,
        GetByIdPipe,
        GetByIdUnderscorePipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        SlugifyPipe,
        TrackByVimboPipe,
        NoSanitizePipe,
        TruncatePipe,
        ShowArrayNotHiddenPipe,
        CapitalizePipe,
        HighlightPipe,
        SortPipe,
        EvalExpressionPipe,
        CheckDataTypesPipe,
        TrimPipe,
        VimboResolveObjectPipe,
        UpperCasePipe,
        LowerCasePipe,
        SafeURLPipe,
        ToStringPipe
    ]
})
export class VimboPipesModule {}
