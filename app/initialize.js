import { PageContextManager } from 'scripts/pageContextManager.js'

document.addEventListener('DOMContentLoaded', () => {
  tonic.contextManager = new PageContextManager();
  tonic.contextManager.initialize($('#page-container').data('page-type'));
});
