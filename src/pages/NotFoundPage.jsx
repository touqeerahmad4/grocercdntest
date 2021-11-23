import React from "react";
import withCustomStyles from "./NotFoundPage.style";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { mainThemeObject } from "../theme/MainTheme";
import { Helmet } from "react-helmet";
import SEOInfoPart from "../parts/SEOInfoPart";

class NotFoundPage extends React.Component {
  render() {
    const {
      props: { classes }
    } = this;

    return (
      <Paper>
        <SEOInfoPart />
        <Helmet>
          <meta name="prerender-status-code" content="404" />
        </Helmet>
        <Grid
          container
          className={classes.root}
          direction="column"
          justify="center"
          alignItems="flex-start"
          spacing={mainThemeObject.spacing.unit * 2}
        >
          <Grid item>
            <Typography variant={"h3"}>Oops!</Typography>
          </Grid>
          <Grid item>
            <Typography variant={"h6"}>
              The page you are looking for can’t be found.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={"body2"}>
              You might find these links useful
            </Typography>
          </Grid>
          <Grid item>
            <Link
              color="primary"
              gutterBottom
              component={RouterLink}
              className={classes.link}
              to="/"
            >
              Goto Home
            </Link>
            <Link
              color="primary"
              className={classes.link}
              component={RouterLink}
              to="/categories"
            >
              Goto Categories
            </Link>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withCustomStyles(NotFoundPage);
