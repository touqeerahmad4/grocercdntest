import React, { Component } from "react";
import classnames from "classnames";
import withCustomStyles from "./FAQsSectionPart.style";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class FAQsSectionPart extends Component {
  render() {
    const {
      props: { classes, sectionName, questions }
    } = this;

    return (
      !!questions.length && (
        <div className={classes.marginBottom2}>
          <Typography variant="h6" className={classnames(classes.section)}>
            {sectionName}
          </Typography>
          {questions.map(({ question, answer }) => (
            <ExpansionPanel key={question} className={classes.padding1}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1">{question}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.faqAnswers}>
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </div>
      )
    );
  }
}

export default withCustomStyles(FAQsSectionPart);
