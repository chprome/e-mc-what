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
        .during(20 minutes) {
            exec(http("get page")
                .get("/calcul/rectangleSurface")
            )
            .exec(http("get lib css")
                .get("/stylesheets/libs.css")
            )
            .exec(http("get main css")
                .get("/stylesheets/main.css")
            )
            .exec(http("twitter")
                .get("/img/SocialMediaBookmarkIcon/16/twitter.png")
            )
            .exec(http("facebook")
                .get("/img/SocialMediaBookmarkIcon/16/facebook.png")
            )
            .exec(http("google")
                .get("/img/SocialMediaBookmarkIcon/16/google.png")
            )
            .exec(http("js libs")
                .get("/javascripts/libs.js")
            )
            .exec(http("js rect")
                .get("/javascripts/rectangleSurface.js")
            )
            .pause(1 second)
        }

    setUp(scn.users(100).ramp(19 minute).protocolConfig(httpConf))
}
