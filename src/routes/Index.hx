package routes;

class Index implements restx.IRoute
{
  @:get("/")
  function root() {
    response.send("Root");
  }
}