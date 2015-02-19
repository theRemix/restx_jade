package routes;

class Index implements restx.IRoute
{
  @:path("/")
  function root() {
    response.send("Root");
  }
}