package routes;

class Blog implements restx.IRoute
{
  @:get("/blog/")
  function index() {
    response.send("Blog");
  }

  @:get("/blog/:id")
  function show( id:Int ) {
    response.send( { id : id } );
  }
}