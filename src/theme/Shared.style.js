import withStyles from "@material-ui/core/styles/withStyles";

const withSharedStyles = styles => {
  return withStyles(
    theme => {
      const _styles = styles(theme);
      return {
        colorWhite600: {
          color: theme.palette.common.white,
          fontWeight: 600
        },
        redColor: {
          color: theme.palette.common.red
        },
        captionColor: {
          color: theme.typography.caption.color
        },
        colorPrimary: {
          color: theme.palette.primary.main
        },
        colorBlack: {
          color: theme.palette.common.black
        },
        fontSize2: {
          fontSize: theme.spacing.unit * 2
        },
        backgroundBlack: {
          backgroundColor: theme.palette.common.black
        },
        backgroundWhite: {
          backgroundColor: theme.palette.common.white
        },
        noDecoration: {
          textDecoration: "none"
        },
        gutterBottom2: {
          paddingBottom: theme.spacing.unit * 2
        },
        gutterBottomHalf: {
          paddingBottom: theme.spacing.unit / 2
        },
        gutterTopHalf: {
          paddingTop: theme.spacing.unit / 2
        },
        gutterBottom1: {
          paddingBottom: theme.spacing.unit
        },
        gutterBottom0: {
          paddingBottom: 0
        },
        marginBottom1: {
          marginBottom: theme.spacing.unit
        },
        marginBottom2: {
          marginBottom: theme.spacing.unit * 2
        },
        padding1: {
          padding: theme.spacing.unit
        },
        padding2: {
          padding: theme.spacing.unit * 2
        },
        gutter: {
          padding: theme.spacing.unit
        },
        gutterTopDown: {
          paddingTop: theme.spacing.unit,
          paddingBottom: theme.spacing.unit
        },
        margin1: {
          margin: theme.spacing.unit
        },
        hidden: {
          visibility: "hidden"
        },
        displayNone: {
          display: "none"
        },
        relativePosition: {
          position: "relative"
        },
        minHeightPage: {
          minHeight: theme.spacing.minHeightPage
        },
        fillHeight: {
          height: "100%"
        },
        textLineHeight: {
          maxHeight: 22,
          marginBottom: 2
        },
        marginLeft1: {
          marginLeft: theme.spacing.unit
        },
        floatRight: {
          float: "right"
        },
        marginRight1: {
          marginRight: theme.spacing.unit
        },
        marginRight2: {
          marginRight: theme.spacing.unit * 2
        },
        marginRightHalf: {
          marginRight: theme.spacing.unit / 2
        },
        marginBottomHalf: {
          marginBottom: theme.spacing.unit / 2
        },
        marginLeftHalf: {
          marginLeft: theme.spacing.unit / 2
        },
        marginTop2: {
          marginTop: theme.spacing.unit * 2
        },
        marginTop1: {
          marginTop: theme.spacing.unit
        },
        displayInline: {
          display: "inline-flex"
        },
        center: {
          textAlign: "center"
        },
        mainRow: {
          borderTop: theme.mixins.borderLine2,
          padding: theme.spacing.unit
        },
        borderLine2Bottom: {
          borderBottom: theme.mixins.borderLine2
        },
        borderLine1Bottom: {
          borderBottom: theme.mixins.borderLine1
        },
        borderLine2Top: {
          borderTop: theme.mixins.borderLine2
        },
        borderLine1Top: {
          borderTop: theme.mixins.borderLine1
        },
        subRow: {
          borderTop: theme.mixins.borderLine1,
          padding: theme.spacing.unit
        },
        section: {
          padding: theme.spacing.unit,
          marginBottom: theme.spacing.unit * 2
        },
        largeIcon: {
          fontSize: theme.spacing.unit * 15
        },
        largeButton: {
          width: "100%",
          padding: "12px 16px",
          fontWeight: 600
        },
        midButton: {
          width: "100%",
          padding: "8px 16px",
          fontWeight: "bold",
          fontSize: "0.775rem"
        },
        centerAlignedImage: {
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%"
        },
        fullWidth: {
          width: "100%"
        },
        flexWrap: {
          flexWrap: "wrap"
        },
        ..._styles
      };
    },
    { withTheme: true }
  );
};

export default withSharedStyles;
