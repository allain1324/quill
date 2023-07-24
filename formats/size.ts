import { ClassAttributor, Scope, StyleAttributor } from 'parchment';

const SizeClass = new ClassAttributor('size', 'ql-size', {
  scope: Scope.INLINE,
  whitelist: ['8', '9', '10', '11', '12', '14', '18', '24', '30', '36', '48', '60', '72', '96'],
});
const SizeStyle = new StyleAttributor('size', 'font-size', {
  scope: Scope.INLINE,
  whitelist: ['10px'],
});

export { SizeClass, SizeStyle };
