import type { Globals } from 'csstype';
import type { CSSProperties } from 'react';
import type { RequiredDeep } from 'type-fest';

/** Presents all React-compilant colors. */
export type ReactColor = RequiredDeep<CSSProperties>['color'];

/** Presents all valid HTML colors. */
export type HTMLColor = Exclude<ReactColor, Globals>;
