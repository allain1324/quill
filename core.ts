import Quill from './core/quill';

import Block, { BlockEmbed } from './blots/block';
import Break from './blots/break';
import Container from './blots/container';
import Cursor from './blots/cursor';
import Embed from './blots/embed';
import Inline from './blots/inline';
import Scroll from './blots/scroll';
import TextBlot from './blots/text';

import Clipboard from './modules/clipboard';
import History from './modules/history';
import ImageResize from './modules/imageResize';
import Keyboard from './modules/keyboard';
import Uploader from './modules/uploader';
import Delta, { Op, OpIterator, AttributeMap } from 'quill-delta';
import Input from './modules/input';

export { Delta, Op, OpIterator, AttributeMap };

Quill.register({
  'blots/block': Block,
  'blots/block/embed': BlockEmbed,
  'blots/break': Break,
  'blots/container': Container,
  'blots/cursor': Cursor,
  'blots/embed': Embed,
  'blots/inline': Inline,
  'blots/scroll': Scroll,
  'blots/text': TextBlot,

  'modules/clipboard': Clipboard,
  'modules/history': History,
  'modules/imageResize': ImageResize,
  'modules/keyboard': Keyboard,
  'modules/uploader': Uploader,
  'modules/input': Input,
});

export default Quill;
