import React, { Component } from "react";
import withCustomStyles from "./FAQsPage.style";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import SEOInfoPart from "../parts/SEOInfoPart";
import RobotsNoIndexPart from "../parts/RobotsNoIndexPart";
import { Helmet } from "react-helmet";
import { inject, observer } from "mobx-react";
import FAQsSectionPart from "../parts/FAQsSectionPart";

@inject(["faqStore"])
@observer
class FAQsPage extends Component {
  componentDidMount() {
    this.props.faqStore.fetchFAQs();
  }

  render() {
    const {
      props: { classes, faqStore }
    } = this;

    return (
      <Paper>
        <SEOInfoPart />
        <Helmet>
          <link rel="canonical" href="https://grocerapp.pk/faqs" />
        </Helmet>
        <RobotsNoIndexPart />
        <Typography variant="h5" className={classes.gutterBottom2}>
          FAQs
        </Typography>
        {faqStore.all.map(({ name, faqs }) => (
          <FAQsSectionPart key={name} sectionName={name} questions={faqs} />
        ))}
      </Paper>
    );
  }
}

export default withCustomStyles(FAQsPage);
