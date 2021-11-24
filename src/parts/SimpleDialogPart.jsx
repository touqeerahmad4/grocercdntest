import React from "react";
import withCustomStyles from "./SimpleDialogPart.style";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { ANDROID_APP_LINK, IOS_APP_LINK } from "../constatns/AppConstants";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";
import gtmService from "../services/GTMService";
import Button from "@material-ui/core/Button";

const SimpleDialogPart = props => {
  const {
    classes,
    isFullScreen,
    fullWidth,
    onClose,
    open,
    title,
    content,
    isDownloadLinks,
    cancelBtnContent,
    acceptBtnContent,
    onAccept,
    onCancel
  } = props;
  const trackClickEvent = platform => {
    gtmService.event("User", `Goto ${platform}`);
  };
  return (
    <Dialog
      scroll="paper"
      fullScreen={isFullScreen || false}
      fullWidth={fullWidth}
      onClose={onClose}
      open={open}
      className={classes.root}
    >
      {title && (
        <React.Fragment>
          <Typography variant="h6">{title}</Typography>
          <Divider />
        </React.Fragment>
      )}
      {props.content && (
        <Typography variant="body2" className={classes.marginTop1}>
          {content}
        </Typography>
      )}
      {props.children}
      {isDownloadLinks && (
        <React.Fragment>
          <Divider />
          <Typography variant="body1">
            Or you can use{" "}
            <Link
              href={ANDROID_APP_LINK}
              target="_blank"
              onClick={trackClickEvent.bind(this, "android")}
              rel="noopener"
            >
              android
            </Link>{" "}
            or{" "}
            <Link
              href={IOS_APP_LINK}
              target="_blank"
              onClick={trackClickEvent.bind(this, "ios")}
              rel="noopener"
            >
              iOS
            </Link>{" "}
            apps for full experience.
          </Typography>
        </React.Fragment>
      )}
      {(acceptBtnContent || cancelBtnContent) && (
        <div className={classes.marginTop2}>
          <div className={classes.button}>
            {cancelBtnContent && (
              <Button onClick={onCancel} color="primary" variant="outlined">
                {cancelBtnContent}
              </Button>
            )}
            {acceptBtnContent && (
              <Button
                onClick={onAccept}
                color="primary"
                /* eslint-disable-next-line jsx-a11y/no-autofocus */
                autoFocus
                variant="contained"
              >
                {acceptBtnContent}
              </Button>
            )}
          </div>
        </div>
      )}
    </Dialog>
  );
};

SimpleDialogPart.propTypes = {
  isDownloadLinks: PropTypes.bool
};
SimpleDialogPart.defaultProps = {
  isDownloadLinks: false
};
export default withCustomStyles(SimpleDialogPart);
