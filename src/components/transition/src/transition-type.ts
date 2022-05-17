export type TransitionMode = 'out-in' | 'in-out' | 'default'

type TransitionSlideName = 'slide-left' | 'slide-right' | 'slide-top' | 'slide-bottom'
type TransitionScaleName = 'scale-up' | 'scale-rotate-up'
export type TransitionName = TransitionSlideName | TransitionScaleName

type TransitionLeftOrigin = 'left' | 'left top' | 'left bottom'
type TransitionCenterOrigin = 'center' | 'center top' | 'center bottom'
type TransitionRightOrigin = 'right' | 'right top' | 'right bottom'
export type TransitionOrigin = TransitionLeftOrigin | TransitionCenterOrigin | TransitionRightOrigin
