describe('listApp directive', () => {

  var dom, rootScope, iscope, compile, scope;

  beforeEach(module('about', 'templates'));

  beforeEach(inject($injector => {
    rootScope = $injector.get('$rootScope');
    compile = $injector.get('$compile');
    scope = rootScope.$new();
  }));

  describe('Compilation process', () => {

    beforeEach(() => {
      dom = compile('<list-app></list-app>')(scope);
      scope.$digest();
      iscope = dom.isolateScope();
    });

    it('should replace da nodeName', () =>  {
      expect(dom[0].nodeName).toBe('UL');
    });

    it('should create an isolate Scope', () =>  {
      expect(iscope).toBeDefined();
    });

    it('should contains a list', () => {
      expect(dom[0].querySelectorAll('li').length).toBe(3);
    });

  });

});
