package routes;

class Blog implements restx.IRoute
{
  @:path("/blog/")
  function index() {
    response.send("Blog");
  }

  @:path("/blog/:id")
  function show( id:Int ) {
    response.send( { id : id } );
  }
}