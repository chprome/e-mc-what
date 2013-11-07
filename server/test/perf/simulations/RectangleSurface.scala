import com.excilys.ebi.gatling.core.Predef._
import com.excilys.ebi.gatling.http.Predef._
import com.excilys.ebi.gatling.jdbc.Predef._
import com.excilys.ebi.gatling.http.Headers.Names._
import akka.util.duration._
import bootstrap._
import assertions._

class RectangleSurface extends Simulation {

    val httpConf = httpConfig
            .baseURL("http://localhost:5000")

    val scn = scenario("Rectangle surface")
        .during(6 minutes) {
            exec(http("get page")
                .get("/calcul/rectangleSurface")
            )
            .pause(1 second)
        }

    setUp(scn.users(1000).ramp(5 minute).protocolConfig(httpConf))
}
