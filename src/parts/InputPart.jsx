import React from "react";
import withCustomStyles from "./InputPart.style";
import withRouter from "react-router/es/withRouter";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import * as classnames from "classnames";

class InputPart extends React.Component {
  render() {
    const {
      props: {
        classes,
        id,
        label,
        name,
        onChange,
        onClick,
        onFocus,
        value,
        onKeyDown,
        type,
        disabled,
        readOnly,
        helperText,
        shrink,
        placeholder,
        rootClassName,
        inputClassName
      }
    } = this;

    return (
      <div className={classnames(classes.root, rootClassName)}>
        <TextField
          name={name}
          className={classnames(classes.inputRoot, inputClassName)}
          InputLabelProps={{
            shrink,
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
          onKeyDown={e => {
            if (e.which === 13 || e.keyCode === 13) {
              e.target.blur();
            }
            if (typeof onKeyDown === "function") {
              onKeyDown(e);
            }
          }}
          InputProps={{
            readOnly: readOnly,
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline
            }
          }}
          helperText={helperText}
          type={type || "text"}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          onChange={e => {
            e.target.focus();
            if (typeof onChange === "function") {
              onChange(e);
            }
          }}
          onClick={onClick}
          onFocus={onFocus}
          value={value}
          variant="outlined"
          id={id}
        />
      </div>
    );
  }
}
InputPart.propTypes = {
  label: PropTypes.string,
  helperText: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default withRouter(withCustomStyles(InputPart));
