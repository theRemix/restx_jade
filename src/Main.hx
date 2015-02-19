class Main
{
  private static inline var PORT = 8888;

  public function new(router:restx.Router)
  {
    
    // register routes
    router.register(new routes.Index());
    router.register(new routes.Blog());

  }

  static public function main()
  {
    var app = new restx.App( (untyped(process.env.PORT) || PORT ) );
    
    // start server
    app.start( function() new Main(app.router) );

  }
}